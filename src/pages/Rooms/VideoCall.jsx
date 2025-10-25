import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, LogOut, MessageSquare, Send } from 'lucide-react';

// Background (matches Rooms)
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0ABAB5] via-[#56DFCF] to-[#0ABAB5]" />
    <motion.div
      animate={{ opacity: [0.25, 0.4, 0.25], scale: [1, 1.1, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-cyan-300/30 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 0.95, 1.1] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-24 -right-24 w-[44rem] h-[44rem] bg-teal-400/30 rounded-full blur-3xl"
    />
  </div>
);

// Simple in-call chat using localStorage (no server dependency)
const ChatPanel = ({ roomKey, displayName }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const listRef = useRef(null);
  const load = () => JSON.parse(localStorage.getItem(roomKey) || '[]');
  const save = (data) => localStorage.setItem(roomKey, JSON.stringify(data));

  useEffect(() => {
    setMessages(load());
    const onStorage = (e) => {
      if (e.key === roomKey) setMessages(JSON.parse(e.newValue || '[]'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [roomKey]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = [
      ...messages,
      { id: crypto.randomUUID(), by: displayName, text: trimmed, at: Date.now() }
    ];
    save(next);
    setMessages(next);
    setText('');
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/80 border-l border-white/10">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 text-white">
        <MessageSquare className="w-4 h-4 text-cyan-300" />
        <span className="font-semibold">In-call messages</span>
      </div>
      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="flex flex-col">
            <div className="text-xs text-white/50">
              {m.by} • {new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="mt-1 max-w-[85%] rounded-lg bg-white/10 text-white px-3 py-2 whitespace-pre-wrap">
              {m.text}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="h-full w-full flex items-center justify-center text-white/40 text-sm">
            No messages yet. Start the conversation.
          </div>
        )}
      </div>
      <div className="p-3 border-t border-white/10">
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Send a message"
            className="flex-1 resize-none rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 px-3 py-2 focus:outline-none focus:border-cyan-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            onClick={send}
            className="inline-flex items-center justify-center rounded-lg px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoCall = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const apiRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(() => window.innerWidth >= 1024);

  const room = state?.room || {};
  const roomName = useMemo(() => {
    return room?.id || roomId || (room?.name ? room.name.replace(/\s+/g, '-').toLowerCase() : 'studyhub-room');
  }, [roomId, room]);

  // Robust display name resolution (storage fallbacks + email local part)
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

  // Load and mount Jitsi
  useEffect(() => {
    let scriptEl;
    const startJitsi = () => {
      if (!containerRef.current) return;
      const domain = 'meet.jit.si';
      const options = {
        roomName,
        parentNode: containerRef.current,
        width: '100%',
        height: '100%',
        userInfo: { displayName },
        configOverwrite: {
          prejoinPageEnabled: true,
          startWithAudioMuted: true,
          startWithVideoMuted: false,
          disableDeepLinking: true,
          disableInviteFunctions: true,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
          MOBILE_APP_PROMO: false,
          TOOLBAR_BUTTONS: [
            'microphone','camera','desktop','fullscreen','fodeviceselection',
            'hangup','raisehand','tileview','select-background','settings','videoquality'
          ],
        },
      };
      apiRef.current = new window.JitsiMeetExternalAPI(domain, options);
    };

    if (window.JitsiMeetExternalAPI) {
      startJitsi();
    } else {
      scriptEl = document.createElement('script');
      scriptEl.src = 'https://meet.jit.si/external_api.js';
      scriptEl.async = true;
      scriptEl.onload = startJitsi;
      document.body.appendChild(scriptEl);
    }

    return () => {
      try { apiRef.current?.dispose(); } catch {}
      if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };
  }, [roomName, displayName]);

  const leave = () => {
    try { apiRef.current?.executeCommand('hangup'); } catch {}
    navigate('/rooms', { state: { toast: 'You left the study session.' } });
  };

  const roomChatKey = `roomChat:${roomName}`;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col h-screen text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cyan-300" />
            <span className="font-semibold">{room?.name || `Room • ${roomName}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatOpen((s) => !s)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button
              onClick={leave}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Leave
            </button>
          </div>
        </div>

        {/* Video + Chat */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-56px)]">
          <div className={`${chatOpen ? 'lg:col-span-8' : 'lg:col-span-12'} h-full`}>
            <div className="h-full w-full bg-slate-900/40 backdrop-blur-xl border-y border-white/10">
              <div ref={containerRef} className="h-full w-full" />
            </div>
          </div>

          {chatOpen && (
            <div className="hidden lg:block lg:col-span-4 h-full">
              <ChatPanel roomKey={roomChatKey} displayName={displayName} />
            </div>
          )}
        </div>

        {/* Mobile chat drawer */}
        {chatOpen && (
          <div className="lg:hidden fixed inset-x-0 bottom-0 top-[56px] z-50">
            <ChatPanel roomKey={roomChatKey} displayName={displayName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;