# Healweal Corp - Corporate Website

## Overview

Healweal Corp is a technology conglomerate focused on health, wealth, and digital experiences. This is a corporate website showcasing the parent company and its portfolio of brands: Hapdax (health platform), Kepwe (wealth platform), and HAt (podcast platform). The application is built as a modern single-page application with multiple routes for different sections including Home, About, Brands, Careers, Media, and Contact pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React-based single-page application using Vite as the build tool
- Client-side routing implemented with Wouter (lightweight React router)
- TypeScript for type safety across the application

**UI Component Strategy**
- Component library based on shadcn/ui (Radix UI primitives with Tailwind CSS)
- Design system follows the "new-york" style variant
- Responsive design with mobile-first approach using Tailwind breakpoints
- Custom CSS variables for brand colors and theming defined in index.css

**State Management**
- React Query (@tanstack/react-query) for server state management and API data fetching
- React Hook Form with Zod validation for form handling (used in ContactPage)
- Local component state with React hooks for UI interactions

**Page Structure**
The application follows a multi-page structure with shared components:
- Shared Navigation and Footer components used across all pages
- Individual page components: HomePage, AboutPage, BrandsPage, CareersPage, MediaPage, ContactPage
- Custom 404 NotFound page component

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- ESM (ECMAScript Modules) format throughout the codebase
- Separate build process using esbuild for server bundling

**Development vs Production**
- Development: Vite dev server integrated as Express middleware for HMR
- Production: Static file serving from dist/public directory
- Environment-aware configuration (NODE_ENV checks)

**Storage Layer**
- Abstract IStorage interface defining CRUD operations
- In-memory implementation (MemStorage) as the current storage provider
- Designed for easy swapping to database-backed storage (currently contains user-related methods but appears unused in active routes)

**API Design**
- RESTful API pattern with /api prefix for all endpoints
- Centralized route registration in registerRoutes function
- Error handling middleware for consistent error responses
- Request/response logging middleware for API debugging

### Data Storage Solutions

**Database Configuration**
- Drizzle ORM configured for PostgreSQL database
- Neon Database serverless driver (@neondatabase/serverless)
- Schema defined in shared/schema.ts for code sharing between client and server
- Migration files stored in ./migrations directory

**Current Schema**
- Users table with id, username, password fields
- UUID primary keys with PostgreSQL gen_random_uuid()
- Zod schema validation integrated via drizzle-zod

**Note on Implementation**
The database infrastructure is configured but not actively used in the current routes. The application currently uses in-memory storage, suggesting the database integration is prepared for future development.

### Authentication and Authorization

**Current State**
- User schema exists with username/password fields
- No active authentication implementation in routes
- Storage interface includes user retrieval methods (getUser, getUserByUsername, createUser)
- Prepared for future session-based or token-based authentication

**Prepared Infrastructure**
- connect-pg-simple package included (PostgreSQL session store for Express)
- Cookie-based session management infrastructure ready to implement

### External Dependencies

**UI Component Libraries**
- Radix UI: Complete set of accessible, unstyled React components
- Tailwind CSS: Utility-first CSS framework
- class-variance-authority & clsx: Component variant styling utilities
- Lucide React: Icon library

**Data Management**
- @tanstack/react-query: Asynchronous state management
- React Hook Form: Form state and validation
- Zod: Schema validation library
- drizzle-zod: Integration between Drizzle ORM and Zod

**Database & ORM**
- Drizzle ORM: Type-safe database toolkit
- @neondatabase/serverless: Serverless PostgreSQL driver for Neon
- PostgreSQL: Target database (configured but not provisioned)

**Development Tools**
- Vite: Build tool and dev server
- @replit/vite-plugin-runtime-error-modal: Runtime error overlay for Replit
- @replit/vite-plugin-cartographer: Development tooling for Replit
- tsx: TypeScript execution for development server

**Fonts & Styling**
- Google Fonts: Inter, Gantari, Poppins, Architects Daughter, DM Sans, Fira Code, Geist Mono
- Custom font families: Gilroy (referenced in components but loaded externally)
- PostCSS with Autoprefixer for CSS processing

**Build & Runtime**
- esbuild: Fast JavaScript/TypeScript bundler for production
- nanoid: Unique ID generation
- date-fns: Date utility library

## Production Deployment (Render/Heroku)

### Environment Variables Required
When deploying to Render or similar platforms, set these environment variables:
- `NODE_ENV=production` - Enables production mode with secure cookies
- `SESSION_SECRET=your-secure-random-string` - A long, random secret for session encryption (32+ characters)
- `DATABASE_URL=postgresql://...` - PostgreSQL connection string (use Internal URL on Render)

### Session Configuration (Updated November 2025)
- **Cookie Settings**: `secure=true`, `sameSite=lax`, `httpOnly=true`
- **Proxy Trust**: Enabled for Render's reverse proxy (`trust proxy` = 1)
- **Session Name**: Custom cookie name `healweal.sid`
- **Session Table**: `user_sessions` (auto-created by migration or connect-pg-simple)
- **Session Pruning**: Automatic cleanup every 15 minutes for expired sessions

### Session Storage
- Development: PostgreSQL session storage if DATABASE_URL is set, otherwise in-memory
- Production: PostgreSQL session storage via connect-pg-simple (required, persists across restarts)
- Sessions are stored in the `user_sessions` table with proper indexing

### Admin Login
- Default credentials: username `admin`, password `admin`
- **CRITICAL**: Change the password immediately after first login in production
- Login page includes enhanced error handling with specific error messages
- Session is invalidated on logout

### File Upload Limitation
**Important:** Render uses an ephemeral filesystem, meaning uploaded files will be lost when:
- The server restarts
- A new deployment is made
- The instance is scaled

For production file storage, consider:
1. Using Render's Persistent Disk (paid feature)
2. Integrating cloud storage (AWS S3, Cloudinary, etc.)
3. Storing file URLs from external CDNs

### Database Setup
1. Create a PostgreSQL database on Render or use an external provider
2. Set the `DATABASE_URL` environment variable (use Internal URL for Render)
3. Run the migration script during build: `npx tsx server/render-migrate.ts`
4. The migration creates all required tables including:
   - `cms_users` - Admin user accounts
   - `content_sections` - CMS content
   - `media_assets` - Media library
   - `site_settings` - Site configuration
   - `seo_metadata` - SEO settings per page
   - `contact_submissions` - Contact form entries
   - `activity_logs` - Admin activity tracking
   - `resume_applications` - Career applications
   - `team_members` - Team member profiles
   - `user_sessions` - Session storage for login persistence

### Deployment Troubleshooting
- If login fails on production, check that SESSION_SECRET and DATABASE_URL are set
- Ensure database region matches web service region on Render
- The session table is created automatically with proper indexes
- All API requests use `credentials: "include"` for cookie authentication