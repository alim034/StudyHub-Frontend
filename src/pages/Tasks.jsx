import React, { useEffect, useState } from 'react';
// --- MODIFIED: Added AnimatePresence and Check icon ---
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, Trash2, Calendar, Flag, Clock, Check } from 'lucide-react';

// --- AnimatedBackground from Notes.jsx (Unchanged) ---
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

const emptyTask = { title: '', due: '', priority: 'medium' };

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('userTasks') || '[]');
    setTasks(saved);
  }, []);

  // --- All functions below are unchanged ---

  const save = (next) => {
    setTasks(next);
    localStorage.setItem('userTasks', JSON.stringify(next));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const next = [
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        due: form.due || null,
        priority: form.priority,
        status: 'open',
        createdAt: Date.now()
      }
    ];
    save(next);
    setForm(emptyTask);
  };

  const toggleDone = (id) => {
    const next = tasks.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'open' : 'done' } : t);
    save(next);
  };

  const remove = (id) => save(tasks.filter(t => t.id !== id));

  const priorityBadge = (p) =>
    p === 'high' ? 'bg-red-500/20 text-red-300' :
    p === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
    'bg-emerald-500/20 text-emerald-300';

  return (
    <main className="min-h-screen relative text-white">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Tasks</h1>
          <p className="text-white/70">Plan, track, and complete your study tasks.</p>
        </div>

        {/* Add Task Form (Unchanged) */}
        <motion.form
          onSubmit={addTask}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 mb-8"
        >
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className="md:col-span-2 w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <input
              type="date"
              value={form.due}
              onChange={(e) => setForm(f => ({ ...f, due: e.target.value }))}
              className="w-full rounded-lg bg-white/10 border border-white/20 text-white/70 placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <div className="flex gap-2">
              <select
                value={form.priority}
                onChange={(e) => setForm(f => ({ ...f, priority: e.target.value }))}
                className="flex-1 w-full rounded-lg bg-white/10 border border-white/20 text-white/70 focus:outline-none focus:border-blue-400"
              >
                <option className="bg-slate-800 text-white" value="low">Low priority</option>
                <option className="bg-slate-800 text-white" value="medium">Medium priority</option>
                <option className="bg-slate-800 text-white" value="high">High priority</option>
              </select>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
        </motion.form>

        {/* List (Unchanged) */}
        {tasks.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl">
            <CheckSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/70">No tasks yet. Create your first task.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tasks.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity" />
                
                {/* --- MODIFIED: Added transitions and opacity change --- */}
                <div 
                  className={`relative backdrop-blur-xl border border-white/15 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 ${
                    t.status === 'done' ? 'bg-white/5 opacity-70' : 'bg-white/10 opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* --- MODIFIED: Added checkmark animation --- */}
                    <button
                      onClick={() => toggleDone(t.id)}
                      className={`w-5 h-5 rounded border-2 flex-shrink-0 relative flex items-center justify-center transition-all duration-300 ease-in-out ${
                        t.status === 'done' ? 'bg-emerald-500/70 border-emerald-400' : 'border-white/30'
                      }`}
                      title="Toggle complete"
                    >
                      <AnimatePresence>
                        {t.status === 'done' && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    {/* ------------------------------------------- */}

                    <div className="overflow-hidden">
                      {/* --- MODIFIED: Added transition --- */}
                      <div 
                        className={`font-medium truncate transition-all duration-300 ${
                          t.status === 'done' ? 'line-through text-white/60' : ''
                        }`}
                      >
                        {t.title}
                      </div>
                      <div className="text-sm text-white/60 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        {t.due && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-cyan-300" /> {t.due}
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${priorityBadge(t.priority)}`}>
                          <Flag className="w-3 h-3" /> {t.priority}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-purple-300" />
                          {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(t.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}