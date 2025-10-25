import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ClipboardList,
    Video,
    FileText,
    ListChecks,
    Users,
    Share2,
    Rocket,
    Github,
    Linkedin,
    Phone,
    Mail
} from "lucide-react";
import logo from "../assets/studyhub-logo.jpg";

// --- Feature Data ---
const features = [
    {
        icon: <ClipboardList className="w-8 h-8 text-white" />,
        title: "Real-Time Whiteboard",
        desc: "Collaborate visually on an interactive whiteboard. Sketch, annotate, brainstorm ideas seamlessly. Perfect for study sessions and team projects.",
        points: [
            "Sketch, annotate, brainstorm together",
            "Live group drawing",
            "Export boards as images",
            "Perfect for study sessions and team projects"
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match Sync Videos style
        titleColor: "text-cyan-300", // ✅ Changed to match Sync Videos style
    },
    {
        icon: <Video className="w-8 h-8 text-white" />,
        title: "Sync Videos",
        desc: "Watch and discuss educational videos together. Take notes in real-time while streaming. Learn better with interactive discussions.",
        points: [
            "Stream videos in sync",
            "Live chat while watching",
            "Take notes together",
            "Interactive discussions"
        ],
        gradient: "from-cyan-500 to-blue-600",
        titleColor: "text-cyan-300",
    },
    {
        icon: <FileText className="w-8 h-8 text-white" />,
        title: "Smart Notes",
        desc: "Create, share, and organize notes effortlessly. AI-powered summarization for quick revision. Keep all study material in one place.",
        points: [
            "Effortless note creation & sharing",
            "AI-powered summaries",
            "Organize all study material",
            "Quick revision tools"
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match Sync Videos style
        titleColor: "text-cyan-300", // ✅ Changed to match Sync Videos style
    },
    {
        icon: <ListChecks className="w-8 h-8 text-white" />,
        title: "Task & Project Management",
        desc: "Plan assignments and deadlines with Kanban-style boards. Track progress and stay accountable as a team. Stay organized with reminders and notifications.",
        points: [
            "Kanban-style boards",
            "Track progress as a team",
            "Reminders & notifications",
            "Stay organized together"
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match Sync Videos style
        titleColor: "text-cyan-300", // ✅ Changed to match Sync Videos style
    },
    {
        icon: <Users className="w-8 h-8 text-white" />,
        title: "Community Collaboration",
        desc: "Join groups and connect with like-minded learners. Share resources, tips, and study hacks. Learn, collaborate, and grow together.",
        points: [
            "Join study groups",
            "Share resources & tips",
            "Collaborate and grow",
            "Connect with learners"
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match Sync Videos style
        titleColor: "text-cyan-300", // ✅ Changed to match Sync Videos style
    },
    {
        icon: <Share2 className="w-8 h-8 text-white" />,
        title: "Seamless File Sharing",
        desc: "Upload and share files securely in one click. Access shared material anytime, anywhere. No more lost notes or missing resources.",
        points: [
            "Secure uploads",
            "Instant access anywhere",
            "No lost notes",
            "Supports all file types"
        ],
        gradient: "from-cyan-500 to-blue-600", // ✅ Changed to match Sync Videos style
        titleColor: "text-cyan-300", // ✅ Changed to match Sync Videos style
    },
];

// --- Animation Variants ---
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

// --- Enhanced Feature Card with Rounded Square Icons ---
const FeatureCard = ({ icon, title, desc, points, gradient, titleColor }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{ 
            scale: 1.05, 
            y: -15,
            rotateY: 2,
            transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/70 backdrop-blur-lg p-8 shadow-2xl h-full min-h-[420px] transition-all duration-500 hover:border-slate-600/70"
    >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />
        
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700`} />
        
        {/* Floating effect for icon - NOW ROUNDED SQUARE */}
        <motion.div
            animate={floatingAnimation}
            className="flex-shrink-0 relative z-10"
        >
            <div className={`flex items-center justify-center rounded-3xl w-20 h-20 bg-gradient-to-br ${gradient} shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                {icon}
            </div>
        </motion.div>

        <div className="flex-grow flex flex-col justify-center py-6 relative z-10">
            <h3 className={`font-bold text-xl ${titleColor} mb-4 group-hover:scale-105 transition-all duration-300`}>{title}</h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">{desc}</p>
            <ul className="text-slate-300 text-sm space-y-3">
                {points.map((point, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-start gap-2 group-hover:text-slate-200 transition-colors duration-300"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 group-hover:bg-cyan-300 transition-colors duration-300" />
                        <span>{point}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
    </motion.div>
);

// --- Enhanced CTA Button (StudyHub brand color) ---
// ...existing code...

// --- Enhanced CTA Button (Matching Home Page Hero Section) ---
const CTAButton = ({ children, href }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
        <Link
            to={href}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full font-bold text-white text-base sm:text-lg px-8 py-4 sm:px-10 sm:py-5 
                       bg-gradient-to-r from-blue-500/80 to-purple-500/80 
                       border border-transparent
                       shadow-lg shadow-black/20
                       backdrop-blur-sm
                       transition-all duration-300 ease-in-out
                       hover:shadow-xl hover:shadow-blue-500/30 
                       focus:outline-none focus:ring-4 focus:ring-blue-400/50
                       overflow-hidden"
        >
            <Rocket className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
            <span className="group-hover:scale-105 transition-transform duration-300">{children}</span>
            <span
                className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                               transition-transform duration-500 ease-in-out 
                               transform -skew-x-12 group-hover:translate-x-[200%]"
            />
        </Link>
    </motion.div>
);


// --- Enhanced Footer ---
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
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 hover:scale-110 transition-all duration-300"><Github className="w-7 h-7 text-white" /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 hover:scale-110 transition-all duration-300"><Linkedin className="w-7 h-7 text-white" /></a>
                    <a href="tel:+919370150313" aria-label="Phone" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 hover:scale-110 transition-all duration-300"><Phone className="w-7 h-7 text-white" /></a>
                    <a href="mailto:alimmohammad191786@gmail.com" aria-label="Mail" className="rounded-xl bg-[#232733] p-3 hover:bg-blue-500 hover:scale-110 transition-all duration-300"><Mail className="w-7 h-7 text-white" /></a>
                </div>
            </div>
            <div className="w-full h-px bg-slate-800 my-4 md:hidden" />
            <div className="flex flex-col gap-2 min-w-[150px] mb-6 md:mb-0 w-full md:w-auto items-center md:items-start text-center md:text-left">
                <h4 className="font-bold text-lg mb-2 text-white">Platform</h4>
                {["Features", "Collaboration Room", "Watch Together", "Community"].map((item) => (<button key={item} className="bg-transparent text-white text-left py-2 px-4 rounded font-medium focus:outline-none hover:text-blue-400 hover:scale-105 transition-all duration-300 w-full">{item}</button>))}
            </div>
            <div className="w-full h-px bg-slate-800 my-4 md:hidden" />
            <div className="flex flex-col gap-2 min-w-[150px] w-full md:w-auto items-center md:items-start text-center md:text-left">
                <h4 className="font-bold text-lg mb-2 text-white">Support & Community</h4>
                {["About Us", "Help Center", "Privacy Policy", "Terms of Service"].map((item) => (<button key={item} className="bg-transparent text-white text-left py-2 px-4 rounded font-medium focus:outline-none hover:text-blue-400 hover:scale-105 transition-all duration-300 w-full">{item}</button>))}
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

// --- Features Page ---
const FeaturesPage = () => (
    <div className="min-h-screen bg-[#18243A] text-white relative">
        <main className="relative z-10">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-10 sm:py-14 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-2xl"
                >
                    Discover the Power of{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                        StudyHub
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed"
                >
                    Tools that help you collaborate smarter, stay organized, and achieve more — all in one place.
                </motion.p>
            </section>

            {/* Feature Grid */}
            <motion.section 
                className="max-w-7xl mx-auto px-4 py-10 sm:py-14"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
                className="max-w-6xl mx-auto px-4 py-10 sm:py-14 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Supercharge Your Productivity Today</h2>
                <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">Ready to transform your learning experience? Join StudyHub and unlock your potential.</p>
                <CTAButton href="/register">Get Started</CTAButton>
            </motion.section>

            <Footer />
        </main>
    </div>
);

export default FeaturesPage;