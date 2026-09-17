"use client";

import { useEffect, useState } from "react";
import { getScrollAnchor, measureHeaderHeight, type SectionId } from "@/lib/nav-links";

/**
 * Tracks which page section is in view for navbar highlighting.
 * Anchor line sits just below the measured fixed header.
 */
export function useActiveSection(sectionIds: readonly SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const ids = [...sectionIds];

    const updateActiveSection = () => {
      const navTarget = document.documentElement.dataset.navTarget as SectionId | undefined;
      if (navTarget && ids.includes(navTarget)) {
        setActiveSection((prev) => (prev === navTarget ? prev : navTarget));
        return;
      }

      const anchor = Math.max(getScrollAnchor(), measureHeaderHeight() + 12) + 32;

      let current: SectionId = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= anchor) {
          current = id;
        }
      }

      const distanceFromBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (distanceFromBottom < 100) {
        current = ids[ids.length - 1];
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    const raf = requestAnimationFrame(updateActiveSection);
    const t1 = window.setTimeout(updateActiveSection, 120);
    const t2 = window.setTimeout(updateActiveSection, 500);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [sectionIds]);

  return activeSection;
}
