import { neon } from "@neondatabase/serverless";

async function migrate() {
  let databaseUrl = process.env.DATABASE_URL || '';
  
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  
  if (databaseUrl.startsWith("psql")) {
    databaseUrl = databaseUrl.replace(/^psql\s+'|'$/g, "");
  }
  
  console.log("Connecting to database...");
  const sql = neon(databaseUrl);
  
  try {
    console.log("Creating tables...");
    
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
    
    console.log("✅ Tables created successfully!");
    console.log("Database migration completed.");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

migrate();
