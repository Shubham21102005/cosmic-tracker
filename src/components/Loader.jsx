import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="mb-6"
      >
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl">
          <Rocket className="h-12 w-12 text-white" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          Scanning the Cosmos
        </h3>
        <p className="text-slate-600">
          Fetching data from NASA's Near-Earth Object database...
        </p>
      </motion.div>
      
      {/* Animated dots */}
      <div className="flex space-x-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-3 h-3 bg-indigo-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}