import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    Send,
    Loader2,
    Shield,
    Lock,
    Key,
    Heart
} from "lucide-react";
import { forgotPassword } from "../api/authApi";
import logo from "../assets/studyhub-logo.jpg";

// --- Enhanced Animated Background Component (Same as Login) ---
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

// --- Footer Component (Same as Login) ---
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

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await forgotPassword(email);
            setSent(true);
            setSuccess("Password reset link sent successfully!");
        } catch (error) {
            console.error("Forgot password error:", error);
            setError(error.message || "Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative pb-20 px-4">
            <AnimatedBackground />

            {/* Main Content - Reduced container size */}
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
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl">
                        {/* Header - Reduced spacing */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-center mb-4 sm:mb-5"
                        >
                            {/* Logo - Using StudyHub logo, reduced spacing */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3"
                            >
                                <div className="relative">
                                    <img 
                                        src={logo} 
                                        alt="StudyHub Logo" 
                                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white object-contain shadow-lg" 
                                    />
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30" />
                                </div>
                                <span className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    StudyHub
                                </span>
                            </motion.div>

                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                                {sent ? "Check Your Email" : "Forgot Password?"}
                            </h1>
                            <p className="text-white/70 text-xs sm:text-sm">
                                {sent 
                                    ? "We've sent a password reset link to your email address."
                                    : "No worries! Enter your email address and we'll send you a link to reset your password."
                                }
                            </p>
                        </motion.div>

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            {sent ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-3 sm:space-y-4"
                                >
                                    {/* Success Message */}
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-2 text-green-300 text-xs sm:text-sm backdrop-blur-sm flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                            {success}
                                        </motion.div>
                                    )}

                                    {/* Email Sent Visual - Reduced size */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-center py-3 sm:py-4"
                                    >
                                        <motion.div
                                            className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-xl"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                boxShadow: [
                                                    "0 10px 40px rgba(34, 197, 94, 0.3)",
                                                    "0 20px 60px rgba(34, 197, 94, 0.5)",
                                                    "0 10px 40px rgba(34, 197, 94, 0.3)"
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {/* Using StudyHub logo instead of Mail icon */}
                                            <img 
                                                src={logo} 
                                                alt="StudyHub Logo" 
                                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white object-contain" 
                                            />
                                        </motion.div>
                                        
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="text-white/70"
                                        >
                                            <p className="text-sm sm:text-base font-semibold mb-1 text-white">Email Sent Successfully!</p>
                                            <p className="text-xs text-white/60">
                                                Sent to: <span className="text-blue-400 font-medium break-all">{email}</span>
                                            </p>
                                        </motion.div>
                                    </motion.div>

                                    {/* Action Buttons - Reduced button heights */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-2 sm:space-y-3"
                                    >
                                        <motion.button
                                            onClick={() => {
                                                setSent(false);
                                                setEmail("");
                                                setSuccess("");
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-2.5 sm:py-3 px-4 bg-white/8 border border-white/20 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/12 flex items-center justify-center gap-2 group text-xs sm:text-sm"
                                        >
                                            <Send className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                                            Resend Email
                                        </motion.button>

                                        <Link to="/login">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group w-full relative overflow-hidden rounded-xl py-2.5 sm:py-3 px-4 font-semibold text-white text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2"
                                                style={{
                                                    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                                                    boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)",
                                                }}
                                            >
                                                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                                                Back to Login
                                                <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out transform -skew-x-12 group-hover:translate-x-[200%]" />
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-3 sm:space-y-4"
                                >
                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2 text-red-300 text-xs sm:text-sm backdrop-blur-sm flex items-center gap-2"
                                        >
                                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                            {error}
                                        </motion.div>
                                    )}

                                    {/* Email Input - Reduced height */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white/8 border border-white/20 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/12 backdrop-blur-sm transition-all duration-300 text-xs sm:text-sm"
                                                placeholder="Enter your email address"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button - Reduced height */}
                                    <motion.button
                                        type="submit"
                                        disabled={loading || !email.trim()}
                                        whileHover={{ scale: loading || !email.trim() ? 1 : 1.02 }}
                                        whileTap={{ scale: loading || !email.trim() ? 1 : 0.98 }}
                                        className="group w-full relative overflow-hidden rounded-xl py-2.5 sm:py-3 px-4 font-semibold text-white text-xs sm:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        style={{
                                            background: loading || !email.trim()
                                                ? "rgba(71, 85, 105, 0.5)" 
                                                : "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                                            boxShadow: loading || !email.trim()
                                                ? "none" 
                                                : "0 10px 30px -10px rgba(59, 130, 246, 0.3)",
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Sending Reset Link...
                                            </>
                                        ) : (
                                            <>
                                                <Key className="w-3 h-3 sm:w-4 sm:h-4" />
                                                Send Reset Link
                                            </>
                                        )}
                                        
                                        {!loading && email.trim() && (
                                            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out transform -skew-x-12 group-hover:translate-x-[200%]" />
                                        )}
                                    </motion.button>

                                    {/* Back to Login Link - Reduced spacing */}
                                    <div className="text-center">
                                        <Link
                                            to="/login"
                                            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-300 group text-xs sm:text-sm"
                                        >
                                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
                                            <span className="font-medium">Back to Login</span>
                                        </Link>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Security Notice - Reduced size and spacing */}
                        {!sent && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                            >
                                <div className="flex items-start gap-2">
                                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-xs font-semibold text-white mb-1">Security Notice</h4>
                                        <p className="text-xs text-white/60 leading-relaxed">
                                            For your security, the reset link will expire in 1 hour. If you don't receive an email within a few minutes, please check your spam folder.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Footer - Reduced spacing */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-3 sm:mt-4 text-center"
                        >
                            <p className="text-white/70 text-xs sm:text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Component */}
            <Footer />

            {/* Enhanced decorative elements (Same as Login) */}
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

export default ForgetPassword;