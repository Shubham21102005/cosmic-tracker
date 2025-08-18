// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16">
      {/* Animated Planet */}
      <div className="relative w-24 h-24">
        {/* Planet Core */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-900 shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] animate-pulse"></div>
        
        {/* Planet Ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-4 rounded-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-spin"></div>
        
        {/* Planet Surface Detail */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-indigo-800/50"></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 rounded-full bg-violet-800/50"></div>
      </div>
      
      {/* Orbiting Stars */}
      <div className="relative -mt-8 w-40 h-40">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white animate-spin"
            style={{
              animationDuration: `${3 + i}s`,
              transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(60px) rotate(-${i * 90}deg)`
            }}
          ></div>
        ))}
      </div>
      
      {/* Text */}
      <p className="mt-12 text-lg text-indigo-300 font-exo animate-pulse">
        Scanning the cosmos...
      </p>
      
      <style jsx>{`
        .font-exo {
          font-family: 'Exo 2', sans-serif;
        }
        @keyframes spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 3s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
}