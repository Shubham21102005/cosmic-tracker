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
    <div className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto p-6 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex flex-col">
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
      </div>
    </div>
  );
}

export default App;