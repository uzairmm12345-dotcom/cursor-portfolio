export const navLinks = [
  { name: "home", id: "home" },
  { name: "projects", id: "projects" },
  { name: "work", id: "work" },
  { name: "contact", id: "contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];

const SCROLL_GAP = 12;

/** Live header height — re-measured so mobile vs desktop always match */
export function measureHeaderHeight(): number {
  if (typeof window === "undefined") return 72;
  const header = document.querySelector("header");
  const height = Math.ceil(header?.getBoundingClientRect().height ?? 72);
  return Math.max(height, 56);
}

/** Measured fixed header height + gap — kept in sync via Header.tsx */
export function getScrollAnchor(): number {
  if (typeof window === "undefined") return 84;

  const raw = getComputedStyle(document.documentElement).getPropertyValue("--scroll-anchor");
  const parsed = parseFloat(raw);
  if (!Number.isNaN(parsed) && parsed > 0) return parsed;

  return measureHeaderHeight() + SCROLL_GAP;
}

function syncScrollVars(headerH: number) {
  const anchor = headerH + SCROLL_GAP;
  document.documentElement.style.setProperty("--header-h", `${headerH}px`);
  document.documentElement.style.setProperty("--scroll-anchor", `${anchor}px`);
  return anchor;
}

function sectionScrollTop(element: HTMLElement, anchor: number) {
  return Math.max(0, Math.round(element.getBoundingClientRect().top + window.scrollY - anchor));
}

/**
 * Scroll a section flush under the fixed header.
 * After smooth scroll ends, snap-corrects — fixes first-click underscroll
 * when header height / layout is still settling.
 */
export function scrollToSection(id: SectionId, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (!element) return;

  const run = (b: ScrollBehavior) => {
    const anchor = syncScrollVars(measureHeaderHeight());
    window.scrollTo({ top: sectionScrollTop(element, anchor), behavior: b });
  };

  const correct = () => {
    const anchor = syncScrollVars(measureHeaderHeight());
    const expected = sectionScrollTop(element, anchor);
    if (Math.abs(window.scrollY - expected) > 2) {
      window.scrollTo({ top: expected, behavior: "auto" });
    }
    window.dispatchEvent(new Event("scroll"));
  };

  window.history.pushState(null, "", `#${id}`);
  document.documentElement.dataset.navTarget = id;

  // Remeasure once more on the next frame, then scroll (avoids stale first-paint height)
  requestAnimationFrame(() => {
    run(behavior);
  });

  if (behavior === "smooth") {
    window.setTimeout(correct, 480);
    window.setTimeout(() => {
      correct();
      delete document.documentElement.dataset.navTarget;
      window.dispatchEvent(new Event("scroll"));
    }, 750);
  } else {
    requestAnimationFrame(() => {
      correct();
      delete document.documentElement.dataset.navTarget;
      window.dispatchEvent(new Event("scroll"));
    });
  }
}
