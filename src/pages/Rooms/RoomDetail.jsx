import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  X,
  Users,
  Calendar,
  Video,
  MessageSquare,
  FileText,
  Share2,
  CheckCircle,
  Copy,
  Settings
} from "lucide-react";

const RoomDetail = ({ room, onClose }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [joining, setJoining] = useState(false);

  // Resolve a safe roomId from multiple possible fields
  // Prefer database _id for call route; use code for sharing
  const objectId = room?._id || room?.id || "";
  const roomCode = room?.code || room?.slug || objectId;

  const handleJoinVideoCall = (e) => {
    e?.stopPropagation?.();
  if (!objectId || joining) return;

    setJoining(true);

    // Derive a robust user display name
    const pickName = (obj) => {
      if (!obj) return null;
      const c = (s) => (typeof s === 'string' && s.trim().length ? s.trim() : null);
      return (
        c(obj.name) || c(obj.username) || c(obj.fullName) || c(obj.firstName) ||
        c(obj.user?.name) || c(obj.profile?.name) || null
      );
    };
    let userName = null;
    try {
      const keys = ["user", "authUser", "currentUser", "userProfile"];
      for (const k of keys) {
        const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        userName = pickName(parsed) || (parsed?.email ? parsed.email.split('@')[0] : null);
        if (userName) break;
      }
    } catch {}
    if (!userName) userName = "Student";
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);

  const target = `/rooms/call/room/${encodeURIComponent(objectId)}`;
      console.log("[RoomDetail] Join clicked → navigating:", target);

    // console.log("[RoomDetail] Join clicked → navigating to call route", roomId);

        // Save post-login redirect in case auth guard triggers
    sessionStorage.setItem("postLoginRedirect", target);

      // Soft SPA navigation
    navigate(target, { state: { room, userName }, replace: false });


    // // IMPORTANT: navigate to the call route that renders <RoomPage />
    // navigate(`/rooms/call/room/${encodeURIComponent(roomId)}`, {
    //   state: { room, userName },
    //   replace: false
    // });

    // Safety: if navigation is blocked for any reason, re-enable the button
    // setTimeout(() => setJoining(false), 2500);

    setTimeout(() => {
      const stillOnOverlay = !window.location.pathname.startsWith("/rooms/call/");
      if (stillOnOverlay) {
        console.warn("[RoomDetail] SPA navigate did not switch route, forcing hard navigation:", target);
        window.location.assign(target);
      }
      setJoining(false);
    }, 600);
  };

  const handleCopyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const handleOpenChat = (e) => {
    e?.stopPropagation?.();
  navigate(`/rooms/room/${encodeURIComponent(objectId)}`, { state: { room, tab: "chat" } });
  };

  const handleViewNotes = (e) => {
    e?.stopPropagation?.();
  navigate("/dashboard/notes", { state: { roomId: objectId } });
  };

  const handleShareRoom = async (e) => {
    e?.stopPropagation?.();
  const link = `${window.location.origin}/rooms/call/room/${encodeURIComponent(objectId)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: room?.name || "StudyHub Room", text: "Join my room", url: link });
        return;
      }
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const handleManageRoom = (e) => {
    e?.stopPropagation?.();
  navigate("/dashboard/rooms", { state: { manageRoomId: objectId } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{room?.name || "Room"}</h2>
            <p className="text-white/60">{room?.subject || ""}</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>

        {room?.description && <p className="text-white/80 mb-6">{room.description}</p>}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <div>
              <p className="font-medium">{room?.members ?? 1} members</p>
              <p className="text-white/60 text-sm">Active participants</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-green-400" />
            <div>
              <p className="font-medium">{room?.createdAt || "now"}</p>
              <p className="text-white/60 text-sm">Room age</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={handleJoinVideoCall}
            disabled={joining || !objectId}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Video className="w-4 h-4" />
            {joining ? "Joining..." : "Join Video Call"}
          </button>

          <button
            type="button"
            onClick={handleOpenChat}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition-colors font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            Open Chat
          </button>

          <button
            type="button"
            onClick={handleViewNotes}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors font-medium"
          >
            <FileText className="w-4 h-4" />
            View Notes
          </button>

          <button
            type="button"
            onClick={handleShareRoom}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 transition-colors font-medium"
          >
            <Share2 className="w-4 h-4" />
            Share Room
          </button>
        </div>

        {/* Room code */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Room Code</h3>
            <button
              type="button"
              onClick={handleCopyRoomCode}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-white/60 text-sm mb-2">Share this code with others to join</p>
          <div className="bg-slate-600/50 rounded px-3 py-2">
            <code className="font-mono">{roomCode}</code>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-orange-400">👑</span>
            <span className="text-white/80">Your role: {room?.userRole || "member"}</span>
          </div>

          {(room?.userRole === "owner" || room?.userRole === "admin") && (
            <button
              type="button"
              onClick={handleManageRoom}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Settings className="w-3 h-3" />
              Manage Room
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoomDetail;