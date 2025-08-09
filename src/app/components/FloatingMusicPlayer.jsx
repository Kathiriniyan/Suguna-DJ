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
      setWave(Math.sin(Date.now() / 650) * 10); // up/down amplitude
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
    function timeUpdate() {
      setCurrent(a.currentTime);
    }
    function setMeta() {
      setDuration(a.duration || 0);
    }
    a.addEventListener("timeupdate", timeUpdate);
    a.addEventListener("loadedmetadata", setMeta);
    return () => {
      a.removeEventListener("timeupdate", timeUpdate);
      a.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  // Play/Pause logic
  function togglePlay() {
    setPlaying((p) => !p);
    if (audioRef.current) {
      if (playing) audioRef.current.pause();
      else audioRef.current.play();
    }
  }

  // Volume slider drag
  function handleVolume(e) {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  }

  // Seek bar logic (for progress, optional)
  function handleSeek(e) {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrent(value);
    }
  }

  return (
    <div
      className={`
        fixed z-50
        right-7 bottom-7
        select-none
        transition-transform duration-200
        shadow-xl
      `}
      style={{
        // Animate up and down, only one edge "waves"
        transform: `translateY(${wave}px)`,
      }}
    >
      <div
        className="
          relative flex items-center gap-4
          px-7 py-5
          rounded-3xl
          bg-white/10
          backdrop-blur-2xl
          border border-cyan-400/40
          shadow-2xl
          min-w-[350px] max-w-[92vw]
        "
        style={{
          boxShadow: "0 6px 38px 0 rgba(50,0,60,0.23)",
          borderRadius: "30px",
        }}
      >
        {/* Top-right neon dot */}
        <span className="absolute top-[-13px] right-[-13px] w-7 h-7 rounded-full bg-cyan-400 shadow-2xl border-4 border-[#111c] z-10"></span>
        {/* Bottom-left pink dot */}
        <span className="absolute bottom-[-11px] left-[-10px] w-4 h-4 rounded-full bg-pink-400 border-2 border-[#18101077] z-10"></span>

        {/* Circle play icon (glowing) */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-300 shadow-lg hover:scale-105 active:scale-95 transition-transform ring-2 ring-cyan-400/40"
        >
          {playing ? (
            <FaPause size={32} className="text-black" />
          ) : (
            <FaPlay size={32} className="text-black ml-1" />
          )}
        </button>

        {/* Song info */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-lg leading-none">
            DJ Suguna - Demo Mix
          </div>
          <div className="flex items-center gap-2 mt-1 text-[#b3b0c0] text-xs font-semibold">
            <span>{formatTime(current)}</span>
            <span className="opacity-70">/</span>
            <span>{formatTime(duration)}</span>
          </div>
          {/* Progress bar */}
          <input
            type="range"
            min={0}
            max={duration}
            value={current}
            step={0.05}
            onChange={handleSeek}
            className="w-full mt-1 h-1 accent-pink-400 bg-transparent"
            style={{
              background:
                "linear-gradient(90deg, #03eaff 0%, #ff45b7 100%)",
              accentColor: "#ff45b7",
              height: 4,
              borderRadius: 2,
              outline: "none",
            }}
          />
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-1 ml-2 min-w-[90px]">
          <FaVolumeUp className="text-white/80" size={18} />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-[70px] accent-cyan-400 rounded-full h-1 bg-pink-400"
            style={{
              background:
                "linear-gradient(90deg, #00eaff 0%, #ff45b7 100%)",
              accentColor: "#00eaff",
              height: 5,
              borderRadius: 8,
              outline: "none",
            }}
          />
        </div>

        {/* Audio */}
        <audio
          ref={audioRef}
          src="/assets/audio/demo-mix.mp3"
          loop
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
    </div>
  );
}
