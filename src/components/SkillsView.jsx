import React, { useState } from "react";
import { Zap, Wind, Swords, Sparkles, Brain, RefreshCw, Flame, CheckCircle } from "lucide-react";
import { personaData } from "../data/personaData";
import { playSfx } from "../utils/soundEngine";

const elementIcons = {
  ELEC: Zap,
  WIND: Wind,
  PHYS: Swords,
  ALMIGHTY: Sparkles,
  PSY: Brain,
  SUPPORT: RefreshCw,
};

const elementColors = {
  ELEC: "bg-yellow-500 text-black border-yellow-300",
  WIND: "bg-emerald-600 text-white border-emerald-400",
  PHYS: "bg-red-700 text-white border-red-500",
  ALMIGHTY: "bg-fuchsia-700 text-white border-fuchsia-400",
  PSY: "bg-pink-600 text-white border-pink-300",
  SUPPORT: "bg-cyan-600 text-white border-cyan-300",
};

export default function SkillsView({ theme = "p5" }) {
  const { skills } = personaData;
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [castEffect, setCastEffect] = useState(null);

  const handleCast = (skill) => {
    setSelectedSkill(skill);
    playSfx("slash");
    setCastEffect(skill.id);
    setTimeout(() => {
      setCastEffect(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/90 p-4 border-4 border-white shadow-[6px_6px_0px_#e60012] skew-x-[-2deg]">
        <div>
          <div className="text-xs font-mono uppercase text-p5-yellow font-bold tracking-widest">
            ARSÈNE DEV // COMBAT SKILL TREE
          </div>
          <h2 className="text-3xl sm:text-4xl font-persona uppercase tracking-wider text-white">
            ELEMENTAL SKILLS & TECHNIQUES
          </h2>
        </div>
        <div className="text-xs font-mono bg-white text-black font-black px-3 py-1.5 self-start sm:self-auto transform -rotate-1">
          TOTAL SKILLS: {skills.length} / 6
        </div>
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => {
          const IconComp = elementIcons[skill.element] || Zap;
          const isSelected = selectedSkill.id === skill.id;
          const isCasting = castEffect === skill.id;

          return (
            <div
              key={skill.id}
              onMouseEnter={() => playSfx("hover")}
              onClick={() => handleCast(skill)}
              className={`cursor-pointer relative p-4 transition-all duration-200 transform border-3 ${
                isSelected
                  ? "bg-zinc-900 border-p5-yellow -translate-y-1 shadow-[6px_6px_0px_#ffcc00]"
                  : "bg-black/85 border-white/60 hover:border-white hover:-translate-y-1 shadow-[4px_4px_0px_#000]"
              } ${isCasting ? "animate-pulse ring-4 ring-p5-red" : ""}`}
            >
              {/* Elemental Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-persona font-bold uppercase tracking-wider border ${
                    elementColors[skill.element] || "bg-zinc-700 text-white"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{skill.element}</span>
                </span>

                <span className="font-mono text-xs font-bold text-p5-yellow bg-zinc-950 px-2 py-0.5 border border-white/20">
                  {skill.cost}
                </span>
              </div>

              {/* Skill Name */}
              <h3 className="font-persona text-2xl tracking-wide uppercase text-white mb-2 leading-tight">
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-300 font-sans leading-relaxed min-h-[40px] mb-4">
                {skill.desc}
              </p>

              {/* Card Footer: Level and Cast button */}
              <div className="flex items-center justify-between border-t border-white/15 pt-2.5">
                <div className="text-[11px] font-mono text-gray-400">
                  PROFICIENCY: <span className="text-white font-bold">{skill.level}%</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCast(skill);
                  }}
                  className="px-3 py-1 bg-p5-red hover:bg-white hover:text-black font-persona tracking-wider text-xs uppercase font-bold text-white transition-colors border border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5"
                >
                  {isCasting ? "CASTING!" : "CAST SKILL"}
                </button>
              </div>

              {/* Cast Animation Flare */}
              {isCasting && (
                <div className="absolute inset-0 bg-p5-red/30 flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
                  <div className="bg-black border-2 border-p5-yellow px-4 py-2 font-persona text-xl uppercase tracking-widest text-p5-yellow animate-bounce">
                    {skill.name} ACTIVATED!
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Skill In-Depth Tactical Analysis */}
      {selectedSkill && (
        <div className="bg-black/90 border-3 border-p5-yellow p-4 shadow-[6px_6px_0px_#000] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase bg-p5-yellow text-black font-bold px-2 py-0.5">
                ACTIVE FOCUS
              </span>
              <span className="font-persona text-xl text-white uppercase tracking-wider">
                {selectedSkill.name}
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono">
              Elemental affinity: <span className="text-p5-yellow font-bold">{selectedSkill.element}</span> &bull; Resource drain: <span className="text-cyan-400 font-bold">{selectedSkill.cost}</span> &bull; Combat rating: <span className="text-emerald-400 font-bold">{selectedSkill.level} / 100</span>
            </p>
          </div>

          <button
            onClick={() => handleCast(selectedSkill)}
            className="self-start md:self-auto px-5 py-2.5 bg-p5-red hover:bg-white hover:text-black text-white font-persona text-lg uppercase tracking-widest font-black transition-all border-2 border-white shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1"
          >
            EXECUTE COMBO (SPACE / CLICK)
          </button>
        </div>
      )}
    </div>
  );
}
