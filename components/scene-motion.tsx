// Lucian UX/UI Prompt #216 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#216
// Lucian UX/UI Prompt #251 · MIT License (c) 2026 Seokwoooo · https://lucianlabs.dev/uxui-prompt/#251
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./scene-motion.css";

const targets = ".section-heading, .drama-card, .actor-card, .mood, .culture-article, .overview, .episode-section, .story-frame, .page-heading, .featured-photo, .featured-copy, .culture-grid > *, .footer-content > div, footer > .roof, .footer-bottom";
const ambient = ".cloud, .blossom, .moon-disc";

export function SceneMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const registered = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.classList.contains("motion-ambient")) {
          entry.target.toggleAttribute("data-motion-active", entry.isIntersecting);
          continue;
        }
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.18 });

    function register() {
      if (preference.matches) return;
      document.querySelectorAll(`${targets}, ${ambient}, .u216`).forEach((element) => {
        if (registered.has(element)) return;
        registered.add(element);
        if (element.matches(".u216")) element.classList.add("motion-ready");
        else if (element.matches(ambient)) element.classList.add("motion-ambient");
        else {
          const index = Array.from(element.parentElement?.children ?? []).indexOf(element);
          element.classList.add("u251-cd");
          (element as HTMLElement).style.setProperty("--d", `${(index % 2) * 0.09}s`);
        }
        observer.observe(element);
      });
    }
    function updatePreference() {
      observer.disconnect();
      registered.forEach((element) => element.classList.add("is-in"));
      if (!preference.matches) {
        registered.forEach((element) => {
          if (element.matches(ambient)) observer.observe(element);
        });
      }
      register();
    }
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    preference.addEventListener("change", updatePreference);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", updatePreference);
      registered.forEach((element) => {
        element.classList.remove("u251-cd", "is-in", "motion-ambient", "motion-ready");
        element.removeAttribute("data-motion-active");
        (element as HTMLElement).style.removeProperty("--d");
      });
    };
  }, [pathname]);
  return null;
}
