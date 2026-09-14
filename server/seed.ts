import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import crypto from "crypto";

async function seed() {
  let databaseUrl = process.env.DATABASE_URL || '';
  
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  
  databaseUrl = databaseUrl.trim();
  if (databaseUrl.startsWith("psql")) {
    databaseUrl = databaseUrl
      .replace(/^psql\s+['"]?/i, "")
      .replace(/['"];?\s*$/g, "")
      .trim();
  }
  
  console.log("Connecting to database...");
  const sql = neon(databaseUrl);
  
  try {
    console.log("Seeding database...");
    
    console.log("Checking for existing admin user...");
    const existingAdmins = await sql`SELECT id, username FROM cms_users WHERE is_admin = 'true' LIMIT 1`;
    if (existingAdmins.length > 0) {
      console.log(`✅ Admin account exists (${existingAdmins[0].username}). Preserving credentials.`);
    } else {
      const initialUsername = process.env.ADMIN_INITIAL_USERNAME || process.env.ADMIN_USERNAME || 'admin';
      const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('hex');
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      
      console.log("Creating admin user...");
      await sql`
        INSERT INTO cms_users (username, password, is_admin)
        VALUES (${initialUsername}, ${hashedPassword}, ${'true'})
        ON CONFLICT (username) DO NOTHING
      `;
      console.log(`✅ Admin user created: username '${initialUsername}'`);
      if (!process.env.ADMIN_INITIAL_PASSWORD && !process.env.ADMIN_PASSWORD) {
        console.log(`⚠️ [SECURITY] Generated initial random admin password: '${initialPassword}'. Change this immediately upon login!`);
      }
    }
    
    console.log("Adding content sections...");
    const contentData = [
      { page: "home", section: "hero_title", content: "Welcome to Sargam-Maam Home Page", contentType: "text" },
      { page: "home", section: "hero_subtitle", content: "Discover amazing products and services", contentType: "text" },
      { page: "home", section: "features_title", content: "Our Features", contentType: "text" },
      { page: "home", section: "features_description", content: "We offer the best solutions for your needs", contentType: "text" },
      
      { page: "about", section: "hero_title", content: "About Us", contentType: "text" },
      { page: "about", section: "mission_title", content: "Our Mission", contentType: "text" },
      { page: "about", section: "mission_content", content: "We strive to deliver excellence in everything we do", contentType: "text" },
      { page: "about", section: "vision_title", content: "Our Vision", contentType: "text" },
      { page: "about", section: "vision_content", content: "To be the leading company in our industry", contentType: "text" },
      
      { page: "brands", section: "hero_title", content: "Our Brands", contentType: "text" },
      { page: "brands", section: "brands_description", content: "Explore our portfolio of trusted brands", contentType: "text" },
      { page: "brands", section: "featured_title", content: "Featured Brands", contentType: "text" },
      
      { page: "careers", section: "hero_title", content: "Join Our Team", contentType: "text" },
      { page: "careers", section: "careers_description", content: "Build your career with us", contentType: "text" },
      { page: "careers", section: "benefits_title", content: "Why Work With Us", contentType: "text" },
      { page: "careers", section: "benefits_content", content: "Competitive salary, great culture, and growth opportunities", contentType: "text" },
      
      { page: "media", section: "hero_title", content: "Media Gallery", contentType: "text" },
      { page: "media", section: "gallery_description", content: "Browse our latest photos and videos", contentType: "text" },
      
      { page: "contact", section: "hero_title", content: "Contact Us", contentType: "text" },
      { page: "contact", section: "contact_description", content: "Get in touch with our team", contentType: "text" },
      { page: "contact", section: "address", content: "123 Business Street, City, Country", contentType: "text" },
      { page: "contact", section: "phone", content: "+1 (555) 123-4567", contentType: "text" },
      { page: "contact", section: "email", content: "contact@example.com", contentType: "text" },
    ];
    
    for (const data of contentData) {
      await sql`
        INSERT INTO content_sections (page, section, content, content_type)
        SELECT ${data.page}, ${data.section}, ${data.content}, ${data.contentType}
        WHERE NOT EXISTS (
          SELECT 1 FROM content_sections
          WHERE page = ${data.page} AND section = ${data.section}
        )
      `;
    }
    
    console.log("Adding media assets...");
    const mediaData = [
      { key: "main_logo", url: "/figmaAssets/logo.png", altText: "Company Logo", category: "logo" },
      { key: "footer_logo", url: "/figmaAssets/logo-white.png", altText: "Company Logo White", category: "logo" },
      { key: "hero_image", url: "/figmaAssets/hero-banner.jpg", altText: "Hero Banner", category: "image" },
      { key: "about_image", url: "/figmaAssets/about-us.jpg", altText: "About Us", category: "image" },
      { key: "team_photo", url: "/figmaAssets/team.jpg", altText: "Our Team", category: "image" },
      { key: "office_photo", url: "/figmaAssets/office.jpg", altText: "Our Office", category: "image" },
      { key: "facebook_icon", url: "/figmaAssets/icons/facebook.svg", altText: "Facebook", category: "icon" },
      { key: "twitter_icon", url: "/figmaAssets/icons/twitter.svg", altText: "Twitter", category: "icon" },
      { key: "linkedin_icon", url: "/figmaAssets/icons/linkedin.svg", altText: "LinkedIn", category: "icon" },
      { key: "instagram_icon", url: "/figmaAssets/icons/instagram.svg", altText: "Instagram", category: "icon" },
    ];
    
    for (const data of mediaData) {
      await sql`
        INSERT INTO media_assets (key, url, alt_text, category)
        VALUES (${data.key}, ${data.url}, ${data.altText}, ${data.category})
        ON CONFLICT (key) DO NOTHING
      `;
    }
    
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

seed();
