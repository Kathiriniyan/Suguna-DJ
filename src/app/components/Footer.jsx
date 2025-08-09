"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-16 w-full border-t border-white/10"
      style={{
        background:
          "radial-gradient(900px 500px at 10% 0%, rgba(0,255,255,.06), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(255,0,180,.05), transparent 60%), #0b0f17",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-5 md:px-6 py-10 md:py-12">
        {/* ===== Top grid (desktop) / Stacked (mobile) ===== */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand / About */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DJ SUGUNA
              </span>
            </h3>
            <p className="mt-3 max-w-md text-white/70 text-[15px] leading-relaxed">
              Sri Lanka&apos;s premier DJ bringing energy and excitement to
              weddings, corporate events, and private parties. Creating
              unforgettable musical experiences.
            </p>

            <ul className="mt-5 space-y-3 text-white/80 text-[15px]">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                  <FaPhoneAlt />
                </span>
                <span className="leading-snug">
                  +94 76 565 1955 / +94 75 026 2406
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-pink-300">
                  <FaEnvelope />
                </span>
                <span className="leading-snug">bookings@djsuguna.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lime-300">
                  <FaMapMarkerAlt />
                </span>
                <span className="leading-snug">Jaffna, Sri Lanka</span>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-6">
              <p className="mb-3 text-sm text-white/60">Follow us</p>
              <div className="flex items-center gap-3">
                <Social href="https://www.tiktok.com/@dj_suguna" label="TikTok">
                  <FaTiktok />
                </Social>
                <Social
                  href="https://www.instagram.com/dj_suguna_drug.offi_"
                  label="Instagram"
                >
                  <FaInstagram />
                </Social>
                <Social href="https://youtube.com/@dj_suguna_" label="YouTube">
                  <FaYoutube />
                </Social>
                <Social
                  href="https://www.facebook.com/share/1ASBvjmZEQ/"
                  label="Facebook"
                >
                  <FaFacebookF />
                </Social>
              </div>
            </div>
          </div>

          {/* Links + Services (accordion on mobile, side-by-side on desktop) */}
          <div className="space-y-6 md:space-y-8">
            {/* Mobile accordion */}
            <Accordion title="Quick Links" className="md:hidden">
              <ul className="mt-2 space-y-2 text-white/80 text-[15px]">
                <FooterLink href="#home">Home</FooterLink>
                <FooterLink href="#about">About</FooterLink>
                <FooterLink href="#services">Services</FooterLink>
                <FooterLink href="#gallery">Gallery</FooterLink>
                <FooterLink href="#contact">Contact</FooterLink>
                <FooterLink href="#booking">Booking</FooterLink>
              </ul>
            </Accordion>

            <Accordion title="Our Services" className="md:hidden">
              <ul className="mt-2 space-y-2 text-white/80 text-[15px]">
                <FooterLink href="#services">Wedding DJ</FooterLink>
                <FooterLink href="#services">Corporate Events</FooterLink>
                <FooterLink href="#services">Private Parties</FooterLink>
                <FooterLink href="#services">Sound Rental</FooterLink>
              </ul>
            </Accordion>

            {/* Desktop columns */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-lg font-extrabold text-white">
                  Quick Links
                </h4>
                <ul className="mt-4 space-y-2 text-white/80 text-[15px]">
                  <FooterLink href="#home">Home</FooterLink>
                  <FooterLink href="#about">About</FooterLink>
                  <FooterLink href="#services">Services</FooterLink>
                  <FooterLink href="#gallery">Gallery</FooterLink>
                  <FooterLink href="#contact">Contact</FooterLink>
                  <FooterLink href="#booking">Booking</FooterLink>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-white">
                  Our Services
                </h4>
                <ul className="mt-4 space-y-2 text-white/80 text-[15px]">
                  <FooterLink href="#services">Wedding DJ</FooterLink>
                  <FooterLink href="#services">Corporate Events</FooterLink>
                  <FooterLink href="#services">Private Parties</FooterLink>
                  <FooterLink href="#services">Sound Rental</FooterLink>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-extrabold text-white">
              Newsletter
            </h4>
            <p className="mt-3 text-white/70 text-[15px]">
              Get updates on events and new mixes. No spam, ever.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex w-full flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                inputMode="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-4 py-3 text-[15px] text-white outline-none focus:border-cyan-300"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-xl px-5 py-3 font-extrabold text-black ring-1 ring-[#ffd70066] transition hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(180deg,#ffe066 0%,#ffd700 38%,#f2c200 55%,#b8860b 76%,#7a5a00 100%)",
                  boxShadow:
                    "0 0 18px rgba(255,215,0,.35), 0 0 36px rgba(255,165,0,.22)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-[13px] text-white/60 sm:flex-row">
          <div>
            © {year} DJ Suguna. Made with{" "}
            <span className="text-pink-400">❤</span> in Sri Lanka
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-300 transition">
              Terms
            </a>
            <a href="#" className="hover:text-cyan-300 transition">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ——— Helpers ——— */

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_0_24px_rgba(0,234,255,0.25)] active:translate-y-0"
    >
      <span className="text-base">{children}</span>
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="inline-block rounded px-1 py-1 text-white/80 transition hover:text-cyan-300 hover:underline/20"
      >
        {children}
      </a>
    </li>
  );
}

/* Simple accordion for mobile */
function Accordion({ title, children, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/90"
        aria-expanded={open}
      >
        <span className="font-semibold">{title}</span>
        <FaChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
}
