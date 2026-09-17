"use client";

import { useEffect } from "react";
import { scrollToSection, type SectionId } from "@/lib/nav-links";

const sectionIds: SectionId[] = ["home", "projects", "work", "contact"];

export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.slice(1) as SectionId;
    if (!sectionIds.includes(hash)) return;

    // Wait for header height sync + layout before scrolling
    const run = () => scrollToSection(hash);

    const t1 = window.setTimeout(run, 50);
    const t2 = window.setTimeout(run, 200);
    const t3 = window.setTimeout(run, 500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return null;
}
