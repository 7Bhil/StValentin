import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

const Proposal = () => {
  const [yesPressed, setYesPressed] = useState(false);
  const noButtonRef = useRef(null);

  const teleportNoButton = () => {
    // Teleport to a random position within the viewport
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 80);
    
    // Sequence: Scale down -> Move -> Scale up
    const tl = gsap.timeline();
    tl.to(noButtonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.1,
      ease: "power2.in"
    })
    .set(noButtonRef.current, {
      left: x,
      top: y,
      position: 'fixed'
    })
    .to(noButtonRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  if (yesPressed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-transparent text-center p-4">
        <h1 className="dancing-script text-7xl md:text-9xl text-red-600 mb-12 animate-bounce drop-shadow-xl">
          YÉÉÉÉÉ ! ❤️
        </h1>
        <div className="text-9xl mb-12 filter drop-shadow-2xl">💍🌹✨</div>
        <p className="text-3xl text-pink-600 font-light max-w-2xl leading-relaxed">
          Je savais que tu dirais oui ! Mon cœur t'appartient pour l'éternité. 
          Prépare-toi pour la plus belle des soirées !
        </p>
        
        <div className="mt-20 px-10 py-5 bg-white/60 backdrop-blur-md rounded-full text-red-500 shadow-xl tracking-[0.2em] font-medium animate-pulse border border-white">
            NOTRE HISTOIRE CONTINUE...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent p-4 relative overflow-hidden">
      <div className="bg-white/40 backdrop-blur-xl p-16 rounded-[50px] text-center relative z-50 border border-white/50 shadow-[0_30px_100px_rgba(255,100,100,0.15)] max-w-2xl w-full">
        <div className="w-24 h-24 bg-gradient-to-tr from-red-400 to-pink-500 rounded-full mx-auto mb-10 flex items-center justify-center shadow-xl transform rotate-12">
            <span className="text-5xl">💖</span>
        </div>
        
        <h2 className="dancing-script text-5xl md:text-8xl text-red-600 mb-16 drop-shadow-sm">
          Veux-tu être ma Valentin(e) ?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <button
            onClick={() => setYesPressed(true)}
            className="bg-red-500 text-white hover:bg-red-600 font-bold py-6 px-16 rounded-3xl text-4xl shadow-[0_20px_40px_rgba(220,38,38,0.3)] transform transition-all active:scale-95"
          >
            OUI !
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={teleportNoButton}
            onClick={teleportNoButton}
            className="bg-white/50 hover:bg-white text-gray-500/60 font-medium py-4 px-10 rounded-2xl text-2xl backdrop-blur-md border border-white/50 transition-all"
          >
            Non...
          </button>
        </div>
      </div>
      
      {/* Decorative Hearts */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="absolute text-red-200/30 font-bold pointer-events-none select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 60 + 20}px`,
            animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};



export default Proposal;
