import pkg from 'pg';
const { Client } = pkg;
import bcrypt from "bcryptjs";
import crypto from "crypto";

async function migrate() {
  let databaseUrl = process.env.DATABASE_URL || '';
  
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set");
    process.exit(1);
  }
  
  databaseUrl = databaseUrl.trim();
  if (databaseUrl.startsWith("psql")) {
    databaseUrl = databaseUrl
      .replace(/^psql\s+['"]?/i, "")
      .replace(/['"];?\s*$/g, "")
      .trim();
  }
  
  console.log("🔄 Connecting to database...");
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  try {
    await client.connect();
    console.log("🔄 Enabling PostgreSQL extensions...");
    
    await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
    
    console.log("🔄 Creating tables...");
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS cms_users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_admin TEXT NOT NULL DEFAULT 'false'
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_sections (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        page TEXT NOT NULL,
        section TEXT NOT NULL,
        content TEXT NOT NULL,
        content_type TEXT NOT NULL DEFAULT 'text',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS media_assets (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT NOT NULL UNIQUE,
        url TEXT NOT NULL,
        alt_text TEXT,
        category TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS seo_metadata (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        page TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        keywords TEXT,
        og_image TEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        resource TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS resume_applications (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT,
        resume_file_name TEXT NOT NULL,
        resume_file_path TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        image_url TEXT,
        category TEXT NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Session table for connect-pg-simple (required for admin login sessions)
    console.log("🔄 Creating session table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS "user_sessions" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("sid")
      )
    `);
    
    // Create index for session expiration cleanup
    await client.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_sessions_expire" ON "user_sessions" ("expire")
    `);

    console.log("✅ All tables created successfully!");

    console.log("🔄 Adding missing columns to existing tables...");

    const alterTableQueries = [
      {
        table: 'activity_logs',
        column: 'username',
        query: `ALTER TABLE activity_logs ADD COLUMN IF NOT EXISTS username TEXT`
      }
    ];

    for (const alteration of alterTableQueries) {
      try {
        await client.query(alteration.query);
        console.log(`✅ Column '${alteration.column}' ensured in '${alteration.table}'`);
      } catch (err: any) {
        if (err.code === '42701') {
          console.log(`ℹ️ Column '${alteration.column}' already exists in '${alteration.table}'`);
        } else {
          console.error(`⚠️ Error adding column '${alteration.column}' to '${alteration.table}':`, err.message);
        }
      }
    }

    console.log("🔄 Updating null username values in activity_logs...");
    try {
      await client.query(`UPDATE activity_logs SET username = 'system' WHERE username IS NULL`);
      console.log("✅ Updated null username values");
    } catch (err: any) {
      console.log("ℹ️ No null username values to update or column doesn't exist yet");
    }

    console.log("🔄 Verifying admin user presence...");
    try {
      const existingAdmins = await client.query(`SELECT id, username FROM cms_users WHERE is_admin = 'true' LIMIT 1`);
      if (existingAdmins.rows.length > 0) {
        console.log(`✅ Admin account exists (${existingAdmins.rows[0].username}). Preserving existing credentials.`);
      } else {
        const initialUsername = process.env.ADMIN_INITIAL_USERNAME || process.env.ADMIN_USERNAME || 'admin';
        const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('hex');
        const hashedPassword = await bcrypt.hash(initialPassword, 10);
        await client.query(
          `INSERT INTO cms_users (username, password, is_admin)
           VALUES ($1, $2, $3)
           ON CONFLICT (username) DO NOTHING`,
          [initialUsername, hashedPassword, 'true']
        );
        console.log(`✅ Initial admin account initialized: username '${initialUsername}'`);
        if (!process.env.ADMIN_INITIAL_PASSWORD && !process.env.ADMIN_PASSWORD) {
          console.log(`⚠️ [SECURITY] Generated initial random admin password: '${initialPassword}'. Change this immediately in the Admin Panel!`);
        }
      }
    } catch (err: any) {
      console.error("⚠️ Error verifying/creating admin user:", err.message);
    }

    console.log("✅ Database migration completed.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
