import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    Eye, 
    EyeOff, 
    Mail, 
    Lock, 
    AlertCircle,
    CheckCircle,
    Heart
} from "lucide-react";
import logo from "../assets/studyhub-logo.jpg";
// Use centralized auth API to avoid base URL mismatches
import { login as loginApi } from "../api/authApi";
import { API_BASE_URL } from "../config/config";

// --- Enhanced Animated Background Component ---
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

            {/* Medium floating elements with enhanced patterns */}
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
            {Array.from({ length: 15 }).map((_, i) => {
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
                            left: `${10 + (i * 6)}%`,
                            top: `${5 + (i * 7)}%`,
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

            {/* Enhanced animated grid with more dynamic breathing */}
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

// --- Footer Component ---
const Footer = () => (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-slate-900/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/70 text-sm">
                {/* Left side - Copyright */}
                <div className="flex items-center gap-2 order-2 sm:order-1">
                    <img src={logo} alt="StudyHub Logo" className="h-5 w-5 rounded-full bg-white object-contain opacity-80" />
                    <span>© 2025 StudyHub. All rights reserved.</span>
                </div>
                
                {/* Right side - Made with love */}
                <div className="flex items-center gap-2 order-1 sm:order-2">
                    <span>Made with</span>
                    <motion.div
                        animate={{ 
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                    >
                        <Heart className="w-4 h-4 text-red-400 fill-current" />
                    </motion.div>
                    <span>Designed to help you succeed.</span>
                </div>
            </div>
        </div>
    </footer>
);

// --- Main Login Component ---
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // API Base URL (for any fallback fetches). Primary calls use loginApi
    const API_BASE = import.meta.env.VITE_API_URL || API_BASE_URL || "http://localhost:5001";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear messages when user starts typing
        if (error) setError("");
        if (success) setSuccess("");
    };

    const validateForm = () => {
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }
        
        if (!formData.password.trim()) {
            setError("Password is required");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            console.log('Attempting login with:', { email: formData.email });

            // Use shared API wrapper which points to the correct base URL and stores token/user
            const result = await loginApi(formData.email.trim(), formData.password);

            // Normalize user storage in case the wrapper didn't store
            if (result?.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user || result));
            }

            setSuccess("Login successful! Redirecting...");
            setTimeout(() => navigate("/dashboard", { replace: true }), 800);

        } catch (error) {
            console.error('Login error:', error);
            // Prefer backend message when available
            const msg = error?.response?.data?.message || error?.message || 'Invalid credentials';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative pb-20 px-4">
            <AnimatedBackground />

            {/* Main Login Card - Adjusted height for better proportions */}
            <div className="w-full max-w-xs sm:max-w-xs md:max-w-sm mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.2 
                    }}
                    className="relative group"
                >
                    {/* Enhanced glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    
                    {/* Card content - Reduced padding for more compact height */}
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 sm:p-6 md:p-7 shadow-2xl">
                        {/* Header - Reduced spacing */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center mb-5 sm:mb-6"
                        >
                            {/* Logo - Reduced bottom margin */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
                            >
                                <div className="relative">
                                    <img 
                                        src={logo} 
                                        alt="StudyHub Logo" 
                                        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white object-contain shadow-lg" 
                                    />
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30" />
                                </div>
                                <span 
                                    className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                                >
                                    StudyHub
                                </span>
                            </motion.div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-white/70 text-sm sm:text-base">
                                Sign in to continue your learning journey
                            </p>
                        </motion.div>

                        {/* Form - Reduced spacing */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            onSubmit={handleSubmit}
                            className="space-y-3 sm:space-y-4"
                        >
                            {/* Email Field - Reduced label margin */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/8 border border-white/20 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password Field - Fixed to show eye icon */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white/40" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 sm:pl-12 pr-12 py-3 sm:py-4 bg-white/8 border border-white/20 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
                                        required
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white/90 hover:bg-white/10 rounded-r-xl transition-all duration-200 z-10 group"
                                        disabled={loading}
                                        tabIndex={-1}
                                        style={{
                                            minWidth: '40px',
                                        }}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg group-hover:scale-110 transition-transform duration-200" />
                                        ) : (
                                            <Eye className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg group-hover:scale-110 transition-transform duration-200" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Success Message */}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-300 text-sm backdrop-blur-sm flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {success}
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm backdrop-blur-sm flex items-center gap-2"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="group w-full relative overflow-hidden rounded-xl py-3 sm:py-4 px-4 font-semibold text-white text-base sm:text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: loading 
                                        ? "rgba(71, 85, 105, 0.5)" 
                                        : "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                                    boxShadow: loading 
                                        ? "none" 
                                        : "0 10px 30px -10px rgba(59, 130, 246, 0.3)",
                                }}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                                
                                {/* Shine effect */}
                                <span
                                    className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                                   transition-transform duration-500 ease-in-out 
                                                   transform -skew-x-12 group-hover:translate-x-[200%]"
                                />
                            </motion.button>
                        </motion.form>

                        {/* Footer - Reduced top margin */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-4 sm:mt-5 text-center"
                        >
                            <p className="text-white/70 text-sm">
                                New to StudyHub?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                                >
                                    Create account
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Component */}
            <Footer />

            {/* Enhanced decorative elements */}
            <div className="fixed bottom-28 left-8 hidden lg:block">
                <motion.div
                    animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ 
                        duration: 15, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="w-16 h-16 border-2 border-blue-400/30 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70" />
                </motion.div>
            </div>

            <div className="fixed top-1/4 right-8 hidden lg:block">
                <motion.div
                    animate={{ 
                        y: [0, -20, 0],
                        opacity: [0.4, 0.9, 0.4],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl opacity-50 blur-sm"
                />
            </div>

            <div className="fixed top-1/3 left-1/4 hidden xl:block">
                <motion.div
                    animate={{ 
                        x: [0, 30, -30, 0],
                        y: [0, -30, 30, 0],
                        scale: [0.5, 1, 0.5],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{ 
                        duration: 12, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
                />
            </div>
        </div>
    );
};

export default Login;