import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Search, Users, Lock, Globe } from 'lucide-react';
import { joinByCode as apiJoinByCode } from '../../api/roomsApi';

const JoinRoomModal = ({ onClose, onJoinRoom, availableRooms }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState('');


    const filteredRooms = availableRooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleJoinByCode = async () => {
        const code = roomCode.trim();
        if (!code || joining) return;
        setError('');
        setJoining(true); 

        try {
            console.log(`Attempting to join room with code: ${code.toUpperCase()}`);
            const res = await apiJoinByCode(code.toUpperCase()); 
            
    
            const room = res?.data?.room || res?.data || res?.room || res;
            console.log('API Response:', res); 
            console.log('Extracted Room:', room); 

            // Check if the API returned a valid room object with a MongoDB _id
            if (room && room._id) {
                console.log(`API found room with _id: ${room._id}. Navigating...`);
                // API succeeded, navigate with room data (ensures user is added on backend)
                navigate(`/rooms/call/${encodeURIComponent(room._id)}`, { state: { room } });
                onClose?.();
                return; // Success, exit function
            }

            // Step 2: If API fails or doesn't return _id, check if input is a direct MongoDB ObjectId
            // This is a fallback and might bypass backend join logic (like adding member)
            // Use only if RoomPage can handle fetching details itself.
            if (/^[a-fA-F0-9]{24}$/.test(code)) {
                console.log(`Code looks like ObjectId: ${code}. Navigating directly...`);
                // Navigate directly, RoomPage will need to fetch details
                navigate(`/rooms/call/${encodeURIComponent(code)}`);
                onClose?.();
                return; // Success (navigation initiated)
            }

            // Step 3: If neither API nor ObjectId works, throw an error based on API response or default
            console.log('API did not find room and code is not ObjectId.');
            throw new Error(res?.message || 'Room not found or invalid code.');

        } catch (e) {
            // Handle errors from API call or thrown error
            const msg = e?.response?.data?.message || e?.message || 'Invalid room code or an error occurred while joining.';
            console.error("Join room error:", e); // Log the full error for debugging
            setError(msg);
        } finally {
            setJoining(false); // Stop loading regardless of success or failure
        }
    };
    // --- END REFACTORED handleJoinByCode ---


    // --- Rest of the component remains the same ---
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose} // Allow closing by clicking outside
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                // --- Matched styling from other modals ---
                className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl text-white"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Join Study Room</h2>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Join by Code */}
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-3">Join by Room Code</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleJoinByCode(); } }}
                            // --- Matched input style ---
                            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                            placeholder="Enter room code"
                        />
                        <button
                            onClick={handleJoinByCode}
                            disabled={!roomCode.trim() || joining}
                             // --- Matched button style ---
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        >
                            {joining ? 'Joining…' : 'Join'}
                        </button>
                    </div>
                    {error && (
                        <div className="mt-2 text-sm text-red-400">{error}</div>
                    )}
                </div>

                {/* Search Available Rooms */}
                <div className="mb-4">
                    <h3 className="text-white font-medium mb-3">Browse Available Rooms</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                             // --- Matched input style ---
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                            placeholder="Search available public rooms..."
                        />
                    </div>
                </div>

                {/* Available Rooms List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2"> {/* Added padding-right for scrollbar */}
                    {filteredRooms.length === 0 ? (
                        <div className="text-center py-8 text-white/60">
                            {searchQuery ? 'No rooms found matching your search' : 'No public rooms available to browse'}
                        </div>
                    ) : (
                        filteredRooms.map((room) => (
                            <div
                                key={room.id || room._id} // Use _id as fallback key
                                className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0"> {/* Ensure text wraps */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-white font-medium truncate">{room.name}</h4>
                                        {room.isPrivate ?
                                            <Lock className="w-3 h-3 text-orange-400 flex-shrink-0" title="Private" /> :
                                            <Globe className="w-3 h-3 text-green-400 flex-shrink-0" title="Public" />
                                        }
                                    </div>
                                    <p className="text-white/60 text-sm mb-2 truncate">{room.subject}</p>
                                    <div className="flex items-center gap-4 text-xs text-white/50">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {room.members || '?'} members {/* Handle potentially missing members count */}
                                        </span>
                                        {room.createdAt && <span>Created {room.createdAt === 'now' ? 'Just now' : new Date(room.createdAt).toLocaleDateString()}</span>}
                                    </div>
                                </div>
                                <button
                                     // Use the API join logic when clicking Join from the list too
                                    onClick={() => { setRoomCode(room.code || room.id || room._id); handleJoinByCode(); }}
                                     // --- Matched button style (using green gradient for list join) ---
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition flex-shrink-0"
                                >
                                    Join
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default JoinRoomModal;