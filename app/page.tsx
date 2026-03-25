"use client";

import { useState, useEffect } from "react";
import { Zap, Flame, Terminal, Play, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  duration_seconds: number;
  video_id: string; // Using YouTube ID for speed
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
        await new Promise(r => setTimeout(r, 800)); // Faster simulation
        setProgress(p);
      }

      setResult({
        reels: [
          { 
            reel_id: 1, 
            vps_score: 98, 
            title: "The Ultimate Rickroll Manifestation", 
            duration_seconds: 15,
            video_id: "dQw4w9WgXcQ" 
          },
          { 
            reel_id: 2, 
            vps_score: 89, 
            title: "Viral Gold: Never Gonna Give You Up", 
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
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      {/* Seamless Video Preview Modal */}
      <AnimatePresence>
        {previewId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={() => setPreviewId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              style={{ width: '100%', maxWidth: '400px', aspectRatio: '9/16', background: '#000', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 0 50px rgba(0,0,0,0.8)', position: 'relative' as 'relative' }}
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
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header style={{ marginBottom: '40px' }}>
        <h1 className="lab-title" style={{ fontSize: '2.5rem' }}>Viral Lab</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Minimalist Alchemist Dashboard.
        </p>
      </header>

      <section className="glass" style={{ padding: '32px', marginBottom: '40px' }}>
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {!isCooking && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input 
                type="text" 
                className="input-alchemist" 
                placeholder="Paste URL..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="glow-btn" onClick={startCooking}>
                <Zap size={18} fill="white" />
                Cook
              </button>
            </div>
          </motion.div>
        )}

        {isCooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <Flame size={32} color="var(--accent)" className="animate-pulse-slow" />
            </div>
            <div className="progress-container" style={{ margin: '0 auto', maxWidth: '300px' }}>
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={msgIdx}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ marginTop: '16px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}
              >
                {QUIRKY_MESSAGES[msgIdx]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div style={{ color: 'var(--success)', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>
               Manifested!
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {result.reels.map((reel) => (
                <div key={reel.reel_id} className="glass" style={{ padding: '16px', textAlign: 'left', background: 'rgba(0,0,0,0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', color: '#666' }}>VPS: {reel.vps_score}</span>
                  </div>
                  <h3 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>{reel.title}</h3>
                  <button 
                    className="glow-btn" 
                    style={{ width: '100%', justifyContent: 'center', padding: '6px', fontSize: '12px' }}
                    onClick={() => setPreviewId(reel.video_id)}
                  >
                    <Play size={12} fill="white" />
                    Preview
                  </button>
                </div>
              ))}
            </div>

            <button 
              style={{ marginTop: '24px', background: 'none', border: 'none', color: '#444', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}
              onClick={() => setResult(null)}
            >
              Reset Lab
            </button>
          </motion.div>
        )}
      </section>

      <footer style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: '#333', fontSize: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal size={12} />
          <span>Operational</span>
        </div>
        <div>
          Minimalist Alchemist v2.1
        </div>
      </footer>
    </main>
  );
}
