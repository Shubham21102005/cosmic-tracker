// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Import Components
import Header from "./components/Header";

// Import Pages
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EventDetailPage from "./pages/EventDetailPage";

function App() {
  const { session } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-exo bg-space-pattern">
      <div className="relative max-w-7xl mx-auto p-6 flex flex-col min-h-screen">
        {/* Cosmic Background Elements */}
        <div className="fixed inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.2) 0%, rgba(2, 6, 23, 0.8) 70%, rgba(2, 6, 23, 1) 100%)'
            }}
          ></div>
          <div className="absolute inset-0 opacity-10 bg-star-pattern"></div>
        </div>
        
        <Header />
        
        <main className="flex-grow flex flex-col py-8">
          <Routes>
            {/* Public routes that redirect if user is logged in */}
            <Route
              path="/"
              element={session ? <Navigate to="/home" /> : <LandingPage />}
            />
            <Route
              path="/login"
              element={session ? <Navigate to="/home" /> : <LoginPage />}
            />
            <Route
              path="/signup"
              element={session ? <Navigate to="/home" /> : <SignupPage />}
            />

            {/* Protected routes that redirect if user is not logged in */}
            <Route
              path="/home"
              element={session ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/event/:id"
              element={session ? <EventDetailPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        
        <footer className="py-8 mt-16 text-center text-slate-500 border-t border-slate-800/50">
          <div className="flex flex-col items-center">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-4"></div>
            <p className="text-sm">Cosmic Event Tracker © {new Date().getFullYear()}</p>
            <p className="text-xs mt-2">Tracking the universe's wonders, one event at a time</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;