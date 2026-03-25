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
            video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          },
          { 
            reel_id: 2, 
            vps_score: 84, 
            title: "3 Tips for Viral Content", 
            duration_seconds: 41,
            video_url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
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
                muted
                playsInline
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

      {/* SEO Section: Features & How it Works */}
      <section style={{ marginTop: '100px', textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        <div>
          <h3 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '1.2rem' }}>AI Emotion Analysis</h3>
          <p style={{ color: '#888', lineHeight: '1.6' }}>Our alchemists use Hume AI to detect high-dopamine moments, ensuring your reels hit the emotional peaks that drive virality.</p>
        </div>
        <div>
          <h3 style={{ color: 'var(--accent)', marginBottom: '16px', fontSize: '1.2rem' }}>Auto-Dynamic Captions</h3>
          <p style={{ color: '#888', lineHeight: '1.6' }}>Burned-in, word-synced subtitles with keyword highlighting. Optimized for sound-off scrolling on Instagram and TikTok.</p>
        </div>
        <div>
          <h3 style={{ color: 'var(--success)', marginBottom: '16px', fontSize: '1.2rem' }}>Vertical 9:16 Reframing</h3>
          <p style={{ color: '#888', lineHeight: '1.6' }}>Automatic face-tracking and horizontal-to-vertical conversion. No more manual cropping or lost focus.</p>
        </div>
      </section>

      <section style={{ marginTop: '100px', borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Why use the Viral Lab?</h2>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#fff', marginBottom: '8px' }}>Is this free video to reel converter really free?</h4>
            <p style={{ color: '#888' }}>Yes! The Viral Lab is built to empower creators to transmute their content without expensive subscription fees.</p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#fff', marginBottom: '8px' }}>How does the AI choose viral segments?</h4>
            <p style={{ color: '#888' }}>We analyze audio sentiment, facial expressions, and visual energy to find "hooks" and "value bombs" that the algorithm loves.</p>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: '100px', paddingBottom: '40px', borderTop: '1px solid var(--glass-border)', paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '40px', color: '#444', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={14} />
            <span>Local Alchemist Process: Ready</span>
          </div>
          <div>
            Powered by <strong>Antigravity Engine</strong>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: '#333', maxWidth: '600px' }}>
          Viral Lab is the premier AI Reel Maker for creators. Convert YouTube to Reels, Video to TikToks, and long-form to Shorts instantly. 
          The alchemists are not responsible for sudden spikes in follower counts.
        </p>
      </footer>
    </main>
  );
}
