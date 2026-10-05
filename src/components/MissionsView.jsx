import React, { useState } from "react";
import { ExternalLink, Target, Eye, X, CheckCircle, ShieldAlert, Sparkles } from "lucide-react";
import { personaData } from "../data/personaData";
import { playSfx } from "../utils/soundEngine";

export default function MissionsView({ theme = "p5" }) {
  const { missions } = personaData;
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (mission) => {
    playSfx("select");
    setActiveModal(mission);
  };

  const closeModal = () => {
    playSfx("back");
    setActiveModal(null);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/90 p-4 border-4 border-white shadow-[6px_6px_0px_#e60012] skew-x-[-2deg]">
        <div>
          <div className="text-xs font-mono uppercase text-p5-yellow font-bold tracking-widest flex items-center gap-1.5">
            <Target className="w-4 h-4 text-p5-red" />
            <span>PALACE HEIST INFILTRATION LOGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-persona uppercase tracking-wider text-white">
            MISSIONS & PRODUCTION PROJECTS
          </h2>
        </div>
        <div className="text-xs font-mono bg-p5-red text-white font-black px-3 py-1.5 self-start sm:self-auto transform rotate-1 border border-white">
          ALL TARGETS REFORMED
        </div>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {missions.map((mission) => (
          <div
            key={mission.id}
            onMouseEnter={() => playSfx("hover")}
            onClick={() => openModal(mission)}
            className="group cursor-pointer bg-black/90 border-3 border-white hover:border-p5-red p-4 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_#e60012] flex flex-col justify-between"
          >
            <div>
              {/* Header: Rank + Client */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-persona tracking-widest text-sm font-black px-3 py-0.5 bg-p5-red text-white border border-white transform -rotate-2">
                  {mission.rank}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  {mission.client}
                </span>
              </div>

              {/* Project Image Preview with Halftone Overlay */}
              <div className="relative aspect-video w-full overflow-hidden border-2 border-white/60 mb-3 bg-zinc-950">
                <img
                  src={mission.image}
                  alt={mission.target}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  onError={(e) => {
                    // Fallback visual if image fails
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                
                {/* Comic "REFORMED" Stamp */}
                <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-p5-yellow text-black font-persona text-sm font-bold uppercase tracking-wider border border-black shadow-[2px_2px_0px_#000] transform rotate-3">
                  TREASURE SECURED
                </div>

                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-xs font-mono text-white/90 bg-black/75 px-2 py-0.5 border border-white/30">
                  <Eye className="w-3.5 h-3.5 text-p5-yellow" />
                  <span>CLICK TO INSPECT</span>
                </div>
              </div>

              {/* Target Title */}
              <h3 className="font-persona text-2xl tracking-wide uppercase text-white group-hover:text-p5-red transition-colors mb-2">
                {mission.target}
              </h3>

              {/* Overview */}
              <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-2 mb-3">
                {mission.overview}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {mission.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono font-bold bg-zinc-900 text-p5-yellow px-2 py-0.5 border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcome Footer */}
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>MISSION SUCCESS</span>
              </span>
              <span className="text-gray-400 group-hover:text-white transition-colors">
                DOSSIER &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Target Inspection Modal */}
      {activeModal && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-zinc-950 border-4 border-white p-6 shadow-[10px_10px_0px_#e60012] skew-x-[-1deg] text-white"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 bg-p5-red hover:bg-white hover:text-black text-white font-bold border-2 border-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 bg-p5-red text-white font-persona text-sm font-black uppercase">
                  {activeModal.rank} // TARGET CONFIRMED
                </span>
                <span className="text-xs font-mono text-p5-yellow font-bold">
                  CLIENT: {activeModal.client}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-persona uppercase tracking-wider text-white">
                {activeModal.target}
              </h2>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-video w-full overflow-hidden border-2 border-white mb-4 bg-black">
              <img
                src={activeModal.image}
                alt={activeModal.target}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-200 font-sans leading-relaxed">
                {activeModal.overview}
              </p>

              <div className="p-3 bg-zinc-900 border border-emerald-500/50 text-emerald-400 font-mono text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-p5-yellow shrink-0" />
                <span>{activeModal.outcome}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeModal.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono font-bold bg-black text-p5-yellow px-2.5 py-1 border border-white/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-white/20">
              <span className="text-xs font-mono text-gray-400">
                STATUS: INFILTRATED & ARCHIVED
              </span>
              <button
                onClick={closeModal}
                className="w-full sm:w-auto px-6 py-2 bg-white text-black hover:bg-p5-red hover:text-white font-persona text-lg uppercase tracking-wider font-bold transition-all border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                RETURN TO HEIST BOARD (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
