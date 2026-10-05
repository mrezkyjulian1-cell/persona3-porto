import React from "react";
import { Shield, Zap, Crosshair, Award, Sparkles, Terminal } from "lucide-react";
import { personaData } from "../data/personaData";
import { playSfx } from "../utils/soundEngine";

export default function StatusView({ theme = "p5" }) {
  const { profile, radarStats, equipment } = personaData;
  const isP5 = theme === "p5";
  const primaryColor = isP5 ? "#e60012" : "#0066ff";
  const accentYellow = "#ffcc00";

  // Compute SVG Radar Chart points (pentagon)
  const size = 260;
  const center = size / 2;
  const radius = 95;
  const angleStep = (Math.PI * 2) / radarStats.length;

  // Outer polygon points
  const outerPoints = radarStats.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  // Mid polygon points (50%)
  const midPoints = radarStats.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = center + (radius * 0.5) * Math.cos(angle);
    const y = center + (radius * 0.5) * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  // Stat data polygon points
  const statPoints = radarStats.map((stat, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (stat.value / stat.max) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Header Banner */}
      <div className="relative p-5 bg-black/90 border-4 border-white shadow-[6px_6px_0px_#e60012] skew-x-[-2deg] overflow-hidden">
        <div className="absolute top-0 right-0 px-4 py-1 bg-p5-red text-black font-persona text-xl tracking-widest font-black uppercase transform rotate-2">
          LV. {profile.level} // MAX
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-p5-yellow font-persona tracking-wider text-sm font-bold">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>ARCANA: {profile.arcana}</span>
              <span className="text-white/40">|</span>
              <span>PERSONA: {profile.persona}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-persona tracking-wider uppercase text-white drop-shadow-[2px_2px_0px_#000]">
              {profile.name}
            </h2>
            <p className="text-xs md:text-sm font-mono text-gray-300">
              {profile.affiliation} &bull; {profile.title}
            </p>
          </div>

          {/* HP / SP Gauges */}
          <div className="flex flex-col gap-2 min-w-[220px]">
            {/* HP */}
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span className="text-p5-yellow">HP</span>
                <span>{profile.hp} / {profile.maxHp}</span>
              </div>
              <div className="h-3.5 bg-zinc-800 border-2 border-white relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 transition-all duration-700" 
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            {/* SP */}
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1">
                <span className="text-cyan-400">SP</span>
                <span>{profile.sp} / {profile.maxSp}</span>
              </div>
              <div className="h-3.5 bg-zinc-800 border-2 border-white relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-300 transition-all duration-700" 
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bio Quote */}
        <div className="mt-4 pt-3 border-t border-dashed border-white/20 flex items-start gap-2">
          <Terminal className="w-4 h-4 text-p5-yellow shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-gray-200 italic font-sans leading-relaxed">
            "{profile.quote}"
          </p>
        </div>
      </div>

      {/* Grid: Radar Stats + Equipment Loadout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (Col 5) */}
        <div 
          onMouseEnter={() => playSfx("hover")}
          className="lg:col-span-5 bg-black/80 border-3 border-white p-4 shadow-[5px_5px_0px_#000] relative overflow-hidden flex flex-col items-center justify-center"
        >
          <div className="w-full flex items-center justify-between border-b-2 border-white/30 pb-2 mb-3">
            <span className="font-persona tracking-wider text-xl text-p5-yellow font-bold uppercase">
              ABILITY PARAMETERS
            </span>
            <span className="text-xs font-mono bg-white text-black font-bold px-2 py-0.5">
              P5 RADAR
            </span>
          </div>

          <div className="relative flex items-center justify-center py-2">
            <svg width={size} height={size} className="overflow-visible">
              {/* Outer Wireframe */}
              <polygon
                points={outerPoints}
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              {/* Mid Wireframe */}
              <polygon
                points={midPoints}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Axis lines */}
              {radarStats.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data Polygon Fill */}
              <polygon
                points={statPoints}
                fill={isP5 ? "rgba(230, 0, 18, 0.45)" : "rgba(0, 102, 255, 0.45)"}
                stroke={isP5 ? "#e60012" : "#00d2ff"}
                strokeWidth="2.5"
                className="transition-all duration-500"
              />

              {/* Data points */}
              {radarStats.map((stat, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = (stat.value / stat.max) * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ffcc00"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Labels */}
              {radarStats.map((stat, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const labelRadius = radius + 22;
                const x = center + labelRadius * Math.cos(angle);
                const y = center + labelRadius * Math.sin(angle);
                return (
                  <text
                    key={`lbl-${i}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="bold"
                    className="select-none"
                  >
                    {stat.label}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="w-full grid grid-cols-5 gap-1 mt-2 text-center border-t border-white/20 pt-2 font-mono text-[10px]">
            {radarStats.map((st, i) => (
              <div key={i} className="bg-zinc-900/80 p-1 border border-white/10">
                <div className="text-gray-400">{st.label.slice(0, 3)}</div>
                <div className="text-p5-yellow font-bold text-xs">{st.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment & Loadout (Col 7) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-black/80 border-3 border-white p-4 shadow-[5px_5px_0px_#000]">
            <div className="flex items-center justify-between border-b-2 border-white/30 pb-2 mb-3">
              <span className="font-persona tracking-wider text-xl text-p5-yellow font-bold uppercase flex items-center gap-2">
                <Shield className="w-5 h-5 text-p5-red" />
                <span>COMBAT GEAR & LOADOUT</span>
              </span>
              <span className="text-xs font-mono text-gray-400">4 SLOTS EQUIPPED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipment.map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => playSfx("hover")}
                  className="group p-3 bg-zinc-950 border-2 border-white/30 hover:border-p5-red hover:bg-zinc-900 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#e60012]"
                >
                  <div className="flex items-center justify-between text-xs font-persona tracking-widest text-p5-yellow font-bold mb-1">
                    <span>{item.slot}</span>
                    <span className="text-[10px] font-mono text-gray-400">SLOT #{idx + 1}</span>
                  </div>
                  <h4 className="font-persona text-lg tracking-wide uppercase text-white group-hover:text-p5-red transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Dossier Quick Fact Card */}
          <div className="p-3.5 bg-p5-red text-white border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-between skew-x-[-1deg]">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-p5-yellow shrink-0" />
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-black font-bold">
                  SPECIALTY TRAIT
                </div>
                <div className="font-persona text-xl tracking-wide uppercase font-black text-white">
                  FULL-STACK VELOCITY & AI ADAPTATION
                </div>
              </div>
            </div>
            <span className="hidden sm:inline-block font-persona text-2xl font-black bg-black text-white px-2 py-1 rotate-3">
              100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
