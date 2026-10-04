import React, { useEffect, useRef } from 'react';
import { PROJECT_INFO, ASSETS } from '../../data/researchData';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onNext }) => {
  const onNextRef = useRef(onNext);
  onNextRef.current = onNext;

  useEffect(() => {
    // 3 seconds auto-transition
    const timer = setTimeout(() => {
      onNextRef.current();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={() => onNextRef.current()}
      className="relative min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-8 px-4 sm:px-8 max-w-5xl mx-auto overflow-hidden cursor-pointer select-none"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/[0.06] rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full text-center space-y-6 z-10 my-auto animate-fadeIn">
        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight leading-tight">
          {PROJECT_INFO.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          {PROJECT_INFO.subtitle}
        </p>

        {/* Hero Image Only */}
        <div className="pt-2 max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel-elevated p-2 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,217,255,0.18)] group">
            <img
              src={ASSETS.heroTech}
              alt="الخوارزميات"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-60 rounded-2xl" />
          </div>
        </div>

        {/* Subtle quick click indicator */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
          <span>جاري الانتقال التلقائي (3 ثوانٍ) أو انقر للمتابعة</span>
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
