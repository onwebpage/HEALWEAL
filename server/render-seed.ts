import pkg from 'pg';
const { Client } = pkg;
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
  
  const client = new Client({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  try {
    await client.connect();
    console.log("Ensuring PostgreSQL extensions are enabled...");
    
    await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
    
    console.log("Seeding database...");
    
    console.log("Checking for existing admin user...");
    const existingAdmins = await client.query(`SELECT id, username FROM cms_users WHERE is_admin = 'true' LIMIT 1`);
    if (existingAdmins.rows.length > 0) {
      console.log(`✅ Admin account exists (${existingAdmins.rows[0].username}). Preserving credentials.`);
    } else {
      const initialUsername = process.env.ADMIN_INITIAL_USERNAME || process.env.ADMIN_USERNAME || 'admin';
      const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString('hex');
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      
      console.log("Creating admin user...");
      await client.query(
        `INSERT INTO cms_users (username, password, is_admin)
         VALUES ($1, $2, $3)
         ON CONFLICT (username) DO NOTHING`,
        [initialUsername, hashedPassword, 'true']
      );
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
      await client.query(
        `INSERT INTO content_sections (page, section, content, content_type)
         SELECT $1, $2, $3, $4
         WHERE NOT EXISTS (
           SELECT 1 FROM content_sections
           WHERE page = $1 AND section = $2
         )`,
        [data.page, data.section, data.content, data.contentType]
      );
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
      await client.query(
        `INSERT INTO media_assets (key, url, alt_text, category)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (key) DO NOTHING`,
        [data.key, data.url, data.altText, data.category]
      );
    }
    
    console.log("Adding site settings...");
    const siteSettingsData = [
      { key: "site_name", value: "Healweal Corp", category: "general" },
      { key: "site_tagline", value: "Innovation in Health, Wealth & Digital Experience", category: "general" },
      { key: "contact_email", value: "info@healweal.com", category: "contact" },
      { key: "contact_phone", value: "+1 (555) 123-4567", category: "contact" },
      { key: "contact_address", value: "123 Business Street, City, Country", category: "contact" },
      { key: "facebook_url", value: "https://facebook.com/healweal", category: "social" },
      { key: "twitter_url", value: "https://twitter.com/healweal", category: "social" },
      { key: "linkedin_url", value: "https://linkedin.com/company/healweal", category: "social" },
      { key: "instagram_url", value: "https://instagram.com/healweal", category: "social" },
      { key: "youtube_url", value: "https://youtube.com/@healweal", category: "social" },
    ];
    
    for (const data of siteSettingsData) {
      await client.query(
        `INSERT INTO site_settings (key, value, category)
         VALUES ($1, $2, $3)
         ON CONFLICT (key) DO NOTHING`,
        [data.key, data.value, data.category]
      );
    }
    
    console.log("Adding SEO metadata...");
    const seoData = [
      { 
        page: "home", 
        title: "Healweal Corp - Innovation in Health, Wealth & Digital Experience", 
        description: "Healweal Corp is a technology conglomerate bringing innovation to health (Hapdax), wealth (Kepwe), and podcasts (HAt). Discover our brands and services.",
        keywords: "healweal, health technology, wealth management, podcasts, digital innovation",
        ogImage: "/figmaAssets/hero-banner.jpg"
      },
      { 
        page: "about", 
        title: "About Us - Healweal Corp", 
        description: "Learn about Healweal Corp, our mission, vision, and our commitment to innovation in health, wealth, and digital experiences.",
        keywords: "about healweal, company mission, technology conglomerate",
        ogImage: "/figmaAssets/about-us.jpg"
      },
      { 
        page: "brands", 
        title: "Our Brands - Healweal Corp", 
        description: "Explore Healweal's portfolio: Hapdax for health, Kepwe for wealth management, and HAt for engaging podcasts.",
        keywords: "hapdax, kepwe, hat, healweal brands, health app, wealth app, podcast platform",
        ogImage: "/figmaAssets/brands.jpg"
      },
      { 
        page: "careers", 
        title: "Careers - Join Healweal Corp", 
        description: "Join our team at Healweal Corp. Build your career with competitive salary, great culture, and growth opportunities.",
        keywords: "healweal careers, jobs, employment opportunities, tech jobs",
        ogImage: "/figmaAssets/team.jpg"
      },
      { 
        page: "media", 
        title: "Media Gallery - Healweal Corp", 
        description: "Browse our latest photos, videos, and media content showcasing Healweal Corp and our brands.",
        keywords: "healweal media, gallery, photos, videos",
        ogImage: "/figmaAssets/gallery.jpg"
      },
      { 
        page: "contact", 
        title: "Contact Us - Healweal Corp", 
        description: "Get in touch with Healweal Corp. We're here to answer your questions and discuss how we can help.",
        keywords: "contact healweal, customer support, get in touch",
        ogImage: "/figmaAssets/contact.jpg"
      },
    ];
    
    for (const data of seoData) {
      await client.query(
        `INSERT INTO seo_metadata (page, title, description, keywords, og_image)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (page) DO NOTHING`,
        [data.page, data.title, data.description, data.keywords, data.ogImage]
      );
    }
    
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    await client.end();
  }
}

seed();
