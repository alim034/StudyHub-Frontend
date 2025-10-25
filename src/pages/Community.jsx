import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ShieldCheck, Rocket, Mail, Phone, Github, Linkedin, Users, MessageSquare, BookOpen,
    HeartHandshake, Lightbulb, Ban, Puzzle, Gift, Send, Compass
} from "lucide-react";
import logo from "../assets/studyhub-logo.jpg";

// --- Enhanced Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        rotateX: -15,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            bounce: 0.3,
        },
    },
};

const floatingAnimation = {
    y: [-5, 5],
    transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
    },
};

// --- Data for Page Sections (✅ Updated to cyan-blue color scheme) ---
const highlightsData = [
    {
        icon: <MessageSquare className="w-8 h-8 text-white" />,
        pillText: "Open Discussions",
        title: "Ask, Discuss, Learn",
        points: [
            "Post your doubts and get quick responses.",
            "Engage in topic-based forums.",
            "Vote and highlight the best answers.",
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match "Small Groups, Big Progress"
    },
    {
        icon: <Users className="w-8 h-8 text-white" />,
        pillText: "Study Circles",
        title: "Small Groups, Big Progress",
        points: [
            "Create or join micro-communities.",
            "Conduct peer-to-peer mock interviews.",
            "Share curated resources and ideas.",
        ],
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        icon: <BookOpen className="w-8 h-8 text-white" />,
        pillText: "Resource Hub",
        title: "Learn, Share, Grow",
        points: [
            "Access notes, cheat sheets, and roadmaps.",
            "Upload and share your own resources.",
            "Filter by topics and difficulty.",
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match "Small Groups, Big Progress"
    },
];

const guidelinesData = [
    {
        icon: <HeartHandshake />,
        title: "Be Respectful & Inclusive",
        points: [
            "Celebrate diversity—everyone's perspective matters.",
            "Maintain a positive, supportive tone, even in disagreements.",
            "Encourage beginners, uplift peers, and avoid negative criticism.",
        ],
        color: "text-cyan-400", // ✅ Changed to cyan
        bgGradient: "from-cyan-500/10 to-cyan-600/5", // ✅ Changed to cyan
        borderColor: "border-cyan-500/20", // ✅ Changed to cyan
    },
    {
        icon: <Lightbulb />,
        title: "Share Quality, Original Content",
        points: [
            "Post only authentic, reliable, and plagiarism-free material.",
            "Credit authors, mentors, and creators whenever you share their work.",
            "Avoid misinformation—fact-check before posting.",
        ],
        color: "text-cyan-400", // ✅ Changed to cyan
        bgGradient: "from-cyan-500/10 to-cyan-600/5", // ✅ Changed to cyan
        borderColor: "border-cyan-500/20", // ✅ Changed to cyan
    },
    {
        icon: <ShieldCheck />,
        title: "Keep It Safe & Private",
        points: [
            "Protect your personal details (emails, phone numbers, IDs).",
            "Respect others' privacy and avoid sharing private messages publicly.",
            "Report any suspicious or harmful activity immediately.",
        ],
        color: "text-cyan-400", // ✅ Changed to cyan
        bgGradient: "from-cyan-500/10 to-cyan-600/5", // ✅ Changed to cyan
        borderColor: "border-cyan-500/20", // ✅ Changed to cyan
    },
    {
        icon: <Ban />,
        title: "No Spam or Self-Promo",
        points: [
            "Keep the focus on learning and collaboration.",
            "No irrelevant ads, excessive links, or repeated promotions.",
            "If you want to showcase your project, do so in the appropriate section.",
        ],
        color: "text-cyan-400", // ✅ Changed to cyan
        bgGradient: "from-cyan-500/10 to-cyan-600/5", // ✅ Changed to cyan
        borderColor: "border-cyan-500/20", // ✅ Changed to cyan
    },
    {
        icon: <Puzzle />,
        title: "Collaborate, Don't Compete",
        points: [
            "Healthy competition is welcome, but learning comes first.",
            "Share tips, solutions, and knowledge instead of hiding them.",
            "Help peers grow together—success multiplies when shared.",
        ],
        color: "text-cyan-400", // ✅ Changed to cyan
        bgGradient: "from-cyan-500/10 to-cyan-600/5", // ✅ Changed to cyan
        borderColor: "border-cyan-500/20", // ✅ Changed to cyan
    },
    {
        icon: <Gift />,
        title: "Contribute & Give Back",
        points: [
            "Participate actively—don't just consume, contribute.",
            "Share notes, solutions, or experiences that might help others.",
            "Appreciate and acknowledge others' efforts—it builds a stronger community.",
        ],
        color: "text-cyan-400", // ✅ Changed to cyan
        bgGradient: "from-cyan-500/10 to-cyan-600/5", // ✅ Changed to cyan
        borderColor: "border-cyan-500/20", // ✅ Changed to cyan
    },
];

const sectionClass = "max-w-6xl mx-auto px-4 py-10 sm:py-14";

// --- Enhanced Card Components ---
const HighlightCard = ({ icon, pillText, title, points, gradient }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{ 
            scale: 1.05, 
            y: -10,
            transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm p-8 shadow-2xl h-full min-h-[380px] transition-all duration-500"
    >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Floating effect for icon */}
        <motion.div
            animate={floatingAnimation}
            className="flex-shrink-0 relative z-10"
        >
            <div className={`flex items-center justify-center rounded-3xl w-20 h-20 bg-gradient-to-br ${gradient} shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}>
                {icon}
            </div>
        </motion.div>

        <div className="flex-grow flex flex-col justify-center py-6 relative z-10">
            <h3 className="font-bold text-xl text-cyan-300 mb-4 group-hover:text-cyan-200 transition-colors duration-300">{title}</h3>
            <ul className="text-slate-300 text-sm space-y-3">
                {points.map((point, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-start gap-2"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span>{point}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
        
        <div className="flex-shrink-0 text-center relative z-10">
            <div className="inline-block w-full py-3 px-4 rounded-xl border border-slate-600/50 bg-slate-800/60 backdrop-blur-sm text-slate-300 text-sm font-semibold group-hover:bg-slate-700/60 group-hover:border-cyan-500/30 transition-all duration-300">
                {pillText}
            </div>
        </div>
    </motion.div>
);

const GuidelineCard = ({ icon, title, points, color, bgGradient, borderColor }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
        }}
        className={`group relative overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br ${bgGradient} backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl transition-all duration-500`}
    >
        <div className="flex items-start gap-4">
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shrink-0 mt-1 group-hover:border-cyan-500/30 transition-colors duration-300`}
            >
                {React.cloneElement(icon, { className: `w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300` })}
            </motion.div>
            <div className="flex-1">
                <h3 className="font-bold text-lg text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
                <ul className="text-white/80 text-sm space-y-2">
                    {points.map((point, i) => (
                        <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="flex items-start gap-2"
                        >
                            <div className={`w-1 h-1 rounded-full ${color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                            <span className="group-hover:text-white transition-colors duration-300">{point}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    </motion.div>
);

// --- Enhanced Button Components (✅ Matching Home page style exactly) ---
const HeroButton = ({ children, onClick, type, disabled, className = "" }) => (
    <motion.button
        type={type || "button"}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`group relative flex items-center justify-center gap-2 rounded-full font-bold text-white text-md sm:text-lg px-6 py-3 sm:px-8 sm:py-4 
                       bg-gradient-to-r from-blue-500/80 to-purple-500/80 
                       border border-transparent
                       shadow-lg shadow-black/20
                       backdrop-blur-sm
                       transition-all duration-300 ease-in-out
                       hover:shadow-xl hover:shadow-blue-500/30 
                       focus:outline-none focus:ring-4 focus:ring-blue-400/50
                       overflow-hidden ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
        {type === 'submit' && disabled ? (
            <>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Sending...</span>
            </>
        ) : (
            <>
                {children.toString().includes('Join') || children.toString().includes('Get Started') ? <Rocket className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} /> : <Send className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />}
                <span>{children}</span>
            </>
        )}
        <span
            className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                           transition-transform duration-500 ease-in-out 
                           transform -skew-x-12 group-hover:translate-x-[200%]"
        />
    </motion.button>
);

// ✅ Contact Us button (outline style matching home page)
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

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// --- Footer Component ---
const Footer = () => (
    <footer className="w-full bg-transparent border-t border-slate-800 pt-8 pb-4 px-4 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 text-white">
            <div className="flex flex-col gap-4 min-w-[180px] mb-6 md:mb-0 w-full md:w-auto items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                    <img src={logo} alt="StudyHub Logo" className="h-8 w-8 rounded-full shadow bg-white object-contain" />
                    <span className="font-extrabold text-2xl" style={{ color: "#6C7CFF" }}>StudyHub</span>
                </div>
                <p className="text-white/80 text-base max-w-xs mx-auto md:mx-0">Empowering students to learn smarter, collaborate better, and grow together.</p>
                <div className="flex gap-4 mt-2 justify-center md:justify-start">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 transition"><Github className="w-7 h-7 text-white" /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 transition"><Linkedin className="w-7 h-7 text-white" /></a>
                    <a href="tel:+919370150313" aria-label="Phone" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 transition"><Phone className="w-7 h-7 text-white" /></a>
                    <a href="mailto:alimmohammad191786@gmail.com" aria-label="Mail" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 transition"><Mail className="w-7 h-7 text-white" /></a>
                </div>
            </div>
            <div className="w-full h-px bg-slate-800 my-4 md:hidden" />
            <div className="flex flex-col gap-2 min-w-[150px] mb-6 md:mb-0 w-full md:w-auto items-center md:items-start text-center md:text-left">
                <h4 className="font-bold text-lg mb-2 text-white">Platform</h4>
                {["Features", "Collaboration Room", "Watch Together", "Community"].map((item) => (<button key={item} className="bg-transparent text-white text-left py-2 px-4 rounded font-medium focus:outline-none hover:text-blue-400 transition w-full">{item}</button>))}
            </div>
            <div className="w-full h-px bg-slate-800 my-4 md:hidden" />
            <div className="flex flex-col gap-2 min-w-[150px] w-full md:w-auto items-center md:items-start text-center md:text-left">
                <h4 className="font-bold text-lg mb-2 text-white">Support & Community</h4>
                {["About Us", "Help Center", "Privacy Policy", "Terms of Service"].map((item) => (<button key={item} className="bg-transparent text-white text-left py-2 px-4 rounded font-medium focus:outline-none hover:text-blue-400 transition w-full">{item}</button>))}
            </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 mt-6 border-t border-slate-800 text-white text-sm gap-2">
            <div className="flex items-center gap-2 mb-2 md:mb-0 justify-center">
                <img src={logo} alt="StudyHub Logo" className="h-6 w-6 rounded-full bg-white object-contain" />
                <span>© 2025 StudyHub. All rights reserved.</span>
            </div>
            <span className="md:ml-auto font-medium text-slate-400 text-center">Designed to help you succeed.</span>
        </div>
    </footer>
);

export default function Community() {
    const [form, setForm] = useState({ name: "", email: "", priority: "medium", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });
    
    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });
        
        // Validation
        if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
            setStatus({ type: "error", message: "Please fill all required fields." });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setStatus({ type: "error", message: "Please enter a valid email address." });
            return;
        }
        
        setLoading(true);
        
        try {
            console.log('Sending to:', `${API_BASE}/api/contact`);
            console.log('Form data:', form);
            
            const response = await fetch(`${API_BASE}/api/contact`, { 
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }, 
                body: JSON.stringify(form) 
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Server error:', errorData);
                throw new Error(`Server error: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('Success result:', result);
            
            setStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
            setForm({ name: "", email: "", priority: "medium", subject: "", message: "" });
            
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ 
                type: "error", 
                message: `Failed to send message. Please try again or contact us directly at alimmohammad191786@gmail.com` 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white relative bg-[#18243A]">
            <main className="relative z-10">
                {/* ✅ Hero Section (Matching Features.jsx style) */}
                <section className="max-w-6xl mx-auto px-4 py-10 sm:py-14 flex flex-col items-center text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl"
                    >
                        Your Space to{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                            Learn Together
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed"
                    >
                        Join focused discussions, form study circles, share resources, and grow with mentors. StudyHub Community keeps collaboration simple and meaningful.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6"
                    >
                        <Link to="/register">
                            <HeroButton>Get Started</HeroButton>
                        </Link>
                        <OutlineButton href="#contact">Contact Us</OutlineButton>
                    </motion.div>
                </section>

                {/* Highlights */}
                <motion.section 
                    className={sectionClass}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {highlightsData.map((highlight) => (<HighlightCard key={highlight.title} {...highlight} />))}
                    </div>
                </motion.section>

                {/* Community Guidelines */}
                <motion.section 
                    className={sectionClass}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white"
                    >
                        Community Guidelines
                    </motion.h2>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {guidelinesData.map((g) => (<GuidelineCard key={g.title} {...g} />))}
                    </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section 
                    id="contact" 
                    className={sectionClass}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-white">Send us a Message</h2>
                    <div className="max-w-4xl mx-auto relative">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-slate-600/10 to-slate-800/10 rounded-3xl" />
                        <div className="relative rounded-3xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-xl p-8 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
                                        <input 
                                            name="name" 
                                            value={form.name} 
                                            onChange={update} 
                                            placeholder="Enter your full name" 
                                            className="w-full rounded-xl bg-slate-900/50 border border-slate-600/50 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" 
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">Email Address *</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={form.email} 
                                            onChange={update} 
                                            placeholder="Enter your email" 
                                            className="w-full rounded-xl bg-slate-900/50 border border-slate-600/50 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" 
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">Priority Level</label>
                                        <select 
                                            name="priority" 
                                            value={form.priority} 
                                            onChange={update} 
                                            className="w-full rounded-xl bg-slate-900/50 border border-slate-600/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <option value="low">Low — General query</option>
                                            <option value="medium">Medium — Account issues</option>
                                            <option value="high">High — Urgent support</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/90 mb-2">Subject *</label>
                                        <input 
                                            name="subject" 
                                            value={form.subject} 
                                            onChange={update} 
                                            placeholder="Brief description of your issue" 
                                            className="w-full rounded-xl bg-slate-900/50 border border-slate-600/50 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" 
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/90 mb-2">Message *</label>
                                    <textarea 
                                        name="message" 
                                        value={form.message} 
                                        onChange={update} 
                                        rows={6} 
                                        placeholder="Please provide detailed information about your issue or question..." 
                                        className="w-full rounded-xl bg-slate-900/50 border border-slate-600/50 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none" 
                                        required
                                    />
                                </div>
                                {status.message && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`rounded-xl px-4 py-3 text-sm border ${status.type === "success" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-300" : "bg-rose-500/10 border-rose-500/50 text-rose-300"}`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                                    <HeroButton type="submit" disabled={loading}>
                                        {loading ? "Sending..." : "Send Message"}
                                    </HeroButton>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 text-white/70 text-sm">
                                        <a href="mailto:alimmohammad191786@gmail.com" className="hover:text-white inline-flex items-center gap-2 transition-colors duration-300">
                                            <Mail className="w-4 h-4" /> alimmohammad191786@gmail.com
                                        </a>
                                        <span className="hidden sm:inline-block">•</span>
                                        <a href="tel:+919370150313" className="hover:text-white inline-flex items-center gap-2 transition-colors duration-300">
                                            <Phone className="w-4 h-4" /> +91 9370150313
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.section>

                {/* Final CTA */}
                <motion.section 
                    className={`${sectionClass} flex flex-col items-center text-center`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to learn, build, and grow together?</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl">Join StudyHub Community and collaborate with motivated learners and mentors.</p>
                    <Link to="/register">
                        <HeroButton>Join the Community</HeroButton>
                    </Link>
                </motion.section>

                <Footer />
            </main>
        </div>
    );
}