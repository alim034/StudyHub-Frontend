import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    FileText,
    CheckSquare,
    MessageSquare,
    Calendar,
    Clock,
    TrendingUp,
    BookOpen,
    Target,
    Award,
    Activity,
    Plus,
    ArrowUpRight,
    Bell,
    User,
    BarChart3,
    PieChart,
    Zap,
    Star,
    ChevronRight,
    Brain,
    Lightbulb,
    Coffee,
    Home,
    Play,
    Pause,
    RotateCcw,
    Crown,
    Medal,
    Flame,
    AlertCircle,
    CheckCircle,
    ExternalLink,
    Hash,
    BookMarked,
    Compass,
    TrendingUp as TrendingUpIcon,
    Edit3,
    UserPlus,
    Heart,
    Bookmark,
    Sun,
    Moon,
    Sunrise,
    Sunset,
    Calendar as CalendarIcon,
    MapPin,
    Globe,
    Settings,
    Rocket,
    Upload 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Enhanced Animated Background Component 
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Base gradient with depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
            
            {/* Enhanced large animated orbs */}
            <motion.div
                animate={{
                    x: ["-25%", "25%", "-25%"],
                    y: ["-15%", "15%", "-15%"],
                    scale: [1, 1.3, 1],
                    rotate: [0, 360],
                }}
                transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full opacity-40"
                style={{
                    background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.3) 40%, rgba(59,130,246,0.1) 70%, transparent 100%)",
                    filter: "blur(60px)",
                }}
            />
            
            <motion.div
                animate={{
                    x: ["25%", "-25%", "25%"],
                    y: ["15%", "-15%", "15%"],
                    scale: [1.2, 0.8, 1.2],
                    rotate: [360, 0],
                }}
                transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] rounded-full opacity-35"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.4) 40%, rgba(139,92,246,0.1) 70%, transparent 100%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Medium floating elements */}
            <motion.div
                animate={{
                    x: [0, 200, -150, 0],
                    y: [0, -100, 150, 0],
                    scale: [1, 1.5, 0.7, 1],
                    opacity: [0.3, 0.6, 0.1, 0.3],
                    rotate: [0, 180, 360],
                }}
                transition={{ 
                    duration: 18, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="absolute top-[20%] left-[30%] w-80 h-80 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(6,182,212,0.5) 0%, rgba(6,182,212,0.2) 50%, rgba(6,182,212,0.05) 80%, transparent 100%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Small dancing particles */}
            {Array.from({ length: 12 }).map((_, i) => {
                const randomDelay = Math.random() * 10;
                const randomDuration = 10 + Math.random() * 15;
                const randomSize = 30 + Math.random() * 60;
                
                return (
                    <motion.div
                        key={`particle-${i}`}
                        animate={{
                            x: [
                                Math.random() * 300 - 150,
                                Math.random() * 300 - 150,
                                Math.random() * 300 - 150,
                                Math.random() * 300 - 150,
                            ],
                            y: [
                                Math.random() * 300 - 150,
                                Math.random() * 300 - 150,
                                Math.random() * 300 - 150,
                                Math.random() * 300 - 150,
                            ],
                            scale: [0.3, 2, 1, 0.3],
                            opacity: [0, 0.8, 0.4, 0],
                            rotate: [0, 360, 180, 0],
                        }}
                        transition={{
                            duration: randomDuration,
                            delay: randomDelay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute rounded-full"
                        style={{
                            left: `${10 + (i * 7)}%`,
                            top: `${5 + (i * 8)}%`,
                            width: `${randomSize}px`,
                            height: `${randomSize}px`,
                            background: i % 4 === 0 
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

            {/* Animated grid */}
            <motion.div 
                animate={{
                    opacity: [0.01, 0.15, 0.05, 0.01],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />
        </div>
    );
};

// Enhanced Stats Card Component
const StatsCard = ({ title, value, icon: Icon, trend, color, description, onClick, subText }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="relative group cursor-pointer"
        onClick={onClick}
    >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 md:p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-2 md:mb-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                {trend && trend > 0 && (
                    <div className="flex items-center gap-1 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">+{trend}%</span>
                    </div>
                )}
            </div>
            
            <div>
                <h3 className="text-white/70 text-xs md:text-sm font-medium mb-1">{title}</h3>
                <p className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">{value}</p>
                {subText && (
                    <p className="text-white/50 text-[10px] md:text-xs">{subText}</p>
                )}
            </div>
            
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white/40" />
            </div>
        </div>
    </motion.div>
);

// Enhanced Motivational Thoughts Component with 8 weekly quotes
const MotivationalThoughts = () => {
    const weeklyMotivationalQuotes = [
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt",
            icon: <Star className="w-6 h-6 text-yellow-400" />,
            gradient: "from-yellow-500/20 via-orange-500/20 to-red-500/20"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill",
            icon: <Target className="w-6 h-6 text-blue-400" />,
            gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
        },
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs",
            icon: <Heart className="w-6 h-6 text-red-400" />,
            gradient: "from-red-500/20 via-pink-500/20 to-rose-500/20"
        },
        {
            text: "Education is the most powerful weapon which you can use to change the world.",
            author: "Nelson Mandela",
            icon: <BookOpen className="w-6 h-6 text-green-400" />,
            gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20"
        },
        {
            text: "The expert in anything was once a beginner.",
            author: "Helen Hayes",
            icon: <Brain className="w-6 h-6 text-purple-400" />,
            gradient: "from-purple-500/20 via-violet-500/20 to-indigo-500/20"
        },
        {
            text: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson",
            icon: <Clock className="w-6 h-6 text-cyan-400" />,
            gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20"
        },
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt",
            icon: <Lightbulb className="w-6 h-6 text-orange-400" />,
            gradient: "from-orange-500/20 via-yellow-500/20 to-amber-500/20"
        },
        {
            text: "It does not matter how slowly you go as long as you do not stop.",
            author: "Confucius",
            icon: <Zap className="w-6 h-6 text-pink-400" />,
            gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20"
        }
    ];

    // Change quote daily based on India Standard Time (IST)
    const istNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const startOfYear = new Date(istNow.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((istNow - startOfYear) / 86400000);
    const currentQuote = weeklyMotivationalQuotes[dayOfYear % weeklyMotivationalQuotes.length];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group mt-6"
        >
            <div className={`absolute -inset-1 bg-gradient-to-r ${currentQuote.gradient} rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
            
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="text-center">
                    <motion.div 
                        className="flex justify-center mb-4 md:mb-6"
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                    >
                        {currentQuote.icon}
                    </motion.div>
                    
                    <motion.blockquote 
                        className="text-white/90 text-lg md:text-xl font-medium italic mb-3 md:mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        "{currentQuote.text}"
                    </motion.blockquote>
                    
                    <motion.cite 
                        className="text-white/60 text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        — {currentQuote.author}
                    </motion.cite>
                </div>
            </div>
        </motion.div>
    );
};

// Enhanced Date and Time Component
const DateTimeDisplay = ({ currentTime }) => {
    const getTimeIcon = () => {
        const hourIST = Number(
            currentTime.toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
        );
        if (hourIST >= 5 && hourIST < 12) return <Sunrise className="w-5 h-5 text-orange-400" />;
        if (hourIST >= 12 && hourIST < 17) return <Sun className="w-5 h-5 text-yellow-400" />;
        if (hourIST >= 17 && hourIST < 21) return <Sunset className="w-5 h-5 text-orange-500" />;
        return <Moon className="w-5 h-5 text-blue-300" />; // Night
    };

    return (
        <motion.div 
            className="flex flex-col items-end space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>
                    {currentTime.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric',
                        timeZone: 'Asia/Kolkata'
                    })}
                </span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-base">
                {getTimeIcon()}
                <span>
                    {currentTime.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Asia/Kolkata'
                    })}
                </span>
            </div>
        </motion.div>
    );
};

// Real-time Stats Manager with Automatic Streak Tracking
const useRealUserStats = () => {
    const [stats, setStats] = useState({
        activeRooms: 0,
        notesCreated: 0,
        dailyTasks: 0,
        studyStreak: 0,
        lastLoginDate: null,
        streakStartDate: null
    });

    // Load stats from localStorage and sync with real data
    useEffect(() => {
        loadUserStats();
        syncWithRealData();
        handleStreakTracking();
    }, []);

    const loadUserStats = () => {
        try {
            const savedStats = localStorage.getItem('userRealStats');
            if (savedStats) {
                setStats(JSON.parse(savedStats));
            }
        } catch (error) {
            console.error('Error loading user stats:', error);
        }
    };

    const saveStats = (newStats) => {
        try {
            localStorage.setItem('userRealStats', JSON.stringify(newStats));
        } catch (error) {
            console.error('Error saving user stats:', error);
        }
    };

    // Sync with real app data
    const syncWithRealData = async () => {
        try {
            // Get real rooms data
            const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
            const activeRoomsCount = userRooms.length;

            // Get real notes data
            const userNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
            const notesCount = userNotes.length;

            // Get real tasks data
            const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
            const today = new Date().toDateString();
            const dailyTasksCount = userTasks.filter(task => 
                new Date(task.createdAt).toDateString() === today
            ).length;

            setStats(prev => {
                const updated = {
                    ...prev,
                    activeRooms: activeRoomsCount,
                    notesCreated: notesCount,
                    dailyTasks: dailyTasksCount
                };
                saveStats(updated);
                return updated;
            });
        } catch (error) {
            console.error('Error syncing with real data:', error);
        }
    };

    // Handle automatic streak tracking
    const handleStreakTracking = () => {
        const today = new Date().toDateString();
        const savedStats = JSON.parse(localStorage.getItem('userRealStats') || '{}');
        const lastLoginDate = savedStats.lastLoginDate;

        if (!lastLoginDate) {
            // First time user - start streak at 1
            const newStats = {
                ...savedStats,
                studyStreak: 1,
                lastLoginDate: today,
                streakStartDate: today
            };
            setStats(newStats);
            saveStats(newStats);
        } else {
            const lastLogin = new Date(lastLoginDate);
            const currentDate = new Date(today);
            const timeDiff = Math.abs(currentDate - lastLogin);
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                // Consecutive day - increment streak
                const newStats = {
                    ...savedStats,
                    studyStreak: (savedStats.studyStreak || 0) + 1,
                    lastLoginDate: today
                };
                setStats(newStats);
                saveStats(newStats);
            } else if (daysDiff > 1) {
                // Missed days - reset streak to 1
                const newStats = {
                    ...savedStats,
                    studyStreak: 1,
                    lastLoginDate: today,
                    streakStartDate: today
                };
                setStats(newStats);
                saveStats(newStats);
            } else if (daysDiff === 0) {
                // Same day - maintain current streak
                setStats(savedStats);
            }
        }
    };

    // Real-time event handlers
    const handleRoomCreated = (roomData) => {
        const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        userRooms.push(roomData);
        localStorage.setItem('userRooms', JSON.stringify(userRooms));
        syncWithRealData();
    };

    const handleRoomJoined = (roomData) => {
        const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        if (!userRooms.find(room => room.id === roomData.id)) {
            userRooms.push(roomData);
            localStorage.setItem('userRooms', JSON.stringify(userRooms));
        }
        syncWithRealData();
    };

    const handleRoomLeft = (roomId) => {
        const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        const filteredRooms = userRooms.filter(room => room.id !== roomId);
        localStorage.setItem('userRooms', JSON.stringify(filteredRooms));
        syncWithRealData();
    };

    const handleNoteUploaded = (noteData) => {
        const userNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
        userNotes.push({
            ...noteData,
            uploadedAt: new Date().toISOString()
        });
        localStorage.setItem('userNotes', JSON.stringify(userNotes));
        syncWithRealData();
    };

    const handleNoteDeleted = (noteId) => {
        const userNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
        const filteredNotes = userNotes.filter(note => note.id !== noteId);
        localStorage.setItem('userNotes', JSON.stringify(filteredNotes));
        syncWithRealData();
    };

    const handleTaskAdded = (taskData) => {
        const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
        userTasks.push({
            ...taskData,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('userTasks', JSON.stringify(userTasks));
        syncWithRealData();
    };

    const handleTaskCompleted = (taskId) => {
        const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
        const updatedTasks = userTasks.map(task => 
            task.id === taskId ? { ...task, completed: true, completedAt: new Date().toISOString() } : task
        );
        localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
        syncWithRealData();
    };

    const handleTaskDeleted = (taskId) => {
        const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
        const filteredTasks = userTasks.filter(task => task.id !== taskId);
        localStorage.setItem('userTasks', JSON.stringify(filteredTasks));
        syncWithRealData();
    };

    // Periodic sync every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            syncWithRealData();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return {
        stats,
        handlers: {
            handleRoomCreated,
            handleRoomJoined,
            handleRoomLeft,
            handleNoteUploaded,
            handleNoteDeleted,
            handleTaskAdded,
            handleTaskCompleted,
            handleTaskDeleted
        },
        syncWithRealData
    };
};

// Dynamic Motivational Messages
const getDynamicMotivation = () => {
    const motivationalMessages = [
        "Stay consistent. Small steps = Big progress 🚀",
        "Ready to crush your goals today? 💪",
        "A new day to learn something amazing ✨",
        "Let's make today productive 🎯",
        "Your future self will thank you 🌟",
        "Progress, not perfection 📈",
        "Every expert was once a beginner 🌱"
    ];
    
    // Use date to ensure same message for the whole day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return motivationalMessages[dayOfYear % motivationalMessages.length];
};

// Task Timeline Component 
// Update the TaskTimeline Component
const TaskTimeline = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load real tasks from localStorage
        const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');
        setTasks(userTasks.slice(0, 5)); // Show latest 5 tasks
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'overdue': return 'border-red-500 bg-red-500/10';
            case 'completed': return 'border-green-500 bg-green-500/10';
            default: return 'border-blue-500 bg-blue-500/10';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'overdue': return <AlertCircle className="w-4 h-4 text-red-400" />;
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
            default: return <Clock className="w-4 h-4 text-blue-400" />;
        }
    };

    const handleCreateTask = () => {
        navigate('/tasks');
    };

    const handleViewAllTasks = () => {
        navigate('/tasks');
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center py-8">
                <CheckSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm mb-4">No tasks yet. Add your first task!</p>
                <button 
                    onClick={handleCreateTask}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm hover:scale-105 transition-transform"
                >
                    Create Task
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task, index) => (
                <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${getStatusColor(task.status)} backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 cursor-pointer`}
                    onClick={handleViewAllTasks}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {getStatusIcon(task.status)}
                            <div>
                                <h4 className="text-white font-medium text-sm">{task.title}</h4>
                                <p className="text-white/60 text-xs">{task.due || 'No due date'}</p>
                            </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-gray-500/20 text-gray-300'
                        }`}>
                            {task.priority || 'low'}
                        </div>
                    </div>
                </motion.div>
            ))}
            
            {/* View All Tasks Button */}
            <motion.button
                onClick={handleViewAllTasks}
                className="w-full mt-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
            >
                View All Tasks ({tasks.length})
                <ArrowUpRight className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

// Study Circles Component - Load from real data
const StudyCircles = () => {
    const [circles, setCircles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load real rooms from localStorage
        const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        const formattedCircles = userRooms.slice(0, 4).map((room, index) => ({
            id: room.id || index,
            name: room.name || `Room ${index + 1}`,
            members: room.members || Math.floor(Math.random() * 50) + 10,
            active: room.active !== false,
            color: [
                'from-blue-500 to-cyan-500',
                'from-green-500 to-teal-500',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500'
            ][index % 4]
        }));
        setCircles(formattedCircles);
    }, []);

    const handleExploreRooms = () => {
        navigate('/dashboard/rooms');
    };

    const handleViewAllRooms = () => {
        navigate('/dashboard/rooms');
    };

    if (circles.length === 0) {
        return (
            <div className="text-center py-8">
                <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm mb-4">No study circles yet. Join your first room!</p>
                <button 
                    onClick={handleExploreRooms}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-sm hover:scale-105 transition-transform"
                >
                    Explore Rooms
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            {circles.map((circle, index) => (
                <motion.div
                    key={circle.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    onClick={handleViewAllRooms}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${circle.color}`} />
                            <div>
                                <h4 className="text-white font-medium text-sm">{circle.name}</h4>
                                <p className="text-white/60 text-xs">{circle.members} members</p>
                            </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${circle.active ? 'bg-green-400' : 'bg-gray-500'}`} />
                    </div>
                </motion.div>
            ))}
            
            {/* View All Rooms Button */}
            <motion.button
                onClick={handleViewAllRooms}
                className="w-full mt-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
            >
                View All Rooms ({circles.length})
                <ArrowUpRight className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

// Enhanced Resources Hub - Load from real notes
// Update the PopularInYourRooms Component
const PopularInYourRooms = () => {
    const [resources, setResources] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load real notes from localStorage
        const userNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
        const formattedResources = userNotes.slice(0, 4).map((note, index) => ({
            id: note.id || index,
            title: note.title || `Note ${index + 1}`,
            type: note.type || ['notes', 'guide', 'cheatsheet', 'roadmap'][index % 4],
            author: note.author || 'You',
            downloads: note.downloads || Math.floor(Math.random() * 100) + 20,
            room: note.room || 'Your Room',
            trend: ['trending', 'popular', 'hot', 'new'][index % 4],
            uploadedAt: note.uploadedAt || new Date().toISOString()
        }));
        setResources(formattedResources);
    }, []);

    const getTypeColor = (type) => {
        switch (type) {
            case 'roadmap': return 'text-blue-400';
            case 'cheatsheet': return 'text-green-400';
            case 'notes': return 'text-purple-400';
            case 'guide': return 'text-orange-400';
            default: return 'text-gray-400';
        }
    };

    const getTrendBadge = (trend) => {
        const badges = {
            trending: { color: 'bg-red-500/20 text-red-300', text: '🔥 Trending' },
            popular: { color: 'bg-blue-500/20 text-blue-300', text: '⭐ Popular' },
            hot: { color: 'bg-orange-500/20 text-orange-300', text: '🚀 Hot' },
            new: { color: 'bg-green-500/20 text-green-300', text: '✨ New' }
        };
        return badges[trend] || badges.new;
    };

    const handleUploadNote = () => {
        navigate('/dashboard/notes');
    };

    const handleViewAllNotes = () => {
        navigate('/dashboard/notes');
    };

    const handleNoteClick = (note) => {
        navigate('/dashboard/notes');
    };

    if (resources.length === 0) {
        return (
            <div className="text-center py-8">
                <BookMarked className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm mb-4">No notes yet. Upload your first note!</p>
                <button 
                    onClick={handleUploadNote}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm hover:scale-105 transition-transform"
                >
                    Upload Note
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2 md:space-y-3">
            {resources.map((resource, index) => (
                <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
                    onClick={() => handleNoteClick(resource)}
                >
                    <div className="flex items-start justify-between mb-1.5 md:mb-2">
                        <div className="flex items-center gap-2 md:gap-3 flex-1">
                            <BookMarked className={`w-4 h-4 ${getTypeColor(resource.type)}`} />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-[13px] md:text-sm truncate">{resource.title}</h4>
                                <p className="text-white/60 text-[11px] md:text-xs">by {resource.author}</p>
                            </div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <span className={`px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs ${getTrendBadge(resource.trend).color}`}>
                                {getTrendBadge(resource.trend).text}
                            </span>
                            <span className="text-cyan-400 text-[11px] md:text-xs truncate">in {resource.room}</span>
                        </div>
                        <span className="text-white/50 text-[11px] md:text-xs">{resource.downloads} downloads</span>
                    </div>
                </motion.div>
            ))}
            
            {/* View All Notes Button */}
            <motion.button
                onClick={handleViewAllNotes}
                className="w-full mt-3 md:mt-4 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
            >
                View All Notes ({resources.length})
                <ArrowUpRight className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

// Dashboard Resources preview under Task Timeline
const DashboardResourcesPreview = () => {
    const [resources, setResources] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const key = `userResources:${user?._id || user?.id || user?.email || 'guest'}`;
        try {
            const saved = JSON.parse(localStorage.getItem(key) || localStorage.getItem('userResources') || '[]');
            setResources(Array.isArray(saved) ? saved.slice(-4).reverse() : []);
        } catch {
            setResources([]);
        }
    }, [user]);

    if (!resources.length) {
        return (
            <div className="text-center py-8">
                <BookMarked className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm mb-4">No resources yet. Upload your first link.</p>
                <button
                    onClick={() => navigate('/resources')}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm hover:scale-105 transition-transform"
                >
                    Go to Resources
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-2 md:space-y-3">
            {resources.map((r, idx) => (
                <motion.div
                    key={r.id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate('/resources')}
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="font-semibold text-white text-[13px] md:text-sm truncate">{r.title}</div>
                            <div className="text-white/60 text-[11px] md:text-xs truncate">
                                {r.type || 'notes'} • {new Date(r.uploadedAt || Date.now()).toLocaleDateString()}
                            </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/40" />
                    </div>
                </motion.div>
            ))}
            <motion.button
                onClick={() => navigate('/resources')}
                className="w-full mt-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
            >
                View All Resources ({resources.length})
                <ArrowUpRight className="w-4 h-4" />
            </motion.button>
        </div>
    );
};

// Quick Actions Component
const QuickActions = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            title: "Create Room",
            description: "Start a new study room",
            icon: <Plus className="w-5 h-5" />,
            color: "from-blue-500 to-cyan-500",
            action: () => navigate('/dashboard/rooms')
        },
        {
            title: "Upload Notes",
            description: "Share your study materials",
            icon: <Upload className="w-5 h-5" />,
            color: "from-green-500 to-teal-500",
            action: () => navigate('/dashboard/notes')
        },
        {
            title: "Join Room",
            description: "Find and join study groups",
            icon: <Users className="w-5 h-5" />,
            color: "from-purple-500 to-pink-500",
            action: () => navigate('/dashboard/rooms')
        },
        {
            title: "Add Task",
            description: "Organize your studies",
            icon: <Plus className="w-5 h-5" />,
            color: "from-orange-500 to-red-500",
            action: () => navigate('/tasks')
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
                <motion.button
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className="relative group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        {action.icon}
                    </div>
                    <div className="text-left">
                        <h4 className="text-white font-medium text-sm mb-1">{action.title}</h4>
                        <p className="text-white/60 text-xs">{action.description}</p>
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

// Study Progress Component
// Replace the StudyProgress Component with RecentActivity
const RecentActivity = () => {
    const [activities, setActivities] = useState([]);

    const loadActivities = () => {
        const userRooms = JSON.parse(localStorage.getItem('userRooms') || '[]');
        const userNotes = JSON.parse(localStorage.getItem('userNotes') || '[]');
        const userTasks = JSON.parse(localStorage.getItem('userTasks') || '[]');

        const allActivities = [];

        userRooms.forEach(room => {
            allActivities.push({
                id: `room-${room.id}`,
                type: 'room',
                title: `Joined "${room.name}"`,
                time: room.joinedAt || new Date().toISOString(),
                icon: <Users className="w-4 h-4" />,
                color: 'from-blue-500 to-cyan-500',
                bgColor: 'bg-blue-500/10',
                description: `${room.members || 0} members`
            });
        });

        userNotes.forEach(note => {
            allActivities.push({
                id: `note-${note.id}`,
                type: 'note',
                title: `Uploaded "${note.title || 'New Note'}"`,
                time: note.uploadedAt || new Date().toISOString(),
                icon: <BookMarked className="w-4 h-4" />,
                color: 'from-green-500 to-teal-500',
                bgColor: 'bg-green-500/10',
                description: `${note.type || 'document'} • ${note.downloads || 0} downloads`
            });
        });

        userTasks.forEach(task => {
            allActivities.push({
                id: `task-${task.id}`,
                type: 'task',
                title: task.completed ? `Completed "${task.title}"` : `Added "${task.title}"`,
                time: task.completed ? task.completedAt : task.createdAt || new Date().toISOString(),
                icon: task.completed ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />,
                color: task.completed ? 'from-green-500 to-emerald-500' : 'from-orange-500 to-red-500',
                bgColor: task.completed ? 'bg-green-500/10' : 'bg-orange-500/10',
                description: `Priority: ${task.priority || 'medium'}`
            });
        });

        // Sort by time (most recent first) and cap to 5
        const sortedActivities = allActivities
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .slice(0, 5);

        setActivities(sortedActivities);
    };

    useEffect(() => {
        loadActivities();
        // Update on common custom events used elsewhere
        const onNotes = () => loadActivities();
        const onStorage = () => loadActivities();
        window.addEventListener('notes-updated', onNotes);
        window.addEventListener('storage', onStorage);
        // Lightweight periodic refresh as fallback
        const id = setInterval(loadActivities, 10000);
        return () => {
            window.removeEventListener('notes-updated', onNotes);
            window.removeEventListener('storage', onStorage);
            clearInterval(id);
        };
    }, []);

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    if (activities.length === 0) {
        return (
            <div className="text-center py-8">
                <Activity className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm mb-4">No recent activity yet.</p>
                <p className="text-white/40 text-xs">Start by joining a room or uploading notes!</p>
            </div>
        );
    }

    return (
        <div className="space-y-2 md:space-y-3">
            {activities.map((activity, index) => (
                <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 md:p-4 rounded-xl border border-white/10 ${activity.bgColor} hover:bg-white/10 transition-colors duration-200 cursor-pointer group`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-r ${activity.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-medium text-[13px] md:text-sm truncate">{activity.title}</h4>
                                    <p className="text-white/60 text-[11px] md:text-xs mt-1">{activity.description}</p>
                                </div>
                                <span className="text-white/40 text-[11px] md:text-xs flex-shrink-0 ml-2">
                                    {getTimeAgo(activity.time)}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
            
            {activities.length > 0 && (
                <div className="text-center pt-1.5 md:pt-2">
                    <p className="text-white/40 text-[11px] md:text-xs">Most recent {activities.length} activities</p>
                </div>
            )}
        </div>
    );
};

// Update the Dashboard component to fix spacing and use RecentActivity
const Dashboard = () => {
    const getISTDate = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const [currentTime, setCurrentTime] = useState(getISTDate());
    const [userName, setUserName] = useState('Student');
    const { stats, handlers, syncWithRealData } = useRealUserStats();
    const { user: authUser } = useAuth();

    // Prefer AuthContext user; fallback to common storage keys (works for login/register/profile).
    useEffect(() => {
        const extractName = (obj) => {
            if (!obj) return null;
            const c = (s) => (typeof s === 'string' && s.trim().length ? s.trim() : null);
            return (
                c(obj.name) || c(obj.username) || c(obj.firstName) || c(obj.fullName) ||
                c(obj.user?.name) || c(obj.profile?.name) || null
            );
        };

        let foundName = extractName(authUser);

        if (!foundName) {
            try {
                const keys = ['user', 'authUser', 'currentUser', 'userProfile'];
                for (const k of keys) {
                    const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
                    if (raw) {
                        const obj = JSON.parse(raw);
                        foundName = extractName(obj);
                        if (!foundName && obj && obj.email) {
                            foundName = obj.email.split('@')[0];
                        }
                        if (foundName) break;
                    }
                }
            } catch (e) {
                // ignore parse errors
            }
        }

        if (!foundName) foundName = 'Student';
        const pretty = foundName.charAt(0).toUpperCase() + foundName.slice(1);
        setUserName(pretty);
    }, [authUser]);

    // Update time every minute
    useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getISTDate()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Expose handlers globally for other components to use
    useEffect(() => {
        window.dashboardHandlers = handlers;
        window.syncDashboardStats = syncWithRealData;
    }, [handlers, syncWithRealData]);

    const getGreeting = () => {
    const hourIST = Number(currentTime.toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }));
    if (hourIST >= 5 && hourIST < 12) return 'Good Morning';
    if (hourIST >= 12 && hourIST < 17) return 'Good Afternoon';
    if (hourIST >= 17 && hourIST < 21) return 'Good Evening';
    return 'Good Night';
    };

    // Real dynamic stats data
    const dashboardStats = [
        {
            title: "Active Rooms",
            value: stats.activeRooms.toString(),
            icon: Users,
            trend: stats.activeRooms > 0 ? 25 : 0,
            color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            subText: stats.activeRooms > 0 ? `${stats.activeRooms} room${stats.activeRooms !== 1 ? 's' : ''} joined` : "join your first room"
        },
        {
            title: "Notes Created",
            value: stats.notesCreated.toString(),
            icon: Edit3,
            trend: stats.notesCreated > 0 ? 12 : 0,
            color: "bg-gradient-to-r from-green-500 to-teal-500",
            subText: stats.notesCreated > 0 ? `${stats.notesCreated} note${stats.notesCreated !== 1 ? 's' : ''} uploaded` : "create your first note"
        },
        {
            title: "Daily Tasks",
            value: stats.dailyTasks.toString(),
            icon: CheckSquare,
            color: "bg-gradient-to-r from-orange-500 to-red-500",
            subText: stats.dailyTasks > 0 ? `${stats.dailyTasks} task${stats.dailyTasks !== 1 ? 's' : ''} today` : "add your first task"
        },
        {
            title: "Study Streak",
            value: stats.studyStreak.toString(),
            icon: Flame,
            trend: stats.studyStreak > 0 ? 8 : 0,
            color: "bg-gradient-to-r from-purple-500 to-pink-500",
            subText: stats.studyStreak > 0 ? `${stats.studyStreak} day${stats.studyStreak !== 1 ? 's' : ''} streak` : "start your streak"
        }
    ];

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            
            <div className="relative z-10 container mx-auto px-3 md:px-4 py-4 md:py-6 max-w-7xl">
                {/* Enhanced Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 md:mb-8"
                >
                    <div className="relative group">
                        <div className="absolute -inset-px md:-inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-md md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                        
                        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-8">
                                <div className="flex-1">
                                    <motion.h1 
                                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        {getGreeting()}, {userName}! 
                                        <motion.span
                                            animate={{ 
                                                rotate: [0, 14, -8, 14, -4, 10, 0],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{ 
                                                duration: 1.5, 
                                                repeat: Infinity, 
                                                repeatDelay: 4 
                                            }}
                                            className="inline-block ml-3"
                                        >
                                            👋
                                        </motion.span>
                                    </motion.h1>
                                    
                                    <motion.p 
                                        className="text-white/70 text-base md:text-xl mb-4 md:mb-6 font-medium"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {getDynamicMotivation()}
                                    </motion.p>
                                    
                                    <MotivationalThoughts />
                                </div>
                                
                                <DateTimeDisplay currentTime={currentTime} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Real Dynamic Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
                >
                    {dashboardStats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <StatsCard {...stat} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Dashboard Grid - Fixed Layout with equal heights */}
                <div className="grid lg:grid-cols-3 gap-5 md:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Task Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative group h-fit"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                            <CheckSquare className="w-4 h-4 text-white" />
                                        </div>
                                        Task Timeline
                                    </h2>
                                </div>
                                <TaskTimeline />
                            </div>
                        </motion.div>

                        {/* Resources Preview - New Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="relative group h-fit"
                        >
                            <div className="absolute -inset-px md:-inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-md md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                                            <BookMarked className="w-4 h-4 text-white" />
                                        </div>
                                        Resources
                                    </h2>
                                    <button
                                        onClick={() => navigate('/resources')}
                                        className="text-white/70 text-sm hover:text-white flex items-center gap-1"
                                    >
                                        View All <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <DashboardResourcesPreview />
                            </div>
                        </motion.div>

                        {/* Recent Activity - New Dynamic Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="relative group h-fit"
                        >
                            <div className="absolute -inset-px md:-inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-md md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
                                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-white" />
                                    </div>
                                    Recent Activity
                                </h2>
                                <RecentActivity />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Tools & Actions */}
                    <div className="space-y-5 md:space-y-8">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-px md:-inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-md md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
                                <h2 className="text-base sm:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                        <Zap className="w-3 h-3 text-white" />
                                    </div>
                                    Quick Actions
                                </h2>
                                <QuickActions />
                            </div>
                        </motion.div>

                        {/* Study Circles */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-px md:-inset-1 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-3xl blur-md md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
                                <h2 className="text-base sm:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                        <Users className="w-3 h-3 text-white" />
                                    </div>
                                    Study Circles
                                </h2>
                                <StudyCircles />
                            </div>
                        </motion.div>

                        {/* Your Notes */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-px md:-inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-md md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
                                <h2 className="text-base sm:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                        <BookMarked className="w-3 h-3 text-white" />
                                    </div>
                                    Your Notes
                                </h2>
                                <PopularInYourRooms />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;