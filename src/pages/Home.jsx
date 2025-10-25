import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    Rocket,
    Compass,
    Users,
    MessageCircle,
    CheckCircle2,
    Bell,
    ClipboardList,
    Video,
    ChevronDown,
    Sparkles,
    Zap,
} from "lucide-react";

import logo from "../assets/studyhub-logo.jpg";

// --- Animated Background for Hero/Footer (Unchanged) ---
const AnimatedBackground = () => {
    const particles = Array.from({ length: 15 }).map((_, i) => {
        const size = 20 + Math.random() * 30;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 5;

        return (
            <motion.div
                key={`p-${i}`}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                    x: [0, (Math.random() - 0.5) * 60, 0],
                    y: [0, (Math.random() - 0.5) * 60, 0],
                    opacity: [0, 0.4, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration,
                    delay,
                    ease: "easeInOut",
                }}
                className="absolute rounded-full bg-gradient-to-br from-indigo-500/50 via-cyan-400/50 to-purple-500/50 blur-2xl"
                style={{ width: size, height: size, left: `${left}%`, top: `${top}%` }}
            />
        );
    });

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-slate-900">
            <motion.div
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["-20%", "20%", "-20%"],
                    rotate: [0, 180, 360],
                }}
                transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-50%] left-[-50%] w-[150vw] h-[150vh] bg-gradient-to-br from-indigo-900/80 via-slate-900 to-slate-900 blur-3xl opacity-50"
            />

            <motion.div
                animate={{
                    x: ["20%", "-20%", "20%"],
                    y: ["20%", "-20%", "20%"],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-50%] right-[-50%] w-[150vw] h-[150vh] bg-gradient-to-tl from-cyan-900/70 via-slate-900 to-slate-900 blur-3xl opacity-50"
            />

            {particles}

            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
        </div>
    );
};

// --- Transitional Gradient Background (Unchanged) ---
const TransitionalSectionBackground = () => (
    <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        style={{
            background:
                "linear-gradient(180deg, #223A5F 0%, #18243A 60%, #101624 100%)",
            backgroundColor: "#18243A",
        }}
    >
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/noise.png')",
                opacity: 0.07,
                zIndex: 2,
            }}
        />
    </div>
);

// --- Data for the first Feature Section ---
const features = [
    {
        icon: <Users className="w-10 h-10" />,
        title: "Study Groups",
        desc: "Easily form groups and organize collaborative sessions.",
        color: "from-blue-400 via-cyan-400 to-green-400",
        accent: "bg-green-400/30",
    },
    {
        icon: <MessageCircle className="w-10 h-10" />,
        title: "Real-time Chat",
        desc: "Instant messaging, file sharing, and live notes for teamwork.",
        color: "from-purple-400 via-blue-400 to-cyan-400",
        accent: "bg-purple-400/30",
    },
    {
        icon: <CheckCircle2 className="w-10 h-10" />,
        title: "Task Tracking",
        desc: "Assign tasks, set deadlines, and boost your group's productivity.",
        color: "from-blue-400 via-cyan-400 to-green-400",
        accent: "bg-green-400/30",
    },
    {
        icon: <Bell className="w-10 h-10" />,
        title: "Smart Reminders",
        desc: "Stay updated with timely alerts and never miss a session.",
        color: "from-purple-400 via-blue-400 to-cyan-400",
        accent: "bg-purple-400/30",
    },
];

// --- Animation Variants for the first Feature Section ---
const featureGridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.32, delayChildren: 0.25 },
    },
};

const featureCardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            bounce: 0.4,
        },
    },
};

// --- Component for the first Feature Section ---
const FeatureCard = ({ icon, title, desc, color, accent }) => (
    <motion.div
        variants={featureCardVariants}
        whileHover={{
            scale: 1.06,
            boxShadow: "0 12px 40px 0 rgba(60,130,240,0.18)",
            borderColor: "#3C82F0",
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-3xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl shadow-2xl p-8 flex flex-col items-center text-center transition-all duration-300 cursor-pointer overflow-hidden"
    >
        <div className={`absolute left-1/2 -translate-x-1/2 top-6 w-16 h-2 rounded-full ${accent} blur-sm`} />
        <div className={`mb-6 mt-6 flex items-center justify-center rounded-full bg-gradient-to-br ${color} p-4 shadow-lg`}>
            <span className="text-white drop-shadow-lg">{icon}</span>
        </div>
        <h3 className="font-extrabold text-xl md:text-2xl mb-2 text-white">{title}</h3>
        <p className="text-slate-300 text-base md:text-lg">{desc}</p>
        <div className="absolute left-4 top-4 w-2/3 h-1/6 bg-white/10 rounded-full blur-md pointer-events-none" />
        <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-blue-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
        />
    </motion.div>
);

// ✅ COMPLETELY REDESIGNED Deep Dive Section
const deepDiveData = [
    {
        id: "whiteboard",
        icon: <ClipboardList className="w-10 h-10 sm:w-12 sm:h-12" />,
        title: "Real-time Whiteboard",
        subtitle: "Visual Collaboration Made Simple",
        desc: "Transform ideas into reality with our interactive whiteboard. Perfect for brainstorming, solving problems, and visual learning.",
        features: [
            { icon: <Sparkles className="w-4 h-4" />, text: "Infinite canvas with zoom controls" },
            { icon: <Zap className="w-4 h-4" />, text: "Real-time collaboration with team" },
            { icon: <Users className="w-4 h-4" />, text: "Export and save your sessions" },
        ],
        gradient: "from-blue-500 via-cyan-400 to-teal-500",
        glowColor: "#06b6d4",
        bgPattern: "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.1) 100%)",
    },
    {
        id: "video",
        icon: <Video className="w-10 h-10 sm:w-12 sm:h-12" />,
        title: "Sync Videos",
        subtitle: "Watch & Learn Together",
        desc: "Synchronized video streaming with live chat and note-taking. Learn from Youtube, Learn together, discuss concepts, and never miss a moment.",
        features: [
            { icon: <Sparkles className="w-4 h-4" />, text: "Perfect synchronization across devices" },
            { icon: <MessageCircle className="w-4 h-4" />, text: "Live chat during video sessions" },
            { icon: <CheckCircle2 className="w-4 h-4" />, text: "Collaborative note-taking" },
        ],
        gradient: "from-blue-500 via-cyan-400 to-teal-500",
        glowColor: "#06b6d4",
        bgPattern: "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.1) 100%)",
    },
];

// Enhanced animation variants
const deepDiveSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
};

const deepDiveCardVariants = {
    hidden: { 
        opacity: 0, 
        y: 80,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            bounce: 0.25,
        },
    },
};

// Enhanced Deep Dive Card Component
const EnhancedDeepDiveCard = ({ item, index }) => {
    return (
        <motion.div
            variants={deepDiveCardVariants}
            whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="group relative w-full"
        >
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{ background: item.bgPattern }}
            />

            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
                
                {/* Animated Glow Effect */}
                <div 
                    className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 rounded-3xl"
                    style={{ 
                        background: `linear-gradient(45deg, ${item.glowColor}40, transparent, ${item.glowColor}40)` 
                    }}
                />

                {/* Floating Orbs */}
                <div className="absolute top-4 right-4 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div 
                        className="w-full h-full rounded-full blur-xl"
                        style={{ background: item.gradient }}
                    />
                </div>

                {/* Header Section */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                    {/* Icon */}
                    <motion.div
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ 
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.5 }
                        }}
                        animate={{
                            y: [0, -3, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <span className="text-white drop-shadow-lg">
                            {item.icon}
                        </span>
                    </motion.div>

                    {/* Title & Subtitle */}
                    <div className="flex-1">
                        <motion.h3 
                            className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {item.title}
                        </motion.h3>
                        <motion.p 
                            className={`text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {item.subtitle}
                        </motion.p>
                    </div>
                </div>

                {/* Description */}
                <motion.p 
                    className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {item.desc}
                </motion.p>

                {/* Features List */}
                <div className="space-y-4">
                    {item.features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="flex items-center gap-3 group/feature"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                        >
                            <div 
                                className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover/feature:scale-110 transition-transform duration-300`}
                            >
                                <span className="text-white text-xs">
                                    {feature.icon}
                                </span>
                            </div>
                            <span className="text-slate-200 font-medium group-hover/feature:text-white transition-colors duration-300">
                                {feature.text}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-50" />
                <div 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
                />
            </div>
        </motion.div>
    );
};

// --- GradientButton (Unchanged) ---
const GradientButton = ({ children, href }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="group relative flex items-center justify-center gap-2 rounded-full font-bold text-white text-md sm:text-lg px-6 py-3 sm:px-8 sm:py-4 
                       bg-gradient-to-r from-blue-500/80 to-purple-500/80 
                       border border-transparent
                       shadow-lg shadow-black/20
                       backdrop-blur-sm
                       transition-all duration-300 ease-in-out
                       hover:shadow-xl hover:shadow-blue-500/30 
                       focus:outline-none focus:ring-4 focus:ring-blue-400/50
                       overflow-hidden"
    >
        <Rocket className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        <span>{children}</span>
        <span
            className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                           transition-transform duration-500 ease-in-out 
                           transform -skew-x-12 group-hover:translate-x-[200%]"
        />
    </motion.a>
);

// --- OutlineButton (Unchanged) ---
const OutlineButton = ({ children, href }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="group relative flex items-center justify-center gap-2 rounded-full font-bold text-slate-200 text-md sm:text-lg px-6 py-3 sm:px-8 sm:py-4 
                       bg-slate-500/10 
                       border border-slate-500
                       shadow-lg shadow-black/20
                       backdrop-blur-sm
                       transition-all duration-300 ease-in-out
                       hover:text-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/30 
                       focus:outline-none focus:ring-4 focus:ring-blue-400/50
                       overflow-hidden"
    >
        <Compass className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        <span>{children}</span>
        <span
            className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent 
                           transition-transform duration-500 ease-in-out 
                           transform -skew-x-12 group-hover:translate-x-[200%]"
        />
    </motion.a>
);

// --- HERO SECTION (Unchanged except scroll animation fix) ---
const heroWords = [
    { text: "Learn.", gradient: "from-blue-400 via-blue-500 to-purple-500" },
    { text: "Collaborate.", gradient: "from-purple-500 via-blue-400 to-blue-500" },
    { text: "Succeed.", gradient: "from-blue-400 via-purple-500 to-blue-500" },
];

const headingContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.35 } },
};

const wordVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const subheadingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 1.2 },
    },
};

const buttonsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 1.5 },
    },
};

// --- FIX: Only animate scroll icon when in view ---
const scrollVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 0.7,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay: 2.1 },
    },
};

const HeroSection = () => (
    <section
        className="w-full relative scroll-mt-24 min-h-screen flex items-center justify-center"
        id="hero"
        style={{
            background: "linear-gradient(180deg, #1E2B3B 0%, #0F172A 100%)",
            position: "relative",
        }}
    >
        <div
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/noise.png')",
                opacity: 0.07,
                zIndex: 0,
            }}
        />
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-32 sm:py-40 flex flex-col items-center text-center relative z-10">
            <motion.div
                variants={headingContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center items-center gap-4 mb-8"
            >
                {heroWords.map((word) => (
                    <motion.span
                        key={word.text}
                        variants={wordVariants}
                        className={`text-5xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r ${word.gradient} bg-clip-text text-transparent drop-shadow-lg`}
                    >
                        {word.text}
                    </motion.span>
                ))}
            </motion.div>

            <motion.p
                variants={subheadingVariants}
                initial="hidden"
                animate="visible"
                className="text-xl sm:text-2xl md:text-3xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium"
            >
                Turn group study into growth with StudyHub.<br className="hidden sm:inline" />
                The all-in-one platform for modern learning.
            </motion.p>

            <motion.div
                variants={buttonsVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
                <GradientButton href="/register">Get Started</GradientButton>
                <OutlineButton href="/features">Explore Features</OutlineButton>
            </motion.div>
        </div>

        {/* Only animate scroll icon when hero is in view */}
        <motion.div
            variants={scrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center"
        >
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="rounded-full bg-blue-400/20 p-2"
            >
                <ChevronDown className="w-8 h-8 text-blue-400" />
            </motion.div>
            <span className="text-xs text-blue-400 mt-2 opacity-70">Scroll Down</span>
        </motion.div>
    </section>
);

// --- HomePage (Main Component) ---
const HomePage = () => {
    return (
        <div className="min-h-screen text-slate-300 font-sans overflow-x-hidden relative bg-transparent">
            <AnimatedBackground />
            <main>
                <HeroSection />

                <div className="relative">
                    <TransitionalSectionBackground />
                    <div className="relative z-10">
                        {/* Features Section */}
                        <section id="features" className="w-full py-14 sm:py-20 scroll-mt-24">
                            <div className="max-w-7xl mx-auto px-4">
                                <motion.h2
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.6 }}
                                    variants={{
                                        hidden: { opacity: 0, y: -80 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 1.1,
                                                ease: [0.22, 1, 0.36, 1],
                                                type: "spring",
                                                bounce: 0.4,
                                            },
                                        },
                                    }}
                                    className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white"
                                >
                                    Everything You Need to Succeed, Together
                                </motion.h2>
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                                    variants={featureGridVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.3 }}
                                >
                                    {features.map((feature) => (
                                        <motion.div
                                            key={feature.title}
                                            variants={featureCardVariants}
                                        >
                                            <FeatureCard {...feature} />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </section>

                        {/* ✅ COMPLETELY REDESIGNED Deep Dive Section */}
                        <section className="w-full py-16 sm:py-20 md:py-28 scroll-mt-24 relative" id="collaboration">
                            {/* Background decoration */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
                            </div>

                            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                                {/* Section Header */}
                                <motion.div
                                    className="text-center mb-16 sm:mb-20"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                                        Deep Dive into{" "}
                                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                            Collaboration
                                        </span>
                                    </h3>
                                    <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
                                        Discover powerful tools designed to enhance your learning experience and boost team productivity.
                                    </p>
                                </motion.div>

                                {/* Cards Grid */}
                                <motion.div
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16"
                                    variants={deepDiveSectionVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    {deepDiveData.map((item, index) => (
                                        <EnhancedDeepDiveCard 
                                            key={item.id} 
                                            item={item} 
                                            index={index} 
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </section>

                        {/* --- CTA Section --- */}
                        <section className="w-full py-14 sm:py-20">
                            <div className="max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
                                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
                                    Ready to Achieve More?
                                </h2>
                                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl">
                                    Join StudyHub and unlock your full learning potential.
                                    Collaborate, organize, and succeed—together.
                                </p>
                                <GradientButton href="/register">
                                    Get Started for Free
                                </GradientButton>
                                <div className="mt-6 text-slate-400 text-sm">
                                    No credit card required.{" "}
                                    <span className="text-cyan-400 font-semibold">
                                        Start collaborating instantly.
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* --- FOOTER SECTION --- */}
                        <footer className="w-full bg-transparent py-6 px-4 border-t border-slate-800">
                            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={logo}
                                        alt="StudyHub Logo"
                                        className="h-6 w-6 rounded-full"
                                    />
                                    <span>
                                        &copy; {new Date().getFullYear()} StudyHub. All rights reserved.
                                    </span>
                                </div>
                                <p>Designed to help you succeed.</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;