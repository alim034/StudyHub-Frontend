import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

import RoomPage from "./pages/Rooms/RoomPage";
import RoomDetail from "./pages/Rooms/RoomDetail";
import ProtectedRoute from "./components/common/ProtectedRoute";


import LandingNavbar from "./components/LandingNavbar";
import DashboardNavbar from "./components/DashboardNavbar";
// import ProtectedRoute from "./components/common/ProtectedRoute";


import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import AcceptInvitation from "./pages/AcceptInvitation";
import FeaturesPage from "./pages/Features";
import Community from "./pages/Community";

// Rooms hub (dashboard list)
import Rooms from "./pages/Rooms";
import Tasks from './pages/Tasks';
import Resources from './pages/Resources'

// Overlay + call page
// import RoomDetail from "./pages/Rooms/RoomDetail";
// import RoomPage from "./pages/Rooms/RoomPage";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ToastProvider } from "./components/common/Toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Shows or hides navbars (no navbar on full-screen call)
const NavbarSwitcher = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  const publicRoutes = ["/", "/login", "/register", "/forgot-password", "/groups", "/features", "/community"];
  const isPublicRoute =
    publicRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/reset-password/") ||
    location.pathname.startsWith("/invite/");

  const isVideoCallPage = location.pathname.startsWith("/rooms/call/");
  return !isVideoCallPage && (isAuthenticated && !isPublicRoute) ? <DashboardNavbar /> : !isVideoCallPage && <LandingNavbar />;
};


// Redirect back to the intended target immediately after login
const AuthRedirector = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    const target = sessionStorage.getItem("postLoginRedirect");
    if(!target) return;

    const cameFromAuth = ["/login", "/register"].includes(location.pathname) || location.state?.from;
    if (cameFromAuth) {
      sessionStorage.removeItem("postLoginRedirect");
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, location.pathname, location.state, navigate]);

  return null;
};


// Route that fetches the room if not passed via location.state, and renders overlay
const RoomDetailRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [room, setRoom] = useState(location.state?.room || null);
  const [loading, setLoading] = useState(!location.state?.room);
  const [error, setError] = useState(null);

  const backTo = location.state?.backTo || "/dashboard/rooms";

  useEffect(() => {
    if (room) return;
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const token =
          localStorage.getItem("token") ||
          JSON.parse(localStorage.getItem("authUser") || "{}")?.token ||
          JSON.parse(localStorage.getItem("user") || "{}")?.token ||
          "";

        const resp = await fetch(`${API_URL}/rooms/${encodeURIComponent(roomId)}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          credentials: "include"
        });

        if (!resp.ok) throw new Error(`Failed to load room: ${resp.status}`);
        const data = await resp.json();
        if (!ignore) setRoom(data?.room || data);
      } catch (e) {
        if (!ignore) setError(e.message || "Failed to load room");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [room, roomId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !room) {
    return <Navigate to={backTo} replace />;
  }

  return <RoomDetail room={room} onClose={() => navigate(backTo)} />;
};



const AppShell = () => {
  return (
    <>
      <NavbarSwitcher />
      <AuthRedirector />
      <main>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/community" element={<Community />} />

          {/* Room overlay (works from dashboard and deep links) */}
          <Route
            path="/rooms/room/:roomId"
            element={
              <ProtectedRoute>
                <RoomDetailRoute />
              </ProtectedRoute>
            }
          />

          {/* Video call page (support both new and legacy paths) */}
          <Route
            path="/rooms/call/room/:roomId"
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms/call/:roomId"
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            }
          />

          {/* Dashboard + Rooms hub */}
          <Route
            path="/dashboard/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Invitations (public deep link) */}
          <Route path="/invite/:token" element={<AcceptInvitation />} />

          {/* Legacy aliases */}
          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/resources" element={<Resources />} />


          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dashboard/rooms" replace />} />
        </Routes>
      </main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppShell />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;