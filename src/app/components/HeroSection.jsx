"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.playbackRate = 0.85;
      v.play().catch(() => {});
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setReveal(true);
            setTimeout(() => setReveal(false), 3000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${
          reveal ? "video-flicker" : ""
        }`}
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text Block */}
      <div className="relative z-10 text-center">
        {/* Sub-title */}
        <h2
          className={`mb-4 text-[4vw] md:text-[2vw] font-semibold tracking-widest uppercase ${
            reveal ? "text-reveal-white" : "ghost-loop-white"
          }`}
        >
          Jaffna’s Premier DJ
        </h2>

        {/* Main Title */}
        <h1
          className={`px-4 text-[12vw] md:text-[8vw] font-extrabold tracking-tight uppercase bg-clip-text text-transparent hero-gold ${
            reveal ? "text-reveal" : "ghost-loop"
          }`}
        >
          DJ SUGUNATHAS
        </h1>

        {/* Underline */}
        <div className="mx-auto mt-6 h-[3px] w-[180px] md:w-[240px] rounded-full bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-80" />
      </div>

      <style jsx>{`
        .hero-gold {
          background-image: linear-gradient(
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
          text-shadow:
            0 0 8px rgba(255, 215, 0, 0.6),
            0 0 20px rgba(255, 215, 0, 0.4),
            0 0 40px rgba(255, 165, 0, 0.25);
        }

        /* Video flicker on reveal */
        .video-flicker {
          animation: videoReveal 3s ease-out forwards;
        }
        @keyframes videoReveal {
          0%, 100% { filter: brightness(1); }
          10%, 20% { filter: brightness(0.2); }
          15%, 25% { filter: brightness(1.4); }
          40% { filter: brightness(0.5); }
          60% { filter: brightness(1.2); }
        }

        /* Gold text reveal */
        .text-reveal {
          animation: textReveal 3s ease-out forwards;
        }
        @keyframes textReveal {
          0% { opacity: 0; }
          10% { opacity: 0.3; }
          20% { opacity: 0.85; }
          30% { opacity: 0.4; }
          40% { opacity: 1; }
          60% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        /* White subtitle reveal */
        .text-reveal-white {
          animation: textRevealWhite 3s ease-out forwards;
          color: white;
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.6),
            0 0 18px rgba(255, 255, 255, 0.4),
            0 0 28px rgba(255, 255, 255, 0.25);
        }
        @keyframes textRevealWhite {
          0% { opacity: 0; }
          10% { opacity: 0.3; }
          20% { opacity: 0.85; }
          30% { opacity: 0.4; }
          40% { opacity: 1; }
          60% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        /* Gold flicker loop */
        .ghost-loop {
          animation: ghostFlicker 5s infinite;
        }
        @keyframes ghostFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.7));
          }
          20%, 24%, 55% {
            opacity: 0.3;
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.3));
          }
          22% {
            opacity: 0.6;
            filter: drop-shadow(0 0 15px rgba(255, 200, 0, 0.5));
          }
          70% {
            opacity: 0.85;
            filter: drop-shadow(0 0 20px rgba(255, 180, 0, 0.6));
          }
          85% {
            opacity: 0.4;
            filter: drop-shadow(0 0 12px rgba(255, 180, 0, 0.4));
          }
        }

        /* White flicker loop for subtitle */
        .ghost-loop-white {
          animation: ghostFlickerWhite 5s infinite;
          color: white;
          text-shadow:
            0 0 8px rgba(255, 255, 255, 0.6),
            0 0 18px rgba(255, 255, 255, 0.4),
            0 0 28px rgba(255, 255, 255, 0.25);
        }
        @keyframes ghostFlickerWhite {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.3; }
          22% { opacity: 0.6; }
          70% { opacity: 0.85; }
          85% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
