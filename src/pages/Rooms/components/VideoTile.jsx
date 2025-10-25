import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MicOff, VideoOff, Hand } from 'lucide-react';

export default function VideoTile({ tile, refEl, active, handOn }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!tile?.stream) return;
    const el = refEl || videoRef.current;
    if (!el) return;
    if (el.srcObject !== tile.stream) el.srcObject = tile.stream;
    try { el.playsInline = true; } catch {}
    if (tile.local) {
      try { el.muted = true; } catch {}
    }
    const tryPlay = async () => {
      try {
        await el.play();
      } catch (err) {
        if (!el.muted) {
          try { el.muted = true; } catch {}
          try { await el.play(); } catch {}
        }
      }
    };
    if (el.readyState >= 2) {
      tryPlay();
    } else {
      const onLoaded = () => { tryPlay(); el.removeEventListener('loadedmetadata', onLoaded); };
      el.addEventListener('loadedmetadata', onLoaded);
      return () => el.removeEventListener('loadedmetadata', onLoaded);
    }
  }, [tile?.stream, refEl, tile?.local]);

  if (!tile) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl overflow-hidden bg-black/30 aspect-video border ${active ? 'border-white/70' : 'border-white/20'} shadow-lg`}
    >
      <video ref={refEl || videoRef} autoPlay playsInline muted={tile.local} className="w-full h-full object-cover" />
      {/* Overlays */}
      {tile.videoOff && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <VideoOff className="w-10 h-10 text-white/80" />
        </div>
      )}
      <div className="absolute left-2 bottom-2 right-2 flex items-center justify-between">
        <div className="px-2 py-1 rounded-md bg-black/50 text-white text-xs backdrop-blur">
          {tile.name}
        </div>
        <div className="flex items-center gap-2">
          {handOn && <Hand className="w-4 h-4 text-yellow-300" title="Raised hand" />}
          {tile.muted && <MicOff className="w-4 h-4 text-red-300" title="Muted" />}
        </div>
      </div>
    </motion.div>
  );
}