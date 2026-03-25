"use client";

import { useState, useEffect } from "react";
import { Upload, Zap, Flame, Terminal, Play, CheckCircle2, AlertCircle } from "lucide-react";
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
  video_url: string;
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

      const steps = [15, 30, 55, 75, 95, 100];
      for (const p of steps) {
        await new Promise(r => setTimeout(r, 1500));
        setProgress(p);
      }

      setResult({
        reels: [
          { 
            reel_id: 1, 
            vps_score: 92, 
            title: "The Hidden Truth About Coding", 
            duration_seconds: 34,
            video_url: "https://videos.pexels.com/video-files/3209211/3209211-uhd_2160_3840_25fps.mp4" 
          },
          { 
            reel_id: 2, 
            vps_score: 84, 
            title: "3 Tips for Viral Content", 
            duration_seconds: 41,
            video_url: "https://videos.pexels.com/video-files/3209211/3209211-uhd_2160_3840_25fps.mp4" 
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
    <main style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      {/* Video Preview Modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed' as 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              background: 'rgba(0,0,0,0.9)', 
              zIndex: 100, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '20px' 
            }}
            onClick={() => setPreviewUrl(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ 
                width: '100%', 
                maxWidth: '400px', 
                aspectRatio: '9/16', 
                background: '#000', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                boxShadow: '0 0 50px rgba(0,0,0,0.5)', 
                position: 'relative' as 'relative' 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={previewUrl} 
                controls 
                autoPlay 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <button 
                onClick={() => setPreviewUrl(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', zIndex: 101 }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <header style={{ marginBottom: '60px' }}>
        <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--primary-glow)', borderRadius: '20px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
          Manifesting Viral Gold
        </div>
        <h1 className="lab-title">Viral Lab</h1>
        <p style={{ color: '#888', fontSize: '1.25rem', fontWeight: 500 }}>
          Transmute low-retention footage into <span style={{ color: 'var(--accent)' }}>Viral Gold</span>.
        </p>
      </header>

      <section className="glass" style={{ padding: '48px', marginBottom: '40px' }}>
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <AlertCircle size={18} />
            {error}
          </div>
        )}

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
            <p style={{ color: '#888', marginBottom: '24px' }}>Stay calm. The pixels are being rearranged.</p>

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
              {result.reels.map((reel) => (
                <div key={reel.reel_id} className="glass" style={{ padding: '20px', textAlign: 'left', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>Reel #{reel.reel_id}</span>
                    <span style={{ fontSize: '12px', background: 'var(--accent)', padding: '2px 8px', borderRadius: '10px' }}>VPS: {reel.vps_score}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>{reel.title}</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="glow-btn" 
                      style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '14px' }}
                      onClick={() => setPreviewUrl(reel.video_url)}
                    >
                      <Play size={14} fill="white" />
                      Preview
                    </button>
                  </div>
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

      <footer style={{ display: 'flex', justifyContent: 'center', gap: '40px', color: '#444', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} />
          <span>Local Process: Ready</span>
        </div>
        <div>
          Code Cleaned & Handcrafted
        </div>
      </footer>
    </main>
  );
}
