import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Users,
    FileText,
    CheckSquare,
    BookOpen,
    User,
    LogOut,
    Settings,
    Bell,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';
import logo from '../assets/studyhub-logo.jpg';

const DashboardNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userInitial, setUserInitial] = useState('U');
    const [loading, setLoading] = useState(true);
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const userMenuRef = useRef(null);

    // Enhanced user data extraction function with better avatar handling
    const extractUserData = (userData) => {
        if (!userData) return null;

        console.log('🔍 Extracting user data from:', userData);

        // Handle different API response structures
        const userObj = userData.user || userData.data || userData;
        
        const extractedData = {
            // Extract name from various possible fields
            name: userObj.name || 
                  userObj.fullName || 
                  userObj.displayName || 
                  userObj.username || 
                  userObj.firstName || 
                  (userObj.firstName && userObj.lastName ? `${userObj.firstName} ${userObj.lastName}` : '') ||
                  userObj.fname ||
                  '',
                  
            // Extract email from various possible fields
            email: userObj.email || 
                   userObj.emailAddress || 
                   userObj.userEmail || 
                   userObj.mail ||
                   '',
                   
            // Get other fields
            id: userObj._id || userObj.id || '',
            phone: userObj.phone || userObj.phoneNumber || '',
            location: userObj.location || userObj.address || '',
            bio: userObj.bio || userObj.description || '',
            profilePic: userObj.profilePic || userObj.avatar || userObj.profileImage || '',
            joinDate: userObj.createdAt || userObj.joinDate || new Date().toISOString(),
            university: userObj.university || userObj.school || '',
            major: userObj.major || userObj.field || '',
            yearOfStudy: userObj.yearOfStudy || userObj.year || ''
        };

        console.log('✅ Extracted user data:', {
            ...extractedData,
            profilePic: extractedData.profilePic ? '[Avatar Present]' : 'No avatar'
        });
        return extractedData;
    };

    // Get user initial from name or email
    const getUserInitial = (userData) => {
        if (!userData) return 'U';

        // Try to get from name first
        if (userData.name && userData.name.trim().length > 0) {
            return userData.name.trim().charAt(0).toUpperCase();
        }

        // Try to get from email
        if (userData.email && userData.email.includes('@')) {
            const emailPart = userData.email.split('@')[0];
            if (emailPart && emailPart.length > 0) {
                return emailPart.charAt(0).toUpperCase();
            }
        }

        return 'U';
    };

    // Enhanced function to load user data from all possible storage sources
    const loadUserDataFromStorage = () => {
        console.log('🔍 Loading user data from storage sources...');
        
        // Try multiple storage sources
        const tryLoadFromStorage = (key) => {
            try {
                const data = localStorage.getItem(key);
                return data && data !== 'null' && data !== 'undefined' ? JSON.parse(data) : null;
            } catch (error) {
                console.error(`Error loading from ${key}:`, error);
                return null;
            }
        };

        // Load from primary and backup sources
        const primaryUser = tryLoadFromStorage('user');
        const backupUser = tryLoadFromStorage('userBackup');
        const avatarBackup = tryLoadFromStorage('userAvatar');
        const profileBackup = tryLoadFromStorage('profileData');

        console.log('📦 Storage data found:', {
            primary: primaryUser ? 'Yes' : 'No',
            backup: backupUser ? 'Yes' : 'No',
            avatar: avatarBackup ? 'Yes' : 'No',
            profile: profileBackup ? 'Yes' : 'No'
        });

        // Find the most complete user data
        let userData = primaryUser || backupUser;
        
        if (userData && (userData.name || userData.email)) {
            // Enhance with avatar from backup sources if missing
            if (!userData.profilePic) {
                if (avatarBackup && avatarBackup.profilePic) {
                    console.log('🖼️ Restoring avatar from avatar backup');
                    userData.profilePic = avatarBackup.profilePic;
                } else if (profileBackup && profileBackup.profilePic) {
                    console.log('🖼️ Restoring avatar from profile backup');
                    userData.profilePic = profileBackup.profilePic;
                }
            }

            console.log('✅ Loaded user data from storage:', {
                name: userData.name,
                email: userData.email,
                hasAvatar: userData.profilePic ? 'Yes' : 'No'
            });

            return extractUserData(userData);
        }

        console.log('❌ No valid user data found in storage');
        return null;
    };

    // Listen for user data updates from other components (like Profile page)
    useEffect(() => {
        const handleUserUpdate = (event) => {
            console.log('🔄 User data updated from other component:', event.detail);
            const updatedUser = extractUserData(event.detail);
            if (updatedUser) {
                setUser(updatedUser);
                setUserInitial(getUserInitial(updatedUser));
                setAvatarLoaded(false); // Reset avatar loaded state to trigger re-render
                
                // Update localStorage with new data
                localStorage.setItem('user', JSON.stringify(updatedUser));
                console.log('✅ Navbar updated with new user data');
            }
        };

        // Listen for custom user update events
        window.addEventListener('userDataUpdated', handleUserUpdate);
        
        return () => {
            window.removeEventListener('userDataUpdated', handleUserUpdate);
        };
    }, []);

    // Load user data on component mount - ENHANCED with better avatar handling
    useEffect(() => {
        console.log('🔍 DashboardNavbar: Loading stored user data on mount...');
        
        const storedUserData = loadUserDataFromStorage();
        if (storedUserData) {
            setUser(storedUserData);
            setUserInitial(getUserInitial(storedUserData));
            setAvatarLoaded(false); // Reset for proper loading
            console.log('✅ DashboardNavbar: User data loaded on mount');
        } else {
            console.log('❌ DashboardNavbar: No stored user data found on mount');
        }
    }, []); // Only run on mount

    // Fetch user data from backend or localStorage with smart merging - ENHANCED
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                console.log('🔍 DashboardNavbar: Fetching user data...');
                
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.log('❌ No token found, loading from storage...');
                    
                    // Load stored user data even without token
                    const storedUserData = loadUserDataFromStorage();
                    if (storedUserData) {
                        setUser(storedUserData);
                        setUserInitial(getUserInitial(storedUserData));
                        setAvatarLoaded(false);
                        console.log('✅ Loaded stored user data without token');
                    }
                    
                    // Delayed redirect if not on login/register pages
                    if (location.pathname !== '/login' && location.pathname !== '/register') {
                        setTimeout(() => navigate('/login'), 2000);
                    }
                    setLoading(false);
                    return;
                }

                // Load stored user data immediately for fast display
                const cachedUserData = loadUserDataFromStorage();
                if (cachedUserData) {
                    setUser(cachedUserData);
                    setUserInitial(getUserInitial(cachedUserData));
                    setAvatarLoaded(false);
                    console.log('✅ Fast-loaded cached user data');
                }

                // Then try to fetch fresh data from backend
                try {
                    console.log('🔄 Fetching fresh user data from backend...');
                    
                    const response = await fetch('http://localhost:5000/api/auth/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log('📡 Backend response status:', response.status);

                    if (response.ok) {
                        const backendData = await response.json();
                        console.log('✅ Fresh data from backend:', backendData);
                        
                        const extractedBackendUser = extractUserData(backendData);
                        
                        // Smart merge: Preserve local avatar and profile data
                        const mergedUser = {
                            // Start with backend data as base
                            ...extractedBackendUser,
                            // Preserve important local fields (especially avatar)
                            phone: cachedUserData?.phone || extractedBackendUser?.phone || '',
                            location: cachedUserData?.location || extractedBackendUser?.location || '',
                            bio: cachedUserData?.bio || extractedBackendUser?.bio || '',
                            university: cachedUserData?.university || extractedBackendUser?.university || '',
                            major: cachedUserData?.major || extractedBackendUser?.major || '',
                            yearOfStudy: cachedUserData?.yearOfStudy || extractedBackendUser?.yearOfStudy || '',
                            // PRIORITIZE local avatar over backend
                            profilePic: cachedUserData?.profilePic || extractedBackendUser?.profilePic || ''
                        };
                        
                        if (mergedUser && (mergedUser.name || mergedUser.email)) {
                            setUser(mergedUser);
                            setUserInitial(getUserInitial(mergedUser));
                            setAvatarLoaded(false); // Reset for proper re-render
                            
                            // Update localStorage with merged data
                            localStorage.setItem('user', JSON.stringify(mergedUser));
                            console.log('✅ Updated localStorage with merged data');
                        }
                    } else if (response.status === 401) {
                        console.log('❌ Token expired, removing token but keeping user data');
                        localStorage.removeItem('token');
                        // Keep user profile data - delayed redirect
                        setTimeout(() => {
                            if (location.pathname !== '/login') {
                                navigate('/login');
                            }
                        }, 2000);
                    } else {
                        console.warn(`⚠️ Backend returned ${response.status}, using cached data`);
                    }
                } catch (fetchError) {
                    console.warn('⚠️ Failed to fetch from backend, using cached data:', fetchError.message);
                }

            } catch (error) {
                console.error('❌ Error in fetchUserData:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, location.pathname]);

    // Listen for storage changes (when user logs in from another tab)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'user' && e.newValue) {
                console.log('🔄 Storage changed, updating user data...');
                try {
                    const newUserData = JSON.parse(e.newValue);
                    const extractedUser = extractUserData(newUserData);
                    if (extractedUser) {
                        setUser(extractedUser);
                        setUserInitial(getUserInitial(extractedUser));
                        setAvatarLoaded(false);
                        console.log('✅ Updated from storage change');
                    }
                } catch (error) {
                    console.error('❌ Error parsing storage change:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Navigation items
    const navItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: Home,
            active: location.pathname === '/dashboard'
        },
        {
            name: 'Rooms',
            path: '/rooms',
            icon: Users,
            active: location.pathname === '/rooms'
        },
        {
            name: 'Notes',
            path: '/notes',
            icon: FileText,
            active: location.pathname === '/notes'
        },
        {
            name: 'Tasks',
            path: '/tasks',
            icon: CheckSquare,
            active: location.pathname === '/tasks'
        },
        {
            name: 'Resources',
            path: '/resources',
            icon: BookOpen,
            active: location.pathname === '/resources'
        }
    ];

    // Handle logout - PRESERVE USER DATA COMPLETELY
    const handleLogout = async () => {
        try {
            console.log('🔄 Starting logout process...');
            
            // Ensure user data is saved with multiple backups before logout
            if (user) {
                console.log('💾 Saving user data before logout with multiple backups...');
                const userDataToSave = JSON.stringify(user);
                
                // Save to multiple locations
                localStorage.setItem('user', userDataToSave);
                localStorage.setItem('userBackup', userDataToSave);
                
                // Special backup for avatar
                if (user.profilePic) {
                    localStorage.setItem('userAvatar', JSON.stringify({
                        profilePic: user.profilePic,
                        userId: user.id || user.email,
                        savedAt: new Date().toISOString()
                    }));
                }
                
                // Profile data backup
                localStorage.setItem('profileData', JSON.stringify({
                    name: user.name,
                    email: user.email,
                    profilePic: user.profilePic,
                    phone: user.phone,
                    location: user.location,
                    savedAt: new Date().toISOString()
                }));
                
                console.log('✅ User data saved to multiple backup locations');
            }

            // Call logout API
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await fetch('http://localhost:5000/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (logoutError) {
                    console.warn('⚠️ Logout API call failed:', logoutError);
                }
            }
        } catch (error) {
            console.error('❌ Error during logout:', error);
        } finally {
            // Only remove token, NEVER remove user data
            localStorage.removeItem('token');
            
            console.log('🔄 Logout: Token removed, user profile data preserved in multiple locations');
            
            // Reset component state but keep data in localStorage
            setUser(null);
            setUserInitial('U');
            setIsUserMenuOpen(false);
            setAvatarLoaded(false);
            
            // Navigate to login
            navigate('/login', { replace: true });
        }
    };

    // Enhanced avatar error handling
    const handleAvatarError = (e, context = 'navbar') => {
        console.log(`❌ Avatar failed to load in ${context}:`, e.target.src?.substring(0, 50));
        setAvatarLoaded(false);
        e.target.style.display = 'none';
        const fallback = e.target.nextElementSibling;
        if (fallback) {
            fallback.style.display = 'flex';
        }
    };

    const handleAvatarLoad = (context = 'navbar') => {
        console.log(`✅ Avatar loaded successfully in ${context}`);
        setAvatarLoaded(true);
    };

    // Get display values with better fallbacks
    const displayName = user?.name || 'User';
    const displayEmail = user?.email || 'user@example.com';
    const displayInitial = userInitial;
    const profileImage = user?.profilePic;

    console.log('🎯 DashboardNavbar Final display values:');
    console.log('Name:', displayName);
    console.log('Email:', displayEmail);
    console.log('Initial:', displayInitial);
    console.log('Profile Image:', profileImage ? '[Avatar Present]' : 'No avatar');
    console.log('Avatar Loaded:', avatarLoaded);

    return (
        <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <Link to="/dashboard" className="flex items-center gap-3 group">
                            <div className="relative">
                                <img
                                    src={logo}
                                    alt="StudyHub Logo"
                                    className="h-9 w-9 rounded-full bg-white object-contain shadow-lg group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-200" />
                            </div>
                            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
                                StudyHub
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                                            item.active
                                                ? 'text-white shadow-lg'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`}
                                        style={
                                            item.active
                                                ? {
                                                      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                                      boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.4)',
                                                  }
                                                : {}
                                        }
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                        
                                        {item.active && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 rounded-xl"
                                                style={{
                                                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                                                    zIndex: -1
                                                }}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        
                                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-pulse" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right side - User menu and mobile menu button */}
                    <div className="flex items-center gap-3">
                        {/* Notifications (Desktop) */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200 relative group"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            </span>
                        </motion.button>

                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-700/30 transition-all duration-300 group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                            >
                                {/* Enhanced User Avatar with Perfect Sizing */}
                                <motion.div
                                    className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500/30 via-purple-500/40 to-fuchsia-500/30 group-hover:from-violet-500/50 group-hover:via-purple-500/60 group-hover:to-fuchsia-500/50 backdrop-blur-sm border border-violet-400/40 group-hover:border-violet-400/70 transition-all duration-300 shadow-lg group-hover:shadow-2xl overflow-hidden"
                                    whileHover={{
                                        scale: 1.1,
                                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.6)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {loading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-violet-300 border-t-transparent rounded-full"
                                        />
                                    ) : profileImage && profileImage.trim() !== '' ? (
                                        <img
                                            key={`avatar-${profileImage.length}`} // Force re-render on image change
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-2xl"
                                            onError={(e) => handleAvatarError(e, 'navbar-button')}
                                            onLoad={() => handleAvatarLoad('navbar-button')}
                                            style={{ display: 'block' }}
                                        />
                                    ) : null}
                                    
                                    {/* Fallback User Icon */}
                                    <div 
                                        className="w-full h-full flex items-center justify-center text-violet-200 group-hover:text-white transition-colors duration-300"
                                        style={{ display: (profileImage && profileImage.trim() !== '' && avatarLoaded) ? 'none' : 'flex' }}
                                    >
                                        <User className="w-5 h-5" />
                                    </div>

                                    {/* Animated background glow */}
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.div>

                                {/* Dropdown Arrow */}
                                <motion.div
                                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center justify-center w-6 h-6 rounded-xl bg-slate-700/50 group-hover:bg-slate-600/70 border border-slate-600/50 group-hover:border-slate-500/70 transition-all duration-200 shadow-lg"
                                >
                                    <ChevronDown className="w-3 h-3 text-slate-300 group-hover:text-white transition-colors duration-200" />
                                </motion.div>
                            </motion.button>

                            {/* Enhanced Dropdown Menu */}
                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="absolute right-0 mt-4 w-80 bg-slate-800/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden z-50"
                                        style={{
                                            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                                        }}
                                    >
                                        {/* Enhanced User Info Header */}
                                        {user && (displayName !== 'User' || displayEmail !== 'user@example.com') && (
                                            <div className="relative px-6 py-6 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-b border-slate-700/30">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <motion.div 
                                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl overflow-hidden"
                                                            whileHover={{ scale: 1.05, rotate: 3 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            {loading ? (
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                    className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                                                                />
                                                            ) : profileImage && profileImage.trim() !== '' ? (
                                                                <img
                                                                    key={`dropdown-avatar-${profileImage.length}`}
                                                                    src={profileImage}
                                                                    alt="Profile"
                                                                    className="w-full h-full object-cover rounded-2xl"
                                                                    onError={(e) => handleAvatarError(e, 'dropdown')}
                                                                    onLoad={() => handleAvatarLoad('dropdown')}
                                                                    style={{ display: 'block' }}
                                                                />
                                                            ) : null}
                                                            
                                                            {/* Fallback to User Icon */}
                                                            <div 
                                                                className="w-full h-full flex items-center justify-center"
                                                                style={{ display: (profileImage && profileImage.trim() !== '' && avatarLoaded) ? 'none' : 'flex' }}
                                                            >
                                                                <User className="w-8 h-8" />
                                                            </div>
                                                        </motion.div>
                                                        <div className="absolute -inset-1 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl blur opacity-40" />
                                                        
                                                        {/* Online indicator */}
                                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                                                            <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-bold text-white truncate">
                                                            {displayName}
                                                        </h3>
                                                        <p className="text-slate-400 text-sm truncate">
                                                            {displayEmail}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                                            <span className="text-xs text-emerald-400 font-medium">Online</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Menu Items */}
                                        <div className="py-4">
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-4 px-6 py-4 text-sm text-slate-300 hover:text-white hover:bg-slate-700/40 transition-all duration-200 group"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <motion.div 
                                                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/40 group-hover:bg-violet-500/30 transition-all duration-200 border border-slate-600/30 group-hover:border-violet-400/50"
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                >
                                                    <User className="w-5 h-5" />
                                                </motion.div>
                                                <div className="flex-1">
                                                    <span className="font-semibold text-base">My Profile</span>
                                                    <p className="text-xs text-slate-500 mt-1">View and edit your profile</p>
                                                </div>
                                            </Link>
                                            
                                            <Link
                                                to="/settings"
                                                className="flex items-center gap-4 px-6 py-4 text-sm text-slate-300 hover:text-white hover:bg-slate-700/40 transition-all duration-200 group"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <motion.div 
                                                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/40 group-hover:bg-purple-500/30 transition-all duration-200 border border-slate-600/30 group-hover:border-purple-400/50"
                                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                                >
                                                    <Settings className="w-5 h-5" />
                                                </motion.div>
                                                <div className="flex-1">
                                                    <span className="font-semibold text-base">Settings</span>
                                                    <p className="text-xs text-slate-500 mt-1">Manage your preferences</p>
                                                </div>
                                            </Link>
                                            
                                            <hr className="my-4 border-slate-700/50" />
                                            
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-4 px-6 py-4 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
                                            >
                                                <motion.div 
                                                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/40 group-hover:bg-red-500/30 transition-all duration-200 border border-slate-600/30 group-hover:border-red-400/50"
                                                    whileHover={{ scale: 1.1, rotate: 10 }}
                                                >
                                                    <LogOut className="w-5 h-5" />
                                                </motion.div>
                                                <div className="flex-1 text-left">
                                                    <span className="font-semibold text-base">Sign Out</span>
                                                    <p className="text-xs text-slate-500 mt-1">Sign out of your account</p>
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-lg"
                        >
                            <div className="py-4 space-y-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                item.active
                                                    ? 'text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                                                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                                
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200">
                                    <Bell className="w-5 h-5" />
                                    <span>Notifications</span>
                                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default DashboardNavbar;