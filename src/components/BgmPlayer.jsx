import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, SkipForward, Play, Pause } from "lucide-react";
import { personaData } from "../data/personaData";
import { playSfx, toggleSound, isSoundEnabled } from "../utils/soundEngine";

export default function BgmPlayer({ theme = "p5" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);

  const tracks = personaData.bgmTracks;
  const currentTrack = tracks[currentTrackIdx];

  const togglePlay = () => {
    playSfx("select");
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const nextTrack = () => {
    playSfx("select");
    const nextIdx = (currentTrackIdx + 1) % tracks.length;
    setCurrentTrackIdx(nextIdx);
    setIsPlaying(true);
  };

  const handleSfxToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSfx("select");
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrackIdx]);

  const isRed = theme === "p5";

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-black/80 border-2 border-white/20 rounded-xl backdrop-blur-md shadow-2xl p5-skew-l">
      <audio ref={audioRef} loop preload="none" />

      {/* BGM Info Icon */}
      <button
        type="button"
        onClick={togglePlay}
        onMouseEnter={() => playSfx("hover")}
        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg font-bold text-white transition-all transform hover:scale-105 active:scale-95 ${
          isPlaying 
            ? isRed ? "bg-[#e60012] shadow-[0_0_15px_#e60012]" : "bg-[#0066ff] shadow-[0_0_15px_#0066ff]"
            : "bg-white/10 hover:bg-white/20"
        }`}
        title={isPlaying ? "Pause BGM" : "Play BGM"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 p5-unskew-l" />
        ) : (
          <Play className="w-4 h-4 ml-0.5 p5-unskew-l" />
        )}
      </button>

      {/* Track Label */}
      <div className="hidden md:flex flex-col text-left pr-2 p5-unskew-l">
        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-slate-400">
          <Music className="w-3 h-3 text-[#ffcc00] animate-pulse" />
          <span>BGM // {currentTrack.mood}</span>
        </div>
        <span className="text-xs font-bold text-white tracking-wider line-clamp-1 max-w-[130px]">
          {currentTrack.title}
        </span>
      </div>

      {/* Skip Track Button */}
      <button
        type="button"
        onClick={nextTrack}
        onMouseEnter={() => playSfx("hover")}
        className="p-2 text-slate-400 hover:text-white transition-colors"
        title="Next Track"
      >
        <SkipForward className="w-3.5 h-3.5 p5-unskew-l" />
      </button>

      {/* SFX Mute Button */}
      <button
        type="button"
        onClick={handleSfxToggle}
        onMouseEnter={() => playSfx("hover")}
        className={`p-2 transition-colors ${
          soundOn ? "text-emerald-400" : "text-rose-500"
        }`}
        title={soundOn ? "Mute SFX" : "Unmute SFX"}
      >
        {soundOn ? (
          <Volume2 className="w-3.5 h-3.5 p5-unskew-l" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 p5-unskew-l" />
        )}
      </button>
    </div>
  );
}
