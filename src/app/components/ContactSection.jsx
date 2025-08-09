"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const followRef = useRef(null);
  const guaranteeRef = useRef(null);

  // simple “first hover” flicker flag for the gold button
  const [didFlicker, setDidFlicker] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const inOut = (el, start = "top -80%") => {
      gsap.set(el, { y: 24, opacity: 0, rotateX: 6 });
      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () =>
          gsap.to(el, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: reduce ? 0 : 0.9,
            ease: "power3.out",
          }),
        onLeave: () =>
          gsap.to(el, {
            y: 16,
            opacity: 0,
            rotateX: 4,
            duration: reduce ? 0 : 0.35,
            ease: "power2.in",
          }),
        onEnterBack: () =>
          gsap.to(el, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: reduce ? 0 : 0.8,
            ease: "power3.out",
          }),
        onLeaveBack: () =>
          gsap.to(el, {
            y: -16,
            opacity: 0,
            rotateX: -4,
            duration: reduce ? 0 : 0.3,
            ease: "power2.in",
          }),
      });
    };

    const ctx = gsap.context(() => {
      inOut(sectionRef.current.querySelector(".contact-title"), "top -75%");
      inOut(leftRef.current);
      inOut(rightRef.current);
      inOut(followRef.current, "top -85%");
      inOut(guaranteeRef.current, "top -85%");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function onEnterBtn() {
    setHovering(true);
    if (!didFlicker) setDidFlicker(true);
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24"
      style={{
        background:
          "radial-gradient(900px 500px at 10% 10%, rgba(0,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 90% 90%, rgba(255,0,180,0.05), transparent 60%), #0b0f17",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Heading */}
        <div className="contact-title mb-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let’s Create Magic
            </span>
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Ready to make your event unforgettable? Get in touch and let’s start planning!
          </p>
        </div>

        {/* Top row: Form + Contact card */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* LEFT – Form */}
          <div
            ref={leftRef}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md"
          >
            <h3 className="mb-6 text-xl font-extrabold text-white">Book Your Event</h3>

            <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Row 1 */}
              <div>
                <label className="mb-1 block text-sm text-white/70">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>

              {/* Row 2 */}
              <div>
                <label className="mb-1 block text-sm text-white/70">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+94 77 123 4567"
                  className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Event Type *</label>
                <div className="relative">
                  <select
                    required
                    className="w-full appearance-none rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 pr-9 text-white outline-none focus:border-cyan-300"
                  >
                    <option value="">Select event type</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Private Party</option>
                    <option>Other</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
                    ▾
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <label className="mb-1 block text-sm text-white/70">Event Date</label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g., 150"
                  className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>

              {/* Row 4 (full) */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Event Location</label>
                <input
                  type="text"
                  placeholder="City or venue name"
                  className="w-full rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>

              {/* Row 5 (textarea) */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-white/70">Additional Details</label>
                <textarea
                  rows="4"
                  placeholder="Tell us more about your event, music preferences, special requirements..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0f1422] px-3 py-3 text-white outline-none focus:border-cyan-300"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  onMouseEnter={() => {
                    onEnterBtn();
                  }}
                  onMouseLeave={() => setHovering(false)}
                  className={`relative inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-extrabold text-black transition
                    ring-1 ring-[#ffd70066]
                    ${hovering ? "brightness-110" : ""}
                    ${!didFlicker && hovering ? "btn-flicker-once" : ""}`}
                  style={{
                    background:
                      "linear-gradient(180deg,#ffe066 0%,#ffd700 38%,#f2c200 55%,#b8860b 76%,#7a5a00 100%)",
                    boxShadow:
                      "0 0 18px rgba(255,215,0,.35), 0 0 40px rgba(255,165,0,.25)",
                  }}
                >
                  <FaPaperPlane />
                  Send Booking Request
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT – Contact card */}
          <div
            ref={rightRef}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md"
          >
            <h3 className="mb-6 text-xl font-extrabold text-white">Get In Touch</h3>

            <ul className="space-y-5">
              <ContactRow icon={<FaPhoneAlt />} label="Phone" value="+94 77 123 4567" />
              <ContactRow icon={<FaEnvelope />} label="Email" value="hello@djsuguna.lk" />
              <ContactRow icon={<FaMapMarkerAlt />} label="Location" value="Colombo, Sri Lanka" />
              <ContactRow icon={<FaClock />} label="Response Time" value="Within 24 hours" />
            </ul>
          </div>
        </div>

        {/* Follow + Guarantee */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            ref={followRef}
            className="rounded-3xl border border-[#16a34a40] bg-white/5 p-6 shadow-xl backdrop-blur-md"
          >
            <h4 className="text-lg font-extrabold text-white">Follow the Journey</h4>
            <p className="mt-2 text-white/70">
              Stay updated with our latest events, behind‑the‑scenes content, and music mixes.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Social icon={<FaInstagram />} href="#" />
              <Social icon={<FaFacebookF />} href="#" />
              <Social icon={<FaYoutube />} href="#" />
            </div>
          </div>

          <div
            ref={guaranteeRef}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-md"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
              <FaClock />
            </div>
            <h4 className="text-lg font-extrabold text-white">Quick Response Guarantee</h4>
            <p className="mt-2 text-white/70">
              We respond to all inquiries within 24 hours. For urgent requests, call us directly for
              immediate assistance.
            </p>
          </div>
        </div>
      </div>

      {/* local styles: one‑time flicker for gold button */}
      <style jsx>{`
        .btn-flicker-once {
          animation: btnFlicker 0.9s ease-out 1;
        }
        @keyframes btnFlicker {
          0%, 100% { filter: brightness(1); }
          10%, 20% { filter: brightness(0.7); }
          15%, 25% { filter: brightness(1.25); }
          40% { filter: brightness(0.9); }
          60% { filter: brightness(1.12); }
        }
      `}</style>
    </section>
  );
}

/* ---------- helpers ---------- */

function ContactRow({ icon, label, value }) {
  return (
    <li className="group flex items-start gap-3 rounded-2xl border border-white/0 p-3 transition hover:border-white/10 hover:bg-white/[0.06]">
      <div className="mt-[2px] flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cyan-300 ring-1 ring-white/10 transition group-hover:shadow-[0_0_24px_rgba(0,234,255,0.25)]">
        <span className="text-sm">{icon}</span>
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
        <div className="text-white">{value}</div>
      </div>
    </li>
  );
}

function Social({ icon, href = "#" }) {
  return (
    <a
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_0_24px_rgba(0,234,255,0.25)]"
      aria-label="Social link"
    >
      <span className="text-sm">{icon}</span>
    </a>
  );
}
