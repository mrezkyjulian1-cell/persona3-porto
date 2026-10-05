import React, { useState } from "react";
import { Send, Mail, AlertTriangle, CheckCircle2, Flame, Copy, Check } from "lucide-react";
import { personaData } from "../data/personaData";
import { playSfx } from "../utils/soundEngine";

export default function CallingCardView({ theme = "p5" }) {
  const { profile } = personaData;
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    message: ""
  });
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    playSfx("type");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playSfx("slash");
    setIsSent(true);

    // Open mailto fallback
    const subject = encodeURIComponent(`[COLLABORATION HEIST] From ${formData.senderName || 'Anonymous'}`);
    const body = encodeURIComponent(
      `Sender: ${formData.senderName}\nEmail: ${formData.senderEmail}\n\nProject Heist Proposal:\n${formData.message}`
    );
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_blank");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    playSfx("select");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-white animate-fade-in">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/90 p-4 border-4 border-white shadow-[6px_6px_0px_#e60012] skew-x-[-2deg]">
        <div>
          <div className="text-xs font-mono uppercase text-p5-yellow font-bold tracking-widest flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-p5-red" />
            <span>PHANTOM THIEVES FORMAL NOTICE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-persona uppercase tracking-wider text-white">
            TRANSMIT CALLING CARD
          </h2>
        </div>
        <button
          onClick={copyEmail}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-white hover:text-black text-p5-yellow font-mono text-xs border border-white/40 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "EMAIL COPIED!" : profile.email}</span>
        </button>
      </div>

      {/* Main Calling Card Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Authentic Calling Card Graphic & Notice (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-zinc-950 border-4 border-white p-4 shadow-[6px_6px_0px_#000]">
            {/* Visual Card Image */}
            <div className="relative overflow-hidden border-2 border-white mb-3">
              <img
                src="/assets/calling_card.jpg"
                alt="Phantom Thieves Calling Card"
                className="w-full h-auto object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-p5-red/10 mix-blend-multiply pointer-events-none" />
            </div>

            {/* Letter Content */}
            <div className="font-persona text-sm tracking-wide uppercase text-gray-200 space-y-2 border-t-2 border-white/30 pt-3">
              <p className="text-p5-yellow font-bold text-base">
                SIR / MADAM OF CREATIVE AMBITION,
              </p>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                You have reached the hideout of Muhammad Rezky Julian. If you have an outdated website, slow interface, or an ambitious software idea waiting to be born, we shall infiltrate and build it.
              </p>
              <p className="font-persona text-p5-red font-bold text-base">
                FROM: THE PHANTOM DEVELOPER
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Calling Card Form (7 cols) */}
        <div className="lg:col-span-7 bg-black/90 border-4 border-white p-6 shadow-[7px_7px_0px_#e60012] relative overflow-hidden">
          {isSent ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-scale-up">
              <div className="w-16 h-16 bg-p5-red border-3 border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_#000]">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-persona uppercase tracking-wider text-p5-yellow">
                  CALLING CARD DELIVERED!
                </h3>
                <p className="text-sm font-sans text-gray-300 max-w-md mx-auto">
                  Your message has been stamped and dispatched to <span className="text-white font-mono font-bold">{profile.email}</span>. Expect a response shortly!
                </p>
              </div>
              <button
                onClick={() => setIsSent(false)}
                className="mt-4 px-6 py-2 bg-white text-black hover:bg-p5-red hover:text-white font-persona text-lg uppercase tracking-wider font-bold transition-all border-2 border-black"
              >
                DISPATCH ANOTHER NOTICE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b-2 border-white/30 pb-2 mb-4">
                <h3 className="font-persona text-2xl tracking-wider uppercase text-white">
                  DECLARE YOUR PROJECT OBJECTIVE
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  Direct transmission to {profile.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-persona uppercase tracking-wider text-p5-yellow font-bold mb-1">
                  YOUR CODENAME / NAME *
                </label>
                <input
                  type="text"
                  name="senderName"
                  required
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="e.g. Ren Amamiya / Client X"
                  className="w-full bg-zinc-950 border-2 border-white/60 focus:border-p5-yellow text-white text-sm px-3.5 py-2.5 font-mono outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-persona uppercase tracking-wider text-p5-yellow font-bold mb-1">
                  RETURN FREQUENCY / EMAIL *
                </label>
                <input
                  type="email"
                  name="senderEmail"
                  required
                  value={formData.senderEmail}
                  onChange={handleChange}
                  placeholder="e.g. client@organization.com"
                  className="w-full bg-zinc-950 border-2 border-white/60 focus:border-p5-yellow text-white text-sm px-3.5 py-2.5 font-mono outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-persona uppercase tracking-wider text-p5-yellow font-bold mb-1">
                  HEIST OBJECTIVE / MESSAGE *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your web application, timeline, or collaboration ideas..."
                  className="w-full bg-zinc-950 border-2 border-white/60 focus:border-p5-yellow text-white text-sm px-3.5 py-2.5 font-mono outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-p5-red hover:bg-white hover:text-black text-white font-persona text-2xl uppercase tracking-widest font-black transition-all border-3 border-white shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>TRANSMIT CALLING CARD NOW</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
