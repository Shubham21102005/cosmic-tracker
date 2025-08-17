// src/components/Header.jsx

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { Rocket, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
    setIsMobileMenuOpen(false);
  }

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={session ? "/home" : "/"}
            className="flex items-center space-x-2 group"
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Cosmic Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {session ? (
              <>
                <Link
                  to="/home"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive("/home")
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              {session ? (
                <>
                  <Link
                    to="/home"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/home")
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-start space-x-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-blue-700 transition-all duration-200 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}