import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
const { Pool } = pkg;
import * as schema from "@shared/schema";

let db: any = null;

if (!process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL must be set in production. Did you forget to provision a database?");
  }
  console.warn("DATABASE_URL not set. Database features will be unavailable.");
  db = null;
} else {
  let databaseUrl = process.env.DATABASE_URL.trim();
  if (databaseUrl.startsWith("psql")) {
    databaseUrl = databaseUrl
      .replace(/^psql\s+['"]?/i, "")
      .replace(/['"];?\s*$/g, "")
      .trim();
  }

  if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
    throw new Error(`Invalid DATABASE_URL format. Expected postgresql:// connection string, got: ${databaseUrl.substring(0, 50)}...`);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  db = drizzle(pool, { schema });
}

export { db };
