// GallerySection.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlay, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------
   DATA — plug your own assets/links here
---------------------------------------------- */
const GALLERY = [
  {
    id: "colombo-wedding",
    title: "Wedding Reception – Colombo",
    tag: "Wedding",
    img: "/images/gallery-1.jpg",
    video: "/assets/videos/wedding-performance.mp4",
    desc: "A magical evening celebrating love.",
    link: "https://www.youtube.com/",
  },
  {
    id: "stadium-show",
    title: "Stadium Night – Jaffna",
    tag: "Corporate",
    img: "/images/gallery-1.jpg",
    video: "/assets/videos/corporate.mp4",
    desc: "Massive stage + lighting design.",
    link: "https://www.youtube.com/",
  },
  {
    id: "club-ignite",
    title: "Club Ignite – Night Mix",
    tag: "Party",
    img: "/images/gallery-1.jpg",
    video: "/assets/videos/party.mp4",
    desc: "High-energy club session.",
    link: "https://www.youtube.com/",
  },
  {
    id: "chef-live",
    title: "Chef’s Live Counter – Event",
    tag: "Catering",
    img: "/images/gallery-1.jpg",
    desc: "Live food stations + beats.",
    link: "https://www.youtube.com/",
  },
  {
    id: "artist-collab",
    title: "Guest Artist Collab",
    tag: "Feature",
    img: "/images/gallery-1.jpg",
    video: "/assets/videos/feature.mp4",
    desc: "Special performance collab.",
    link: "https://www.youtube.com/",
  },
  {
    id: "fireworks-finale",
    title: "Fireworks Finale",
    tag: "Finale",
    img: "/images/gallery-1.jpg",
    desc: "End the night with a bang.",
    link: "https://www.youtube.com/",
  },
];

/* ---------------------------------------------
   COMPONENT
---------------------------------------------- */
export default function GallerySection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Modal
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openModal = (item) => {
    setActive(item);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setOpen(false);
    setTimeout(() => setActive(null), 220);
    document.body.style.overflow = "";
  };

  // Reversible scroll animations (RIGHT↔LEFT like AboutSection pattern)
  useEffect(() => {
    if (!sectionRef.current) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      const base = (
        el,
        fromVars,
        toVars,
        start = "top 80%",
        end = "bottom 65%"
      ) =>
        gsap.fromTo(
          el,
          fromVars,
          {
            ...toVars,
            duration: reduce ? 0 : toVars.duration ?? 0.9,
            immediateRender: false,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );

      // Title (fade up)
      const titleEl = sectionRef.current.querySelector(".gallery-title");
      if (titleEl) {
        base(
          titleEl,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "top 75%",
          "bottom 65%"
        );
      }

      // Cards — alternate from RIGHT/LEFT by index
      const cards = gridRef.current?.querySelectorAll(".gallery-card");
      cards?.forEach((card, i) => {
        const xFrom = i % 2 === 0 ? 48 : -48; // even from right, odd from left
        base(
          card,
          { x: xFrom, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.04 },
          "top 85%",
          "bottom 60%"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Refresh triggers when assets load (prevents jumpy/hiding)
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-24"
      style={{
        background:
          "radial-gradient(900px 500px at 15% 15%, rgba(0,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 85% 85%, rgba(255,0,180,0.05), transparent 60%), #0c1020",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Heading */}
        <div className="gallery-title text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Event Gallery
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {GALLERY.map((item) => (
            <Card key={item.id} item={item} onPlay={() => openModal(item)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className={`fixed inset-0 z-[60] transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/75" onClick={closeModal} />
          {/* dialog */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className={`relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0e1322] text-white shadow-[0_0_40px_rgba(255,215,0,0.13)]
              transition-all duration-200 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
              style={{ boxShadow: "0 0 50px rgba(255,215,0,.10)" }}
            >
              {/* gold halo ring */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-[#ffd7001f] rounded-2xl" />

              <button
                aria-label="Close"
                onClick={closeModal}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <FaTimes />
              </button>

              {/* media */}
              <div className="relative aspect-video w-full overflow-hidden">
                {active.video ? (
                  <video src={active.video} controls autoPlay className="h-full w-full object-cover" />
                ) : (
                  <img src={active.img} alt={active.title} className="h-full w-full object-cover" />
                )}

                {/* top gold gradient edge */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-70" />
              </div>

              {/* info */}
              <div className="p-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#ffd70026] px-3 py-1 text-xs font-bold text-[#ffd700] ring-1 ring-[#ffd70040]">
                  {active.tag}
                </div>
                <h3 className="gold-text text-xl md:text-2xl font-extrabold">{active.title}</h3>
                <p className="mt-1 text-sm text-white/80">{active.desc}</p>

                <a
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#ffd70080] bg-[#ffd700] px-5 py-3 font-extrabold text-black hover:brightness-110 transition"
                >
                  <FaExternalLinkAlt />
                  View Full Event
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* styles for flicker + gold text */}
      <style jsx>{`
        /* same first-hover flicker used in Services */
        .flicker-once {
          animation: cardFlicker 0.9s ease-out 1;
        }
        @keyframes cardFlicker {
          0%, 100% { filter: brightness(1); }
          10%, 20% { filter: brightness(0.65); }
          15%, 25% { filter: brightness(1.35); }
          40% { filter: brightness(0.85); }
          60% { filter: brightness(1.15); }
        }
        .gold-text {
          background-image: linear-gradient(
              180deg,
              #fff6b3 0%,
              #ffe066 18%,
              #ffd700 38%,
              #f2c200 55%,
              #b8860b 76%,
              #7a5a00 100%
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow:
            0 0 8px rgba(255, 215, 0, 0.35),
            0 0 20px rgba(255, 215, 0, 0.2);
        }
      `}</style>
    </section>
  );
}

/* ---------------------------------------------
   Card (Services-like hover: first flicker → glow)
---------------------------------------------- */
function Card({ item, onPlay }) {
  const [hover, setHover] = useState(false);
  const [didFlicker, setDidFlicker] = useState(false);

  function handleEnter() {
    setHover(true);
    if (!didFlicker) setDidFlicker(true);
  }

  return (
    <div
      className={`gallery-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-0 shadow-xl
      transition-transform duration-300 hover:-translate-y-1 ${
        !didFlicker && hover ? "flicker-once" : ""
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHover(false)}
    >
      {/* media */}
      <img
        src={item.img}
        alt={item.title}
        className={`h-56 w-full object-cover transition duration-500 ${
          hover ? "scale-[1.02]" : "scale-100"
        }`}
      />

      {/* brand gradient halo */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500
        ${hover ? "opacity-100" : "opacity-0"}
        bg-gradient-to-br from-cyan-400/15 via-purple-400/10 to-pink-400/15`}
      />

      {/* cyan outline + glow when hovered */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl transition-all duration-500 ${
          hover
            ? "ring-1 ring-cyan-300/40 shadow-[0_0_40px_rgba(0,234,255,0.25)]"
            : "ring-0 shadow-none"
        }`}
      />

      {/* overlay content (smaller text) */}
      <div
        className={`absolute inset-0 flex flex-col justify-end gap-1.5 p-4 transition-opacity duration-300
        ${hover ? "opacity-100" : "opacity-0"}`}
      >
        <div className="mb-1 inline-flex w-fit items-center gap-2 rounded-full bg-cyan-400/15 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300 ring-1 ring-cyan-300/30">
          {item.tag}
        </div>
        <h4 className="text-base md:text-lg font-extrabold text-white drop-shadow-lg leading-snug">
          {item.title}
        </h4>
        <p className="text-xs text-white/80">{item.desc}</p>
      </div>

      {/* center play button */}
      <button
        onClick={onPlay}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-lg
          text-white ring-1 ring-white/20 shadow-xl
          transition-all duration-300 ${hover ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          hover:bg-white/25`}
        aria-label={`Open ${item.title}`}
      >
        <FaPlay className="translate-x-[2px] text-xl" />
      </button>
    </div>
  );
}
