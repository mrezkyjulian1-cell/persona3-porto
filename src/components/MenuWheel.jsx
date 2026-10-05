import { useEffect } from "react";
import { motion } from "framer-motion";
import { User, Zap, Target, Users, Mail, Flame, Skull } from "lucide-react";
import { playSfx } from "../utils/soundEngine";

const MENU_ITEMS = [
  { id: 0, key: "status", label: "STATUS", icon: User, desc: "Protagonist Stats & Equipment", color: "#e60012" },
  { id: 1, key: "persona", label: "PERSONA", icon: Zap, desc: "Active Skills & Elemental Affinities", color: "#00d2ff" },
  { id: 2, key: "missions", label: "MISSIONS", icon: Target, desc: "Phantom Quests & Completed Projects", color: "#ffcc00" },
  { id: 3, key: "confidants", label: "CONFIDANTS", icon: Users, desc: "Social Links, School & Education", color: "#a855f7" },
  { id: 4, key: "calling_card", label: "CALLING CARD", icon: Mail, desc: "Take Your Heart • Send Direct Message", color: "#e60012" },
  { id: 5, key: "all_out", label: "ALL-OUT ATTACK", icon: Flame, desc: "Execute Critical Finisher", color: "#ff1a2b", isAction: true },
];

export default function MenuWheel({ activeTab, onSelectTab, onTriggerAllOut, theme = "p5" }) {
  const isRed = theme === "p5";

  // Keyboard navigation support: Arrow Up/Down, Enter, 1-6 keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowDown", "s", "S"].includes(e.key)) {
        e.preventDefault();
        playSfx("hover");
        onSelectTab((prev) => (prev + 1) % (MENU_ITEMS.length - 1));
      } else if (["ArrowUp", "w", "W"].includes(e.key)) {
        e.preventDefault();
        playSfx("hover");
        onSelectTab((prev) => (prev - 1 + (MENU_ITEMS.length - 1)) % (MENU_ITEMS.length - 1));
      } else if (e.key === "Enter" || e.key === " ") {
        playSfx("select");
      } else if (["1", "2", "3", "4", "5"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        playSfx("select");
        onSelectTab(idx);
      } else if (e.key === "6") {
        onTriggerAllOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectTab, onTriggerAllOut]);

  return (
    <nav className="flex flex-col gap-2.5 sm:gap-3.5 w-full max-w-[280px] sm:max-w-[340px] text-left select-none">
      {MENU_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.isAction) {
                onTriggerAllOut();
              } else {
                playSfx("select");
                onSelectTab(item.id);
              }
            }}
            onMouseEnter={() => playSfx("hover")}
            whileHover={{ x: 12, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5 transition-all duration-200 border-2 font-display ${
              item.isAction
                ? "bg-gradient-to-r from-[#ff0033] to-[#800000] border-white text-white shadow-[0_0_25px_rgba(255,0,51,0.6)] animate-pulse"
                : isActive
                ? isRed
                  ? "bg-[#e60012] border-white text-white shadow-[0_8px_30px_rgba(230,0,18,0.7)] translate-x-4 scale-105"
                  : "bg-[#0066ff] border-white text-white shadow-[0_8px_30px_rgba(0,102,255,0.7)] translate-x-4 scale-105"
                : "bg-black/85 border-white/20 text-slate-200 hover:border-white/80 hover:bg-black/95"
            } p5-skew-l`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 94% 100%, 0% 100%)",
            }}
          >
            {/* Active Indicator Jagged Red/Cyan Tag on the Left */}
            {isActive && !item.isAction && (
              <div className="absolute -left-2 top-0 bottom-0 w-3 bg-[#ffcc00] p5-skew-l shadow-[0_0_10px_#ffcc00]" />
            )}

            {/* Menu Label with Persona Ransom-style Lettering */}
            <div className="flex items-center gap-3 p5-unskew-l">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-transform group-hover:rotate-12 ${
                isActive ? "bg-black text-white" : "bg-white/10 text-white"
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <span className="text-xl sm:text-2xl font-black tracking-wider block leading-none">
                  {item.label}
                </span>
                <span className={`text-[10px] font-mono tracking-widest hidden sm:block mt-0.5 ${
                  isActive ? "text-white/90" : "text-slate-400"
                }`}>
                  {item.desc}
                </span>
              </div>
            </div>

            {/* Trailing Star / Number Badge */}
            <div className="flex items-center gap-1.5 p5-unskew-l">
              <span className={`text-xs font-mono font-extrabold px-1.5 py-0.5 rounded ${
                isActive ? "bg-white text-black" : "bg-white/10 text-slate-300"
              }`}>
                0{item.id + 1}
              </span>
            </div>
          </motion.button>
        );
      })}
    </nav>
  );
}
