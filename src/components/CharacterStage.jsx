import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, UserCheck, Shield } from "lucide-react";
import { playSfx } from "../utils/soundEngine";
import { personaData } from "../data/personaData";

export default function CharacterStage({ theme = "p5" }) {
  const [modelType, setModelType] = useState("joker"); // 'joker' | 'rezky'
  const isRed = theme === "p5";

  const toggleModel = () => {
    playSfx("select");
    setModelType((prev) => (prev === "joker" ? "rezky" : "joker"));
  };

  return (
    <div className="relative w-full h-full min-h-[460px] sm:min-h-[520px] flex items-center justify-center select-none overflow-hidden">
      {/* Background Angled Comic Banner Strip */}
      <div 
        className={`absolute w-[180%] h-32 transform -rotate-12 pointer-events-none opacity-90 shadow-2xl flex items-center justify-around overflow-hidden ${
          isRed ? "bg-[#e60012]" : "bg-[#0066ff]"
        }`}
      >
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-display text-4xl sm:text-5xl font-black text-black tracking-widest uppercase">
          <span>TAKE YOUR HEART</span>
          <span>&bull;</span>
          <span>PHANTOM THIEVES OF HEARTS</span>
          <span>&bull;</span>
          <span>REZKY JULIAN</span>
          <span>&bull;</span>
          <span>ARSÈNE DEV</span>
          <span>&bull;</span>
          <span>TAKE YOUR HEART</span>
          <span>&bull;</span>
        </div>
      </div>

      {/* Halftone Comic Circle Backdrop */}
      <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full p5-halftone border-4 border-black shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />

      {/* Character Image Container with Floating Idle Animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] aspect-[3/4] flex items-end justify-center"
      >
        <AnimatePresence mode="wait">
          {modelType === "joker" ? (
            <motion.div
              key="joker"
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <img
                src="/assets/joker.jpg"
                alt="Joker Persona 5"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] rounded-2xl border-4 border-black"
              />
            </motion.div>
          ) : (
            <motion.div
              key="rezky"
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-end justify-center"
            >
              <div className="relative w-full h-full flex items-end justify-center">
                {/* Persona Cutout Effect behind user photo */}
                <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-full" />
                <img
                  src="/assets/formal_profile.png"
                  alt="Muhammad Rezky Julian"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(230,0,18,0.4)]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Switch Avatar Model Button */}
      <button
        type="button"
        onClick={toggleModel}
        onMouseEnter={() => playSfx("hover")}
        className="absolute bottom-3 sm:bottom-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/90 hover:bg-[#e60012] border-2 border-white text-white text-xs font-display tracking-wider rounded-lg shadow-2xl transition-all transform hover:scale-105 active:scale-95 p5-skew-l"
      >
        <RefreshCw className="w-3.5 h-3.5 p5-unskew-l" />
        <span className="p5-unskew-l">
          SWITCH VISUAL: {modelType === "joker" ? "REZKY REAL PHOTO" : "JOKER ANIME"}
        </span>
      </button>
    </div>
  );
}
