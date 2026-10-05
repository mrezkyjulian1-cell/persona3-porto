import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Star, ShieldAlert, Palette } from "lucide-react";
import BgmPlayer from "./BgmPlayer";
import { playSfx } from "../utils/soundEngine";
import { personaData } from "../data/personaData";

export default function HeaderWidget({ theme = "p5", onToggleTheme }) {
  const [timeStr, setTimeStr] = useState("");
  const isRed = theme === "p5";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const day = days[now.getDay()];
      setTimeStr(`${month}/${date} ${day}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-30 w-full px-4 sm:px-8 py-3 flex items-center justify-between pointer-events-none">
      {/* Persona 5 Calendar & Weather Widget (Left) */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Slanted Date Box */}
        <div className="flex items-stretch bg-black border-2 border-white rounded-md shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
          {/* Red/Blue accent bar */}
          <div className={`px-2.5 py-1.5 flex items-center justify-center font-display font-bold text-lg sm:text-2xl text-white ${
            isRed ? "bg-[#e60012]" : "bg-[#0066ff]"
          }`}>
            <span>{timeStr || "4/11 WED"}</span>
          </div>

          {/* Time of Day */}
          <div className="px-3 py-1.5 bg-[#f7f5e8] text-black font-display font-extrabold text-sm sm:text-base flex items-center gap-2">
            <span>AFTER SCHOOL</span>
            <div className="w-5 h-5 rounded-full bg-[#ffcc00] flex items-center justify-center text-black text-xs font-bold animate-spin" style={{ animationDuration: "12s" }}>
              <Sun className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Phansite Approval Rating Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-black/90 border border-white/20 rounded-md p5-skew-l text-xs font-mono">
          <Star className="w-3.5 h-3.5 text-[#ffcc00] fill-[#ffcc00] animate-pulse" />
          <span className="text-slate-300">PHANSITE APPROVAL:</span>
          <span className="text-[#ffcc00] font-bold">98.4% [MAX]</span>
        </div>
      </div>

      {/* Right Controls: Theme Toggle & BGM Player */}
      <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
        {/* Theme Toggle Button (Persona 5 Red vs Persona 3 Blue) */}
        <button
          type="button"
          onClick={() => {
            playSfx("select");
            onToggleTheme();
          }}
          onMouseEnter={() => playSfx("hover")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-white/30 text-xs font-display tracking-wider font-bold transition-all transform hover:scale-105 active:scale-95 ${
            isRed 
              ? "bg-[#e60012] text-white hover:bg-[#ff1a2b] shadow-[0_0_15px_rgba(230,0,18,0.5)]" 
              : "bg-[#0066ff] text-white hover:bg-[#1a75ff] shadow-[0_0_15px_rgba(0,102,255,0.5)]"
          }`}
          title="Switch theme (P5 Red / P3 Blue)"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{isRed ? "PERSONA 5" : "PERSONA 3"}</span>
        </button>

        {/* Social GitHub Quick Link */}
        <a
          href={personaData.profile.github}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => playSfx("hover")}
          className="hidden sm:flex items-center justify-center w-9 h-9 bg-black/80 hover:bg-black text-white border-2 border-white/20 rounded-lg transition-transform hover:scale-110 active:scale-95 shadow-lg"
          aria-label="GitHub Profile"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* Integrated BGM Player */}
        <BgmPlayer theme={theme} />
      </div>
    </header>
  );
}
