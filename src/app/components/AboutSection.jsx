"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUsers, FaAward, FaMusic, FaStar } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Re-animating GSAP Counter ---------- */
const Counter = memo(function Counter({ to = 0, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  const el = useRef(null);

  useEffect(() => {
    let tween;
    const obj = { n: 0 };

    const play = () => {
      if (tween) tween.kill();
      obj.n = 0;
      setVal(0);
      tween = gsap.to(obj, {
        n: to,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => setVal(Math.round(obj.n)),
      });
    };

    const st = ScrollTrigger.create({
      trigger: el.current,
      start: "top 80%",
      onEnter: play,
      onEnterBack: play,
      onLeave: () => {
        if (tween) tween.kill();
        setVal(0);
      },
      onLeaveBack: () => {
        if (tween) tween.kill();
        setVal(0);
      },
    });

    return () => {
      if (tween) tween.kill();
      st.kill();
    };
  }, [to]);

  return (
    <span ref={el}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
});
/* ------------------------------------------------ */

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const textColRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const base = (target, fromVars, toVars, trig = sectionRef.current) =>
        gsap.fromTo(target, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: trig,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        });

      base(
        imgWrapRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );

      base(
        textColRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", delay: 0.05 }
      );

      gsap.fromTo(
        ".about-feature",
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: textColRef.current,
            start: "top 65%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".stat-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0, rotateX: 6 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full overflow-x-clip py-16 sm:py-20 lg:py-24"
      style={{
        background:
          "radial-gradient(1200px 600px at 15% 20%, rgba(0,255,255,0.06), transparent 60%), radial-gradient(900px 500px at 85% 80%, rgba(255,0,180,0.05), transparent 60%), #0b0f1a",
      }}
    >
      {/* soft background ring (kept, but clipped by overflow-x-clip) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.35] blur-2xl">
        <div className="h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full bg-gradient-to-br from-cyan-500/25 via-purple-500/20 to-pink-500/25" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            About <span className="gold-text">DJ Suguna</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
          {/* LEFT: Image / video hover */}
          <div ref={imgWrapRef} className="relative overflow-visible">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl min-h-[14rem] sm:min-h-0">
              <img
                src="/images/profile.png"
                alt="DJ Suguna"
                className="block h-72 w-full object-cover sm:h-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* hover video */}
              <video
                src="/assets/videos/dj-performance.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none absolute inset-0 block h-72 w-full sm:h-full rounded-3xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>

            {/* badge: inside edges on mobile; offset out only on ≥sm */}
            <div className="absolute left-2 top-2 sm:-left-3 sm:-top-5 rounded-2xl bg-[#0e1322] px-3 sm:px-4 py-2.5 sm:py-3 text-center shadow-xl ring-1 ring-white/10">
              <div className="text-sm sm:text-base font-extrabold text-cyan-300">3+</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70">
                Years Pro
              </div>
            </div>
          </div>

          {/* RIGHT: Copy + features */}
          <div ref={textColRef} className="flex flex-col justify-center">
            <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              Bringing Energy to Every Event
            </h3>
            <p className="text-[15px] sm:text-base text-white/80 leading-relaxed">
              Based in Sri Lanka, DJ Suguna has been electrifying dance floors
              for over <span className="gold-text font-semibold">3 years</span>.
              Specializing in weddings, corporate events, and private parties, I
              blend international hits with local favorites to keep every crowd
              moving.
            </p>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-base text-white/80 leading-relaxed">
              From intimate gatherings to grand celebrations, I deliver
              unforgettable experiences with state-of-the-art sound, dynamic
              lighting, and a passion for music that spans all genres.
            </p>

            <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 text-white/85">
              <li className="about-feature flex items-start gap-3 text-[14px] sm:text-base">
                <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                Professional Sound Equipment
              </li>
              <li className="about-feature flex items-start gap-3 text-[14px] sm:text-base">
                <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                Custom Lighting Setup
              </li>
              <li className="about-feature flex items-start gap-3 text-[14px] sm:text-base">
                <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                Multilingual MC Services
              </li>
              <li className="about-feature flex items-start gap-3 text-[14px] sm:text-base">
                <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-cyan-400"></span>
                Wedding Specialization
              </li>
            </ul>
          </div>
        </div>

        {/* STATS */}
        <div
          ref={cardsRef}
          className="mt-10 sm:mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
        >
          <StatCard
            icon={<FaUsers />}
            label="Events Performed"
            value={<Counter to={500} suffix="+" />}
          />
          <StatCard
            icon={<FaAward />}
            label="Years Experience"
            value={<Counter to={3} suffix="+" />}
          />
          <StatCard
            icon={<FaMusic />}
            label="Songs Library"
            value={<Counter to={1000} suffix="+" />}
          />
          <StatCard
            icon={<FaStar />}
            label="Client Rating"
            value={<span>4.9/5</span>}
          />
        </div>
      </div>

      {/* local styles for gold gradient text */}
      <style jsx>{`
        .gold-text {
          background: linear-gradient(
              180deg,
              #fff6b3 0%,
              #ffe066 18%,
              #ffd700 38%,
              #f2c200 55%,
              #b8860b 76%,
              #7a5a00 100%
            ),
            radial-gradient(
              60% 100% at 50% 0%,
              rgba(255, 255, 255, 0.85),
              transparent 60%
            );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 6px rgba(255, 215, 0, 0.35),
            0 0 18px rgba(255, 215, 0, 0.2);
        }
      `}</style>
    </section>
  );
}

/* ---------- Stat Card ------------- */
function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 text-center shadow-xl backdrop-blur-md">
      <div className="mx-auto mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
        <span className="text-base sm:text-xl">{icon}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-xs sm:text-sm text-white/70">{label}</div>
    </div>
  );
}
