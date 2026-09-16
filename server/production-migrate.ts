import { neon } from "@neondatabase/serverless";
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
  const sql = neon(databaseUrl);
  
  try {
    console.log("🔄 Enabling PostgreSQL extensions...");
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
    
    console.log("🔄 Creating tables...");
    
    await sql`
      CREATE TABLE IF NOT EXISTS cms_users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_admin TEXT NOT NULL DEFAULT 'false'
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS content_sections (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        page TEXT NOT NULL,
        section TEXT NOT NULL,
        content TEXT NOT NULL,
        content_type TEXT NOT NULL DEFAULT 'text',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS media_assets (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT NOT NULL UNIQUE,
        url TEXT NOT NULL,
        alt_text TEXT,
        category TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'general',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS seo_metadata (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        page TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        keywords TEXT,
        og_image TEXT,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        username TEXT,
        action TEXT NOT NULL,
        resource TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
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
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS team_members (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        image_url TEXT,
        category TEXT NOT NULL,
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    // Session table for connect-pg-simple (required for admin login sessions)
    console.log("🔄 Creating session table...");
    await sql`
      CREATE TABLE IF NOT EXISTS "user_sessions" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("sid")
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS "IDX_user_sessions_expire" ON "user_sessions" ("expire")
    `;

    console.log("✅ All tables created successfully!");

    console.log("🔄 Verifying admin user presence...");
    try {
      const existingAdmins = await sql`SELECT id, username FROM cms_users WHERE is_admin = 'true' LIMIT 1`;
      if (existingAdmins.length > 0) {
        console.log(`✅ Admin account exists (${existingAdmins[0].username}). Preserving existing credentials.`);
      } else {
        const initialUsername = process.env.ADMIN_INITIAL_USERNAME || process.env.ADMIN_USERNAME || 'admin';
        const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('hex');
        const hashedPassword = await bcrypt.hash(initialPassword, 10);
        await sql`
          INSERT INTO cms_users (username, password, is_admin)
          VALUES (${initialUsername}, ${hashedPassword}, 'true')
          ON CONFLICT (username) DO NOTHING
        `;
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
  }
}

migrate();
