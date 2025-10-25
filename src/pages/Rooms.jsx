import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  Grid,
  List,
  UserPlus,
  Calendar,
  Eye,
  MoreVertical,
  Edit3,
  Trash2,
  Crown,
  Shield,
  User
} from 'lucide-react';

import CreateRoomModal from './Rooms/CreateRoomModal';
import JoinRoomModal from './Rooms/JoinRoomModal';
import { createRoom as apiCreateRoom } from '../api/roomsApi';

// --- NEW: AnimatedBackground from Notes.jsx ---
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

const RoleIcon = ({ role }) => {
  if (role === 'owner') return <Crown className="w-3 h-3 text-yellow-400" />;
  if (role === 'admin') return <Shield className="w-3 h-3 text-blue-400" />;
  return <User className="w-3 h-3 text-gray-400" />;
};

const statusDot = (s) =>
  s === 'active' ? 'bg-green-500' :
  s === 'studying' ? 'bg-blue-500' :
  s === 'break' ? 'bg-yellow-500' : 'bg-gray-500';

const RoomCard = ({ room, onJoin, onViewDetails, onEdit, onDelete, isOwner }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${statusDot(room.status)}`} />
            <div>
              <h3 className="text-white font-bold text-lg">{room.name}</h3>
              <p className="text-white/60 text-sm">{room.subject}</p>
            </div>
          </div>
          {isOwner && (
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="text-white/60 hover:text-white transition-colors p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-8 bg-slate-800/90 backdrop-blur-lg border border-white/10 rounded-lg py-2 z-50 min-w-[120px]"
                  >
                    <button
                      onClick={() => onEdit(room)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(room.id)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{room.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-white/80 text-sm">{room.members} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-white/80 text-sm">Created {room.createdAt}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RoleIcon role={room.userRole} />
            <span className="text-white/60 text-xs capitalize">{room.userRole || 'member'}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(room)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors flex items-center"
              title="View details"
            >
              <Eye className="w-3 h-3" />
            </button>
            {!room.isMember && (
              <button
                onClick={() => onJoin(room)}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xs rounded-lg transition-all"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load rooms (Unchanged, loads both user's and public rooms)
  useEffect(() => {
    const loadRooms = () => {
      try {
        const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        const publicRooms = JSON.parse(localStorage.getItem('publicRooms') || '[]');
        const allRooms = [...userRooms, ...publicRooms];
        setRooms(allRooms);
        setFilteredRooms(allRooms);
      } catch {
        setRooms([]);
        setFilteredRooms([]);
      }
      setLoading(false);
    };
    loadRooms();
  }, []);

  // All other logic functions are unchanged
  useEffect(() => {
    let filtered = rooms;
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterStatus !== 'all') filtered = filtered.filter(room => room.status === filterStatus);
    setFilteredRooms(filtered);
  }, [searchQuery, filterStatus, rooms]);

  const handleCreateRoom = async (roomData) => {
    try {
      const res = await apiCreateRoom({
        name: roomData.name,
        description: roomData.description,
        visibility: roomData.visibility || 'private'
      });
      const room = res?.data?.room || res?.data || res?.room || res;
      // Normalize for existing UI that expects 'id'
      const normalized = {
        id: room?._id || room?.id,
        _id: room?._id || room?.id,
        code: room?.code,
        name: room?.name || roomData.name,
        subject: roomData.subject || room?.subject || '',
        description: room?.description || roomData.description,
        visibility: room?.visibility || roomData.visibility || 'private',
        members: Array.isArray(room?.members) ? room.members.length : 1,
        status: 'active',
        createdAt: room?.createdAt || 'now',
        userRole: 'owner',
        isMember: true
      };
      const updatedRooms = [...rooms, normalized];
      setRooms(updatedRooms);

      const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
      userRooms.push(normalized);
      localStorage.setItem('userRooms', JSON.stringify(userRooms));

      setShowCreateModal(false);
    } catch (e) {
      console.error('Failed to create room', e);
    }
  };

  const getId = (r) => r?._id || r?.id || r?.code || r?.slug;

  const handleJoinRoom = (room) => {
    const rid = getId(room);
    const updatedRooms = rooms.map(r =>
      getId(r) === rid ? { ...r, isMember: true, members: (r.members || 0) + 1, userRole: 'member' } : r
    );
    setRooms(updatedRooms);

    const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
    const joinedRoom = updatedRooms.find(r => getId(r) === rid);
    if (joinedRoom && !userRooms.find(r => getId(r) === rid)) {
      userRooms.push(joinedRoom);
      localStorage.setItem('userRooms', JSON.stringify(userRooms));
    }
    setShowJoinModal(false);
  };

  const handleViewDetails = (room) => {
    const id = getId(room);
    if (!id) return;
    navigate(`/rooms/room/${encodeURIComponent(id)}`, {
      state: { room, backTo: "/dashboard/rooms" }
    });
  };

  const handleEditRoom = (room) => {
    console.log('Edit room:', room);
  };

  const handleDeleteRoom = (roomId) => {
    const updatedRooms = rooms.filter(r => getId(r) !== roomId);
    setRooms(updatedRooms);

    const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
    const filteredUserRooms = userRooms.filter(r => getId(r) !== roomId);
    localStorage.setItem('userRooms', JSON.stringify(filteredUserRooms));
  };

// --- Loading spinner (Unchanged) ---
  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    // --- UPDATED: Matched main tag and container from other pages ---
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {/* Header (Unchanged) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Study Rooms</h1>
              <p className="text-white/70">Join collaborative study sessions or create your own</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowJoinModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
              >
                <UserPlus className="w-4 h-4" />
                Join Room
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Create Room
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters (Unchanged) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 focus:outline-none focus:border-blue-500 transition-colors"
              >
                {/* --- UPDATED: Added dark style to options for consistency --- */}
                <option className="bg-slate-800 text-white" value="all">All Status</option>
                <option className="bg-slate-800 text-white" value="active">Active</option>
                <option className="bg-slate-800 text-white" value="studying">Studying</option>
                <option className="bg-slate-800 text-white" value="break">On Break</option>
              </select>
              <div className="flex bg-white/10 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rooms (Unchanged) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {filteredRooms.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-lg mx-auto"
              >
                <Users className="w-20 h-20 text-white/40 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">No rooms found</h3>
                <p className="text-white/60 mb-8 text-lg">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Create your first study room to get started and collaborate with others'}
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-transform shadow-2xl font-semibold"
                >
                  Create Your First Room
                </button>
              </motion.div>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredRooms.map((room, index) => (
                <motion.div key={getId(room)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <RoomCard
                    room={room}
                    onJoin={handleJoinRoom}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEditRoom}
                    onDelete={handleDeleteRoom}
                    isOwner={room.userRole === 'owner'}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals (Unchanged) */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateRoomModal onClose={() => setShowCreateModal(false)} onCreateRoom={handleCreateRoom} />
        )}
        {showJoinModal && (
          <JoinRoomModal onClose={() => setShowJoinModal(false)} onJoinRoom={handleJoinRoom} availableRooms={rooms.filter(r => !r.isMember)} />
        )}
      </AnimatePresence>
    </main>
  );
}