import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  BookOpen, 
  Bell, 
  Radio, 
  ExternalLink, 
  Calendar, 
  User, 
  ArrowUpRight,
  Clock
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const blogPosts = [
  {
    id: "collaboration-innovation",
    image: "/figmaAssets/image.png",
    author: "Harshad Chavandke",
    date: "14 Jan 2025",
    readTime: "4 min read",
    category: "Entrepreneurship",
    title: "How collaboration makes us better innovators",
    description: "When diverse minds come together across clinical, financial, and technical disciplines, they build solutions that no single founder could engineer alone.",
    content: `Collaboration is the cornerstone of innovation at Healweal Corp. When diverse minds come together, they create solutions that no single person could envision alone.

In today's fast-paced business environment, the ability to collaborate effectively has become more crucial than ever. At Healweal, we've discovered that the most groundbreaking ideas emerge when team members from different backgrounds and disciplines work together.

**The Power of Diverse Perspectives**

When a developer, a designer, and a business analyst sit together to solve a problem, the result is often more comprehensive and innovative than what any one of them could achieve independently. Each brings a unique lens through which they view challenges and opportunities.

**Building a Collaborative Culture**

Creating an environment where collaboration thrives requires intentional effort. At Healweal, we've implemented several practices:

1. Cross-functional teams that bring together expertise from different domains
2. Regular brainstorming sessions where all ideas are welcome
3. Open communication channels that break down silos
4. Recognition for team achievements, not just individual accomplishments

**Lessons Learned**

Over the years, we've learned that collaboration isn't just about working together—it's about creating an environment where everyone feels empowered to contribute their best ideas. This approach has led to some of our most successful product innovations.

The future of innovation lies in our ability to work together, learn from each other, and create solutions that make a real difference in people's lives.`,
    tags: ["Innovation", "Leadership", "Venture Building"],
  },
  {
    id: "technology-frameworks-2025",
    image: "/figmaAssets/image-2.png",
    author: "Deepak Patil",
    date: "10 Jan 2025",
    readTime: "5 min read",
    category: "Technology",
    title: "Our top 10 technology frameworks for 2025",
    description: "A disciplined evaluation of our production technology stack powering resilient healthcare architectures and quantitative market engines.",
    content: `As we step into 2025, the technology landscape continues to evolve rapidly. At Healweal Corp, we're constantly evaluating and adopting the best frameworks to build robust, scalable applications.

**Why Framework Choice Matters**

The right framework can dramatically impact development speed, application performance, and long-term maintainability. Here are our top picks for 2025:

**1. React with Vite & Next.js**
For building modern web applications, this combination remains unbeatable. Server-side rendering, excellent developer experience, and a vibrant ecosystem make it our go-to choice.

**2. TypeScript**
Type safety is no longer optional. TypeScript has become essential for large-scale applications, catching errors before they reach production.

**3. Node.js with Express & Go**
For backend services, Node.js continues to offer excellent performance and a unified JavaScript ecosystem, paired with Go for high-throughput concurrency.

**4. PostgreSQL with Drizzle ORM**
Our database stack of choice, offering reliability, performance, and type-safe database operations.

**5. React Native & Flutter**
For mobile development, these allow us to share code between platforms while delivering native, fluid experiences.

**Looking Ahead**

The frameworks we choose today will shape our products tomorrow. We're excited about the possibilities these technologies unlock for creating better health and wealth solutions for millions of users.`,
    tags: ["Technology", "Engineering", "Architecture"],
  },
  {
    id: "health-tech-ecosystem",
    image: "/figmaAssets/image-3.png",
    author: "Komal Langote",
    date: "8 Jan 2025",
    readTime: "4 min read",
    category: "Healthcare",
    title: "Building a better health-tech ecosystem",
    description: "Bridging the critical divide between private OPD clinical practitioners and patient wellness through connected digital software.",
    content: `The healthcare industry is ripe for transformation. At Hapdax, our health-tech subsidiary, we're working to create solutions that make quality healthcare accessible to everyone.

**Understanding the Challenge**

Healthcare in India faces unique challenges—from access issues in rural areas to affordability concerns in urban centers. Technology has the power to bridge these gaps, but only if implemented thoughtfully.

**Our Approach at Hapdax**

We believe in building solutions that are:

- **Accessible**: Available to anyone with a smartphone
- **Affordable**: Priced for the masses, not just the privileged
- **Accurate**: Powered by verified medical information and expert guidance
- **Actionable**: Providing clear next steps for users

**The Ecosystem Vision**

A true health-tech ecosystem connects patients, healthcare providers, pharmacies, and insurance companies in a seamless experience. Each touchpoint should enhance the user's journey toward better health.

**Success Stories**

We've seen remarkable outcomes when technology meets compassionate healthcare. From enabling telemedicine consultations in remote villages to helping users track and manage chronic conditions, the impact is tangible.

**The Road Ahead**

Our vision is to create a world of healthy individuals. This means continuing to innovate, listen to our users, and build solutions that truly make a difference in people's lives.`,
    tags: ["Healthcare", "HealthTech", "Systems"],
  },
];

const companyUpdates = [
  {
    date: "January 2025",
    title: "New Platform Deployments",
    description: "Healweal Corp expands product capabilities across healthcare OPD systems and quantitative trading software.",
    tag: "Product Milestone",
  },
  {
    date: "December 2024",
    title: "Group Technical Expansion",
    description: "Expanded core engineering teams across distributed systems, machine learning, and venture operations.",
    tag: "Organization",
  },
  {
    date: "November 2024",
    title: "Milestone Achievement",
    description: "Crossed significant growth and adoption milestones across our operating companies.",
    tag: "Milestone",
  },
];

const mediaCoverage = [
  {
    name: "Startup Pedia",
    url: "https://www.instagram.com/p/CrarC_NtZHc/",
    platform: "Instagram Feature",
    description: "Featured on Startup Pedia highlighting Healweal's founding journey and technology conglomerate vision.",
  },
  {
    name: "StartupInsider",
    url: "https://www.startupinsider.in/23-year-old-disrupting-health-and-wealth-with-tech/",
    platform: "National Media",
    description: "23-year-old disrupting health and wealth with tech — in-depth feature profile on Healweal leadership.",
  },
  {
    name: "Bharat18",
    url: "https://www.bharat18.in/23-year-old-disrupting-health-and-wealth-with-tech/",
    platform: "Press Publication",
    description: "Coverage on Healweal's mission to transform healthcare accessibility and financial intelligence in India.",
  },
  {
    name: "Swift Lift Media",
    url: "https://swiftnlift.com/pune-udyog-bhushan-purskar-2024-presented-by-swiftnlift-media-group/",
    platform: "Industry Award",
    description: "Pune Udyog Bhushan Purskar 2024 recognition presented by SwiftNLift Media Group.",
  },
];

const categories = ["All", "Company", "Technology", "Entrepreneurship", "Healthcare", "Finance"];

export const InsightsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory || p.tags.includes(selectedCategory));

  return (
    <div className="bg-white w-full flex flex-col min-h-screen text-[#111827] overflow-x-hidden selection:bg-[#214ECF] selection:text-white">
      <Navigation />

      {/* Hero */}
      <section className="relative w-full pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#F5F7FA] border-b border-black/[0.06] overflow-hidden">
        <div className="absolute inset-0 hw-bg-grid opacity-60 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#214ECF]" />
              <span className="text-xs font-semibold text-[#0B1220] tracking-wide uppercase">
                Publications & Analysis
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-insights-hero"
            >
              Perspectives on Building the Future.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              Articles, architectural deep-dives, and announcements from the operators, technologists, and leaders across Healweal.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="w-full py-20 lg:py-28 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0B1220] text-white shadow-sm"
                    : "bg-[#F5F7FA] text-[#667085] hover:text-[#0B1220] border border-black/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/insights/${post.id}`}>
                <div className="hw-card-editorial overflow-hidden flex flex-col justify-between group cursor-pointer h-full">
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-[#F5F7FA] border-b border-black/[0.06]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-7 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#214ECF] uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[#98A2B3]">•</span>
                        <span className="text-[#667085] font-medium">{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0B1220] tracking-tight group-hover:text-[#214ECF] transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-sm text-[#667085] leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-7 pt-0 flex items-center justify-between border-t border-black/[0.06] mt-4">
                    <span className="text-xs text-[#667085] font-medium">{post.author}</span>
                    <span className="text-xs font-bold text-[#214ECF] inline-flex items-center gap-1 group-hover:underline">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Press & Media Features */}
          <div className="pt-16 border-t border-black/[0.08]">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-2 block">
                External Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220] tracking-tight">
                Healweal in the Press
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaCoverage.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] hover:bg-white hover:border-[#214ECF] hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-[#214ECF] bg-white px-2.5 py-1 rounded-full border border-black/[0.06]">
                        {item.platform}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#667085] group-hover:text-[#214ECF] transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg text-[#0B1220] mb-2">{item.name}</h3>
                    <p className="text-xs text-[#667085] leading-relaxed">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
