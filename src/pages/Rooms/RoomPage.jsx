import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  CameraOff,
  Hand,
  LogOut,
  MessageSquare,
  Mic,
  MicOff,
  Send,
  VideoOff,
  Check // Added Check icon for potential future use or consistency
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// STUN fallback (Unchanged)
const ICE_SERVERS = (typeof window !== 'undefined' && window.__ICE_SERVERS__) || [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }
];

// --- UPDATED: Static Background (no animations) ---
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Base gradient palette retained */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />

      {/* Static blurred orbs (no motion) */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.3) 40%, rgba(59,130,246,0.1) 70%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.4) 40%, rgba(139,92,246,0.1) 70%, transparent 100%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute top-[20%] left-[30%] w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(6,182,212,0.2) 50%, rgba(6,182,212,0.05) 80%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[25%] right-[25%] w-72 h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0.3) 50%, rgba(168,85,247,0.1) 80%, transparent 100%)",
          filter: "blur(45px)",
        }}
      />

      {/* Static grid overlay (subtle) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Static vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20" />
    </div>
  );
};
// ---------------------------------------------

// Video tile
const VideoTile = ({ tile, refEl, active, handOn, showName = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!tile?.stream) return;
    const el = refEl || videoRef.current;
    if (!el) return;
    if (el.srcObject !== tile.stream) {
      el.srcObject = tile.stream;
    }
  }, [tile?.stream, refEl]);

  if (!tile) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      // --- UPDATED: Border and background colors ---
      className={`relative rounded-lg overflow-hidden aspect-video border ${active ? 'border-blue-400/60' : 'border-white/15'} shadow-lg bg-black/20`}
    >
      <video ref={refEl || videoRef} autoPlay playsInline muted={tile.local} className="w-full h-full object-cover" />
      {tile.videoOff && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <VideoOff className="w-10 h-10 text-white/60" />
        </div>
      )}
      <div className="absolute left-2 bottom-2 right-2 flex items-center justify-between">
        {showName && <div className="px-2 py-1 rounded-md bg-black/60 text-white text-xs backdrop-blur-sm">{tile.name}</div>}
        <div className="flex items-center gap-2">
          {handOn && <Hand className="w-4 h-4 text-yellow-300" title="Raised hand" />}
          {tile.muted && <MicOff className="w-4 h-4 text-red-300" title="Muted" />}
        </div>
      </div>
    </motion.div>
  );
};

// Controls
const ControlBar = ({
  micOn,
  camOn,
  onToggleMic,
  onToggleCam,
  onChat,
  onLeave,
  onRaise,
  raising
}) => {
  // --- UPDATED: Button styles ---
  const btn = 'inline-flex items-center justify-center w-11 h-11 rounded-full shadow-lg transition-all active:scale-95 border border-white/10';
  const activeBtn = 'bg-white/10 text-white hover:bg-white/20';
  const inactiveBtn = 'bg-red-500/80 text-white hover:bg-red-600/80';
  const specialBtn = 'bg-yellow-400 text-black hover:bg-yellow-500';

  return (
    // --- UPDATED: Background style ---
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full bg-slate-800/50 border border-white/15 backdrop-blur-xl flex items-center gap-2 shadow-2xl">
      <button onClick={onToggleMic} className={`${btn} ${micOn ? activeBtn : inactiveBtn}`} title="Toggle mic (M)">
        {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>
      <button onClick={onToggleCam} className={`${btn} ${camOn ? activeBtn : inactiveBtn}`} title="Toggle camera (C)">
        {camOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
      </button>
      <button onClick={onChat} className={`${btn} ${activeBtn}`} title="Open chat (D)">
        <MessageSquare className="w-5 h-5" />
      </button>
      <button onClick={onRaise} className={`${btn} ${raising ? specialBtn : activeBtn}`} title="Raise hand (H)">
        <Hand className="w-5 h-5" />
      </button>
      <button onClick={onLeave} className={`${btn} bg-red-600/90 text-white hover:bg-red-700/90 ml-2`} title="Leave (L)">
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};

// Chat
const ChatPanel = ({ messages, onSendMessage }) => {
  const [text, setText] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full min-h-0 flex flex-col text-white">
      {/* --- UPDATED: Header style --- */}
      <div className="px-4 py-3 border-b border-white/15 flex items-center gap-2 bg-black/10">
        <MessageSquare className="w-4 h-4 text-blue-300" />
        <span className="font-semibold text-white/90">In-call messages</span>
      </div>
      <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/60 text-sm">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              // --- UPDATED: Message bubble styles ---
              className={`max-w-[85%] rounded-lg px-3 py-2 ${msg.self ? 'ml-auto bg-blue-600/80 text-white' : 'bg-white/10 text-white/90'}`}
            >
              {!msg.self && <div className="text-xs text-purple-300 mb-1 font-medium">{msg.name}</div>}
              {/* --- UPDATED: Ensure consistent text color --- */}
              <div className="text-sm whitespace-pre-wrap break-words">{msg.text}</div>
              <div className="text-[10px] text-white/60 mt-1 text-right">
                {new Date(msg.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </motion.div>
          ))
        )}
      </div>
      {/* --- UPDATED: Input area style --- */}
      <div className="p-3 border-t border-white/15 bg-black/10">
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
            placeholder="Send a message"
            // --- UPDATED: Textarea style ---
            className="flex-1 resize-none rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
          />
          {/* --- UPDATED: Send button style --- */}
          <button onClick={handleSend} className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast (Unchanged - uses dark style already)
const Toast = ({ text }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 30, opacity: 0 }}
    className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-black/80 border border-white/10 text-white text-sm shadow-lg backdrop-blur-sm"
  >
    {text}
  </motion.div>
);

// Main page
export default function RoomPage() {
  const { roomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Removed isAuthenticated as it wasn't used

  // Auth token (Unchanged)
  const authToken =
    localStorage.getItem('token') ||
    JSON.parse(localStorage.getItem('authUser') || '{}')?.token ||
    JSON.parse(localStorage.getItem('user') || '{}')?.token ||
    '';

  // Socket (Unchanged)
  const socket = useMemo(
    () =>
      io(SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 500,
        withCredentials: true,
        auth: authToken ? { token: authToken } : undefined
      }),
    [authToken]
  );

  // Refs (Unchanged)
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peersRef = useRef(new Map());

  // UI state (Unchanged)
  const [tiles, setTiles] = useState([]);
  const [chatOpen, setChatOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  const [controls, setControls] = useState({ mic: true, cam: true, focus: false, raising: false });
  const [messages, setMessages] = useState([]);
  const [joinedAt] = useState(Date.now());
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bootingRoom, setBootingRoom] = useState(!state?.room);
  const [connected, setConnected] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [sharing, setSharing] = useState(false); // Sharing state remains, but button is removed
  const [roomData, setRoomData] = useState(state?.room || null);
  const [roomError, setRoomError] = useState(null);
  const [localLevel, setLocalLevel] = useState(0);
  const [mediaError, setMediaError] = useState('');
  const [mediaAttempt, setMediaAttempt] = useState(0);

  // Display Name logic (Unchanged)
   const displayName = useMemo(() => {
    const pickName = (obj) => {
      if (!obj) return null;
      const c = (s) => (typeof s === 'string' && s.trim().length ? s.trim() : null);
      return (
        c(obj.name) || c(obj.username) || c(obj.fullName) || c(obj.firstName) ||
        c(obj.user?.name) || c(obj.profile?.name) || null
      );
    };

    let found = pickName(state?.user) || pickName(user) || state?.userName || null;
    if (!found) {
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
    }
    if (!found) found = 'Student';
    return found.charAt(0).toUpperCase() + found.slice(1);
  }, [state?.user, state?.userName, user]);

  const roomName = roomData?.name || `Room ${roomId}`;

  // Timer (Unchanged)
  const [tick, setTick] = useState(0); // Used only to trigger re-render for duration
   useEffect(() => {
    const t = setInterval(() => setTick((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
   const duration = (() => {
    const s = Math.floor((Date.now() - joinedAt) / 1000);
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${ss}`;
  })();

  // Toast function (Unchanged)
   const pushToast = (text) => {
    const id = (crypto?.randomUUID && crypto.randomUUID()) || String(Math.random());
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  // Guard: invalid route (Unchanged)
   useEffect(() => {
    if (!roomId) navigate('/dashboard/rooms', { replace: true });
  }, [roomId, navigate]);

  // Load room data (Enhanced: fallback join by code)
   useEffect(() => {
    if (!roomId || state?.room) {
      setBootingRoom(false);
      return;
    }
    let ignore = false;
    (async () => {
      try {
        setBootingRoom(true);
        setRoomError(null);
        const token = authToken || '';
        let resp = await fetch(`${API_URL}/rooms/${encodeURIComponent(roomId)}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          credentials: 'include'
        });
        if (!resp.ok) {
          // If 404 and the param looks like an invite code, try join-by-code to resolve
          if (resp.status === 404 && /^[A-Z0-9]{6,12}$/i.test(roomId)) {
            const joinResp = await fetch(`${API_URL}/rooms/join`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
              },
              credentials: 'include',
              body: JSON.stringify({ code: roomId })
            });
            if (joinResp.ok) {
              const j = await joinResp.json();
              const jd = j?.data?.room || j?.data || j?.room || j;
              if (!ignore) setRoomData(jd);
              // Continue without throwing; we have room
            } else {
              throw new Error(`Failed to load room: ${resp.status}`);
            }
          } else {
            throw new Error(`Failed to load room: ${resp.status}`);
          }
        } else {
          const data = await resp.json();
          if (!ignore) setRoomData(data?.room || data);
        }
      } catch (e) {
        if (!ignore) {
          console.error('[RoomPage] Failed to fetch room', e);
          setRoomError(e.message || 'Failed to load room');
        }
      } finally {
        if (!ignore) setBootingRoom(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [roomId, state?.room, authToken]);

  // Socket lifecycle (Unchanged)
   useEffect(() => {
    const onConnect = () => { setConnected(true); console.log('[Socket] connected'); pushToast('Connected'); };
    const onDisconnect = () => { setConnected(false); console.log('[Socket] disconnected'); pushToast('Disconnected'); };
    const onError = (err) => { console.warn('[Socket] connect_error', err); pushToast('Connection error'); };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);
    return () => { socket.off('connect', onConnect); socket.off('disconnect', onDisconnect); socket.off('connect_error', onError); };
  }, [socket]);

  // Local media (Unchanged)
   useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: true });
        if (cancelled) return;
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;

        // Voice activity
        try {
          const ac = new (window.AudioContext || window.webkitAudioContext)();
          const source = ac.createMediaStreamSource(stream);
          const analyser = ac.createAnalyser(); analyser.fftSize = 256; const data = new Uint8Array(analyser.frequencyBinCount); source.connect(analyser); let raf;
          const tick = () => { analyser.getByteTimeDomainData(data); let peak = 0; for (let i = 0; i < data.length; i++) { const v = Math.abs(data[i] - 128) / 128; if (v > peak) peak = v; } setLocalLevel(peak); raf = requestAnimationFrame(tick); }; tick();
          stream.getAudioTracks()[0]?.addEventListener('ended', () => { try { cancelAnimationFrame(raf); ac.close(); } catch {} });
        } catch {}

        setMediaError('');
        setTiles([{ peerId: 'local', stream, name: `${displayName} (You)`, muted: false, videoOff: false, hand: false, local: true }]);
        setLoading(false); setMediaReady(true); console.log('[Media] local stream ready');
      } catch (e) {
        console.error('getUserMedia failed', e); setLoading(false); setMediaReady(false);
        setMediaError('Could not access camera/microphone. Allow permissions and press Retry.');
        pushToast('Could not access camera/microphone.');
      }
    })();
    return () => { cancelled = true; setMediaReady(false); localStreamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, [displayName, mediaAttempt]); // Re-run if retry is clicked

  // WebRTC signaling (Unchanged)
   useEffect(() => {
    if (!connected || !mediaReady || !roomId) return;
    socket.emit('join-room', { roomId, name: displayName });
    socket.on('users-in-room', async (users) => { for (const u of users) await createPeerConnection(u.id, u.name, true); });
    socket.on('user-joined', async ({ id, name }) => { pushToast(`${name} joined`); await createPeerConnection(id, name, true); });
    socket.on('offer', async ({ from, sdp, name }) => { await createPeerConnection(from, name, false, sdp); });
    socket.on('answer', async ({ from, sdp }) => { const peer = peersRef.current.get(from); if (peer) try { await peer.pc.setRemoteDescription(new RTCSessionDescription(sdp)); } catch (err) { console.warn('setRemoteDescription(answer) failed', err); } });
    socket.on('ice-candidate', async ({ from, candidate }) => { const peer = peersRef.current.get(from); if (peer && candidate) try { await peer.pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (err) { console.warn('addIceCandidate failed', err); } });
    socket.on('user-left', ({ id, name }) => { const peer = peersRef.current.get(id); if (peer) { try { peer.pc.close(); } catch {} peersRef.current.delete(id); setTiles((ts) => ts.filter((t) => t.peerId !== id)); } pushToast(`${name || 'Someone'} left`); });
    socket.on('peer-state', ({ id, muted, videoOff, hand }) => { setTiles((ts) => ts.map((t) => (t.peerId === id ? { ...t, muted, videoOff, hand } : t))); });
    socket.on('chat-message', (msg) => setMessages((prev) => [...prev, { ...msg, self: false }]));
    return () => { socket.emit('leave-room', { roomId }); socket.off('users-in-room'); socket.off('user-joined'); socket.off('offer'); socket.off('answer'); socket.off('ice-candidate'); socket.off('user-left'); socket.off('peer-state'); socket.off('chat-message'); for (const [, peer] of peersRef.current) { try { peer.pc.close(); } catch {} } peersRef.current.clear(); };
  }, [socket, roomId, displayName, connected, mediaReady]);

  // Create peer connection function (Unchanged)
   const createPeerConnection = async (remoteId, name, isInitiator, remoteOffer = null) => {
    if (peersRef.current.has(remoteId)) return; const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    localStreamRef.current?.getTracks().forEach((track) => pc.addTrack(track, localStreamRef.current));
    pc.onicecandidate = (e) => { if (e.candidate) socket.emit('ice-candidate', { to: remoteId, candidate: e.candidate }); };
    pc.ontrack = (e) => { const remoteStream = e.streams[0]; setTiles((tiles) => { const local = tiles.find((t) => t.peerId === 'local'); const others = tiles.filter((t) => t.peerId !== 'local' && t.peerId !== remoteId); return [local, { peerId: remoteId, stream: remoteStream, name, muted: false, videoOff: false, hand: false }, ...others].filter(Boolean); }); };
    pc.onconnectionstatechange = () => { const st = pc.connectionState; if (st === 'failed' || st === 'disconnected' || st === 'closed') { peersRef.current.delete(remoteId); setTiles((ts) => ts.filter((t) => t.peerId !== remoteId)); } };
    peersRef.current.set(remoteId, { pc, name });
    try { if (isInitiator) { await pc.setLocalDescription(await pc.createOffer()); socket.emit('offer', { to: remoteId, sdp: pc.localDescription, name: displayName }); } else { if (remoteOffer) { await pc.setRemoteDescription(new RTCSessionDescription(remoteOffer)); } await pc.setLocalDescription(await pc.createAnswer()); socket.emit('answer', { to: remoteId, sdp: pc.localDescription }); } } catch (err) { console.error('Peer setup error', err); }
  };

  // Replace video track (Unchanged - needed for screen share logic if re-added)
   const replaceVideoTrackEverywhere = async (newTrack) => {
    for (const [, { pc }] of peersRef.current) { const sender = pc.getSenders().find((s) => s.track && s.track.kind === 'video'); if (sender) try { await sender.replaceTrack(newTrack); } catch (e) { console.warn('replaceTrack failed', e); } }
    const stream = localStreamRef.current; if (stream) { stream.getVideoTracks().forEach((t) => stream.removeTrack(t)); stream.addTrack(newTrack); if (localVideoRef.current) localVideoRef.current.srcObject = stream; }
  };

  // Controls handlers (Unchanged)
   const toggleMic = () => { const enabled = !controls.mic; setControls((c) => ({ ...c, mic: enabled })); localStreamRef.current?.getAudioTracks().forEach((t) => (t.enabled = enabled)); setTiles((ts) => ts.map((t) => (t.peerId === 'local' ? { ...t, muted: !enabled } : t))); socket.emit('peer-state', { roomId, muted: !enabled }); pushToast(enabled ? 'Mic on' : 'Mic off'); };
   const toggleCam = () => { const enabled = !controls.cam; setControls((c) => ({ ...c, cam: enabled })); localStreamRef.current?.getVideoTracks().forEach((t) => (t.enabled = enabled)); setTiles((ts) => ts.map((t) => (t.peerId === 'local' ? { ...t, videoOff: !enabled } : t))); socket.emit('peer-state', { roomId, videoOff: !enabled }); pushToast(enabled ? 'Cam on' : 'Cam off'); };
   const toggleRaise = () => { const raising = !controls.raising; setControls((c) => ({ ...c, raising })); setTiles((ts) => ts.map((t) => (t.peerId === 'local' ? { ...t, hand: raising } : t))); socket.emit('peer-state', { roomId, hand: raising }); pushToast(raising ? 'Hand raised' : 'Hand lowered'); };
   const handleSendMessage = (text) => { const message = { roomId, text, name: displayName, at: Date.now(), self: true }; socket.emit('chat-message', message); setMessages((prev) => [...prev, message]); };
   const leave = () => { localStreamRef.current?.getTracks().forEach((t) => t.stop()); socket.emit('leave-room', { roomId }); socket.disconnect(); navigate('/dashboard/rooms', { state: { toast: 'Left study session.' } }); };

  // Keyboard shortcuts (Unchanged)
   useEffect(() => { const onKey = (e) => { const tag = (e.target && e.target.tagName) || ''; const editable = e.target && (e.target.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA'); if (editable) return; const key = e.key.toLowerCase(); if (key === 'm') return toggleMic(); if (key === 'c') return toggleCam(); if (key === 'd') return setChatOpen((s) => !s); if (key === 'h') return toggleRaise(); if (key === 'l') return leave(); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [controls.mic, controls.cam, controls.raising]); // Dependencies updated slightly

  // Grid layout calculation (Unchanged)
   const participantsCount = tiles.length;
   const showSelfOverlay = participantsCount > 1;
   const gridCols = participantsCount <= 1 ? 'grid-cols-1' : participantsCount === 2 ? 'grid-cols-2' : participantsCount <= 4 ? 'grid-cols-2' : participantsCount <= 6 ? 'grid-cols-3' : 'grid-cols-4';

  // Error page (Unchanged)
   if (roomError) { return ( <div className="min-h-screen text-white flex flex-col items-center justify-center bg-slate-900"><p className="mb-4">Unable to open room. {String(roomError)}</p><button className="px-4 py-2 bg-white/10 border border-white/20 rounded-md" onClick={() => navigate("/dashboard/rooms")}>Back to Rooms</button></div> ); }

  // Main render
   return (
    // --- UPDATED: Swapped div for main, removed explicit text-white ---
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col h-screen text-white"> {/* Added text-white here */}
        {/* Top bar */}
        {/* --- UPDATED: Background and border --- */}
        <div className="px-4 py-3 flex items-center justify-between bg-slate-900/50 backdrop-blur-md border-b border-white/15">
          <div className="font-semibold text-white/90">
            {roomName}
            <span className="ml-2 text-white/70">• {participantsCount} {participantsCount === 1 ? 'participant' : 'participants'}</span>
            {!connected && <span className="ml-2 text-red-400 text-sm">• Disconnected</span>}
          </div>
          <div className="flex items-center gap-2">
            {(!mediaReady || mediaError) && (
              // --- UPDATED: Button style ---
              <button onClick={() => setMediaAttempt((n) => n + 1)} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-sm">Retry Media</button>
            )}
            {/* --- UPDATED: Timer style --- */}
            <div className="px-3 py-1 rounded-lg bg-black/30 text-sm font-mono">{duration}</div>
          </div>
        </div>

        {/* Content */}
        {/* --- UPDATED: Removed hardcoded height, using flex-1 and min-h-0 to allow inner scroll areas --- */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden relative">
          {/* Video Grid Area */}
          <div className={`${chatOpen ? 'lg:col-span-9' : 'lg:col-span-12'} h-full min-h-0 overflow-hidden`}>
            {/* --- UPDATED: Background --- */}
            <div className="h-full w-full bg-black/10 relative p-3"> {/* Added p-3 */}
              {/* --- Browser/Permissions Errors (Styles Updated) --- */}
               {(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="max-w-md w-full mx-auto bg-slate-800/70 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-center shadow-2xl">
                    <div className="text-lg font-semibold mb-2">Media Not Supported</div>
                    <p className="text-white/70 text-sm mb-4">Your browser doesn't support camera/mic access. Try Chrome/Edge.</p>
                  </div>
                </div>
              )}
               {mediaError && navigator.mediaDevices?.getUserMedia && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="max-w-md w-full mx-auto bg-slate-800/70 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-center shadow-2xl">
                    <div className="text-lg font-semibold mb-2">Allow camera & microphone</div>
                    <p className="text-white/70 text-sm mb-4">{mediaError}</p>
                    <div className="space-x-2">
                      <button onClick={() => setMediaAttempt((n) => n + 1)} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">Retry</button>
                      <button onClick={() => setChatOpen(true)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20">Open Chat</button>
                    </div>
                  </div>
                </div>
              )}
              {/* Loading state (Unchanged) */}
               {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4" />
                    <p>Setting up video call...</p>
                    <p className="text-sm text-white/60 mt-2">{connected ? 'Connected' : 'Connecting...'}</p>
                  </div>
                </div>
              )}
              {/* Video Tiles Grid (Styles Updated) */}
              {!loading && !mediaError && (
                 participantsCount === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="rounded-2xl px-6 py-4 bg-black/30 backdrop-blur text-white/80 shadow-lg border border-white/10">Waiting for others...</div>
                  </div>
                ) : (
                  <div className={`grid ${gridCols} gap-3 h-full overflow-y-auto`}> {/* Added overflow-y-auto */}
                     {tiles
                      .filter((t) => !(showSelfOverlay && t.peerId === 'local')) // Filter out local if PiP is shown
                      .map((tile) => (
                        <VideoTile key={tile.peerId} tile={tile} refEl={tile.peerId === 'local' ? localVideoRef : null} active={false} handOn={tile.hand} />
                      ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Chat Panel Area */}
          {chatOpen && (
            // --- UPDATED: Background and border ---
            <div className="hidden lg:flex lg:flex-col lg:col-span-3 h-full min-h-0 border-l border-white/15 bg-slate-900/30 backdrop-blur-xl">
              <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
            </div>
          )}
        </div>

        {/* PiP self overlay (Styles Updated) */}
        {showSelfOverlay && mediaReady && (
          <div className="absolute bottom-20 right-4 z-30 w-48 md:w-56 rounded-lg overflow-hidden shadow-2xl border border-white/10">
            <VideoTile
              tile={tiles.find((t) => t.peerId === 'local')}
              refEl={localVideoRef}
              active={localLevel > 0.2} // Threshold for active speaker border
              handOn={tiles.find((t) => t.peerId === 'local')?.hand}
              showName={false}
            />
          </div>
        )}

        {/* Bottom controls (Unchanged - already styled) */}
        <ControlBar
          micOn={controls.mic}
          camOn={controls.cam}
          onToggleMic={toggleMic}
          onToggleCam={toggleCam}
          onChat={() => setChatOpen((s) => !s)}
          onLeave={leave}
          onRaise={toggleRaise}
          raising={controls.raising}
        />

        {/* Toasts (Unchanged - already styled) */}
        <AnimatePresence>{toasts.map((t) => <Toast key={t.id} text={t.text} />)}</AnimatePresence>
      </div>
    </main>
  );
}