import { useState, useRef } from "react";
import { FaPlay, FaPause, FaWaveSquare } from "react-icons/fa";

export default function FloatingMusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();

  function togglePlay() {
    setPlaying((p) => !p);
    if (audioRef.current) {
      if (playing) audioRef.current.pause();
      else audioRef.current.play();
    }
  }

  return (
    <div className="fixed bottom-8 right-8 bg-black/90 rounded-2xl shadow-lg flex items-center gap-3 px-5 py-3 z-50 border border-primary">
      <button onClick={togglePlay} className="text-primary text-2xl">
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <div className="w-24 h-8 flex items-center">
        {/* Animated "waves" */}
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <span key={i} className={`inline-block bg-primary rounded-full w-2 ${playing ? "animate-wave" : ""}`}
              style={{ height: `${10 + Math.random() * 14}px`, transition: "height 0.2s" }}
            ></span>
          ))}
        </div>
      </div>
      <span className="ml-2 text-xs font-semibold">DJ Suguna - Demo Mix</span>
      <audio ref={audioRef} src="/assets/audio/demo-mix.mp3" loop />
    </div>
  );
}
