import React from "react";
import { MessageSquareCode, Sparkles } from "lucide-react";

const dialogues = {
  status: "Looking sharp, Rezky! All stats are maxed out and the Magician Arcana is shining brightly. Ready to steal any client's heart!",
  skills: "Choose your elemental attack! From React lightning combos to PHP Megidolaon, each skill deals massive productivity damage!",
  missions: "Here are all the Palaces we've infiltrated and reformed! Enterprise logistics, AI computer vision, maritime supply chains... all clean steals!",
  confidants: "These are your precious bonds from SMK Wiraswasta Cimahi to the AI Lab. Every maxed rank grants extraordinary coding perks!",
  calling: "Time to send a formal Phantom Thieves notice! Declare your project target and let's coordinate the heist!",
  allout: "The finisher! When an outdated site needs a total overhaul, an All-Out Attack will leave them speechless!"
};

export default function DialogueBox({ activeTab = "status" }) {
  const currentText = dialogues[activeTab] || dialogues.status;

  return (
    <div className="relative bg-black/95 border-3 border-white p-3 sm:p-4 shadow-[5px_5px_0px_#e60012] skew-x-[-2deg] flex items-center gap-3 sm:gap-4 overflow-hidden">
      {/* Navigator Badge */}
      <div className="shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-p5-red border-2 border-white rounded-full flex items-center justify-center shadow-[2px_2px_0px_#000]">
          <MessageSquareCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <span className="font-persona text-[11px] font-black uppercase text-p5-yellow tracking-widest mt-1">
          NAVIGATOR
        </span>
      </div>

      {/* Speech Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-mono font-bold bg-white text-black px-1.5 py-0.2">
            MORGANA / ADVISOR
          </span>
          <span className="text-[10px] font-mono text-p5-yellow flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>LIVE COMMS</span>
          </span>
        </div>
        <p className="font-sans text-xs sm:text-sm text-gray-200 leading-snug line-clamp-2">
          "{currentText}"
        </p>
      </div>
    </div>
  );
}
