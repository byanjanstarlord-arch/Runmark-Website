"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Github, MessageSquare, Mail, Send, CheckCircle2, ExternalLink } from "lucide-react";

export function ContactClient() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Feedback",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-warm-grid min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#202124] tracking-tight">
            Get in Touch
          </h1>
          <p className="text-base sm:text-xl text-[#77736C]">
            We&apos;d love to hear from you. Reach out via GitHub, Discussions, or drop us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 shadow-warm-sm">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EAF5EA] text-[#238636] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#202124]">Thank you for reaching out!</h3>
                <p className="text-sm text-[#77736C] max-w-md mx-auto leading-relaxed">
                  We have received your message. For urgent bug reports or technical inquiries, we encourage creating an issue on our GitHub tracker.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Feedback", message: "" });
                    }}
                    variant="secondary"
                    size="md"
                    className="text-sm font-semibold"
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ada@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                  >
                    <option value="Feedback">Product Feedback</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request / Idea</option>
                    <option value="Collaboration">Open Source Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202124] mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your environment challenge or how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#E8E2D9] rounded-xl p-4 text-sm text-[#202124] focus:outline-none focus:border-[#FF5A1F] shadow-sm"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center text-base font-semibold py-3"
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Send Message
                  </Button>
                </div>
                <p className="text-xs text-[#77736C] text-center pt-1">
                  We typically respond within 2–3 business days.
                </p>
              </form>
            )}
          </div>

          {/* Direct Reach Out Channels */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#202124]">
              Other Ways to Reach Us
            </h3>

            <a
              href={siteConfig.issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-start gap-4 hover:border-[#D8D2C7] transition-all group block"
            >
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#202124] group-hover:text-[#FF5A1F] transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                  <span>GitHub Issues</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
                <p className="text-xs sm:text-sm text-[#77736C] mt-1">
                  Report bugs, regressions, or request CLI capabilities.
                </p>
              </div>
            </a>

            <a
              href={siteConfig.discussionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-warm-sm flex items-start gap-4 hover:border-[#D8D2C7] transition-all group block"
            >
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2D9] text-[#FF5A1F] transition-colors">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
                  <span>GitHub Discussions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </div>
                <p className="text-xs sm:text-sm text-[#77736C] mt-1">
                  Ask questions, share ideas, and discuss with the community.
                </p>
              </div>
            </a>

            <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D9] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#202124]">
                <Mail className="w-4 h-4 text-[#77736C]" />
                <span>Direct Inquiries</span>
              </div>
              <p className="text-xs sm:text-sm text-[#77736C] leading-relaxed">
                Reach out to maintainers via GitHub or check our documentation guides.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
