import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Users, 
  Upload, 
  FileText, 
  Send, 
  Loader2, 
  Briefcase, 
  MapPin, 
  Clock 
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const applicationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const whyWorkFeatures = [
  {
    title: "Venture Ownership",
    description: "You work alongside founders and technical leads with real equity and direct project ownership from day one.",
    icon: Target,
  },
  {
    title: "High-Caliber Mentorship",
    description: "Continuous learning from veteran executives, senior architects, and serial entrepreneurs across 5 diverse sectors.",
    icon: TrendingUp,
  },
  {
    title: "Zero-Bureaucracy Execution",
    description: "We favor rapid experimentation, clean codebases, and direct action over layered corporate politics.",
    icon: Lightbulb,
  },
  {
    title: "Purpose-Driven Scale",
    description: "Your code and operational decisions directly improve healthcare access, financial freedom, and education for millions.",
    icon: Users,
  },
];

const openPositions = [
  {
    id: "fs-eng",
    title: "Senior Full-Stack Engineer",
    department: "Engineering (Thinkatic & Hapdax)",
    location: "Pune / Hybrid",
    type: "Full-Time",
    desc: "Architecting high-throughput React/Node.js/PostgreSQL microservices for clinical health systems and market tech.",
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure Lead",
    department: "Cloud Engineering (Kepwe)",
    location: "Pune / Remote",
    type: "Full-Time",
    desc: "Managing AWS/GCP cloud environments, automated CI/CD pipelines, container orchestration, and zero-downtime deployments.",
  },
  {
    id: "pm",
    title: "Product Manager",
    department: "Product (Hapdax / Docgo)",
    location: "Pune",
    type: "Full-Time",
    desc: "Leading OPD clinical management software roadmaps, conducting physician discovery, and optimizing clinic workflows.",
  },
  {
    id: "uiux",
    title: "Lead Product Designer (UI/UX)",
    department: "Design Studio (Thinkatic)",
    location: "Pune / Remote",
    type: "Full-Time",
    desc: "Crafting Apple-level design systems, interaction models, and ergonomic web & mobile consumer interfaces.",
  },
  {
    id: "analyst",
    title: "Quantitative Financial Analyst",
    department: "Financial Intelligence (Kepwe)",
    location: "Pune",
    type: "Full-Time",
    desc: "Researching algorithmic market signals, risk management matrices, and portfolio rebalancing mechanisms.",
  },
  {
    id: "grad-dev",
    title: "Graduate Engineering Associate",
    department: "Venture Lab (Healweal Group)",
    location: "Pune",
    type: "Fellowship / Full-Time",
    desc: "A 12-week intensive rotational program across our 5 companies for ambitious recent engineering graduates.",
  },
];

export const CareersPage = () => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: { name: "", email: "", phone: "", role: "", message: "" },
  });

  const submitApplication = useMutation({
    mutationFn: async (data: ApplicationFormValues) => {
      if (!resumeFile) throw new Error("Please upload your resume");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      if (selectedRole || data.role) formData.append("role", selectedRole || data.role || "");
      if (data.message) formData.append("message", data.message);
      formData.append("resume", resumeFile);
      const response = await fetch("/api/applications", { method: "POST", body: formData });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit application");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Application Submitted!", description: "Thank you for your interest. Our talent team will review your profile." });
      form.reset();
      setResumeFile(null);
      setSelectedRole("");
    },
    onError: (error: Error) => {
      toast({ title: "Submission Failed", description: error.message, variant: "destructive" });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload a resume smaller than 5MB.", variant: "destructive" });
        return;
      }
      setResumeFile(file);
    }
  };

  const onSubmit = (data: ApplicationFormValues) => {
    if (!resumeFile) {
      toast({ title: "Resume Required", description: "Please upload your resume to submit your application.", variant: "destructive" });
      return;
    }
    submitApplication.mutate(data);
  };

  const handleApplyClick = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    const formElement = document.getElementById("apply-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                Talent & Culture
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-careers-hero"
            >
              Your Next Opportunity Could Be Something We Haven&apos;t Built Yet.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              At Healweal, we look for builders, not spectators. Join an elite group of engineers, operators, and strategists building operating companies across essential global sectors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
              Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-4">
              Why Build at Healweal?
            </h2>
            <p className="text-base text-[#667085]">
              We create an environment where ambitious individuals can do the defining work of their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWorkFeatures.map((feat) => {
              const Icon = feat.icon;

              return (
                <div key={feat.title} className="p-8 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex flex-col justify-between min-h-[240px]">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B1220] mb-2">{feat.title}</h3>
                    <p className="text-sm text-[#667085] leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Directory */}
      <section className="w-full py-24 lg:py-32 bg-[#F5F7FA]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
                Open Roles
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220]">
                Explore Opportunities Across Our Companies
              </h2>
            </div>
            <p className="text-sm text-[#667085] max-w-sm">
              Don&apos;t see an exact match? Submit a general application below—we frequently create roles for exceptional builders.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {openPositions.map((pos) => (
              <div
                key={pos.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.06] shadow-xs hover:border-[#214ECF]/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex flex-col gap-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#214ECF] bg-[#F5F7FA] px-2.5 py-1 rounded-full border border-black/[0.06]">
                      {pos.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#667085]">
                      <MapPin className="w-3 h-3" />
                      {pos.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#667085]">
                      <Clock className="w-3 h-3" />
                      {pos.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1220] tracking-tight">{pos.title}</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">{pos.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplyClick(pos.title)}
                  className="hw-btn-primary self-start md:self-center text-xs py-2.5 px-6 whitespace-nowrap cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
                Direct Submission
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1220] mb-3">
                Submit Your Application
              </h2>
              <p className="text-sm text-[#667085]">
                {selectedRole ? `Applying for: ${selectedRole}` : "Tell us about your background, ambitions, and why you want to build with Healweal."}
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[#F5F7FA] border border-black/[0.08] shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-[#0B1220]">Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" className="bg-white border-black/[0.12]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-[#0B1220]">Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" className="bg-white border-black/[0.12]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-[#0B1220]">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 ..." className="bg-white border-black/[0.12]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-[#0B1220]">Target Role / Interest</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={selectedRole || "e.g. Full-Stack Engineer, Product..."} 
                              className="bg-white border-black/[0.12]" 
                              value={selectedRole || field.value} 
                              onChange={(e) => {
                                setSelectedRole(e.target.value);
                                field.onChange(e);
                              }} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-xs text-[#0B1220]">Resume / Portfolio *</span>
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-[#214ECF]/30 bg-white rounded-2xl cursor-pointer hover:border-[#214ECF] hover:bg-[#FAFCFF] transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#214ECF]">
                        {resumeFile ? <FileText className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-xs text-[#0B1220]">
                          {resumeFile ? resumeFile.name : "Click to upload your resume (PDF, DOCX)"}
                        </span>
                        <span className="text-[11px] text-[#667085]">Max file size: 5MB</span>
                      </div>
                    </label>
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-xs text-[#0B1220]">Why Healweal? (Brief note)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Share what you'd like to build with us..." rows={3} className="bg-white border-black/[0.12] resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full py-6 text-sm font-semibold rounded-full bg-[#214ECF] hover:bg-[#1A3EB0] text-white shadow-sm mt-2"
                    disabled={submitApplication.isPending}
                  >
                    {submitApplication.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
