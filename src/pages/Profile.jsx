import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Camera, 
    User, 
    Phone, 
    MapPin,
    Save,
    Edit3,
    CheckCircle,
    AlertCircle,
    Briefcase,
    Loader2,
    Upload,
    Mail,
    GraduationCap,
    Calendar
} from "lucide-react";

// Import API functions from authApi.js
import { getProfile, updateProfile, uploadAvatar } from '../api/authApi';

// Enhanced Animated Background Component (same as Login/Register)
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

            <motion.div
                animate={{
                    x: [0, -150, 100, 0],
                    y: [0, 120, -80, 0],
                    scale: [0.8, 1.6, 0.9, 0.8],
                    opacity: [0.2, 0.5, 0.1, 0.2],
                    rotate: [360, 180, 0],
                }}
                transition={{ 
                    duration: 22, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute bottom-[25%] right-[25%] w-72 h-72 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0.3) 50%, rgba(168,85,247,0.1) 80%, transparent 100%)",
                    filter: "blur(45px)",
                }}
            />

            {/* Enhanced small dancing particles */}
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

            {/* Enhanced animated grid */}
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

            {/* Floating geometric shapes */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    x: [0, 100, -50, 0],
                    y: [0, -50, 100, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[10%] left-[10%] w-20 h-20 border-2 border-blue-400/20 rounded-lg"
                style={{ filter: "blur(1px)" }}
            />

            <motion.div
                animate={{
                    rotate: [360, 0],
                    x: [0, -80, 120, 0],
                    y: [0, 80, -60, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[15%] right-[15%] w-16 h-16 border-2 border-purple-400/20 rounded-full"
                style={{ filter: "blur(1px)" }}
            />

            {/* Gradient overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-slate-900/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20" />
        </div>
    );
};

// Custom hooks for better state management
const useToast = () => {
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const showToast = useCallback((message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "" });
        }, 3000);
    }, []);

    return { toast, showToast };
};

const Profile = () => {
    const { toast, showToast } = useToast();

    // Get user data from localStorage (set during login/signup)
    const getStoredUser = () => {
        try {
            const userData = localStorage.getItem('user');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    };

    const [user, setUser] = useState(() => {
        const storedUser = getStoredUser();
        return {
            id: storedUser?._id || storedUser?.id || "",
            name: storedUser?.name || "",
            email: storedUser?.email || "",
            phone: storedUser?.phone || "",
            location: storedUser?.location || "",
            bio: storedUser?.bio || "",
            profilePic: storedUser?.profilePic || "",
            joinDate: storedUser?.createdAt || storedUser?.joinDate || new Date().toISOString(),
            major: storedUser?.major || "",
            yearOfStudy: storedUser?.yearOfStudy || ""
        };
    });

    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        major: user.major || "",
        yearOfStudy: user.yearOfStudy || ""
    });
    
    const [avatar, setAvatar] = useState(user.profilePic || "");
    const [dragActive, setDragActive] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [loading, setLoading] = useState(false);

    // Utility function to update localStorage and notify other components
    const updateUserDataEverywhere = useCallback((newUserData) => {
        console.log('🔄 Updating user data everywhere:', newUserData);
        
        // Update localStorage with timestamp for persistence tracking
        const dataWithTimestamp = {
            ...newUserData,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(dataWithTimestamp));
        
        // Create a backup for logout persistence
        localStorage.setItem('userBackup', JSON.stringify(dataWithTimestamp));
        
        // Additional backup specifically for avatar (to prevent loss)
        if (dataWithTimestamp.profilePic) {
            localStorage.setItem('userAvatar', JSON.stringify({
                profilePic: dataWithTimestamp.profilePic,
                userId: dataWithTimestamp.id || dataWithTimestamp.email,
                savedAt: new Date().toISOString()
            }));
        }
        
        // Dispatch custom event to notify other components (like DashboardNavbar)
        const event = new CustomEvent('userDataUpdated', { 
            detail: dataWithTimestamp,
            bubbles: true 
        });
        window.dispatchEvent(event);
        
        console.log('✅ User data updated and broadcasted');
    }, []);

    // Enhanced image compression and storage function
    const compressAndStoreImage = useCallback((file, maxWidth = 400, quality = 0.8) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                try {
                    // Calculate dimensions maintaining aspect ratio
                    const { width, height } = img;
                    const aspectRatio = width / height;
                    
                    let newWidth = maxWidth;
                    let newHeight = maxWidth / aspectRatio;
                    
                    if (newHeight > maxWidth) {
                        newHeight = maxWidth;
                        newWidth = maxWidth * aspectRatio;
                    }
                    
                    // Ensure dimensions are integers
                    newWidth = Math.round(newWidth);
                    newHeight = Math.round(newHeight);
                    
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    
                    // Clear canvas and draw image
                    ctx.clearRect(0, 0, newWidth, newHeight);
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    
                    // Convert to base64 with compression
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                    
                    console.log('🖼️ Image compressed:', {
                        originalSize: file.size,
                        compressedSize: compressedDataUrl.length,
                        dimensions: `${newWidth}x${newHeight}`,
                        quality: quality
                    });
                    
                    // Clean up
                    URL.revokeObjectURL(img.src);
                    resolve(compressedDataUrl);
                } catch (error) {
                    console.error('❌ Canvas compression error:', error);
                    reject(error);
                }
            };
            
            img.onerror = (error) => {
                console.error('❌ Image load error:', error);
                reject(new Error('Failed to load image'));
            };
            
            // Create object URL for the image
            const objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;
        });
    }, []);

    // Fetch user profile from backend
    const fetchUserProfile = useCallback(async () => {
        try {
            setLoading(true);
            console.log('🔍 Fetching user profile from backend...');

            const token = localStorage.getItem('token');
            if (!token) {
                console.log('❌ No token found');
                setLoading(false);
                return;
            }

            const responseData = await getProfile();
            console.log('📦 Profile data received:', responseData);
            
            const userData = responseData.user || responseData.data || responseData;
            
            if (userData && (userData.name || userData.email)) {
                // Merge with existing data to preserve local changes and avatar
                const normalizedUser = {
                    id: userData._id || userData.id || user.id,
                    name: userData.name || user.name,
                    email: userData.email || user.email,
                    phone: userData.phone || user.phone,
                    location: userData.location || user.location,
                    bio: userData.bio || user.bio,
                    // Prefer local avatar over backend (in case user uploaded but hasn't synced)
                    profilePic: user.profilePic || userData.profilePic || "",
                    joinDate: userData.createdAt || userData.joinDate || user.joinDate,
                    major: userData.major || user.major,
                    yearOfStudy: userData.yearOfStudy || user.yearOfStudy
                };

                setUser(normalizedUser);
                setAvatar(normalizedUser.profilePic);
                
                // Update form data
                setFormData({
                    name: normalizedUser.name,
                    email: normalizedUser.email,
                    phone: normalizedUser.phone,
                    location: normalizedUser.location,
                    bio: normalizedUser.bio,
                    major: normalizedUser.major,
                    yearOfStudy: normalizedUser.yearOfStudy
                });

                // Update everywhere with backup
                updateUserDataEverywhere(normalizedUser);
                console.log('✅ Profile loaded from backend');
            }

        } catch (error) {
            console.warn('❌ Failed to fetch from backend, using local data:', error);
            // Continue using local data - no need to show error to user
        } finally {
            setLoading(false);
        }
    }, [user, updateUserDataEverywhere]);

    // IMMEDIATE avatar upload function that processes and saves right away
    const handleAvatarUpload = useCallback(async (file) => {
        try {
            setUploadingAvatar(true);
            console.log('📸 Processing and uploading avatar immediately...');

            // Validate file
            if (!file.type.startsWith('image/')) {
                throw new Error('Please select a valid image file');
            }
            
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                throw new Error('Image size should be less than 10MB');
            }

            // Compress and convert to base64 for immediate persistent storage
            const compressedBase64 = await compressAndStoreImage(file, 400, 0.8);
            
            // Create persistent avatar URL with timestamp to prevent caching issues
            const persistentAvatarUrl = compressedBase64;
            
            console.log('✅ Avatar compressed successfully:', {
                size: compressedBase64.length,
                preview: compressedBase64.substring(0, 50) + '...'
            });
            
            // Update avatar state immediately
            setAvatar(persistentAvatarUrl);
            
            // Update user state immediately with persistent avatar
            const updatedUser = { 
                ...user, 
                profilePic: persistentAvatarUrl,
                lastUpdated: new Date().toISOString()
            };
            setUser(updatedUser);
            
            // Update everywhere with persistence (this saves to localStorage immediately)
            updateUserDataEverywhere(updatedUser);
            
            showToast("Avatar uploaded and saved successfully!", "success");
            console.log('✅ Avatar uploaded and saved persistently');

        } catch (error) {
            console.error('❌ Avatar upload error:', error);
            showToast(error.message || "Failed to upload avatar", "error");
        } finally {
            setUploadingAvatar(false);
        }
    }, [user, showToast, updateUserDataEverywhere, compressAndStoreImage]);

    // Handle avatar file selection with IMMEDIATE upload
    const handleAvatarChange = useCallback(async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Clear the input to allow re-selecting the same file
        e.target.value = '';

        // Immediately upload and process the avatar
        await handleAvatarUpload(file);
    }, [handleAvatarUpload]);

    // Save profile changes (now only handles form data, avatar is already saved)
    const saveProfileChanges = useCallback(async () => {
        try {
            setSaving(true);
            console.log('💾 Saving profile changes...');

            // Create comprehensive user data (avatar is already saved)
            const newUserData = {
                ...user,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                location: formData.location,
                bio: formData.bio,
                major: formData.major,
                yearOfStudy: formData.yearOfStudy,
                // Avatar is already updated and saved
                profilePic: avatar,
                lastUpdated: new Date().toISOString()
            };

            console.log('💾 Saving updated user data:', {
                ...newUserData,
                profilePic: newUserData.profilePic ? `[Avatar Present - ${newUserData.profilePic.length} chars]` : 'No avatar'
            });

            // Update component state
            setUser(newUserData);
            
            // Update everywhere with persistence and backup
            updateUserDataEverywhere(newUserData);
            
            // Additional backup for critical data including avatar
            try {
                localStorage.setItem('profileData', JSON.stringify({
                    name: newUserData.name,
                    email: newUserData.email,
                    profilePic: newUserData.profilePic,
                    phone: newUserData.phone,
                    location: newUserData.location,
                    savedAt: new Date().toISOString()
                }));
                console.log('✅ Profile backup created successfully');
            } catch (backupError) {
                console.warn('Profile backup failed:', backupError);
            }
            
            showToast("Profile updated successfully!", "success");
            console.log('✅ Profile saved successfully');

        } catch (error) {
            console.error('❌ Profile save error:', error);
            showToast("Failed to save profile", "error");
        } finally {
            setSaving(false);
        }
    }, [formData, avatar, user, showToast, updateUserDataEverywhere]);

    // Handle form input changes
    const handleInputChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    // Enhanced drag and drop handlers
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    }, []);

    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const file = e.dataTransfer.files?.[0];
        if (file) {
            console.log('🎯 File dropped:', file.name);
            await handleAvatarUpload(file);
        }
    }, [handleAvatarUpload]);

    const formatJoinDate = useCallback((dateString) => {
        if (!dateString) return 'Recently';
        try {
            return new Date(dateString).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
        } catch {
            return 'Recently';
        }
    }, []);

    // Check for changes (avatar changes are now saved immediately)
    useEffect(() => {
        const originalData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
            bio: user.bio,
            major: user.major,
            yearOfStudy: user.yearOfStudy
        };
        
        const hasDataChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
        setHasChanges(hasDataChanges);
    }, [formData, user]);

    // Enhanced data loading on mount with avatar recovery
    useEffect(() => {
        console.log('🔍 Loading stored user data on Profile mount...');
        
        // Try to load from multiple sources
        const tryLoadFromStorage = (key) => {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.error(`Error loading from ${key}:`, error);
                return null;
            }
        };

        // Load user data from primary and backup sources
        const storedUser = tryLoadFromStorage('user') || tryLoadFromStorage('userBackup');
        const avatarBackup = tryLoadFromStorage('userAvatar');
        const profileBackup = tryLoadFromStorage('profileData');
        
        if (storedUser && (storedUser.name || storedUser.email)) {
            console.log('📦 Loaded user data from storage:', {
                ...storedUser,
                profilePic: storedUser.profilePic ? '[Avatar Present]' : 'No avatar'
            });
            
            // Merge avatar from various sources (prefer most recent)
            let finalAvatar = storedUser.profilePic;
            
            // Check avatar backup if no avatar in main data
            if (!finalAvatar && avatarBackup && avatarBackup.profilePic) {
                console.log('🖼️ Recovering avatar from backup');
                finalAvatar = avatarBackup.profilePic;
            }
            
            // Check profile backup
            if (!finalAvatar && profileBackup && profileBackup.profilePic) {
                console.log('🖼️ Recovering avatar from profile backup');
                finalAvatar = profileBackup.profilePic;
            }
            
            const restoredUser = {
                ...storedUser,
                profilePic: finalAvatar
            };
            
            setUser(restoredUser);
            setAvatar(finalAvatar || '');
            setFormData({
                name: restoredUser.name || '',
                email: restoredUser.email || '',
                phone: restoredUser.phone || '',
                location: restoredUser.location || '',
                bio: restoredUser.bio || '',
                major: restoredUser.major || '',
                yearOfStudy: restoredUser.yearOfStudy || ''
            });
            
            console.log('✅ User data restored with avatar:', finalAvatar ? 'Yes' : 'No');
        }
        
        // Then fetch fresh data
        fetchUserProfile();
    }, []);

    // Update user state when form data changes (real-time updates)
    useEffect(() => {
        setUser(prev => ({
            ...prev,
            name: formData.name,
            email: formData.email
        }));
    }, [formData.name, formData.email]);

    // Enhanced visibility change handler with avatar recovery
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                console.log('🔍 Page visible, checking for stored data with avatar...');
                const storedUser = getStoredUser();
                const avatarBackup = localStorage.getItem('userAvatar');
                
                if (storedUser && storedUser.lastUpdated) {
                    const storedTime = new Date(storedUser.lastUpdated).getTime();
                    const currentTime = new Date(user.lastUpdated || 0).getTime();
                    
                    if (storedTime > currentTime) {
                        console.log('📦 Found newer stored data with avatar, updating...');
                        
                        // Restore avatar if missing
                        let finalAvatar = storedUser.profilePic;
                        if (!finalAvatar && avatarBackup) {
                            try {
                                const parsed = JSON.parse(avatarBackup);
                                finalAvatar = parsed.profilePic;
                                console.log('🖼️ Restored avatar from backup');
                            } catch (e) {
                                console.warn('Failed to parse avatar backup');
                            }
                        }
                        
                        const restoredUser = { ...storedUser, profilePic: finalAvatar };
                        
                        setUser(restoredUser);
                        setAvatar(finalAvatar || '');
                        setFormData({
                            name: restoredUser.name || '',
                            email: restoredUser.email || '',
                            phone: restoredUser.phone || '',
                            location: restoredUser.location || '',
                            bio: restoredUser.bio || '',
                            major: restoredUser.major || '',
                            yearOfStudy: restoredUser.yearOfStudy || ''
                        });
                    }
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [user.lastUpdated]);

    return (
        <div className="min-h-screen relative">
            {/* Enhanced Animated Background */}
            <AnimatedBackground />

            {/* Toast Notifications */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-4 right-4 z-50"
                    >
                        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border max-w-sm ${
                            toast.type === "success" 
                                ? "bg-green-500/20 border-green-500/30 text-green-100" 
                                : "bg-red-500/20 border-red-500/30 text-red-100"
                        }`}>
                            {toast.type === "success" ? (
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            )}
                            <span className="font-medium text-sm">{toast.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
                {/* Header with Feature Page Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Your Space to{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Grow
                        </span>{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Together
                        </span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Manage your profile, track your progress, and connect with your study community. 
                        Your learning journey starts with a complete profile.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="relative group">
                            {/* Enhanced glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <div className="text-center mb-6">
                                    {/* Avatar Section */}
                                    <div
                                        className={`relative inline-block mb-6 ${dragActive ? 'scale-105 ring-4 ring-blue-400/50' : ''} transition-all duration-200`}
                                        onDragEnter={handleDrag}
                                        onDragOver={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="relative"
                                        >
                                            {avatar && avatar.trim() !== '' ? (
                                                <img
                                                    src={avatar}
                                                    alt="Profile"
                                                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                                                    onError={(e) => {
                                                        console.log('❌ Avatar failed to load, clearing...', avatar.substring(0, 50));
                                                        setAvatar("");
                                                    }}
                                                    onLoad={() => {
                                                        console.log('✅ Avatar loaded successfully');
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white border-4 border-white/20 shadow-2xl">
                                                    <User className="w-16 h-16" />
                                                </div>
                                            )}
                                            
                                            {/* Upload Button */}
                                            <motion.label
                                                htmlFor="avatar-upload"
                                                className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-white/20 transition-all duration-200"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {uploadingAvatar ? (
                                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                                ) : (
                                                    <Camera className="w-5 h-5 text-white" />
                                                )}
                                            </motion.label>
                                            
                                            {/* Upload Overlay for Drag & Drop */}
                                            {dragActive && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute inset-0 bg-blue-500/20 rounded-full border-2 border-dashed border-blue-400 flex items-center justify-center backdrop-blur-sm"
                                                >
                                                    <div className="text-center">
                                                        <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                                        <p className="text-blue-300 text-xs font-medium">Drop image here</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                        
                                        <input
                                            type="file"
                                            id="avatar-upload"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                            disabled={uploadingAvatar}
                                        />
                                    </div>
                                    
                                    {/* Upload Instructions */}
                                    <p className="text-white/60 text-xs mb-6">
                                        Click camera or drag & drop to upload
                                    </p>
                                    
                                    {/* User Information */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h2 className="text-2xl font-bold text-white mb-2">
                                            {formData.name || user.name || 'Your Name'}
                                        </h2>
                                        <p className="text-blue-400 mb-3 break-words text-sm">
                                            {formData.email || user.email || 'your.email@example.com'}
                                        </p>
                                        
                                        {/* Stats */}
                                        <div className="grid grid-cols-1 gap-3 text-sm">
                                            <div className="flex items-center justify-center gap-2 text-white/70">
                                                <Calendar className="w-4 h-4 text-cyan-400" />
                                                <span>Member since {formatJoinDate(user.joinDate)}</span>
                                            </div>
                                            
                                            {(formData.location || user.location) && (
                                                <div className="flex items-center justify-center gap-2 text-white/70">
                                                    <MapPin className="w-4 h-4 text-green-400" />
                                                    <span>{formData.location || user.location}</span>
                                                </div>
                                            )}
                                            
                                            {(formData.major || user.major) && (
                                                <div className="flex items-center justify-center gap-2 text-white/70">
                                                    <GraduationCap className="w-4 h-4 text-purple-400" />
                                                    <span>{formData.major || user.major}</span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className="relative group">
                            {/* Enhanced glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                            
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Edit3 className="w-4 h-4 text-white" />
                                    </div>
                                    Profile Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                                            <User className="w-4 h-4 text-blue-400" />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                                            <Mail className="w-4 h-4 text-cyan-400" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300"
                                            placeholder="Enter your email address"
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                                            <Phone className="w-4 h-4 text-purple-400" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                                            <MapPin className="w-4 h-4 text-green-400" />
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300"
                                            placeholder="City, Country"
                                        />
                                    </div>

                                    {/* Major */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                                            <Briefcase className="w-4 h-4 text-pink-400" />
                                            Major/Field of Study
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.major}
                                            onChange={(e) => handleInputChange('major', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300"
                                            placeholder="Computer Science, Engineering, etc."
                                        />
                                    </div>

                                    {/* Year of Study */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                                            <GraduationCap className="w-4 h-4 text-orange-400" />
                                            Year of Study
                                        </label>
                                        <select
                                            value={formData.yearOfStudy}
                                            onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300"
                                        >
                                            <option value="" className="bg-slate-800">Select year</option>
                                            <option value="1st Year" className="bg-slate-800">1st Year</option>
                                            <option value="2nd Year" className="bg-slate-800">2nd Year</option>
                                            <option value="3rd Year" className="bg-slate-800">3rd Year</option>
                                            <option value="4th Year" className="bg-slate-800">4th Year</option>
                                            <option value="Graduate" className="bg-slate-800">Graduate</option>
                                            <option value="PhD" className="bg-slate-800">PhD</option>
                                        </select>
                                    </div>

                                    {/* Bio */}
                                    <div className="md:col-span-2">
                                        <label className="text-sm font-medium text-white/80 mb-2 block">
                                            Bio
                                        </label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            rows="4"
                                            className="w-full px-4 py-3 bg-white/8 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300 resize-none"
                                            placeholder="Tell us about yourself, your interests, goals..."
                                            maxLength={500}
                                        />
                                        <p className="text-xs text-white/60 mt-2">
                                            {formData.bio.length}/500 characters
                                        </p>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="mt-8 flex justify-end">
                                    <motion.button
                                        onClick={saveProfileChanges}
                                        disabled={!hasChanges || saving}
                                        className={`group relative overflow-hidden px-8 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 ${
                                            hasChanges && !saving
                                                ? 'text-white shadow-2xl'
                                                : 'bg-white/10 text-white/40 cursor-not-allowed'
                                        }`}
                                        style={{
                                            background: hasChanges && !saving 
                                                ? "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)" 
                                                : undefined,
                                            boxShadow: hasChanges && !saving 
                                                ? "0 20px 40px -10px rgba(59, 130, 246, 0.4)" 
                                                : undefined,
                                        }}
                                        whileHover={hasChanges && !saving ? { scale: 1.05 } : {}}
                                        whileTap={hasChanges && !saving ? { scale: 0.95 } : {}}
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save Changes
                                            </>
                                        )}
                                        
                                        {hasChanges && !saving && (
                                            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out transform -skew-x-12 group-hover:translate-x-[200%]" />
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;