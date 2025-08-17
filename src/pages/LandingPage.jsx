// src/pages/LandingPage.jsx

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Globe, Shield, Zap, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl mb-6">
            <Rocket className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="text-sm font-semibold text-indigo-700">
              Track Near-Earth Objects in Real-Time
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Discover the{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Cosmos
            </span>
            <br />
            Around Earth
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Monitor asteroids, comets, and other celestial bodies as they approach our planet. 
            Get real-time data from NASA and stay informed about potential space events.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:shadow-lg transition-all duration-200 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <Globe className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-Time Data</h3>
            <p className="text-slate-600 text-sm">
              Access live information from NASA's Near-Earth Object database
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:shadow-lg transition-all duration-200 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Hazard Alerts</h3>
            <p className="text-slate-600 text-sm">
              Get notified about potentially hazardous asteroids and comets
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:shadow-lg transition-all duration-200 group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Instant Updates</h3>
            <p className="text-slate-600 text-sm">
              Receive immediate notifications about new space events
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}