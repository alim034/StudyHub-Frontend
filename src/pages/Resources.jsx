import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ExternalLink, BookMarked, Tags, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- AnimatedBackground (Unchanged) ---
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <motion.div
        animate={{ x: ["-25%", "25%", "-25%"], y: ["-15%", "15%", "-15%"], scale: [1, 1.3, 1], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.3) 40%, rgba(59,130,246,0.1) 70%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ x: ["25%", "-25%", "25%"], y: ["15%", "-15%", "15%"], scale: [1.2, 0.8, 1.2], rotate: [360, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.4) 40%, rgba(139,92,246,0.1) 70%, transparent 100%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -100, 150, 0],
          scale: [1, 1.5, 0.7, 1],
          opacity: [0.3, 0.6, 0.1, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[30%] w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(6,182,212,0.2) 50%, rgba(6,182,212,0.05) 80%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -150, 100, 0], y: [0, 120, -80, 0], scale: [0.8, 1.6, 0.9, 0.8], opacity: [0.2, 0.5, 0.1, 0.2], rotate: [360, 180, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[25%] right-[25%] w-72 h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0.3) 50%, rgba(168,85,247,0.1) 80%, transparent 100%)",
          filter: "blur(45px)",
        }}
      />
      {Array.from({ length: 15 }).map((_, i) => {
        const randomDelay = Math.random() * 10;
        const randomDuration = 10 + Math.random() * 15;
        const randomSize = 30 + Math.random() * 60;
        return (
          <motion.div
            key={`particle-${i}`}
            animate={{
              x: [Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150],
              y: [Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 300 - 150],
              scale: [0.3, 2, 1, 0.3],
              opacity: [0, 0.8, 0.4, 0],
              rotate: [0, 360, 180, 0],
            }}
            transition={{ duration: randomDuration, delay: randomDelay, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              left: `${10 + i * 6}%`,
              top: `${5 + i * 7}%`,
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              background:
                i % 4 === 0
                  ? "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.2) 50%, transparent 80%)"
                  : i % 4 === 1
                  ? "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0.2) 50%, transparent 80%)"
                  : i % 4 === 2
                  ? "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(6,182,212,0.2) 50%, transparent 80%)"
                  : "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0.2) 50%, transparent 80%)",
              filter: "blur(3px)",
            }}
          />
        );
      })}
      <motion.div
        animate={{ opacity: [0.01, 0.15, 0.05, 0.01], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <motion.div
        animate={{ rotate: [0, 360], x: [0, 100, -50, 0], y: [0, -50, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-20 h-20 border-2 border-blue-400/20 rounded-lg"
        style={{ filter: "blur(1px)" }}
      />
      <motion.div
        animate={{ rotate: [360, 0], x: [0, -80, 120, 0], y: [0, 80, -60, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[15%] right-[15%] w-16 h-16 border-2 border-purple-400/20 rounded-full"
        style={{ filter: "blur(1px)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20" />
    </div>
  );
};
// ---------------------------------------------

const emptyRes = { title: '', link: '', type: 'notes', tags: '' };

export default function Resources() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyRes);
  const { user } = useAuth();

  // Build a user-specific storage key so resources persist across sign-in/sign-up per account
  const storageKey = useMemo(() => {
    const id = user?._id || user?.id || user?.email || 'guest';
    return `userResources:${id}`;
  }, [user]);

  useEffect(() => {
    // Migrate legacy key to user-specific key if needed
    try {
      const legacy = localStorage.getItem('userResources');
      const current = localStorage.getItem(storageKey);
      if (user && legacy && (!current || current === '[]')) {
        localStorage.setItem(storageKey, legacy);
        // Keep legacy for backward compatibility; remove if you want strict per-user separation
      }
    } catch {}

    // Load user-specific data
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setItems(Array.isArray(saved) ? saved : []);
    } catch {
      setItems([]);
    }
  }, [storageKey]);

  const save = (next) => {
    setItems(next);
    // Save under user-specific key for account persistence
    localStorage.setItem(storageKey, JSON.stringify(next));
    // Also write legacy key for any existing code reading it elsewhere
    localStorage.setItem('userResources', JSON.stringify(next));
  };

  // Validate and normalize URL; returns string or null
  const normalizeUrl = (raw) => {
    const s = (raw || "").trim();
    if (!s) return null;
    try {
      // If it already has protocol and is valid
      const u = new URL(s);
      return u.toString();
    } catch {
      // Try prefixing https://
      try {
        const u2 = new URL(`https://${s}`);
        return u2.toString();
      } catch {
        return null;
      }
    }
  };

  const safeId = () => {
    try {
      if (typeof crypto !== 'undefined' && crypto?.randomUUID) {
        return crypto.randomUUID();
      }
    } catch {}
    return `res-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  };

  const add = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const title = form.title.trim();
    const link = normalizeUrl(form.link);

    if (!title) {
      alert('Please enter a title.');
      return;
    }
    if (!link) {
      alert('Please enter a valid link (e.g., https://example.com or example.com).');
      return;
    }

    const next = [
      ...items,
      {
        id: safeId(),
        title,
        link,
        type: form.type,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        uploadedAt: Date.now(),
        by: user?.name || user?.username || 'You'
      }
    ];
    save(next);
    setForm(emptyRes);
  };

  const remove = (id) => save(items.filter(i => i.id !== id));

  const typeColor = (t) =>
    t === 'guide' ? 'text-orange-300' :
    t === 'cheatsheet' ? 'text-green-300' :
    t === 'roadmap' ? 'text-blue-300' : 'text-purple-300';

  return (
    <main className="min-h-screen relative text-white">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Resources</h1>
          <p className="text-white/70">Upload and manage study materials shared across rooms.</p>
        </div>

        {/* Upload form (metadata) */}
        <motion.form
          onSubmit={add}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 mb-8"
        >
          {/* --- MODIFIED: Adjusted grid layout --- */}
          {/* We use 6 columns to make layout easier */}
          <div className="grid gap-4 md:grid-cols-6">
            <input
              type="text"
              placeholder="Title (e.g., DP Cheat Sheet)"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              // --- Span 2 columns ---
              className="md:col-span-2 w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <input
              type="url"
              placeholder="Link (Google Drive, Notion, etc.)"
              value={form.link}
              onChange={(e) => setForm(f => ({ ...f, link: e.target.value }))}
              // --- Span 2 columns ---
              className="md:col-span-2 w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <select
              value={form.type}
              onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
               // --- Span 2 columns on mobile, 1 on desktop ---
              className="md:col-span-2 w-full rounded-lg bg-white/10 border border-white/20 text-white/70 focus:outline-none focus:border-blue-400"
            >
              <option className="bg-slate-800 text-white" value="notes">Notes</option>
              <option className="bg-slate-800 text-white" value="guide">Guide</option>
              <option className="bg-slate-800 text-white" value="cheatsheet">Cheat Sheet</option>
              <option className="bg-slate-800 text-white" value="roadmap">Roadmap</option>
            </select>
            
            {/* --- This input now spans 5 columns on desktop --- */}
            <input
              type="text"
              placeholder="Tags (comma separated) e.g., dsa, arrays"
              value={form.tags}
              onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))}
              className="md:col-span-5 w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            
            {/* --- This button spans 1 column --- */}
            <button
              type="button"
              onClick={add}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </div>
        </motion.form>

        {/* List (Unchanged) */}
        {items.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl">
            <BookMarked className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/70">No resources yet. Upload your first link.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity" />
                
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 flex flex-col justify-between min-h-[170px]">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{r.title}</div>
                        <div className={`text-sm ${typeColor(r.type)} capitalize`}>{r.type}</div>
                      </div>
                      <button
                        onClick={() => remove(r.id)}
                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {r.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {r.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white/10 text-xs inline-flex items-center gap-1">
                            <Tags className="w-3 h-3 text-cyan-300" /> {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Open
                    </a>
                    <div className="text-xs text-white/60">
                      by {r.by} • {new Date(r.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}