"use client";
import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;

    // On load: go to hash OR last section (if no hash)
    const restore = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
        return;
      }
      const last = sessionStorage.getItem("lastSectionId");
      if (last) {
        const el = document.getElementById(last);
        if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };

    // Use a frame to ensure layout is ready
    requestAnimationFrame(restore);

    // Observe sections and update hash + sessionStorage
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Update URL **without** scrolling again
            history.replaceState(null, "", `#${id}`);
            sessionStorage.setItem("lastSectionId", id);
          }
        });
      },
      {
        root: null,
        threshold: 0.55, // section must be ~centered/majority visible
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}
