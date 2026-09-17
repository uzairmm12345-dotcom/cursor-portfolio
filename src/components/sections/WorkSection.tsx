"use client";

import { FiCalendar, FiMapPin } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import MotionSection from "@/components/MotionSection";

const WorkSection = () => {
  const experiences = [
    {
      role: "Software Engineer",
      company: "MicroMerger (Pvt.) Ltd.",
      location: "Islamabad, Pakistan",
      period: "Jul 2025 — Present",
      points: [
        "Backend and full-stack work on Frappe-based Python systems for enterprise clients — internal workflows, data integration, and reporting.",
        "Built and maintained Frappe-based API services, including data flows to move records between projects and import Excel entries programmatically.",
        "Improved API response times by ~30% through MySQL schema restructuring and query optimization.",
        "Built interactive dashboards (Highcharts) visualizing operational data for UNICEF-supported public sector initiatives.",
        "Coordinated sprints and delivery tracking with developers, analysts, and project managers using Trello and Ajera in an Agile environment.",
      ],
    },
    {
      role: "Web Development Intern",
      company: "IBDA",
      location: "Islamabad, Pakistan · Remote",
      period: "Aug 2024 — Dec 2024",
      points: [
        "Front-end web development internship using JavaScript, React, and Next.js. Built responsive UI and collaborated with developers on custom software delivery.",
      ],
    },
    {
      role: "Cloud Applied Generative AI Engineer",
      company: "PIAIC",
      location: "Islamabad, Pakistan",
      period: "Feb 2023 — Dec 2024",
      points: [
        "Built and deployed AI agents with the OpenAI API (including LangGraph for multi-step flows) on real document and workflow use cases.",
        "Improved answer reliability with RAG pipelines that ground LLM responses in structured knowledge.",
        "Shipped two publicly deployed tools — a live portfolio AI assistant and a document extraction API.",
      ],
    },
  ];

  return (
    <section id="work" className="page-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <SectionHeader
            label="02 — Experience"
            title="Experience"
            description="Professional roles building backend systems, APIs, front-end interfaces, and AI-powered applications."
          />
        </MotionSection>

        <div className="relative">
          <div className="absolute left-[19px] xl:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/15 to-transparent hidden sm:block" />

          <div className="space-y-5 md:space-y-6">
            {experiences.map((exp, index) => (
              <MotionSection key={index} delay={index * 0.06}>
                <div className="relative sm:pl-14 xl:pl-16">
                  <div className="absolute left-0 top-7 md:top-8 hidden sm:flex w-10 h-10 xl:w-12 xl:h-12 items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-accent/15" />
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 md:p-7">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                      <div>
                        <p className="font-primary text-xs uppercase tracking-widest text-accent/70 mb-1">
                          {exp.company}
                        </p>
                        <h3 className="h3 text-white">{exp.role}</h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm text-white/40">
                        <span className="flex items-center gap-1.5 border border-white/[0.08] px-3 py-1.5 rounded-full whitespace-nowrap text-xs md:text-sm">
                          <FiCalendar className="text-accent/70 flex-shrink-0" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 border border-white/[0.08] px-3 py-1.5 rounded-full whitespace-nowrap text-xs md:text-sm">
                          <FiMapPin className="text-accent/70 flex-shrink-0" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                          <span className="text-accent mt-1.5 flex-shrink-0">▸</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
