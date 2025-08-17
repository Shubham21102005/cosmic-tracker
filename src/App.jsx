// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <Header />

        <main className="px-4 sm:px-6 lg:px-8 pb-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LandingPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LoginPage />
                  </motion.div>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SignupPage />
                  </motion.div>
                } 
              />
              <Route
                path="/home"
                element={
                  session ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HomePage />
                    </motion.div>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/event/:id"
                element={
                  session ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EventDetailPage />
                    </motion.div>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;