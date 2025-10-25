import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare } from "lucide-react";
import { io } from "socket.io-client";
import ChatPanel from "./ChatPanel";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

const ChatWindow = ({ room, onClose }) => {
  const socket = useMemo(() => io(SOCKET_URL, { transports: ["websocket"] }), []);
  // Robust display name with storage fallbacks
  const displayName = useMemo(() => {
    const pickName = (obj) => {
      if (!obj) return null;
      const c = (s) => (typeof s === 'string' && s.trim().length ? s.trim() : null);
      return (
        c(obj.name) || c(obj.username) || c(obj.fullName) || c(obj.firstName) ||
        c(obj.user?.name) || c(obj.profile?.name) || null
      );
    };
    let found = null;
    try {
      const keys = ['user', 'authUser', 'currentUser', 'userProfile'];
      for (const k of keys) {
        const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        found = pickName(parsed) || (parsed?.email ? parsed.email.split('@')[0] : null);
        if (found) break;
      }
    } catch {}
    if (!found) found = 'Student';
    return found.charAt(0).toUpperCase() + found.slice(1);
  }, []);

  useEffect(() => {
    if (!room?.id) return;
    socket.emit("join-room", { roomId: room.id, name: displayName });
    return () => {
      socket.emit("leave-room", { roomId: room.id });
      socket.disconnect();
    };
  }, [socket, room?.id, displayName]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden
        />
        {/* Slide-in panel */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="ml-auto h-full w-full max-w-md bg-[#0ABAB5]/20 backdrop-blur-xl border-l border-white/20 shadow-2xl text-white flex flex-col"
        >
          <div className="px-4 py-3 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white" />
              <span className="font-semibold">Room Chat • {room?.name}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 min-h-0">
            <ChatPanel socket={socket} roomId={room?.id} displayName={displayName} />
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatWindow;