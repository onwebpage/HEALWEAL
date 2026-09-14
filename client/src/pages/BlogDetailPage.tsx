import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { blogPosts } from "./InsightsPage";

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="bg-white w-full flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center flex flex-col items-center gap-5">
            <h1 className="text-3xl font-bold text-[#0B1220]">Article Not Found</h1>
            <p className="text-sm text-[#667085]">The requested publication could not be found or has moved.</p>
            <Link href="/insights">
              <span className="hw-btn-primary cursor-pointer text-xs py-2.5 px-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Insights
              </span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="bg-white w-full flex flex-col min-h-screen text-[#111827] overflow-x-hidden selection:bg-[#214ECF] selection:text-white">
      <Navigation />

      {/* Header / Meta */}
      <section className="relative w-full pt-36 pb-16 lg:pt-44 lg:pb-20 bg-[#F5F7FA] border-b border-black/[0.06]">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <Link href="/insights">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#214ECF] hover:underline mb-8 cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Insights</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-[#214ECF] bg-white px-3 py-1 rounded-full border border-black/[0.06] uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs text-[#667085]">•</span>
            <span className="text-xs text-[#667085] font-medium">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0B1220] leading-[1.1] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#667085] pt-4 border-t border-black/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#214ECF]/10 flex items-center justify-center text-[#214ECF] font-bold text-xs">
                {post.author.charAt(0)}
              </div>
              <span className="font-semibold text-[#0B1220]">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#98A2B3]" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          {/* Hero Media */}
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-black/[0.08] shadow-sm bg-[#F5F7FA]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Body */}
          <article className="prose prose-lg max-w-none text-[#344054] leading-relaxed">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h2 key={index} className="text-2xl sm:text-3xl font-bold text-[#0B1220] mt-10 mb-4 tracking-tight">
                    {paragraph.replace(/\*\*/g, "")}
                  </h2>
                );
              }
              if (paragraph.includes("1.") || paragraph.includes("2.") || paragraph.includes("3.") || paragraph.includes("4.")) {
                const items = paragraph.split("\n").filter((line) => line.trim());
                return (
                  <ul key={index} className="space-y-2.5 my-6 list-none pl-0">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-base text-[#344054]">
                        <span className="w-6 h-6 rounded-full bg-[#F5F7FA] border border-black/[0.08] text-xs font-bold text-[#214ECF] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {itemIdx + 1}
                        </span>
                        <span>{item.replace(/^\d+\.\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter((line) => line.trim());
                return (
                  <ul key={index} className="space-y-2.5 my-6 list-none pl-0">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-base text-[#344054]">
                        <span className="w-2 h-2 rounded-full bg-[#214ECF] flex-shrink-0 mt-2.5" />
                        <span>{item.replace(/^-\s*\*\*/, "").replace(/\*\*:/, ":").replace(/\*\*/g, "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-base sm:text-lg text-[#475467] leading-relaxed mb-6 font-normal">
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* Tags */}
          <div className="pt-10 mt-12 border-t border-black/[0.08] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#667085] mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-[#0B1220] bg-[#F5F7FA] px-3 py-1 rounded-full border border-black/[0.06]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Publications */}
      <section className="w-full py-20 bg-[#F5F7FA] border-t border-black/[0.06]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220] mb-8">Related Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <Link key={related.id} href={`/insights/${related.id}`}>
                <div className="hw-card-editorial p-6 flex flex-col justify-between group cursor-pointer h-full">
                  <div>
                    <span className="text-[11px] font-bold text-[#214ECF] uppercase tracking-wider block mb-2">
                      {related.category}
                    </span>
                    <h3 className="text-xl font-bold text-[#0B1220] group-hover:text-[#214ECF] transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-[#667085] leading-relaxed">{related.description}</p>
                  </div>
                  <div className="pt-4 border-t border-black/[0.06] mt-6 flex items-center justify-between">
                    <span className="text-xs text-[#667085]">{related.author}</span>
                    <span className="text-xs font-bold text-[#214ECF] inline-flex items-center gap-1">
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
