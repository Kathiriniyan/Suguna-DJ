// ServicesSection.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHeart,
  FaBuilding,
  FaUserFriends,
  FaMusic,
  FaClock,
  FaStar,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const minisRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      // Reusable helper: element is its own trigger, reversible
      const base = (el, fromVars, toVars, start = "top 80%", end = "bottom 65%") => {
        if (!el) return;
        gsap.fromTo(
          el,
          fromVars,
          {
            ...toVars,
            duration: reduce ? 0 : (toVars.duration ?? 0.9),
            immediateRender: false,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      };

      // Title
      const titleEl = sectionRef.current.querySelector(".services-title");
      base(
        titleEl,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "top 75%",
        "bottom 65%"
      );

      // Big cards — each card gets its own trigger
      const bigCards = cardsRef.current?.querySelectorAll(".service-card");
      bigCards?.forEach((card, i) =>
        base(
          card,
          { y: 30, opacity: 0, rotateX: 8 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out", delay: i * 0.06 },
          "top 85%",
          "bottom 60%"
        )
      );

      // Mini cards — each its own trigger
      const minis = minisRef.current?.querySelectorAll(".mini-card");
      minis?.forEach((m, i) =>
        base(
          m,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.05 },
          "top 90%",
          "bottom 65%"
        )
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Refresh after images/fonts load to avoid mis-positioned triggers
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-24"
      style={{
        background:
          "radial-gradient(900px 500px at 15% 15%, rgba(0,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 85% 85%, rgba(255,0,180,0.05), transparent 60%), #0c0f18",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Heading */}
        <div className="services-title text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="mt-3 text-white/70">
            Professional DJ services tailored to make your events extraordinary
          </p>
        </div>

        {/* Main cards */}
        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <ServiceCard
            icon={<FaHeart />}
            title="Wedding Celebrations"
            price="From LKR 75,000"
            ctaColor="cyan"
            features={[
              "Ceremony music",
              "Reception entertainment",
              "First dance coordination",
              "Cultural music",
            ]}
            accent="from-cyan-400/20 via-purple-400/10 to-pink-400/10"
            glowColor="shadow-[0_0_30px_rgba(0,234,255,0.45)]"
          />

          <ServiceCard
            icon={<FaBuilding />}
            title="Corporate Events"
            price="From LKR 50,000"
            ctaColor="pink"
            features={[
              "Background music",
              "Award ceremonies",
              "Team building events",
              "Product launches",
            ]}
            accent="from-pink-400/20 via-purple-400/10 to-cyan-400/10"
            glowColor="shadow-[0_0_30px_rgba(255,69,183,0.45)]"
          />

          <ServiceCard
            icon={<FaUserFriends />}
            title="Private Parties"
            price="From LKR 35,000"
            ctaColor="green"
            features={[
              "Birthday parties",
              "Anniversary celebrations",
              "House parties",
              "Pool parties",
            ]}
            accent="from-green-400/20 via-cyan-400/10 to-purple-400/10"
            glowColor="shadow-[0_0_30px_rgba(16,185,129,0.45)]"
          />
        </div>

        {/* Additional services */}
        <div className="mt-14 text-center">
          <h3 className="text-xl font-extrabold text-white mb-6">
            Additional Services
          </h3>
          <div
            ref={minisRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <MiniCard
              icon={<FaMusic />}
              title="Sound System Rental"
              subtitle="Pro audio gear for any event size"
            />
            <MiniCard
              icon={<FaClock />}
              title="24/7 Support"
              subtitle="Round-the-clock assistance"
            />
            <MiniCard
              icon={<FaStar />}
              title="Custom Playlists"
              subtitle="Personalized music selection"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-md">
            <h4 className="text-2xl font-extrabold text-white">
              Ready to Book Your Event?
            </h4>
            <p className="mt-2 text-white/70">
              Let’s discuss your vision and create the perfect musical
              experience for your special occasion.
            </p>
            <a
              href="#booking"
              className="mt-5 inline-block rounded-xl border border-cyan-300 bg-cyan-400 px-6 py-3 font-bold text-black hover:bg-cyan-300 transition"
            >
              Start Planning Today
            </a>
          </div>
        </div>
      </div>

      {/* hover flicker styles */}
      <style jsx>{`
        .flicker-once { animation: cardFlicker 0.9s ease-out 1; }
        @keyframes cardFlicker {
          0%, 100% { filter: brightness(1); }
          10%, 20% { filter: brightness(0.6); }
          15%, 25% { filter: brightness(1.35); }
          40% { filter: brightness(0.8); }
          60% { filter: brightness(1.15); }
        }
      `}</style>
    </section>
  );
}

/* ----------------- Service Card ------------------ */
function ServiceCard({
  icon,
  title,
  price,
  ctaColor = "cyan",
  features = [],
  accent,
  glowColor,
}) {
  const [didFlicker, setDidFlicker] = useState(false);
  const [hovering, setHovering] = useState(false);

  function onEnter() {
    setHovering(true);
    if (!didFlicker) setDidFlicker(true);
  }
  function onLeave() {
    setHovering(false);
  }

  const ctaClasses =
    ctaColor === "pink"
      ? "bg-pink-500 border-pink-400 hover:bg-pink-400"
      : ctaColor === "green"
      ? "bg-emerald-500 border-emerald-400 hover:bg-emerald-400"
      : "bg-cyan-400 border-cyan-300 hover:bg-cyan-300";

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1 ${
        hovering ? glowColor : ""
      } ${!didFlicker && hovering ? "flicker-once" : ""}`}
    >
      {/* subtle gradient halo */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${accent}`}
      />

      <div className="relative">
        {/* icon circle */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cyan-300">
          <span className="text-xl">{icon}</span>
        </div>

        <h4 className="mb-2 text-center text-lg font-extrabold text-white">
          {title}
        </h4>
        <p className="mx-auto mb-4 max-w-[28ch] text-center text-sm text-white/70">
          Make your event unforgettable with high-energy mixes and a modern
          setup that fits your vibe.
        </p>

        {/* features */}
        <ul className="space-y-2 text-sm text-white/80">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-[7px] block h-[6px] w-[6px] rounded-full bg-cyan-400" />
              {f}
            </li>
          ))}
        </ul>

        {/* price bar */}
        <div className="my-5 h-px w-full bg-white/10" />
        <div className="mb-4 text-center text-sm font-extrabold tracking-wide text-white">
          {price}
        </div>

        {/* CTA */}
        <a
          href="#booking"
          className={`block w-full rounded-xl border px-4 py-3 text-center font-bold text-black transition ${ctaClasses}`}
        >
          Get Quote
        </a>
      </div>
    </div>
  );
}

/* ----------------- Mini Card ------------------ */
function MiniCard({ icon, title, subtitle }) {
  return (
    <div className="mini-card rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="text-base font-extrabold text-white">{title}</div>
      <div className="mt-1 text-sm text-white/70">{subtitle}</div>
    </div>
  );
}
