import React, { useState } from "react";
import { Users, Star, Award, HeartHandshake, Sparkles } from "lucide-react";
import { personaData } from "../data/personaData";
import { playSfx } from "../utils/soundEngine";

export default function ConfidantsView({ theme = "p5" }) {
  const { confidants } = personaData;
  const [selectedConfidant, setSelectedConfidant] = useState(confidants[0]);

  const handleSelect = (confidant) => {
    playSfx("select");
    setSelectedConfidant(confidant);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/90 p-4 border-4 border-white shadow-[6px_6px_0px_#e60012] skew-x-[-2deg]">
        <div>
          <div className="text-xs font-mono uppercase text-p5-yellow font-bold tracking-widest flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-p5-red" />
            <span>COOPERATION & SOCIAL LINKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-persona uppercase tracking-wider text-white">
            CONFIDANTS & EXPERIENCE ARCHIVES
          </h2>
        </div>
        <div className="text-xs font-mono bg-p5-yellow text-black font-black px-3 py-1.5 self-start sm:self-auto transform -rotate-1 border border-black">
          BONUS EXP: 100% UNLOCKED
        </div>
      </div>

      {/* Confidants Tarot Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {confidants.map((confidant, index) => {
          const isSelected = selectedConfidant?.id === confidant.id;
          const isMax = confidant.rank.includes("MAX");

          return (
            <div
              key={confidant.id}
              onMouseEnter={() => playSfx("hover")}
              onClick={() => handleSelect(confidant)}
              className={`cursor-pointer relative p-5 transition-all duration-300 transform flex flex-col justify-between border-4 ${
                isSelected
                  ? "bg-zinc-900 border-p5-yellow -translate-y-2 shadow-[8px_8px_0px_#ffcc00]"
                  : "bg-black/90 border-white/70 hover:border-white hover:-translate-y-1 shadow-[5px_5px_0px_#000]"
              }`}
            >
              <div>
                {/* Arcana Header */}
                <div className="flex items-center justify-between border-b-2 border-white/30 pb-2 mb-3">
                  <span className="font-persona tracking-widest text-lg font-black text-p5-yellow uppercase">
                    {confidant.arcana}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    LINK #{index + 1}
                  </span>
                </div>

                {/* Rank Badge */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className={`px-2.5 py-0.5 text-xs font-persona font-bold uppercase tracking-wider border ${
                    isMax ? "bg-p5-red text-white border-white" : "bg-zinc-800 text-p5-yellow border-p5-yellow"
                  }`}>
                    {confidant.rank}
                  </div>
                  {isMax && (
                    <span className="flex items-center text-p5-yellow text-xs font-bold gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}
                </div>

                {/* Confidant Name */}
                <h3 className="font-persona text-2xl tracking-wide uppercase text-white mb-1">
                  {confidant.name}
                </h3>

                {/* Role and Period */}
                <div className="text-xs font-mono text-cyan-400 mb-4">
                  {confidant.role} &bull; {confidant.period}
                </div>

                {/* Unlocked Perk */}
                <div className="p-3 bg-zinc-950 border-2 border-white/20 text-xs font-sans text-gray-300 leading-relaxed mb-4">
                  <div className="text-[10px] font-mono text-p5-yellow font-bold uppercase mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-p5-yellow" />
                    <span>UNLOCKED ABILITY</span>
                  </div>
                  {confidant.perk}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>AFFINITY: RESONANT</span>
                <span className="text-p5-yellow font-bold">ACTIVE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Social Link Wisdom Banner */}
      <div className="p-4 bg-zinc-950 border-3 border-white shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-p5-red shrink-0" />
          <div>
            <div className="text-xs font-mono uppercase text-p5-yellow font-bold">
              VELVET ROOM INSIGHT
            </div>
            <p className="text-xs sm:text-sm text-gray-300 font-sans">
              "Through bonds of shared dedication and deep coding disciplines, the Phantom Developer's true potential awakens."
            </p>
          </div>
        </div>
        <div className="font-persona text-2xl uppercase tracking-wider text-p5-yellow shrink-0">
          RANK MAX // BOND FORGED
        </div>
      </div>
    </div>
  );
}
