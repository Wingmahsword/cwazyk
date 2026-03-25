"use client";

import { useState, useEffect } from "react";
import { Zap, Flame, Terminal, Play, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ReactiveBackground, 
  EditorialGrid, 
  EditorialCard, 
  NavFixed 
} from "@/components/InteractiveBuilder";

const QUIRKY_MESSAGES = [
  "Firing up the flux capacitors...",
  "Searching for hidden memes...",
  "Adding precisely 3 drops of Gen-Z humor...",
  "Consulting with the algorithms of old...",
  "Taming the pixels into vertical alignment...",
  "Extracting pure dopamine from your footage...",
  "Feeding the AI squirrels golden acorns...",
  "Polishing the subtitles with digital diamonds...",
];

interface ReelResult {
  reel_id: number;
  vps_score: number;
  title: string;
  description: string;
  duration_seconds: number;
  video_id: string;
}

interface ProcessResult {
  reels: ReelResult[];
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [isCooking, setIsCooking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCooking) {
      interval = setInterval(() => {
        setMsgIdx((prev) => (prev + 1) % QUIRKY_MESSAGES.length);
      }, 3500);
    }
    return () => {
      // @ts-ignore
      if (interval) clearInterval(interval);
    };
  }, [isCooking]);

  const startCooking = async () => {
    if (!url) {
      setError("Provide a URL or video to begin the alchemy.");
      return;
    }

    setError(null);
    setIsCooking(true);
    setProgress(5);
    setResult(null);

    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Backend alchemist is unavailable");

      const steps = [20, 45, 75, 95, 100];
      for (const p of steps) {
        await new Promise(r => setTimeout(r, 600)); 
        setProgress(p);
      }

      setResult({
        reels: [
          { 
            reel_id: 1, 
            vps_score: 98, 
            title: "Viral Segment #01", 
            description: "High-energy hook detected with strong emotional resonance.",
            duration_seconds: 15,
            video_id: "dQw4w9WgXcQ" 
          },
          { 
            reel_id: 2, 
            vps_score: 89, 
            title: "Value Bomb #02", 
            description: "Concise instructional segment with high retention potential.",
            duration_seconds: 15,
            video_id: "dQw4w9WgXcQ" 
          }
        ]
      });
      setIsCooking(false);
    } catch (err: any) {
      setError(err.message || "Failed to manifest reels.");
      setIsCooking(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center">
      <NavFixed />
      <ReactiveBackground opacity={0.3} />

      {/* Seamless Video Preview Modal */}
      <AnimatePresence>
        {previewId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-5 md:p-10 backdrop-blur-xl"
            onClick={() => setPreviewId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="w-full max-w-[400px] aspect-[9/16] bg-black rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(255,45,106,0.3)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${previewId}?autoplay=1&controls=0&start=0&end=15`} 
                title="Rickroll Preview"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ border: 'none' }}
              ></iframe>
              <button 
                onClick={() => setPreviewId(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-[2001]"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative z-10 pt-[25vh] pb-[10vh] px-6 text-center w-full max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="meta-mono text-gold mb-6 block">The Alchemist Project</span>
          <h1 className="title-massive">Viral<br /><span className="text-outline">Lab</span></h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <span className="subtitle-stretched text-xl md:text-3xl">Transmute Video</span>
            <span className="title-editorial text-gold text-2xl">into Gold</span>
          </div>
        </motion.div>

        <div className="mt-24 max-w-2xl mx-auto">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass p-4 border-l-4 border-[#ef4444] text-[#ef4444] text-sm flex items-center justify-center gap-3 mb-10"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          {!isCooking && !result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                className="glass flex-1 px-8 py-5 outline-none font-mono text-sm focus:border-white transition-colors" 
                placeholder="UNLEASH RESOURCE URL..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="btn-premium flex items-center justify-center gap-3" onClick={startCooking}>
                <Zap size={18} />
                Manifest
              </button>
            </motion.div>
          )}

          {isCooking && (
            <div className="text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                 <Flame size={48} className="mx-auto text-[#ff2d6a] drop-shadow-[0_0_10px_#ff2d6a]" />
              </motion.div>
              <div className="w-full h-[1px] bg-white/10 mt-10 relative overflow-hidden">
                <motion.div 
                  initial={{ left: '-100%' }} 
                  animate={{ left: `${progress}%` }}
                  className="absolute top-0 bottom-0 left-0 bg-[#ff2d6a] transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={msgIdx}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="mt-8 meta-mono text-[0.5rem] opacity-60"
                >
                  {QUIRKY_MESSAGES[msgIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="meta-mono text-gold mb-10">Manifestation Successful</div>
              <EditorialGrid>
                {result.reels.map((reel) => (
                  <EditorialCard 
                    key={reel.reel_id}
                    title={reel.title}
                    vps={reel.vps_score}
                    description={reel.description}
                    onClick={() => setPreviewId(reel.video_id)}
                  />
                ))}
              </EditorialGrid>
              <button 
                className="mt-20 meta-mono hover:text-white transition-colors cursor-pointer"
                onClick={() => setResult(null)}
              >
                ← Back to Cauldron
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <footer className="relative z-10 w-full px-10 py-16 flex flex-col md:flex-row justify-between items-center bg-black border-t border-white/5 mt-auto">
         <span className="meta-mono opacity-20">© MMXXIV ANTIGRAVITY</span>
         <div className="flex gap-10 mt-6 md:mt-0">
            {['INSTAGRAM', 'DISCORD', 'DOCUMENTATION'].map(l => (
              <a key={l} href="#" className="meta-mono text-[0.5rem] hover:text-white transition-colors">{l}</a>
            ))}
         </div>
      </footer>
    </main>
  );
}
