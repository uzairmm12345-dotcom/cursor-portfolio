"use client";

import { Button } from "@/components/ui/button";
import Socials from "@/components/Socials";
import SectionHeader from "@/components/SectionHeader";
import MotionSection from "@/components/MotionSection";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useState } from "react";

const ContactSection = () => {
  type StatusType = {
    type: "success" | "error";
    message: string;
  } | null;

  const [status, setStatus] = useState<StatusType>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xeelbwbv", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        form.reset();
      } else {
        const data = await response.json();
        setStatus({ type: "error", message: data.error || "Something went wrong." });
      }
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  const contactItems = [
    {
      icon: FiMail,
      label: "Email",
      value: "uzairriasat510@gmail.com",
      href: "mailto:uzairriasat510@gmail.com",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+92 301 8759589",
      href: "tel:+923018759589",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Islamabad, Pakistan",
      href: null,
    },
  ];

  return (
    <section id="contact" className="page-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="03 — Contact"
            title="Let's Connect"
            description="Have a project in mind or just want to say hello? I'd love to hear from you."
          />
        </MotionSection>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-8 xl:gap-10">
          <MotionSection className="xl:col-span-2" delay={0.05}>
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">
                <h3 className="h3 mb-3">Get in touch</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  I&apos;m currently available for freelance work or full-time opportunities.
                  The quickest way to reach me is via email or phone.
                </p>

                <div className="space-y-5">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-center gap-4 group">
                        <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:shadow-glow-sm transition-shadow flex-shrink-0">
                          <Icon className="text-lg" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-white/40 uppercase tracking-wider">{item.label}</p>
                          <p className="text-white/80 group-hover:text-accent transition-colors break-words">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a key={item.label} href={item.href} className="block">
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Follow me</p>
                  <Socials
                    containerStyles="flex gap-3 flex-wrap"
                    iconStyles="w-10 h-10 glass-card flex justify-center items-center text-white/60 text-sm hover:text-accent hover:border-accent/40 transition-colors duration-300"
                  />
                </div>
            </div>
          </MotionSection>

          <MotionSection className="xl:col-span-3" delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 xl:p-10 space-y-5"
            >
                <h3 className="h3 mb-2">Send a message</h3>
                <p className="text-white/40 text-sm mb-4">Fill out the form and I&apos;ll get back to you soon.</p>

                {status && (
                  <div
                    className={`p-4 rounded-xl text-sm ${
                      status.type === "success"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input type="text" id="name" name="name" placeholder="Your name" required className="input-modern" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input type="email" id="email" name="email" placeholder="your@email.com" required className="input-modern" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input type="text" id="subject" name="subject" placeholder="What's this about?" required className="input-modern" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Your message..."
                    required
                    className="input-modern resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isSending}
                  className="w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "Send Message"}
                  {!isSending && <FiSend />}
                </Button>
            </form>
          </MotionSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
