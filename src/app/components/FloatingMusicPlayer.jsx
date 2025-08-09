"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

// Utility for mm:ss format
function formatTime(s) {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function FloatingMusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef();

  // Floating up-down effect
  const [wave, setWave] = useState(0);
  useEffect(() => {
    let anim;
    function animate() {
      setWave(Math.sin(Date.now() / 650) * 8); // smaller amplitude
      anim = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(anim);
  }, []);

  // Audio time/volume handlers
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    const timeUpdate = () => setCurrent(a.currentTime);
    const setMeta = () => setDuration(a.duration || 0);
    a.addEventListener("timeupdate", timeUpdate);
    a.addEventListener("loadedmetadata", setMeta);
    return () => {
      a.removeEventListener("timeupdate", timeUpdate);
      a.removeEventListener("loadedmetadata", setMeta);
    };
  }, [volume]);

  // Play/Pause logic
  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  // Volume slider drag
  function handleVolume(e) {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  }

  // Seek bar logic
  function handleSeek(e) {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrent(value);
    }
  }

  const progress = duration ? Math.min(100, Math.max(0, (current / duration) * 100)) : 0;

  return (
    <div
      className="fixed z-50 right-3 bottom-3 sm:right-5 sm:bottom-5 transition-transform duration-200 select-none"
      style={{ transform: `translateY(${wave}px)` }}
    >
      <div
        className={`
          relative flex items-center
          gap-3 sm:gap-4
          px-3 py-2.5 sm:px-6 sm:py-4
          rounded-3xl
          bg-white/10 backdrop-blur-2xl
          border border-cyan-400/40
          shadow-2xl
          w-[86vw] max-w-[290px]    /* MUCH smaller on phones */
          sm:w-auto sm:min-w-[350px] sm:max-w-[92vw]  /* same desktop size as before */
        `}
        style={{
          boxShadow: "0 6px 38px 0 rgba(50,0,60,0.23)",
          borderRadius: "30px",
        }}
      >
        {/* Top-right neon dot (smaller on mobile) */}
        <span className="absolute -top-2.5 -right-2.5 w-4 h-4 sm:w-7 sm:h-7 rounded-full bg-cyan-400 shadow-2xl border-2 sm:border-4 border-[#111c] z-10"></span>
        {/* Bottom-left pink dot (smaller on mobile) */}
        <span className="absolute -bottom-2 -left-2 w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-pink-400 border border-[#18101077] sm:border-2 z-10"></span>

        {/* Play / Pause (smaller on mobile) */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-cyan-300 shadow-lg hover:scale-105 active:scale-95 transition-transform ring-2 ring-cyan-400/40"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <>
              <FaPause size={20} className="sm:hidden text-black" />
              <FaPause size={32} className="hidden sm:block text-black" />
            </>
          ) : (
            <>
              <FaPlay size={20} className="sm:hidden text-black ml-0.5" />
              <FaPlay size={32} className="hidden sm:block text-black ml-1" />
            </>
          )}
        </button>

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-[13px] sm:text-lg leading-none truncate">
            DJ Suguna - Demo Mix
          </div>
          <div className="flex items-center gap-1 sm:gap-2 mt-1 text-[#b3b0c0] text-[10px] sm:text-xs font-semibold">
            <span>{formatTime(current)}</span>
            <span className="opacity-70">/</span>
            <span>{formatTime(duration)}</span>
          </div>
          {/* Progress bar (thinner on mobile) */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            step={0.05}
            onChange={handleSeek}
            className="w-full mt-1 h-[6px] sm:h-1 bg-transparent"
            style={{
              background: `
                linear-gradient(90deg, #03eaff 0%, #ff45b7 ${progress}%),
                linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%)
              `,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${progress}% 100%, 100% 100%`,
              borderRadius: 3,
              outline: "none",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
        </div>

        {/* Volume control (hide on mobile, unchanged on desktop) */}
        <div className="hidden sm:flex items-center gap-2 ml-2 min-w-[90px]">
          <FaVolumeUp className="text-white/80" size={18} />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-[90px] h-1 bg-transparent"
            style={{
              background: `
                linear-gradient(90deg, #00eaff 0%, #ff45b7 ${volume * 100}%),
                linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%)
              `,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${volume * 100}% 100%, 100% 100%`,
              borderRadius: 8,
              outline: "none",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
        </div>

        {/* Audio */}
        <audio ref={audioRef} src="/audio/demo-mix.mp3" loop />
      </div>
    </div>
  );
}
