/**
 * DashboardLayout.jsx
 * - Main layout for StudyHub dashboard pages.
 * - Mobile-first: sidebar hidden by default, toggled by Navbar hamburger.
 * - Desktop: sidebar collapsible, main content grid/flex.
 * - Accessible: ARIA attributes, semantic <main>, <aside>, <header>.
 * - Uses Navbar and Sidebar components.
 */

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top Navbar */}
      <Navbar onSidebarToggle={() => setSidebarOpen(true)} />

      <div className="flex flex-1">
        {/* Sidebar: mobile drawer & desktop */}
        <Sidebar
          open={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onCollapse={() => setSidebarCollapsed((c) => !c)}
        />

        {/* Main content area */}
        <main
          className="flex-1 app-container py-6 transition-all"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;