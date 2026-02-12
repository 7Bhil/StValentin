import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeartGame = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const targetScore = 5;
  const containerRef = useRef(null);
  const [hearts, setHearts] = useState([]);

  // Auto-proceed fallback after 10 seconds for the "challenge"
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        onComplete: onComplete
      });
    }, 12000); 
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (score >= targetScore) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        onComplete: onComplete
      });
    }
  }, [score, onComplete]);

  useEffect(() => {
    const spawnHeart = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const x = Math.random() * (window.innerWidth - 100);
      const y = window.innerHeight + 100;
      
      setHearts(prev => [...prev, { id, x, y }]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 5000);
    };

    const interval = setInterval(spawnHeart, 600);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = (id) => {
    setScore(s => s + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-20 text-center z-50">
        <h2 className="dancing-script text-6xl md:text-8xl text-red-600 mb-4 drop-shadow-md">Prouve ton amour !</h2>
        <p className="text-pink-500 text-xl font-light tracking-widest uppercase opacity-80">Touche les cœurs qui s'envolent</p>
      </div>

      <div className="w-80 h-2 bg-white/50 rounded-full absolute top-52 overflow-hidden z-50 backdrop-blur-sm border border-white/30">
        <div 
          className="h-full bg-gradient-to-r from-red-400 to-pink-500 shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300"
          style={{ width: `${(score / targetScore) * 100}%` }}
        />
      </div>

      {hearts.map(heart => (
        <Heart 
          key={heart.id} 
          x={heart.x} 
          y={heart.y} 
          onClick={() => handleHeartClick(heart.id)} 
        />
      ))}
    </div>
  );
};

const Heart = ({ x, y, onClick }) => {
  const heartRef = useRef(null);

  useEffect(() => {
    gsap.to(heartRef.current, {
      y: -window.innerHeight - 200,
      x: x + (Math.random() - 0.5) * 600,
      duration: 3 + Math.random() * 2,
      ease: "power2.out",
    });
  }, [x, y]);

  return (
    <div
      ref={heartRef}
      onMouseEnter={onClick}
      onClick={onClick}
      className="absolute cursor-pointer select-none z-30 p-12 flex items-center justify-center group"
      style={{ 
        left: x, 
        top: y, 
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="text-6xl filter drop-shadow-[0_0_8px_rgba(255,20,147,0.8)] transition-all duration-300 group-hover:scale-150 group-hover:rotate-12">
        ❤️
      </div>
      {/* Visual ring effect on hover */}
      <div className="absolute inset-0 border-2 border-pink-400/0 rounded-full group-hover:border-pink-400/50 group-hover:scale-110 transition-all duration-500" />
    </div>
  );
};



export default HeartGame;
