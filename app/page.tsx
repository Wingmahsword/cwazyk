"use client";

import { useState, useEffect } from "react";
import { Upload, Zap, Flame, Terminal, Play, CheckCircle2 } from "lucide-react";
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

export default function Home() {
  const [url, setUrl] = useState("");
  const [isCooking, setIsCooking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    let interval: any;
    if (isCooking) {
      interval = setInterval(() => {
        setMsgIdx((prev) => (prev + 1) % QUIRKY_MESSAGES.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isCooking]);

  // Simulated "Cooking" for demo
  const startCooking = () => {
    setIsCooking(true);
    setProgress(5);
    setResult(null);

    // Simulated progress steps
    const steps = [15, 30, 55, 75, 95, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
        if (p === 100) {
          setTimeout(() => {
            setIsCooking(false);
            setResult({
              reels: [
                { id: 1, vps: 92, title: "The Hidden Truth About Coding" },
                { id: 2, vps: 84, title: "3 Tips for Viral Content" }
              ]
            });
          }, 1000);
        }
      }, (i + 1) * 2500);
    });
  };

  return (
    <main style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <header style={{ marginBottom: '60px' }}>
        <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--primary-glow)', borderRadius: '20px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
          Beta v2.0
        </div>
        <h1 className="lab-title">Viral Lab</h1>
        <p style={{ color: '#888', fontSize: '1.25rem', fontWeight: 500 }}>
          Transmute low-retention footage into <span style={{ color: 'var(--accent)' }}>Viral Gold</span>.
        </p>
      </header>

      <section className="glass" style={{ padding: '48px', marginBottom: '40px' }}>
        {!isCooking && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Upload size={24} color="#888" />
              </div>
              <p style={{ color: '#aaa' }}>Paste a YouTube URL or drop your MP4</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input 
                type="text" 
                className="input-alchemist" 
                placeholder="https://youtube.com/watch?v=..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="glow-btn" onClick={startCooking}>
                <Zap size={20} fill="white" />
                Cook Reel
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#555' }}>Supports .MP4, .MOV, .AVI up to 2GB</p>
          </motion.div>
        )}

        {isCooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div className="animate-pulse-slow">
                <Flame size={48} color="var(--accent)" />
              </div>
            </div>
            
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Alchemy in progress...</h2>
            <p style={{ color: '#888', marginBottom: '24px' }}>Please do not refresh the lab. Potions are fragile.</p>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={msgIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="quirky-status"
              >
                {QUIRKY_MESSAGES[msgIdx]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
               <CheckCircle2 color="var(--success)" />
               <span style={{ fontWeight: 'bold' }}>Reels Manifested!</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {result.reels.map((reel: any) => (
                <div key={reel.id} className="glass" style={{ padding: '20px', textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>REEL #0{reel.id}</span>
                    <span style={{ fontSize: '12px', background: 'var(--accent)', padding: '2px 8px', borderRadius: '10px' }}>VPS: {reel.vps}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>{reel.title}</h3>
                  <button className="glow-btn" style={{ width: '100%', justifyContent: 'center', padding: '8px' }}>
                    <Play size={16} fill="white" />
                    Preview
                  </button>
                </div>
              ))}
            </div>

            <button 
              style={{ marginTop: '32px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setResult(null)}
            >
              Start New Batch
            </button>
          </motion.div>
        )}
      </section>

      <footer style={{ display: 'flex', justifyContent: 'center', gap: '40px', color: '#444', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} />
          <span>Local Worker Active</span>
        </div>
        <div>
          Powered by <strong>Antigravity Engine</strong>
        </div>
      </footer>
    </main>
  );
}
