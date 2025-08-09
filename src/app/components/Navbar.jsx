// Navbar.jsx
"use client";

import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    // If a hash is present (e.g., /#home), strip it without reloading
    if (window.location.hash) {
      history.replaceState(null, "", pathname + window.location.search);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Smooth scroll with offset for fixed navbar — and never change URL hash
  function handleNavClick(e, id) {
    e.preventDefault();

    // Close mobile menu
    setOpen(false);

    // Clear any hash that may have been added by other links
    if (window.location.hash) {
      history.replaceState(null, "", pathname + window.location.search);
    }

    const navH = window.innerWidth < 768 ? 64 : 84;

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const links = ["Home", "About", "Services", "Gallery", "Contact"];

  return (
    <nav
      className={`
      fixed left-0 right-0 top-0 z-50 transition-all duration-500
      ${
        scrolled
          ? "backdrop-blur-lg bg-gradient-to-r from-[#1a1300]/85 via-[#2b1d00]/80 to-[#1a1300]/85 shadow-xl rounded-b-2xl mx-3 mt-3 py-3 border border-yellow-500/20"
          : "bg-transparent shadow-none py-6"
      }
      flex items-center justify-between px-5 sm:px-8
    `}
    >
      {/* Logo */}
      <div className="font-extrabold text-xl sm:text-2xl tracking-tight select-none">
        <span className="bg-gradient-to-r from-[#fff6b3] via-[#ffd700] to-[#b8860b] bg-clip-text text-transparent drop-shadow-lg">
          DJ SUGUNA
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 lg:gap-10 font-semibold text-white text-base lg:text-lg">
        {links.map((item) => {
          const id = item.toLowerCase();
          return (
            <li key={item}>
              {/* Use current pathname as href so the browser never sees a #hash.
                  We still preventDefault + smooth scroll in onClick. */}
              <a
                href={pathname}
                onClick={(e) => handleNavClick(e, id)}
                className="hover:text-[#ffd700] transition duration-300"
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Book Now (hidden on mobile, visible from md and up) */}
        <a
          href={pathname}
          onClick={(e) => handleNavClick(e, "booking")}
          className="hidden md:inline-block bg-gradient-to-r from-[#fff6b3] via-[#ffd700] to-[#b8860b] hover:opacity-90 text-black font-bold px-6 py-2 rounded-xl shadow-lg transition text-lg"
        >
          Book Now
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden ml-1 text-white text-2xl"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+10px)] right-4 sm:right-8 bg-[#1a1300]/95 backdrop-blur-xl border border-yellow-500/20 rounded-xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 shadow-xl md:hidden w-[76vw] max-w-[320px]">
          {links.map((item) => {
            const id = item.toLowerCase();
            return (
              <a
                key={item}
                href={pathname}
                onClick={(e) => handleNavClick(e, id)}
                className="text-white text-base sm:text-lg hover:text-[#ffd700] transition"
              >
                {item}
              </a>
            );
          })}
          {/* Book Now only in mobile menu */}
          <a
            href={pathname}
            onClick={(e) => handleNavClick(e, "booking")}
            className="bg-gradient-to-r from-[#fff6b3] via-[#ffd700] to-[#b8860b] hover:opacity-90 text-black font-bold px-4 py-2 rounded-xl mt-1 sm:mt-2 text-center shadow-lg text-base"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
