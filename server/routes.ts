import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContentSectionSchema, 
  insertMediaAssetSchema, 
  insertSiteSettingSchema, 
  insertSeoMetadataSchema,
  insertContactSubmissionSchema,
  insertActivityLogSchema,
  insertUserSchema,
  insertResumeApplicationSchema,
  insertTeamMemberSchema
} from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pkg from "pg";
const { Pool } = pkg;
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    isAdmin?: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Production environment checks - fail fast if misconfigured
  if (process.env.NODE_ENV === "production") {
    if (!process.env.SESSION_SECRET) {
      console.error("FATAL: SESSION_SECRET environment variable is required in production");
      process.exit(1);
    }
    if (!process.env.DATABASE_URL) {
      console.error("FATAL: DATABASE_URL environment variable is required in production");
      process.exit(1);
    }
    // Trust proxy for production (Render, Heroku, etc. use reverse proxies)
    app.set("trust proxy", 1);
  }

  // Configure session store - use PostgreSQL in production for persistence
  let sessionStore: session.Store | undefined;
  
  if (process.env.DATABASE_URL) {
    let databaseUrl = process.env.DATABASE_URL.trim();
    
    // Clean up DATABASE_URL if it's in psql format
    if (databaseUrl.startsWith("psql")) {
      databaseUrl = databaseUrl
        .replace(/^psql\s+['"]?/i, "")
        .replace(/['"];?\s*$/g, "")
        .trim();
    }
    
    const PgSession = connectPgSimple(session);
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    // Test connection and log status
    pool.on('error', (err) => {
      console.error('Session pool error:', err);
    });
    
    pool.on('connect', () => {
      console.log('Session store connected to PostgreSQL');
    });
    
    sessionStore = new PgSession({
      pool,
      tableName: 'user_sessions',
      createTableIfMissing: true,
      pruneSessionInterval: 60 * 15, // Prune every 15 minutes
      errorLog: console.error.bind(console, 'PgSession error:'),
    });
    
    console.log('PostgreSQL session store configured');
  } else {
    console.log('Using in-memory session store (development mode)');
  }

  // Session configuration
  const isProduction = process.env.NODE_ENV === "production";
  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "healweal-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      name: 'healweal.sid', // Custom session cookie name
      proxy: isProduction, // Trust the reverse proxy in production
      cookie: {
        secure: isProduction, // Requires HTTPS in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax", // Use lax for same-origin requests (Render serves frontend and backend on same domain)
        path: '/',
      },
    })
  );
  
  console.log(`Session configured: secure=${isProduction}, sameSite=lax`);

  // Middleware to check if user is authenticated admin
  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.session.userId || !req.session.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // Configure multer for file uploads
  // In production, uploads go to a dedicated 'uploads' folder at project root
  // In development, uploads go to client/public/uploads for Vite to serve
  const uploadDir = isProduction 
    ? path.join(process.cwd(), "uploads")
    : path.join(process.cwd(), "client", "public", "uploads");
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Serve uploads directory in production
  if (isProduction) {
    app.use('/uploads', express.static(uploadDir));
    
    // Also serve attached_assets directory for team member images
    const attachedAssetsDir = path.join(process.cwd(), "attached_assets");
    if (fs.existsSync(attachedAssetsDir)) {
      app.use('/attached_assets', express.static(attachedAssetsDir));
    }
  }

  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
  });

  const upload = multer({
    storage: storageConfig,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WebP and SVG are allowed.'));
      }
    }
  });

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        console.error("Login failed: Missing username or password");
        return res.status(400).json({ error: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        console.error(`Login failed: User '${username}' not found in database`);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (user.isAdmin !== "true") {
        console.error(`Login failed: User '${username}' is not an admin`);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        console.error(`Login failed: Invalid password for user '${username}'`);
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.regenerate((regenErr) => {
        if (regenErr) {
          console.error("Session regeneration error:", regenErr);
          return res.status(500).json({ error: "Login failed - session error" });
        }

        req.session.userId = user.id;
        req.session.isAdmin = true;

        // Explicitly save session before responding (required for PostgreSQL session store)
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({ error: "Login failed - session error" });
          }
          console.log(`Login successful for user '${username}'`);
          res.json({ id: user.id, username: user.username, isAdmin: true });
        });
      });
    } catch (error) {
      console.error("Login error - Full details:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie('healweal.sid', { path: '/' });
      res.json({ success: true });
    });
  });

  app.get("/api/auth/session", (req, res) => {
    if (req.session.userId && req.session.isAdmin) {
      res.json({ authenticated: true, isAdmin: true });
    } else {
      res.json({ authenticated: false, isAdmin: false });
    }
  });

  // Content routes (public)
  app.get("/api/content", async (req, res) => {
    try {
      const { page, section } = req.query;
      
      const content = await storage.getContentSections(
        page as string | undefined,
        section as string | undefined
      );
      
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/content/:page/:section", async (req, res) => {
    try {
      const { page, section } = req.params;
      
      const content = await storage.getContentSection(page, section);
      
      if (!content) {
        return res.status(404).json({ error: "Content not found" });
      }
      
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  // Content routes (admin only)
  app.post("/api/admin/content", requireAdmin, async (req, res) => {
    try {
      const validation = insertContentSectionSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const created = await storage.createContentSection(validation.data);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating content:", error);
      res.status(500).json({ error: "Failed to create content" });
    }
  });

  app.put("/api/admin/content/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertContentSectionSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateContentSection(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "Content not found" });
      }

      res.json(updated);
    } catch (error) {
      console.error("Error updating content:", error);
      res.status(500).json({ error: "Failed to update content" });
    }
  });

  app.delete("/api/admin/content/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteContentSection(id);

      if (!deleted) {
        return res.status(404).json({ error: "Content not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting content:", error);
      res.status(500).json({ error: "Failed to delete content" });
    }
  });

  // Media routes (public)
  app.get("/api/media", async (req, res) => {
    try {
      const { category, key } = req.query;
      
      const media = await storage.getMediaAssets(
        category as string | undefined,
        key as string | undefined
      );
      
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  app.get("/api/media/:key", async (req, res) => {
    try {
      const { key } = req.params;
      
      const media = await storage.getMediaAsset(key);
      
      if (!media) {
        return res.status(404).json({ error: "Media not found" });
      }
      
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  // Media routes (admin only)
  app.post("/api/admin/media", requireAdmin, async (req, res) => {
    try {
      const validation = insertMediaAssetSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const created = await storage.createMediaAsset(validation.data);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating media:", error);
      res.status(500).json({ error: "Failed to create media" });
    }
  });

  app.put("/api/admin/media/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertMediaAssetSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateMediaAsset(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "Media not found" });
      }

      res.json(updated);
    } catch (error) {
      console.error("Error updating media:", error);
      res.status(500).json({ error: "Failed to update media" });
    }
  });

  app.delete("/api/admin/media/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMediaAsset(id);

      if (!deleted) {
        return res.status(404).json({ error: "Media not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(500).json({ error: "Failed to delete media" });
    }
  });

  // File upload route with error handling
  app.post("/api/admin/upload", requireAdmin, (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error("Upload error:", err);
        
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: "File size exceeds 5MB limit" });
          }
          return res.status(400).json({ error: err.message });
        }
        
        return res.status(400).json({ error: err.message || "Invalid file type" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      
      res.json({
        success: true,
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      });
    });
  });

  // Helper function to log admin actions
  const logActivity = async (req: any, action: string, resource: string, details?: string) => {
    if (req.session.userId) {
      try {
        const user = await storage.getUser(req.session.userId);
        if (user) {
          await storage.createActivityLog({
            userId: user.id,
            username: user.username,
            action,
            resource,
            details: details || null,
          });
        }
      } catch (error) {
        console.error("Failed to log activity:", error);
      }
    }
  };

  // Site Settings routes (public)
  app.get("/api/settings", async (req, res) => {
    try {
      const { category } = req.query;
      const settings = await storage.getSiteSettings(category as string | undefined);
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const setting = await storage.getSiteSetting(key);
      
      if (!setting) {
        return res.status(404).json({ error: "Setting not found" });
      }
      
      res.json(setting);
    } catch (error) {
      console.error("Error fetching setting:", error);
      res.status(500).json({ error: "Failed to fetch setting" });
    }
  });

  // Site Settings routes (admin only)
  app.post("/api/admin/settings", requireAdmin, async (req, res) => {
    try {
      const validation = insertSiteSettingSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const created = await storage.createSiteSetting(validation.data);
      await logActivity(req, "create", "settings", `Created setting: ${created.key}`);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating setting:", error);
      res.status(500).json({ error: "Failed to create setting" });
    }
  });

  app.put("/api/admin/settings/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertSiteSettingSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateSiteSetting(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "Setting not found" });
      }

      await logActivity(req, "update", "settings", `Updated setting: ${updated.key}`);
      res.json(updated);
    } catch (error) {
      console.error("Error updating setting:", error);
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  app.delete("/api/admin/settings/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const setting = await storage.getSiteSettings();
      const toDelete = setting.find(s => s.id === id);
      const deleted = await storage.deleteSiteSetting(id);

      if (!deleted) {
        return res.status(404).json({ error: "Setting not found" });
      }

      await logActivity(req, "delete", "settings", `Deleted setting: ${toDelete?.key}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting setting:", error);
      res.status(500).json({ error: "Failed to delete setting" });
    }
  });

  // SEO Metadata routes (public)
  app.get("/api/seo", async (req, res) => {
    try {
      const { page } = req.query;
      const metadata = await storage.getSeoMetadata(page as string | undefined);
      res.json(metadata);
    } catch (error) {
      console.error("Error fetching SEO metadata:", error);
      res.status(500).json({ error: "Failed to fetch SEO metadata" });
    }
  });

  app.get("/api/seo/:page", async (req, res) => {
    try {
      const { page } = req.params;
      const metadata = await storage.getSeoMetadataByPage(page);
      
      if (!metadata) {
        return res.status(404).json({ error: "SEO metadata not found" });
      }
      
      res.json(metadata);
    } catch (error) {
      console.error("Error fetching SEO metadata:", error);
      res.status(500).json({ error: "Failed to fetch SEO metadata" });
    }
  });

  // SEO Metadata routes (admin only)
  app.post("/api/admin/seo", requireAdmin, async (req, res) => {
    try {
      const validation = insertSeoMetadataSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const created = await storage.createSeoMetadata(validation.data);
      await logActivity(req, "create", "seo", `Created SEO for page: ${created.page}`);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating SEO metadata:", error);
      res.status(500).json({ error: "Failed to create SEO metadata" });
    }
  });

  app.put("/api/admin/seo/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertSeoMetadataSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateSeoMetadata(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "SEO metadata not found" });
      }

      await logActivity(req, "update", "seo", `Updated SEO for page: ${updated.page}`);
      res.json(updated);
    } catch (error) {
      console.error("Error updating SEO metadata:", error);
      res.status(500).json({ error: "Failed to update SEO metadata" });
    }
  });

  app.delete("/api/admin/seo/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const allSeo = await storage.getSeoMetadata();
      const toDelete = allSeo.find(s => s.id === id);
      const deleted = await storage.deleteSeoMetadata(id);

      if (!deleted) {
        return res.status(404).json({ error: "SEO metadata not found" });
      }

      await logActivity(req, "delete", "seo", `Deleted SEO for page: ${toDelete?.page}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting SEO metadata:", error);
      res.status(500).json({ error: "Failed to delete SEO metadata" });
    }
  });

  // User Management routes (admin only)
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getUsers();
      const sanitized = users.map(({ password, ...user }) => user);
      res.json(sanitized);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const validation = insertUserSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const hashedPassword = await bcrypt.hash(validation.data.password, 10);
      const created = await storage.createUser({
        ...validation.data,
        password: hashedPassword,
      });

      await logActivity(req, "create", "users", `Created user: ${created.username}`);
      const { password, ...sanitized } = created;
      res.status(201).json(sanitized);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.put("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertUserSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updateData = { ...validation.data };
      
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const updated = await storage.updateUser(id, updateData);

      if (!updated) {
        return res.status(404).json({ error: "User not found" });
      }

      await logActivity(req, "update", "users", `Updated user: ${updated.username}`);
      const { password, ...sanitized } = updated;
      res.json(sanitized);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      if (id === req.session.userId) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }

      const user = await storage.getUser(id);
      const deleted = await storage.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }

      await logActivity(req, "delete", "users", `Deleted user: ${user?.username}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // Contact Submissions routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const created = await storage.createContactSubmission(validation.data);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
    try {
      const { status } = req.query;
      const submissions = await storage.getContactSubmissions(status as string | undefined);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  app.get("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await storage.getContactSubmission(id);
      
      if (!submission) {
        return res.status(404).json({ error: "Contact submission not found" });
      }
      
      res.json(submission);
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      res.status(500).json({ error: "Failed to fetch contact submission" });
    }
  });

  app.put("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertContactSubmissionSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateContactSubmission(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "Contact submission not found" });
      }

      await logActivity(req, "update", "contacts", `Updated contact from: ${updated.name}`);
      res.json(updated);
    } catch (error) {
      console.error("Error updating contact submission:", error);
      res.status(500).json({ error: "Failed to update contact submission" });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await storage.getContactSubmission(id);
      const deleted = await storage.deleteContactSubmission(id);

      if (!deleted) {
        return res.status(404).json({ error: "Contact submission not found" });
      }

      await logActivity(req, "delete", "contacts", `Deleted contact from: ${submission?.name}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      res.status(500).json({ error: "Failed to delete contact submission" });
    }
  });

  // Resume Application routes
  const resumeUploadDir = path.join(process.cwd(), "uploads", "resumes");
  
  if (!fs.existsSync(resumeUploadDir)) {
    fs.mkdirSync(resumeUploadDir, { recursive: true });
  }

  const resumeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resumeUploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
  });

  const resumeUpload = multer({
    storage: resumeStorage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'));
      }
    }
  });

  // Public route to submit resume application
  app.post("/api/applications", resumeUpload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Resume file is required" });
      }

      const { name, email, phone, message } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      const application = await storage.createResumeApplication({
        name,
        email,
        phone: phone || null,
        message: message || null,
        resumeFileName: req.file.originalname,
        resumeFilePath: req.file.path,
        status: "new",
      });

      res.status(201).json({ success: true, id: application.id });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  // Admin routes for resume applications
  app.get("/api/admin/applications", requireAdmin, async (req, res) => {
    try {
      const { status } = req.query;
      const applications = await storage.getResumeApplications(status as string | undefined);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/admin/applications/:id", requireAdmin, async (req, res) => {
    try {
      const application = await storage.getResumeApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ error: "Failed to fetch application" });
    }
  });

  app.get("/api/admin/applications/:id/resume", requireAdmin, async (req, res) => {
    try {
      const application = await storage.getResumeApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      const resolvedPath = path.resolve(application.resumeFilePath);
      const allowedDir = path.resolve(resumeUploadDir);
      if (!resolvedPath.startsWith(allowedDir)) {
        console.error(`Blocked path traversal attempt: ${application.resumeFilePath}`);
        return res.status(403).json({ error: "Access denied" });
      }
      
      if (!fs.existsSync(resolvedPath)) {
        return res.status(404).json({ error: "Resume file not found" });
      }
      
      res.download(resolvedPath, application.resumeFileName);
    } catch (error) {
      console.error("Error downloading resume:", error);
      res.status(500).json({ error: "Failed to download resume" });
    }
  });

  app.put("/api/admin/applications/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertResumeApplicationSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateResumeApplication(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "Application not found" });
      }

      await logActivity(req, "update", "applications", `Updated application from: ${updated.name}`);
      res.json(updated);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  app.delete("/api/admin/applications/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const application = await storage.getResumeApplication(id);
      
      if (application && fs.existsSync(application.resumeFilePath)) {
        fs.unlinkSync(application.resumeFilePath);
      }
      
      const deleted = await storage.deleteResumeApplication(id);

      if (!deleted) {
        return res.status(404).json({ error: "Application not found" });
      }

      await logActivity(req, "delete", "applications", `Deleted application from: ${application?.name}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ error: "Failed to delete application" });
    }
  });

  // Activity Log routes (admin only)
  app.get("/api/admin/activity", requireAdmin, async (req, res) => {
    try {
      const { limit } = req.query;
      const logs = await storage.getActivityLogs(
        limit ? parseInt(limit as string) : undefined
      );
      res.json(logs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ error: "Failed to fetch activity logs" });
    }
  });

  // Dashboard Stats route (admin only)
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const [users, content, media, settings, contacts] = await Promise.all([
        storage.getUsers(),
        storage.getContentSections(),
        storage.getMediaAssets(),
        storage.getSiteSettings(),
        storage.getContactSubmissions(),
      ]);

      const newContacts = contacts.filter(c => c.status === "new").length;

      res.json({
        totalUsers: users.length,
        totalContent: content.length,
        totalMedia: media.length,
        totalSettings: settings.length,
        totalContacts: contacts.length,
        newContacts,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Team Member routes (public)
  app.get("/api/team", async (req, res) => {
    try {
      const { category } = req.query;
      const members = await storage.getTeamMembers(category as string | undefined);
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // Team Member routes (admin only)
  app.get("/api/admin/team", requireAdmin, async (req, res) => {
    try {
      const { category } = req.query;
      const members = await storage.getTeamMembers(category as string | undefined);
      res.json(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      const member = await storage.getTeamMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error fetching team member:", error);
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.post("/api/admin/team", requireAdmin, async (req, res) => {
    try {
      const validation = insertTeamMemberSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const created = await storage.createTeamMember(validation.data);
      await logActivity(req, "create", "team", `Created team member: ${created.name}`);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error creating team member:", error);
      res.status(500).json({ error: "Failed to create team member" });
    }
  });

  app.put("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validation = insertTeamMemberSchema.partial().safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.message });
      }

      const updated = await storage.updateTeamMember(id, validation.data);

      if (!updated) {
        return res.status(404).json({ error: "Team member not found" });
      }

      await logActivity(req, "update", "team", `Updated team member: ${updated.name}`);
      res.json(updated);
    } catch (error) {
      console.error("Error updating team member:", error);
      res.status(500).json({ error: "Failed to update team member" });
    }
  });

  app.delete("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const member = await storage.getTeamMember(id);
      const deleted = await storage.deleteTeamMember(id);

      if (!deleted) {
        return res.status(404).json({ error: "Team member not found" });
      }

      await logActivity(req, "delete", "team", `Deleted team member: ${member?.name}`);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
