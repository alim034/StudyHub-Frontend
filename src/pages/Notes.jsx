import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookMarked, Trash2, Edit3, UploadCloud, FileText } from "lucide-react";

// --- AnimatedBackground Component (Unchanged) ---
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

// --- Modal Component (Unchanged) ---
const Modal = ({ open, onClose, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 text-white"
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Notes = () => {
  // State for text notes
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  
  // State for "View Note" modal
  const [viewingNote, setViewingNote] = useState(null);

  // State for file notes
  const [fileNotes, setFileNotes] = useState([]);
  const fileInputRef = useRef(null);

  // Validation popup state
  const [validationMsg, setValidationMsg] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  // Constants for File Validation
  const MAX_SIZE_KB = 256;
  const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

  // Load from localStorage
  useEffect(() => {
    const storedTextNotesRaw = localStorage.getItem("userNotesText");
    if (storedTextNotesRaw) {
      try {
        setNotes(JSON.parse(storedTextNotesRaw));
      } catch {
        setNotes([]);
      }
    } else {
      // Fallback: filter combined list to only text notes
      try {
        const combined = JSON.parse(localStorage.getItem("userNotes") || "[]");
        const filtered = Array.isArray(combined)
          ? combined.filter((n) => n?.type === "notes" || typeof n?.text === "string")
          : [];
        setNotes(filtered);
      } catch {
        setNotes([]);
      }
    }
    const storedFileNotes = JSON.parse(localStorage.getItem("userFileNotes") || "[]");
    setFileNotes(storedFileNotes);
  }, []);

  // Build combined dashboard list (text + files)
  const buildCombined = (textList, fileList) => {
    const files = (fileList || []).map((f) => {
      const ext = (f.fileName?.split(".").pop() || "").toLowerCase();
      const type = ext === "pdf" ? "pdf" : ["png", "jpg", "jpeg"].includes(ext) ? "image" : "file";
      return {
        id: f.id,
        title: f.fileName || "Attachment",
        type,
        author: "You",
        downloads: 0,
        room: "Personal",
        uploadedAt: f.uploadedAt,
      };
    });
    return [
      ...(textList || []).map((n) => ({ ...n, type: n.type || "notes" })),
      ...files,
    ];
  };

  // Sync helper for text notes (and update dashboard combined list)
  const syncDashboard = (list) => {
    // Persist page-local editable text notes separately
    localStorage.setItem("userNotesText", JSON.stringify(list));

    // Persist combined list for dashboard/widgets
    const combined = buildCombined(list, fileNotes);
    localStorage.setItem("userNotes", JSON.stringify(combined));
    localStorage.setItem("notes:lastUpdated", String(Date.now()));
    if (typeof window.syncDashboardStats === "function") {
      window.syncDashboardStats({ notesCreated: combined.length });
    }
    window.dispatchEvent(new CustomEvent("notes-updated", { detail: { count: combined.length } }));
  };

  // Sync helper for file notes (and update dashboard combined list)
  const syncFileNotes = (list) => {
    localStorage.setItem("userFileNotes", JSON.stringify(list));

    const combined = buildCombined(notes, list);
    localStorage.setItem("userNotes", JSON.stringify(combined));
    localStorage.setItem("notes:lastUpdated", String(Date.now()));
    if (typeof window.syncDashboardStats === "function") {
      window.syncDashboardStats({ notesCreated: combined.length });
    }
    window.dispatchEvent(new CustomEvent("notes-updated", { detail: { count: combined.length } }));
  };

  // Helper to read file as Data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handles BOTH creating and updating notes
  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!title.trim() && !text.trim()) return;

    if (editingNoteId) {
      // UPDATE LOGIC
      const updatedNotes = notes.map(note =>
        note.id === editingNoteId
          ? {
              ...note, 
              title: title.trim() || (text.trim().slice(0, 40) || "Untitled Note"),
              text: text.trim(),
            }
          : note
      );
      setNotes(updatedNotes);
      syncDashboard(updatedNotes);

    } else {
      // CREATE LOGIC
      const newNote = {
        id: `note-${Date.now()}`,
        title: title.trim() || (text.trim().slice(0, 40) || "Untitled Note"),
        text: text.trim(),
        type: "notes",
        author: "You",
        downloads: 0,
        room: "Personal",
        uploadedAt: new Date().toISOString(),
      };
      const next = [...notes, newNote];
      setNotes(next);
      syncDashboard(next);
    }

    // Reset form and close modal
    setTitle("");
    setText("");
    setEditingNoteId(null);
    setIsFormModalOpen(false);
  };

  // Remove TEXT note
  const removeNote = (id) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    syncDashboard(next);
  };

  // Start editing TEXT note
  const startEdit = (n) => {
    setTitle(n.title || "");
    setText(n.text || "");
    setEditingNoteId(n.id);
    setIsFormModalOpen(true);
  };

  // Open modal for NEW note
  const openNewNoteModal = () => {
    setTitle("");
    setText("");
    setEditingNoteId(null);
    setIsFormModalOpen(true);
  };

  // Close and reset the form modal
  const closeModal = () => {
    setIsFormModalOpen(false);
    setTitle("");
    setText("");
    setEditingNoteId(null);
  };

  // Handler for file upload
  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
  const validationMessage = `Only PNG, JPG, or PDF files are allowed and must be under ${MAX_SIZE_KB}KB.`;

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type) || selectedFile.size > MAX_SIZE_BYTES) {
      setValidationMsg(validationMessage);
      setShowValidation(true);
      return;
    }

    try {
      const fileData = await readFileAsDataURL(selectedFile);
      const newFileNote = {
        id: `file-${Date.now()}`,
        fileData: fileData,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        uploadedAt: new Date().toISOString(),
      };
      const next = [...fileNotes, newFileNote];
      setFileNotes(next);
      syncFileNotes(next);
    } catch (err) {
      console.error("Error reading file:", err);
      setValidationMsg("Could not read file. Please try again.");
      setShowValidation(true);
    }
  };

  // Remove FILE note
  const removeFileNote = (id) => {
    const next = fileNotes.filter((n) => n.id !== id);
    setFileNotes(next);
    syncFileNotes(next);
  };

  // --- Header (MODIFIED) ---
  const header = useMemo(
    () => (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Notes</h1>
          <p className="text-white/70">Capture ideas and study insights. Synced with your Dashboard.</p>
        </div>
        {/* --- MODIFIED: Added new hover effect class --- */}
        <button
          onClick={openNewNoteModal}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
        >
          <Plus className="w-4 h-4" />
          New Text Note
        </button>
      </div>
    ),
    []
  );

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {header}

        {/* --- File Upload Section (Unchanged) --- */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Upload File</h2>
          <div className="relative border-2 border-dashed border-white/30 rounded-2xl p-6 text-center group hover:border-blue-400 transition-colors">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              title={`Upload a file (PDF, JPG, PNG, Max ${MAX_SIZE_KB}KB)`}
            />
            <div className="relative z-0 flex flex-col items-center justify-center">
              <UploadCloud className="w-12 h-12 text-white/60 mb-3" />
              <p className="text-white/80 font-semibold">Click or drag file to upload</p>
              <p className="text-xs text-white/50 mt-1">PDF, JPG, or PNG (Max {MAX_SIZE_KB}KB)</p>
            </div>
          </div>
        </div>
        {/* ------------------------------- */}

        {/* --- Display for File Notes (Unchanged) --- */}
        {fileNotes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">My Files</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {fileNotes.map((n) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-white min-h-[170px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <FileText className="w-8 h-8 text-cyan-300 flex-shrink-0" />
                        <button
                          onClick={() => removeFileNote(n.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition"
                          title="Delete File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <a
                        href={n.fileData}
                        download={n.fileName}
                        className="font-semibold text-lg text-white hover:text-cyan-200 transition line-clamp-2 break-all"
                        title={`Download ${n.fileName}`}
                      >
                        {n.fileName}
                      </a>
                    </div>
                    <div className="mt-3 text-xs text-white/60">Added: {new Date(n.uploadedAt).toLocaleString()}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {/* ----------------------------------- */}

        {/* --- Display for Text Notes (Unchanged) --- */}
        <h2 className="text-2xl font-bold text-white mb-4">My Text Notes</h2>
        {notes.length === 0 ? (
          <div className="text-center py-10 bg-white/5 rounded-2xl">
            <BookMarked className="w-14 h-14 text-white/40 mx-auto mb-4" />
            <p className="text-white/70">No text notes yet. Click 'New Text Note' to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((n) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-white min-h-[170px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-lg truncate">{n.title}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(n)}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeNote(n.id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm whitespace-pre-wrap line-clamp-7">{n.text}</p>
                    
                    {/* --- Read More Button (Unchanged) --- */}
                    {n.text.length > 250 && ( 
                      <button
                        onClick={() => setViewingNote(n)}
                        className="text-sm font-semibold text-blue-300 hover:text-blue-200 mt-2"
                      >
                        Read More...
                      </button>
                    )}
                    {/* --------------------------- */}

                  </div>
                  <div className="mt-3 text-xs text-white/60">Added: {new Date(n.uploadedAt).toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {/* ------------------------------ */}

        {/* --- FAB (Floating Action Button) --- */}
        {/* --- DELETED as requested --- */}
        {/* ---------------------------------- */}

        {/* --- Create/Edit Modal (Unchanged) --- */}
        <Modal open={isFormModalOpen} onClose={closeModal}>
          <form onSubmit={handleSaveNote} className="space-y-4">
            <h2 className="text-lg font-semibold">{editingNoteId ? "Edit Note" : "Add Text Note"}</h2>
            <div className="space-y-2">
              <label className="text-sm text-white/80">Title (optional)</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
                placeholder="e.g., Arrays vs Linked Lists"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/80">Note</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                required
                className="w-full rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 px-3 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Write your note..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
        {/* ----------------------------------------- */}

        {/* --- View Note Modal (Unchanged) --- */}
        <Modal open={!!viewingNote} onClose={() => setViewingNote(null)}>
          {viewingNote && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{viewingNote.title}</h2>
              <div className="text-white/80 text-sm whitespace-pre-wrap max-h-[60vh] overflow-y-auto pr-2">
                {viewingNote.text}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewingNote(null);
                    startEdit(viewingNote);
                  }}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setViewingNote(null)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Validation popup modal */}
        <Modal open={showValidation} onClose={() => setShowValidation(false)}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Upload requirements</h3>
            <p className="text-white/80">
              {validationMsg || `Only PNG, JPG, and PDF are allowed. Maximum size ${MAX_SIZE_KB}KB.`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowValidation(false)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                Got it
              </button>
            </div>
          </div>
        </Modal>


      </div>
    </main>
  );
};

export default Notes;