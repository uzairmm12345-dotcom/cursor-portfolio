"use client";

import { FiCode, FiCpu, FiDatabase, FiZap } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import MotionSection from "@/components/MotionSection";
import { scrollToSection } from "@/lib/nav-links";

const ServicesSection = () => {
  const services = [
    {
      icon: FiCode,
      title: "Full-Stack Web Development",
      description:
        "Complete applications from UI to deployment. Python and FastAPI backends integrated with Next.js frontends. Full ownership of architecture, code review, and delivery cycle.",
      technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "MySQL"],
    },
    {
      icon: FiCpu,
      title: "AI & LLM Integration",
      description:
        "AI-powered features with OpenAI — document processing, assistants, and API integrations. Comfortable with agent-style workflows and RAG where the product needs them.",
      technologies: ["OpenAI API", "GPT-4o", "RAG", "Prompt Engineering"],
    },
    {
      icon: FiDatabase,
      title: "Business Systems & Integrations",
      description:
        "Backend services, data workflows, and reporting for business systems — including production ERP/Frappe experience. Database optimization, dashboards, and cross-functional delivery.",
      technologies: ["Python", "MySQL", "API Design", "Highcharts"],
    },
    {
      icon: FiZap,
      title: "Deployment & DevOps",
      description:
        "Production-ready deployments on Render and Netlify. Git workflows, GitHub Actions CI/CD, code review, and Agile coordination with Trello and Jira.",
      technologies: ["Render", "Netlify", "GitHub Actions", "Git"],
    },
  ];

  return (
    <section id="services" className="page-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="Focus"
            title="What I Work On"
            description="Backend systems, APIs, AI features, and full-stack delivery when the product needs a UI."
            className="mb-6 xl:mb-8"
          />
        </MotionSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <MotionSection key={index} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 md:p-5 hover:border-accent/25 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                    <Icon className="text-xl text-accent" />
                  </div>
                  <h3 className="h3 mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm mb-3 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="tag-pill text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </MotionSection>
            );
          })}
        </div>

        <div className="text-center mt-6 md:mt-8">
          <p className="text-white/40 text-sm md:text-base">
            Interested in working together?{" "}
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="text-accent font-medium hover:underline inline"
            >
              Let&apos;s talk →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
