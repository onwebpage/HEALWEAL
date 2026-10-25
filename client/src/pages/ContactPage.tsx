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
  "Platform Entity",
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
    <div className="bg-white w-full flex flex-col min-h-screen text-black overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative w-full pt-36 pb-20 lg:pt-44 lg:pb-28 bg-white border-b border-black/[0.08] overflow-hidden">
        <div className="absolute inset-0 hw-bg-grid opacity-50 pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F4F5] border border-black/[0.08] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-black" />
              <span className="text-xs font-bold text-black tracking-wider uppercase">
                Direct Contact & Inquiries
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-black leading-[1.08] mb-6"
              data-testid="heading-contact-hero"
            >
              Let&apos;s Build Better Together.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#52525B] leading-relaxed font-normal"
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
                <span className="text-xs font-bold text-black tracking-widest uppercase mb-3 block">
                  Locations
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-4">
                  Our Operating Offices
                </h2>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  Headquartered in Pune, India, directing operations across healthcare, finance, travel, and AI.
                </p>
              </div>

              {/* Corporate Office */}
              <div className="p-7 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black text-white shadow-xs flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-black">Corporate Office</h3>
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#52525B] mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                  <span>
                    Office No. 703, Seventh Floor, Samrat Center,
                    <br />
                    Magarpatta, Hadapsar, Pune – 411013
                  </span>
                </div>
              </div>

              {/* Registered Office */}
              <div className="p-7 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-black text-white shadow-xs flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-black">Registered Office</h3>
                  </div>
                  {LEGAL_CONFIG.registeredOffice.isPendingConfirmation && (
                    <span className="text-[10px] font-semibold text-[#52525B] bg-black/[0.04] px-2 py-0.5 rounded-md border border-black/[0.06]">
                      Subject to Confirmation
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2.5 text-sm text-[#52525B] mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                  <span>
                    151/21/2, Magarpatta City Road,
                    <br />
                    Hadapsar, Pune, Maharashtra – 411013
                  </span>
                </div>
              </div>

              {/* Email Contact */}
              <div className="p-7 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black text-white shadow-xs flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-black">Corporate Inquiries</h3>
                </div>
                <p className="text-xs text-[#52525B]">For investor relations, institutional partnerships, and executive desk:</p>
                <a
                  href={`mailto:${LEGAL_CONFIG.legalEmail.value}`}
                  className="text-sm font-bold text-black hover:underline"
                >
                  {LEGAL_CONFIG.legalEmail.value}
                </a>
                <div className="pt-2 border-t border-black/[0.08] flex flex-col gap-0.5">
                  <span className="text-xs text-[#52525B]">Privacy & Data Protection Officer:</span>
                  <a
                    href={`mailto:${LEGAL_CONFIG.privacyEmail.value}`}
                    className="text-xs font-semibold text-black hover:underline"
                  >
                    {LEGAL_CONFIG.privacyEmail.value}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Executive Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-black/[0.08] shadow-sm">
                <div className="mb-8">
                  <span className="text-xs font-bold text-black tracking-widest uppercase mb-2 block">
                    Direct Inquiry
                  </span>
                  <h3 className="text-2xl font-bold text-black tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1">
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
                            <FormLabel className="font-semibold text-xs text-black">Full Name *</FormLabel>
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
                            <FormLabel className="font-semibold text-xs text-black">Email Address *</FormLabel>
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
                            <FormLabel className="font-semibold text-xs text-black">Phone Number</FormLabel>
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
                            <FormLabel className="font-semibold text-xs text-black">Company / Entity</FormLabel>
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
                          <FormLabel className="font-semibold text-xs text-black">I&apos;m interested in *</FormLabel>
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
                          <FormLabel className="font-semibold text-xs text-black">Message *</FormLabel>
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
                      className="w-full py-6 text-sm font-semibold rounded-full bg-black hover:bg-neutral-800 text-white shadow-sm mt-2 cursor-pointer"
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
