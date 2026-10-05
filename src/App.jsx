import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Flame, Sparkles, MessageSquare, Terminal } from "lucide-react";
import HeaderWidget from "./components/HeaderWidget";
import MenuWheel from "./components/MenuWheel";
import CharacterStage from "./components/CharacterStage";
import StatusView from "./components/StatusView";
import SkillsView from "./components/SkillsView";
import MissionsView from "./components/MissionsView";
import ConfidantsView from "./components/ConfidantsView";
import CallingCardView from "./components/CallingCardView";
import AllOutAttackModal from "./components/AllOutAttackModal";
import ControlsHelpModal from "./components/ControlsHelpModal";
import DialogueBox from "./components/DialogueBox";
import { playSfx } from "./utils/soundEngine";

const TAB_KEYS = ["status", "skills", "missions", "confidants", "calling"];

export default function App() {
  const [theme, setTheme] = useState("p5"); // 'p5' (Red) | 'p3' (Blue)
  const [activeTab, setActiveTab] = useState(0);
  const [allOutOpen, setAllOutOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "p5" ? "p3" : "p5"));
  };

  const handleSelectTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const triggerAllOut = () => {
    setAllOutOpen(true);
  };

  // Keyboard shortcut listener for Help modal & Spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        setHelpOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentTabKey = TAB_KEYS[activeTab] || "status";

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden select-none font-sans text-white transition-colors duration-500 ${
        theme === "p5"
          ? "bg-[#0b0b0e] selection:bg-[#e60012] selection:text-white"
          : "bg-[#050a14] selection:bg-[#0066ff] selection:text-white"
      }`}
    >
      {/* Dynamic Background Halftone Grid */}
      <div className="fixed inset-0 p5-halftone opacity-20 pointer-events-none z-0" />

      {/* Dramatic Persona Background Red / Blue Slanted Slices */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-1/4 -right-1/4 w-[120%] h-[120%] transform -rotate-12 opacity-15 ${
            theme === "p5"
              ? "bg-gradient-to-bl from-[#e60012] via-transparent to-transparent"
              : "bg-gradient-to-bl from-[#0066ff] via-transparent to-transparent"
          }`}
        />
        <div
          className={`absolute -bottom-1/3 -left-1/4 w-[110%] h-[60%] transform rotate-6 opacity-10 ${
            theme === "p5" ? "bg-[#e60012]" : "bg-[#00d2ff]"
          }`}
        />
      </div>

      {/* Top Header Widget */}
      <HeaderWidget theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 pb-24">
        {/* Top Mobile Menu Bar (visible on smaller screens) */}
        <div className="lg:hidden flex items-center justify-between gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {["STATUS", "SKILLS", "MISSIONS", "CONFIDANTS", "CALLING CARD"].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSfx("select");
                setActiveTab(idx);
              }}
              className={`px-3 py-1.5 font-persona text-sm tracking-wider uppercase whitespace-nowrap border-2 font-bold transition-all ${
                activeTab === idx
                  ? theme === "p5"
                    ? "bg-p5-red text-white border-white shadow-[3px_3px_0px_#000]"
                    : "bg-blue-600 text-white border-white shadow-[3px_3px_0px_#000]"
                  : "bg-black/80 text-gray-300 border-white/20 hover:border-white"
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={triggerAllOut}
            className="px-3 py-1.5 font-persona text-sm tracking-wider uppercase whitespace-nowrap bg-gradient-to-r from-red-600 to-amber-500 text-white border-2 border-white shadow-[3px_3px_0px_#000] font-black animate-pulse"
          >
            ALL-OUT!
          </button>
        </div>

        {/* Desktop Layout: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Menu Wheel & Character Stage (5 cols on Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
            {/* The Iconic Slanted Persona Menu Wheel */}
            <div className="bg-black/60 p-4 border-2 border-white/20 backdrop-blur-sm shadow-[6px_6px_0px_#000] p5-skew-l">
              <div className="p5-unskew-l">
                <div className="text-[11px] font-mono uppercase text-p5-yellow font-bold tracking-widest mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-p5-red" />
                  <span>PHANTOM NAVIGATION</span>
                </div>
                <MenuWheel
                  activeTab={activeTab}
                  onSelectTab={handleSelectTab}
                  onTriggerAllOut={triggerAllOut}
                  theme={theme}
                />
              </div>
            </div>

            {/* Character Stage (Joker / Rezky Portrait) */}
            <div className="bg-black/60 border-2 border-white/20 backdrop-blur-sm shadow-[6px_6px_0px_#000] overflow-hidden">
              <CharacterStage theme={theme} />
            </div>
          </div>

          {/* Right Column: Active Interactive View (8 cols on Desktop) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                {activeTab === 0 && <StatusView theme={theme} />}
                {activeTab === 1 && <SkillsView theme={theme} />}
                {activeTab === 2 && <MissionsView theme={theme} />}
                {activeTab === 3 && <ConfidantsView theme={theme} />}
                {activeTab === 4 && <CallingCardView theme={theme} />}
              </motion.div>
            </AnimatePresence>

            {/* Comic Navigator Speech Bubble Dialogue */}
            <DialogueBox activeTab={currentTabKey} />
          </div>
        </div>
      </main>

      {/* Floating Bottom Action Dock */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t-3 border-white/30 backdrop-blur-md px-4 sm:px-8 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setHelpOpen(true)}
            onMouseEnter={() => playSfx("hover")}
            className="flex items-center gap-1.5 text-gray-300 hover:text-p5-yellow transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-p5-yellow" />
            <span className="hidden sm:inline">CONTROLS (SHORTCUTS)</span>
            <span className="text-[10px] bg-zinc-800 text-white px-1.5 py-0.5 rounded border border-white/20">
              [?]
            </span>
          </button>

          <span className="text-white/20">|</span>

          <span className="text-gray-400 hidden md:inline">
            CODENAME: <strong className="text-white">REZKY</strong> &bull; SMK WIRASWASTA CIMAHI (RPL)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerAllOut}
            onMouseEnter={() => playSfx("hover")}
            className="flex items-center gap-1.5 px-3 py-1 bg-p5-red hover:bg-white hover:text-black text-white font-persona text-base uppercase font-black tracking-widest border border-white transition-all transform hover:scale-105 active:scale-95 shadow-[2px_2px_0px_#000]"
          >
            <Flame className="w-4 h-4" />
            <span>ALL-OUT ATTACK [SPACE]</span>
          </button>
        </div>
      </footer>

      {/* Fullscreen Modals */}
      <AllOutAttackModal
        isOpen={allOutOpen}
        onClose={() => setAllOutOpen(false)}
      />

      <ControlsHelpModal
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
      />
    </div>
  );
}
