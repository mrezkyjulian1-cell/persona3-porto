import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { X, Sparkles, Swords } from "lucide-react";
import { playSfx } from "../utils/soundEngine";

export default function AllOutAttackModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      playSfx("all_out");

      // Persona 5 red, white, yellow celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#e60012", "#ffffff", "#ffcc00", "#000000"],
          zIndex: 9999
        });
      } catch (err) {
        // Fallback if canvas confetti isn't ready
      }

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in"
    >
      {/* Background Comic Halftone & Red Slashes */}
      <div className="absolute inset-0 bg-p5-halftone opacity-30 pointer-events-none" />
      
      {/* Dynamic Diagonal Slash Bars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[150%] h-48 bg-p5-red/80 -rotate-12 transform -translate-y-12 animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[150%] h-36 bg-white/20 -rotate-12 transform translate-y-6" />
      </div>

      {/* Finisher Card Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-zinc-950 border-4 sm:border-6 border-white shadow-[12px_12px_0px_#e60012] skew-x-[-2deg] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-p5-red hover:bg-white hover:text-black text-white font-bold border-2 border-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Victory Ribbon */}
        <div className="bg-p5-red text-white py-2 px-6 flex items-center justify-between border-b-4 border-black">
          <span className="font-persona text-2xl uppercase tracking-widest font-black flex items-center gap-2">
            <Swords className="w-6 h-6 text-p5-yellow" />
            <span>ALL-OUT ATTACK // FINISHER EXECUTION</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-xs font-bold text-p5-yellow">
            ENEMY ANNIHILATED
          </span>
        </div>

        {/* The Spectacular Image Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b-4 border-white bg-black">
          <img
            src="/assets/all_out_attack.jpg"
            alt="Persona 5 All-Out Attack Finisher"
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Comic Bold Slogan */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-mono font-bold text-p5-yellow uppercase tracking-widest">
                PHANTOM THIEVES OF HEARTS
              </div>
              <h2 className="text-4xl sm:text-6xl font-persona uppercase tracking-wider text-white drop-shadow-[4px_4px_0px_#e60012]">
                THE SHOW'S OVER.
              </h2>
            </div>
            <div className="text-right font-persona text-2xl sm:text-3xl text-p5-yellow">
              100% REFORMED
            </div>
          </div>
        </div>

        {/* Victory Bottom Stats Summary */}
        <div className="p-6 bg-black flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono uppercase text-gray-400">
              CODENAME: REZKY // ARSÈNE DEV
            </div>
            <div className="font-sans text-sm text-gray-200">
              TOTAL EXP EARNED: <span className="text-p5-yellow font-bold">999,999 EXP</span> &bull; REPUTATION: <span className="text-emerald-400 font-bold">LEGENDARY</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-p5-red text-black hover:text-white font-persona text-2xl uppercase tracking-widest font-black transition-all border-3 border-black shadow-[4px_4px_0px_#e60012] active:translate-y-1"
          >
            DISMISS VICTORY (ESC)
          </button>
        </div>
      </div>
    </div>
  );
}
