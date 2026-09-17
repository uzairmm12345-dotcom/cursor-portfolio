"use client";

import { FiExternalLink, FiGithub } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import MotionSection from "@/components/MotionSection";

type Project = {
  title: string;
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
};

const projects: Project[] = [
  {
    title: "Portfolio AI Assistant",
    problem:
      "Visitors and recruiters need quick answers about skills, experience, and contact — without digging through the whole site.",
    built:
      "Streaming chat assistant on this portfolio: Next.js frontend, FastAPI + LangGraph backend, OpenAI answers grounded in a fixed profile prompt.",
    outcome:
      "Live on the site today — ask about stack, roles, or how to reach Uzair. Deployed on Netlify + Render.",
    stack: ["Next.js", "FastAPI", "OpenAI", "LangGraph", "Render"],
    liveUrl: "https://uzairriasat.netlify.app",
  },
  {
    title: "Document Processing Agent",
    problem:
      "Turning PDF/DOCX uploads into structured, validated JSON is tedious and error-prone when done by hand.",
    built:
      "FastAPI service that accepts documents, extracts content with OpenAI, and returns validated JSON for downstream workflows.",
    outcome:
      "Publicly deployed API used for document → structured data extraction on real file formats.",
    stack: ["FastAPI", "OpenAI", "PDF/DOCX", "JSON validation"],
  },
  {
    title: "E-commerce / ERP-style Backend",
    problem:
      "Business systems need reliable APIs, data models, and integrations — not just UI demos.",
    built:
      "Backend services with FastAPI and MySQL for product/order-style workflows, API design, and data handling patterns used in production business systems.",
    outcome:
      "Hands-on practice that maps to production work at MicroMerger (APIs, MySQL, business/ERP systems).",
    stack: ["Python", "FastAPI", "MySQL", "REST APIs"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="page-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="01 — Projects"
            title="Selected Work"
            description="Shipped systems with a clear problem, build, and outcome — backend, APIs, and AI where they earn their place."
          />
        </MotionSection>

        <div className="space-y-5 md:space-y-6">
          {projects.map((project, index) => (
            <MotionSection key={project.title} delay={index * 0.06}>
              <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-7 hover:border-accent/25 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <h3 className="h3 text-white">{project.title}</h3>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
                      >
                        <FiExternalLink /> Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-accent"
                      >
                        <FiGithub /> Code
                      </a>
                    )}
                  </div>
                </div>

                <dl className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-primary text-[10px] uppercase tracking-widest text-accent/70 mb-1">
                      Problem
                    </dt>
                    <dd className="text-white/55">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-primary text-[10px] uppercase tracking-widest text-accent/70 mb-1">
                      What I built
                    </dt>
                    <dd className="text-white/55">{project.built}</dd>
                  </div>
                  <div>
                    <dt className="font-primary text-[10px] uppercase tracking-widest text-accent/70 mb-1">
                      Outcome
                    </dt>
                    <dd className="text-white/70">{project.outcome}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag-pill text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
