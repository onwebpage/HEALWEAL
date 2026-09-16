import { 
  type User, 
  type InsertUser,
  type ContentSection,
  type InsertContentSection,
  type MediaAsset,
  type InsertMediaAsset,
  type SiteSetting,
  type InsertSiteSetting,
  type SeoMetadata,
  type InsertSeoMetadata,
  type ContactSubmission,
  type InsertContactSubmission,
  type ActivityLog,
  type InsertActivityLog,
  type ResumeApplication,
  type InsertResumeApplication,
  type TeamMember,
  type InsertTeamMember
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  
  getContentSections(page?: string, section?: string): Promise<ContentSection[]>;
  getContentSection(page: string, section: string): Promise<ContentSection | undefined>;
  createContentSection(content: InsertContentSection): Promise<ContentSection>;
  updateContentSection(id: string, content: Partial<InsertContentSection>): Promise<ContentSection | undefined>;
  deleteContentSection(id: string): Promise<boolean>;
  
  getMediaAssets(category?: string, key?: string): Promise<MediaAsset[]>;
  getMediaAsset(key: string): Promise<MediaAsset | undefined>;
  createMediaAsset(media: InsertMediaAsset): Promise<MediaAsset>;
  updateMediaAsset(id: string, media: Partial<InsertMediaAsset>): Promise<MediaAsset | undefined>;
  deleteMediaAsset(id: string): Promise<boolean>;
  
  getSiteSettings(category?: string): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  createSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  updateSiteSetting(id: string, setting: Partial<InsertSiteSetting>): Promise<SiteSetting | undefined>;
  deleteSiteSetting(id: string): Promise<boolean>;
  
  getSeoMetadata(page?: string): Promise<SeoMetadata[]>;
  getSeoMetadataByPage(page: string): Promise<SeoMetadata | undefined>;
  createSeoMetadata(seo: InsertSeoMetadata): Promise<SeoMetadata>;
  updateSeoMetadata(id: string, seo: Partial<InsertSeoMetadata>): Promise<SeoMetadata | undefined>;
  deleteSeoMetadata(id: string): Promise<boolean>;
  
  getContactSubmissions(status?: string): Promise<ContactSubmission[]>;
  getContactSubmission(id: string): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  updateContactSubmission(id: string, submission: Partial<InsertContactSubmission>): Promise<ContactSubmission | undefined>;
  deleteContactSubmission(id: string): Promise<boolean>;
  
  getActivityLogs(limit?: number): Promise<ActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  
  getResumeApplications(status?: string): Promise<ResumeApplication[]>;
  getResumeApplication(id: string): Promise<ResumeApplication | undefined>;
  createResumeApplication(application: InsertResumeApplication): Promise<ResumeApplication>;
  updateResumeApplication(id: string, application: Partial<InsertResumeApplication>): Promise<ResumeApplication | undefined>;
  deleteResumeApplication(id: string): Promise<boolean>;
  
  getTeamMembers(category?: string): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contentSections: Map<string, ContentSection>;
  private mediaAssets: Map<string, MediaAsset>;
  private siteSettings: Map<string, SiteSetting>;
  private seoMetadata: Map<string, SeoMetadata>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private activityLogs: ActivityLog[];
  private resumeApplications: Map<string, ResumeApplication>;
  private teamMembers: Map<string, TeamMember>;

  constructor() {
    this.users = new Map();
    this.contentSections = new Map();
    this.mediaAssets = new Map();
    this.siteSettings = new Map();
    this.seoMetadata = new Map();
    this.contactSubmissions = new Map();
    this.activityLogs = [];
    this.resumeApplications = new Map();
    this.teamMembers = new Map();
    this.seedData();
  }

  private async seedData() {
    const initialUsername = process.env.ADMIN_INITIAL_USERNAME || process.env.ADMIN_USERNAME || "admin";
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? randomUUID() : "admin_hw_2026!");
    const hashedPassword = await bcrypt.hash(initialPassword, 10);
    const adminUser: User = {
      id: randomUUID(),
      username: initialUsername,
      password: hashedPassword,
      isAdmin: "true"
    };
    this.users.set(adminUser.id, adminUser);
    if (!process.env.ADMIN_INITIAL_PASSWORD && !process.env.ADMIN_PASSWORD && process.env.NODE_ENV === "production") {
      console.log(`⚠️ [SECURITY] In-memory storage initialized admin password: '${initialPassword}'.`);
    }

    const contentData: Array<Omit<ContentSection, 'id' | 'updatedAt'>> = [
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

    contentData.forEach(data => {
      const section: ContentSection = {
        id: randomUUID(),
        ...data,
        updatedAt: new Date()
      };
      this.contentSections.set(section.id, section);
    });

    const mediaData: Array<Omit<MediaAsset, 'id' | 'updatedAt'>> = [
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

    mediaData.forEach(data => {
      const media: MediaAsset = {
        id: randomUUID(),
        ...data,
        updatedAt: new Date()
      };
      this.mediaAssets.set(media.id, media);
    });

    const settingsData: Array<Omit<SiteSetting, 'id' | 'updatedAt'>> = [
      { key: "site_name", value: "Healweal", category: "general" },
      { key: "site_tagline", value: "Your Health, Our Passion", category: "general" },
      { key: "contact_email", value: "contact@healweal.com", category: "contact" },
      { key: "contact_phone", value: "+1 (555) 123-4567", category: "contact" },
      { key: "address", value: "123 Health Street, Wellness City, WC 12345", category: "contact" },
      { key: "facebook_url", value: "https://facebook.com/healweal", category: "social" },
      { key: "twitter_url", value: "https://twitter.com/healweal", category: "social" },
      { key: "linkedin_url", value: "https://linkedin.com/company/healweal", category: "social" },
      { key: "instagram_url", value: "https://instagram.com/healweal", category: "social" },
    ];

    settingsData.forEach(data => {
      const setting: SiteSetting = {
        id: randomUUID(),
        ...data,
        updatedAt: new Date()
      };
      this.siteSettings.set(setting.id, setting);
    });

    const seoData: Array<Omit<SeoMetadata, 'id' | 'updatedAt'>> = [
      { 
        page: "home", 
        title: "Healweal - Your Health, Our Passion", 
        description: "Discover premium healthcare products and services designed to improve your wellbeing. Quality care you can trust.",
        keywords: "healthcare, wellness, medical products, health services",
        ogImage: "/figmaAssets/hero-banner.jpg"
      },
      { 
        page: "about", 
        title: "About Us - Healweal", 
        description: "Learn about our mission to provide quality healthcare solutions and our commitment to excellence.",
        keywords: "about healweal, healthcare company, medical excellence",
        ogImage: "/figmaAssets/about-us.jpg"
      },
      { 
        page: "brands", 
        title: "Our Brands - Healweal", 
        description: "Explore our portfolio of trusted healthcare brands and products.",
        keywords: "healthcare brands, medical products, trusted brands",
        ogImage: null
      },
      { 
        page: "careers", 
        title: "Careers - Join Our Team at Healweal", 
        description: "Build your career with us. Explore exciting opportunities in healthcare and wellness.",
        keywords: "healthcare careers, jobs, employment opportunities",
        ogImage: null
      },
      { 
        page: "media", 
        title: "Media Gallery - Healweal", 
        description: "Browse our latest photos, videos, and media coverage.",
        keywords: "media gallery, photos, videos",
        ogImage: null
      },
      { 
        page: "contact", 
        title: "Contact Us - Healweal", 
        description: "Get in touch with our team. We're here to help with your healthcare needs.",
        keywords: "contact healweal, get in touch, customer support",
        ogImage: null
      },
    ];

    seoData.forEach(data => {
      const seo: SeoMetadata = {
        id: randomUUID(),
        ...data,
        updatedAt: new Date()
      };
      this.seoMetadata.set(seo.id, seo);
    });

    const teamMemberData: Array<Omit<TeamMember, 'id' | 'createdAt'>> = [
      { name: "Harshad Chavandke", role: "Founder & Chief Executive Officer (CEO)", imageUrl: "/attached_assets/WhatsApp Image 2025-11-26 at 6.56.41 PM (1)_1764187230049.jpeg", category: "leadership", displayOrder: 1 },
      { name: "Deepak Patil", role: "Co-Founder & Chief Operating Officer (COO)", imageUrl: "/attached_assets/WhatsApp Image 2025-11-26 at 6.54.20 PM-removebg-preview (1)_1764187070120.jpg", category: "leadership", displayOrder: 2 },
      { name: "Manjunath K", role: "Chief Financial Officer (CFO)", imageUrl: "/attached_assets/1517368095452-removebg-preview (1)_1764187102331.jpg", category: "leadership", displayOrder: 3 },
      { name: "Nikita Chavandke", role: "Chief Investment Officer (CIO)", imageUrl: "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (2)-removebg-preview (1)_1764187056040.jpg", category: "leadership", displayOrder: 4 },
      { name: "Shlok Ranjan", role: "Chief Technology Officer (CTO)", imageUrl: "/attached_assets/WhatsApp Image 2025-11-26 at 6.57.59 PM-removebg-preview (1)_1764186990093.jpg", category: "leadership", displayOrder: 5 },
      { name: "Komal Chavandke", role: "Chief People Officer (CPO)", imageUrl: "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (1)-removebg-preview (1)_1764187086444.jpg", category: "leadership", displayOrder: 6 },
      { name: "Rohan Samsuddin", role: "Chief Content Officer (CCO)", imageUrl: "/attached_assets/1752909900110-removebg-preview (1)_1764187128689.jpg", category: "leadership", displayOrder: 7 },
      { name: "Vivek Sharma", role: "Head of Operations", imageUrl: "/attached_assets/Mr.-Vivek-Sharma-On1y-png (1)_1764187218752.webp", category: "management", displayOrder: 1 },
      { name: "Shlok Ranjan", role: "Technical Lead", imageUrl: "/attached_assets/1755068044771 (1)_1764187200997.jpg", category: "management", displayOrder: 2 },
      { name: "Rohan Mhetre", role: "Product Manager", imageUrl: "/attached_assets/1741298883781-removebg-preview (1)_1764187185205.jpg", category: "management", displayOrder: 3 },
      { name: "Sodan Chouhan", role: "Business Development", imageUrl: "/attached_assets/WhatsApp-Image-2025-09-20-at-9.25.31-PM-1-225x300-removebg-preview (1)_1764187162584.jpg", category: "management", displayOrder: 4 },
      { name: "Rohan Samsuddin", role: "Content Strategy", imageUrl: "/attached_assets/1752909900110-removebg-preview (1)_1764187128689.jpg", category: "management", displayOrder: 5 },
      { name: "Vivek Kumar", role: "Marketing Lead", imageUrl: "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.43 PM-removebg-preview (1)_1764187012140.jpg", category: "management", displayOrder: 6 },
      { name: "Nandkumar Chavandke", role: "Advisory Board Member", imageUrl: null, category: "advisory", displayOrder: 1 },
      { name: "Harshad Chavandke", role: "Director", imageUrl: "/attached_assets/WhatsApp Image 2025-11-26 at 6.56.41 PM (1)_1764187230049.jpeg", category: "hapdax", displayOrder: 1 },
      { name: "Komal Chavandke", role: "Director", imageUrl: "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (1)-removebg-preview (1)_1764187086444.jpg", category: "hapdax", displayOrder: 2 },
      { name: "Marc Chavan", role: "Head, Docgo", imageUrl: null, category: "hapdax", displayOrder: 3 },
      { name: "Lavkush Bhid", role: "Head, Prosmer", imageUrl: null, category: "hapdax", displayOrder: 4 },
      { name: "Sodan Chouhan", role: "Head, Proteinsary", imageUrl: "/attached_assets/WhatsApp-Image-2025-09-20-at-9.25.31-PM-1-225x300-removebg-preview (1)_1764187162584.jpg", category: "hapdax", displayOrder: 5 },
      { name: "Harshad Chavandke", role: "Director", imageUrl: "/attached_assets/WhatsApp Image 2025-11-26 at 6.56.41 PM (1)_1764187230049.jpeg", category: "kepwe", displayOrder: 1 },
      { name: "Nikita Chavandke", role: "Director", imageUrl: "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.44 PM (2)-removebg-preview (1)_1764187056040.jpg", category: "kepwe", displayOrder: 2 },
      { name: "Rohan Mhetre", role: "Head, Robosor", imageUrl: "/attached_assets/1741298883781-removebg-preview (1)_1764187185205.jpg", category: "kepwe", displayOrder: 3 },
      { name: "Lavkush Bhide", role: "Head, Sachna", imageUrl: null, category: "kepwe", displayOrder: 4 },
      { name: "Vivek Sharma", role: "Head, Floorfox", imageUrl: "/attached_assets/WhatsApp Image 2025-11-22 at 9.02.43 PM-removebg-preview (1)_1764187012140.jpg", category: "kepwe", displayOrder: 5 },
    ];

    teamMemberData.forEach(data => {
      const member: TeamMember = {
        id: randomUUID(),
        ...data,
        createdAt: new Date()
      };
      this.teamMembers.set(member.id, member);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      id,
      isAdmin: insertUser.isAdmin || "false"
    };
    this.users.set(id, user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: string, insertUser: Partial<InsertUser>): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: User = {
      ...existing,
      ...insertUser,
    };
    
    this.users.set(id, updated);
    return updated;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async getContentSections(page?: string, section?: string): Promise<ContentSection[]> {
    let sections = Array.from(this.contentSections.values());
    
    if (page) {
      sections = sections.filter(s => s.page === page);
    }
    
    if (section) {
      sections = sections.filter(s => s.section === section);
    }
    
    return sections;
  }

  async getContentSection(page: string, section: string): Promise<ContentSection | undefined> {
    return Array.from(this.contentSections.values()).find(
      s => s.page === page && s.section === section
    );
  }

  async updateContentSection(id: string, content: Partial<InsertContentSection>): Promise<ContentSection | undefined> {
    const existing = this.contentSections.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: ContentSection = {
      ...existing,
      ...content,
      updatedAt: new Date(),
    };
    
    this.contentSections.set(id, updated);
    return updated;
  }

  async getMediaAssets(category?: string, key?: string): Promise<MediaAsset[]> {
    let assets = Array.from(this.mediaAssets.values());
    
    if (category) {
      assets = assets.filter(a => a.category === category);
    }
    
    if (key) {
      assets = assets.filter(a => a.key === key);
    }
    
    return assets;
  }

  async getMediaAsset(key: string): Promise<MediaAsset | undefined> {
    return Array.from(this.mediaAssets.values()).find(
      a => a.key === key
    );
  }

  async updateMediaAsset(id: string, media: Partial<InsertMediaAsset>): Promise<MediaAsset | undefined> {
    const existing = this.mediaAssets.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: MediaAsset = {
      ...existing,
      ...media,
      updatedAt: new Date(),
    };
    
    this.mediaAssets.set(id, updated);
    return updated;
  }

  async createContentSection(insertContent: InsertContentSection): Promise<ContentSection> {
    const id = randomUUID();
    const content: ContentSection = {
      ...insertContent,
      id,
      contentType: insertContent.contentType || "text",
      updatedAt: new Date(),
    };
    this.contentSections.set(id, content);
    return content;
  }

  async createMediaAsset(insertMedia: InsertMediaAsset): Promise<MediaAsset> {
    const id = randomUUID();
    const media: MediaAsset = {
      ...insertMedia,
      id,
      altText: insertMedia.altText ?? null,
      updatedAt: new Date(),
    };
    this.mediaAssets.set(id, media);
    return media;
  }

  async deleteContentSection(id: string): Promise<boolean> {
    return this.contentSections.delete(id);
  }

  async deleteMediaAsset(id: string): Promise<boolean> {
    return this.mediaAssets.delete(id);
  }

  async getSiteSettings(category?: string): Promise<SiteSetting[]> {
    let settings = Array.from(this.siteSettings.values());
    
    if (category) {
      settings = settings.filter(s => s.category === category);
    }
    
    return settings;
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    return Array.from(this.siteSettings.values()).find(s => s.key === key);
  }

  async createSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const id = randomUUID();
    const setting: SiteSetting = {
      ...insertSetting,
      id,
      category: insertSetting.category || "general",
      updatedAt: new Date(),
    };
    this.siteSettings.set(id, setting);
    return setting;
  }

  async updateSiteSetting(id: string, insertSetting: Partial<InsertSiteSetting>): Promise<SiteSetting | undefined> {
    const existing = this.siteSettings.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: SiteSetting = {
      ...existing,
      ...insertSetting,
      updatedAt: new Date(),
    };
    
    this.siteSettings.set(id, updated);
    return updated;
  }

  async deleteSiteSetting(id: string): Promise<boolean> {
    return this.siteSettings.delete(id);
  }

  async getSeoMetadata(page?: string): Promise<SeoMetadata[]> {
    let metadata = Array.from(this.seoMetadata.values());
    
    if (page) {
      metadata = metadata.filter(m => m.page === page);
    }
    
    return metadata;
  }

  async getSeoMetadataByPage(page: string): Promise<SeoMetadata | undefined> {
    return Array.from(this.seoMetadata.values()).find(m => m.page === page);
  }

  async createSeoMetadata(insertSeo: InsertSeoMetadata): Promise<SeoMetadata> {
    const id = randomUUID();
    const seo: SeoMetadata = {
      ...insertSeo,
      id,
      keywords: insertSeo.keywords ?? null,
      ogImage: insertSeo.ogImage ?? null,
      updatedAt: new Date(),
    };
    this.seoMetadata.set(id, seo);
    return seo;
  }

  async updateSeoMetadata(id: string, insertSeo: Partial<InsertSeoMetadata>): Promise<SeoMetadata | undefined> {
    const existing = this.seoMetadata.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: SeoMetadata = {
      ...existing,
      ...insertSeo,
      updatedAt: new Date(),
    };
    
    this.seoMetadata.set(id, updated);
    return updated;
  }

  async deleteSeoMetadata(id: string): Promise<boolean> {
    return this.seoMetadata.delete(id);
  }

  async getContactSubmissions(status?: string): Promise<ContactSubmission[]> {
    let submissions = Array.from(this.contactSubmissions.values());
    
    if (status) {
      submissions = submissions.filter(s => s.status === status);
    }
    
    return submissions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      status: insertSubmission.status || "new",
      subject: insertSubmission.subject ?? null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async updateContactSubmission(id: string, insertSubmission: Partial<InsertContactSubmission>): Promise<ContactSubmission | undefined> {
    const existing = this.contactSubmissions.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: ContactSubmission = {
      ...existing,
      ...insertSubmission,
    };
    
    this.contactSubmissions.set(id, updated);
    return updated;
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    return this.contactSubmissions.delete(id);
  }

  async getActivityLogs(limit?: number): Promise<ActivityLog[]> {
    const logs = [...this.activityLogs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return limit ? logs.slice(0, limit) : logs;
  }

  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const id = randomUUID();
    const log: ActivityLog = {
      ...insertLog,
      id,
      details: insertLog.details ?? null,
      createdAt: new Date(),
    };
    this.activityLogs.push(log);
    return log;
  }

  async getResumeApplications(status?: string): Promise<ResumeApplication[]> {
    let applications = Array.from(this.resumeApplications.values());
    
    if (status) {
      applications = applications.filter(a => a.status === status);
    }
    
    return applications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getResumeApplication(id: string): Promise<ResumeApplication | undefined> {
    return this.resumeApplications.get(id);
  }

  async createResumeApplication(insertApplication: InsertResumeApplication): Promise<ResumeApplication> {
    const id = randomUUID();
    const application: ResumeApplication = {
      ...insertApplication,
      id,
      status: insertApplication.status || "new",
      phone: insertApplication.phone ?? null,
      message: insertApplication.message ?? null,
      createdAt: new Date(),
    };
    this.resumeApplications.set(id, application);
    return application;
  }

  async updateResumeApplication(id: string, insertApplication: Partial<InsertResumeApplication>): Promise<ResumeApplication | undefined> {
    const existing = this.resumeApplications.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: ResumeApplication = {
      ...existing,
      ...insertApplication,
    };
    
    this.resumeApplications.set(id, updated);
    return updated;
  }

  async deleteResumeApplication(id: string): Promise<boolean> {
    return this.resumeApplications.delete(id);
  }

  async getTeamMembers(category?: string): Promise<TeamMember[]> {
    let members = Array.from(this.teamMembers.values());
    
    if (category) {
      members = members.filter(m => m.category === category);
    }
    
    return members.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = {
      ...insertMember,
      id,
      imageUrl: insertMember.imageUrl ?? null,
      displayOrder: insertMember.displayOrder ?? 0,
      createdAt: new Date(),
    };
    this.teamMembers.set(id, member);
    return member;
  }

  async updateTeamMember(id: string, insertMember: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existing = this.teamMembers.get(id);
    if (!existing) {
      return undefined;
    }
    
    const updated: TeamMember = {
      ...existing,
      ...insertMember,
    };
    
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.teamMembers.delete(id);
  }
}

import { db } from "./db";
import { users, contentSections, mediaAssets, siteSettings, seoMetadata, contactSubmissions, activityLogs, resumeApplications, teamMembers } from "@shared/schema";
import { eq, and, desc, asc } from "drizzle-orm";

class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getContentSections(page?: string, section?: string): Promise<ContentSection[]> {
    let query = db.select().from(contentSections);
    
    if (page && section) {
      query = query.where(and(
        eq(contentSections.page, page),
        eq(contentSections.section, section)
      )) as any;
    } else if (page) {
      query = query.where(eq(contentSections.page, page)) as any;
    } else if (section) {
      query = query.where(eq(contentSections.section, section)) as any;
    }
    
    return await query;
  }

  async getContentSection(page: string, section: string): Promise<ContentSection | undefined> {
    const result = await db.select().from(contentSections).where(
      and(
        eq(contentSections.page, page),
        eq(contentSections.section, section)
      )
    );
    return result[0];
  }

  async createContentSection(insertContent: InsertContentSection): Promise<ContentSection> {
    const result = await db.insert(contentSections).values(insertContent).returning();
    return result[0];
  }

  async updateContentSection(id: string, content: Partial<InsertContentSection>): Promise<ContentSection | undefined> {
    const result = await db.update(contentSections)
      .set({ ...content, updatedAt: new Date() })
      .where(eq(contentSections.id, id))
      .returning();
    return result[0];
  }

  async getMediaAssets(category?: string, key?: string): Promise<MediaAsset[]> {
    let query = db.select().from(mediaAssets);
    
    if (category && key) {
      query = query.where(and(
        eq(mediaAssets.category, category),
        eq(mediaAssets.key, key)
      )) as any;
    } else if (category) {
      query = query.where(eq(mediaAssets.category, category)) as any;
    } else if (key) {
      query = query.where(eq(mediaAssets.key, key)) as any;
    }
    
    return await query;
  }

  async getMediaAsset(key: string): Promise<MediaAsset | undefined> {
    const result = await db.select().from(mediaAssets).where(eq(mediaAssets.key, key));
    return result[0];
  }

  async createMediaAsset(insertMedia: InsertMediaAsset): Promise<MediaAsset> {
    const result = await db.insert(mediaAssets).values(insertMedia).returning();
    return result[0];
  }

  async updateMediaAsset(id: string, media: Partial<InsertMediaAsset>): Promise<MediaAsset | undefined> {
    const result = await db.update(mediaAssets)
      .set({ ...media, updatedAt: new Date() })
      .where(eq(mediaAssets.id, id))
      .returning();
    return result[0];
  }

  async deleteContentSection(id: string): Promise<boolean> {
    const result = await db.delete(contentSections).where(eq(contentSections.id, id)).returning();
    return result.length > 0;
  }

  async deleteMediaAsset(id: string): Promise<boolean> {
    const result = await db.delete(mediaAssets).where(eq(mediaAssets.id, id)).returning();
    return result.length > 0;
  }

  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: string, insertUser: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users)
      .set(insertUser)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  async getSiteSettings(category?: string): Promise<SiteSetting[]> {
    let query = db.select().from(siteSettings);
    
    if (category) {
      query = query.where(eq(siteSettings.category, category)) as any;
    }
    
    return await query;
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return result[0];
  }

  async createSiteSetting(insertSetting: InsertSiteSetting): Promise<SiteSetting> {
    const result = await db.insert(siteSettings).values(insertSetting).returning();
    return result[0];
  }

  async updateSiteSetting(id: string, insertSetting: Partial<InsertSiteSetting>): Promise<SiteSetting | undefined> {
    const result = await db.update(siteSettings)
      .set({ ...insertSetting, updatedAt: new Date() })
      .where(eq(siteSettings.id, id))
      .returning();
    return result[0];
  }

  async deleteSiteSetting(id: string): Promise<boolean> {
    const result = await db.delete(siteSettings).where(eq(siteSettings.id, id)).returning();
    return result.length > 0;
  }

  async getSeoMetadata(page?: string): Promise<SeoMetadata[]> {
    let query = db.select().from(seoMetadata);
    
    if (page) {
      query = query.where(eq(seoMetadata.page, page)) as any;
    }
    
    return await query;
  }

  async getSeoMetadataByPage(page: string): Promise<SeoMetadata | undefined> {
    const result = await db.select().from(seoMetadata).where(eq(seoMetadata.page, page));
    return result[0];
  }

  async createSeoMetadata(insertSeo: InsertSeoMetadata): Promise<SeoMetadata> {
    const result = await db.insert(seoMetadata).values(insertSeo).returning();
    return result[0];
  }

  async updateSeoMetadata(id: string, insertSeo: Partial<InsertSeoMetadata>): Promise<SeoMetadata | undefined> {
    const result = await db.update(seoMetadata)
      .set({ ...insertSeo, updatedAt: new Date() })
      .where(eq(seoMetadata.id, id))
      .returning();
    return result[0];
  }

  async deleteSeoMetadata(id: string): Promise<boolean> {
    const result = await db.delete(seoMetadata).where(eq(seoMetadata.id, id)).returning();
    return result.length > 0;
  }

  async getContactSubmissions(status?: string): Promise<ContactSubmission[]> {
    let query = db.select().from(contactSubmissions);
    
    if (status) {
      query = query.where(eq(contactSubmissions.status, status)) as any;
    }
    
    query = query.orderBy(desc(contactSubmissions.createdAt)) as any;
    
    return await query;
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result[0];
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async updateContactSubmission(id: string, insertSubmission: Partial<InsertContactSubmission>): Promise<ContactSubmission | undefined> {
    const result = await db.update(contactSubmissions)
      .set(insertSubmission)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return result[0];
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return result.length > 0;
  }

  async getActivityLogs(limit?: number): Promise<ActivityLog[]> {
    let query = db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt));
    
    if (limit) {
      query = query.limit(limit) as any;
    }
    
    return await query;
  }

  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const result = await db.insert(activityLogs).values(insertLog).returning();
    return result[0];
  }

  async getResumeApplications(status?: string): Promise<ResumeApplication[]> {
    let query = db.select().from(resumeApplications);
    
    if (status) {
      query = query.where(eq(resumeApplications.status, status)) as any;
    }
    
    query = query.orderBy(desc(resumeApplications.createdAt)) as any;
    
    return await query;
  }

  async getResumeApplication(id: string): Promise<ResumeApplication | undefined> {
    const result = await db.select().from(resumeApplications).where(eq(resumeApplications.id, id));
    return result[0];
  }

  async createResumeApplication(insertApplication: InsertResumeApplication): Promise<ResumeApplication> {
    const result = await db.insert(resumeApplications).values(insertApplication).returning();
    return result[0];
  }

  async updateResumeApplication(id: string, insertApplication: Partial<InsertResumeApplication>): Promise<ResumeApplication | undefined> {
    const result = await db.update(resumeApplications)
      .set(insertApplication)
      .where(eq(resumeApplications.id, id))
      .returning();
    return result[0];
  }

  async deleteResumeApplication(id: string): Promise<boolean> {
    const result = await db.delete(resumeApplications).where(eq(resumeApplications.id, id)).returning();
    return result.length > 0;
  }

  async getTeamMembers(category?: string): Promise<TeamMember[]> {
    let query = db.select().from(teamMembers);
    
    if (category) {
      query = query.where(eq(teamMembers.category, category)) as any;
    }
    
    query = query.orderBy(asc(teamMembers.displayOrder)) as any;
    
    return await query;
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return result[0];
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const result = await db.insert(teamMembers).values(insertMember).returning();
    return result[0];
  }

  async updateTeamMember(id: string, insertMember: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const result = await db.update(teamMembers)
      .set(insertMember)
      .where(eq(teamMembers.id, id))
      .returning();
    return result[0];
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    const result = await db.delete(teamMembers).where(eq(teamMembers.id, id)).returning();
    return result.length > 0;
  }
}

export const storage: IStorage = process.env.DATABASE_URL 
  ? new DatabaseStorage()
  : new MemStorage();
