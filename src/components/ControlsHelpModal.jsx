import React from "react";
import { X, Keyboard, Sparkles, Music, Volume2, Shield } from "lucide-react";

export default function ControlsHelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "1 - 6", desc: "Instantly switch through Phantom Menu tabs (Status, Skills, Missions...)" },
    { key: "↑ / ↓", desc: "Navigate up and down through the diagonal Persona wheel" },
    { key: "ENTER", desc: "Select current focused menu option" },
    { key: "SPACE", desc: "Trigger ALL-OUT ATTACK finisher cutscene" },
    { key: "M", desc: "Toggle background music play/pause" },
    { key: "ESC", desc: "Close any open dossier modal or finisher screen" }
  ];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-zinc-950 border-4 border-white p-6 shadow-[8px_8px_0px_#e60012] skew-x-[-1deg] text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 bg-p5-red hover:bg-white hover:text-black text-white font-bold border-2 border-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Keyboard className="w-5 h-5 text-p5-yellow" />
          <span className="text-xs font-mono uppercase text-p5-yellow font-bold tracking-widest">
            META-CONTROLS GUIDE
          </span>
        </div>

        <h2 className="text-3xl font-persona uppercase tracking-wider text-white mb-4">
          KEYBOARD SHORTCUTS
        </h2>

        <div className="space-y-2 mb-6">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 bg-black border border-white/20">
              <span className="font-persona text-lg text-p5-yellow px-2 py-0.5 bg-zinc-900 border border-p5-yellow/40">
                {sc.key}
              </span>
              <span className="text-xs font-sans text-gray-300 text-right max-w-[280px]">
                {sc.desc}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-white text-black hover:bg-p5-red hover:text-white font-persona text-xl uppercase tracking-widest font-black transition-all border-2 border-black"
        >
          GOT IT, RETURN TO GAME (ESC)
        </button>
      </div>
    </div>
  );
}
