import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Send, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Phone 
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { LEGAL_CONFIG } from "@/lib/legalConfig";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const interestOptions = [
  "Partnership",
  "Investment/Business Opportunity",
  "Career",
  "Media",
  "Portfolio Company",
  "General Enquiry",
];

export const ContactPage = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      interest: "Partnership",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Map data so API accepts it cleanly
      const payload = {
        name: data.name,
        email: data.email,
        subject: `[${data.interest}] ${data.company ? `From ${data.company}` : "Enquiry"}`,
        message: `${data.phone ? `Phone: ${data.phone}\n` : ""}${data.company ? `Company: ${data.company}\n` : ""}Interest: ${data.interest}\n\n${data.message}`,
      };
      return await apiRequest("POST", "/api/contact", payload);
    },
    onSuccess: () => {
      toast({
        title: "Enquiry Received",
        description: "Thank you for reaching out. Our team will review your message and respond promptly.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Error",
        description: error.message || "Failed to send your enquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitMutation.mutate(data);
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
                Direct Contact & Inquiries
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#0B1220] leading-[1.05] mb-6"
              data-testid="heading-contact-hero"
            >
              Let&apos;s Build Better Together.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#667085] leading-relaxed font-normal"
            >
              Whether you are an enterprise partner, institutional collaborator, prospective founder, or media representative, we look forward to hearing from you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form & Offices Section */}
      <section className="w-full py-24 lg:py-32 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Office Locations & Channels */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-3 block">
                  Locations
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1220] mb-4">
                  Our Operating Offices
                </h2>
                <p className="text-sm text-[#667085] leading-relaxed">
                  Headquartered in Pune, India, directing operations across healthcare, finance, commerce, and AI.
                </p>
              </div>

              {/* Corporate Office */}
              <div className="p-7 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1220]">Corporate Office</h3>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#667085] mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#214ECF] flex-shrink-0 mt-0.5" />
                  <span>
                    Office No. 703, Seventh Floor, Samrat Center,
                    <br />
                    Magarpatta, Hadapsar, Pune – 411013
                  </span>
                </div>
              </div>

              {/* Registered Office */}
              <div className="p-7 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF]">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1220]">Registered Office</h3>
                  </div>
                  {LEGAL_CONFIG.registeredOffice.isPendingConfirmation && (
                    <span className="text-[10px] font-semibold text-[#667085] bg-black/[0.04] px-2 py-0.5 rounded-md border border-black/[0.06]">
                      Subject to Confirmation
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#667085] mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#214ECF] flex-shrink-0 mt-0.5" />
                  <span>
                    151/21/2, Magarpatta City Road,
                    <br />
                    Hadapsar, Pune, Maharashtra – 411013
                  </span>
                </div>
              </div>

              {/* Email Contact */}
              <div className="p-7 rounded-2xl bg-[#F5F7FA] border border-black/[0.06] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] shadow-xs flex items-center justify-center text-[#214ECF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1220]">Corporate Inquiries</h3>
                </div>
                <p className="text-xs text-[#667085]">For investor relations, institutional partnerships, and executive desk:</p>
                <a
                  href={`mailto:${LEGAL_CONFIG.legalEmail.value}`}
                  className="text-sm font-bold text-[#214ECF] hover:underline"
                >
                  {LEGAL_CONFIG.legalEmail.value}
                </a>
                <div className="pt-2 border-t border-black/[0.06] flex flex-col gap-0.5">
                  <span className="text-xs text-[#667085]">Privacy & Data Protection Officer:</span>
                  <a
                    href={`mailto:${LEGAL_CONFIG.privacyEmail.value}`}
                    className="text-xs font-semibold text-[#0B1220] hover:text-[#214ECF] hover:underline"
                  >
                    {LEGAL_CONFIG.privacyEmail.value}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Executive Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#F5F7FA] border border-black/[0.08] shadow-sm">
                <div className="mb-8">
                  <span className="text-xs font-bold text-[#214ECF] tracking-widest uppercase mb-2 block">
                    Direct Inquiry
                  </span>
                  <h3 className="text-2xl font-bold text-[#0B1220] tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-[#667085] mt-1">
                    Fill out the form below and our executive team will review your inquiry.
                  </p>
                </div>

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
                              <Input placeholder="Your full name" className="bg-white border-black/[0.12]" {...field} />
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
                              <Input type="email" placeholder="you@company.com" className="bg-white border-black/[0.12]" {...field} />
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
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-xs text-[#0B1220]">Company / Entity</FormLabel>
                            <FormControl>
                              <Input placeholder="Your organization" className="bg-white border-black/[0.12]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Interest Dropdown */}
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-[#0B1220]">I&apos;m interested in *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white border-black/[0.12]">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-black/[0.10]">
                              {interestOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-[#0B1220]">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your proposal, requirements, or inquiry..."
                              rows={4}
                              className="bg-white border-black/[0.12] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full py-6 text-sm font-semibold rounded-full bg-[#214ECF] hover:bg-[#1A3EB0] text-white shadow-sm mt-2"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Enquiry
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
