/**
 * Sidebar.jsx
 * - Vertical navigation for StudyHub.
 * - Mobile-first: hidden by default, slides in as a drawer.
 * - Desktop: collapsible to icon-only mini sidebar.
 * - Accessible: ARIA attributes, keyboard navigation, semantic <nav>.
 * - Uses lucide-react icons and shadcn UI components.
 */

import React, { useRef, useEffect } from "react";
import { Home, Users, StickyNote, Calendar, ListChecks, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/dashboard", icon: <Home />, label: "Dashboard" },
  { to: "/rooms", icon: <Users />, label: "Rooms" },
  { to: "/notes", icon: <StickyNote />, label: "Notes" },
  { to: "/calendar", icon: <Calendar />, label: "Calendar" },
  { to: "/tasks", icon: <ListChecks />, label: "Tasks" },
  { to: "/profile", icon: <User />, label: "Profile" },
  { to: "/logout", icon: <LogOut />, label: "Logout" },
];

const Sidebar = ({ open, collapsed, onClose, onCollapse }) => {
  const sidebarRef = useRef();

  // Trap focus in sidebar when open on mobile
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg flex flex-col"
            aria-label="Sidebar"
            aria-modal="true"
            aria-expanded={open}
            tabIndex={-1}
          >
            <nav className="flex-1 py-4">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary
                    ${isActive ? "bg-primary text-white" : "text-neutral hover:bg-bg"}`
                  }
                  aria-label={item.label}
                  tabIndex={0}
                  onClick={onClose}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-muted"
              aria-label="Close sidebar"
              onClick={onClose}
            >
              <ChevronLeft />
            </Button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={`hidden sm:flex flex-col bg-card shadow-lg h-screen sticky top-0 z-40 transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}`}
        aria-label="Sidebar"
        aria-expanded={!collapsed}
      >
        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary
                ${isActive ? "bg-primary text-white" : "text-neutral hover:bg-bg"}`
              }
              aria-label={item.label}
              tabIndex={0}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="mx-auto mb-4"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={onCollapse}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;