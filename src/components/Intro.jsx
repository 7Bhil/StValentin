import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Intro = ({ onOpen }) => {
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const lidRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(envelopeRef.current, 
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
    );
  }, []);

  const handleOpen = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onOpen, 1000);
      }
    });

    tl.to(lidRef.current, {
      rotateX: 180,
      duration: 0.6,
      ease: "power2.inOut"
    })
    .to(letterRef.current, {
      y: -100,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2")
    .to(envelopeRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, "+=0.3");
  };

  return (
    <div className="flex flex-col items-center justify-center min-vh-100 w-full h-full bg-transparent p-4">
      <div className="text-center mb-16 z-50">
        <h1 className="dancing-script text-6xl md:text-8xl text-red-600 drop-shadow-[0_4px_8px_rgba(197,48,48,0.2)] mb-6 px-4">
          Un message secret...
        </h1>
        <p className="text-pink-400 text-xl font-light tracking-[0.2em] uppercase">clique pour ouvrir</p>
      </div>

      <div 
        ref={envelopeRef}
        onClick={handleOpen}
        className="relative w-80 h-52 bg-white/40 cursor-pointer shadow-[0_20px_50px_rgba(255,100,100,0.1)] rounded-b-2xl border border-white/30 backdrop-blur-xl group"
        style={{ perspective: '1000px' }}
      >
        {/* Lid */}
        <div 
          ref={lidRef}
          className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[104px] border-t-red-400 origin-top z-20 shadow-lg"
        />
        
        {/* Sides */}
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-white/60 border-t-[104px] border-t-transparent z-10" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] border-r-white/60 border-t-[104px] border-t-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[104px] border-b-[104px] border-b-white/50 z-5 rounded-b-2xl" />

        {/* Letter */}
        <div 
          ref={letterRef}
          className="absolute top-4 left-4 right-4 bottom-4 bg-white/95 shadow-lg flex flex-col items-center justify-center p-6 z-0 rounded-lg border border-white"
        >
          <div className="text-red-500 text-6xl mb-4 animate-pulse">❤️</div>
          <div className="h-1 w-16 bg-red-50 rounded-full" />
        </div>
      </div>

      {/* Decorative Floating Hearts */}
      <div className="absolute top-20 left-20 text-red-200/40 text-7xl floating" style={{ animationDelay: '0s' }}>❤️</div>
      <div className="absolute bottom-20 right-20 text-red-200/40 text-7xl floating" style={{ animationDelay: '1s' }}>❤️</div>
      <div className="absolute top-1/3 right-10 text-pink-200/40 text-5xl floating" style={{ animationDelay: '2s' }}>💖</div>
      <div className="absolute bottom-1/3 left-10 text-pink-200/40 text-5xl floating" style={{ animationDelay: '1.5s' }}>💖</div>
    </div>
  );
};

export default Intro;
