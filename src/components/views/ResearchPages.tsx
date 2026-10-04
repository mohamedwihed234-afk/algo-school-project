import React from 'react';
import { PageId } from '../../types';
import { Page1Introduction } from '../research/Page1Introduction';
import { Page2Sequential } from '../research/Page2Sequential';
import { Page3Conditional } from '../research/Page3Conditional';
import { Page4Iterative } from '../research/Page4Iterative';
import {
  Network,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowDownSquare,
  GitFork,
  RotateCw,
  BookOpen,
} from 'lucide-react';

interface Props {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onHome: () => void;
  onBack: () => void;
}

export const ResearchPages: React.FC<Props> = ({
  currentPage,
  onNavigate,
}) => {
  let pageIndex = 1;
  if (currentPage === 'research-intro') pageIndex = 1;
  else if (currentPage === 'research-sequential') pageIndex = 2;
  else if (currentPage === 'research-conditional') pageIndex = 3;
  else if (currentPage === 'research-iterative') pageIndex = 4;

  const handleNext = () => {
    if (pageIndex === 1) onNavigate('research-sequential');
    else if (pageIndex === 2) onNavigate('research-conditional');
    else if (pageIndex === 3) onNavigate('research-iterative');
    else if (pageIndex === 4) onNavigate('sitemap');
  };

  const handlePrev = () => {
    if (pageIndex === 4) onNavigate('research-conditional');
    else if (pageIndex === 3) onNavigate('research-sequential');
    else if (pageIndex === 2) onNavigate('research-intro');
    else if (pageIndex === 1) onNavigate('welcome');
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col justify-between min-h-[calc(100vh-80px)]">
      {/* Top Clean Reading Header: التالي على اليمين · أزرار المنهج بالوسط · السابق على اليسار */}
      <div className="glass-panel p-2 rounded-2xl mb-5 flex items-center justify-between gap-2 shadow-lg border border-white/[0.08]">
        {/* 1. RIGHT SIDE: زر التالي */}
        <div className="shrink-0">
          <button
            onClick={handleNext}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-xs font-black text-white transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:scale-105 active:scale-95 border border-cyan-400/40"
            title="الانتقال للمحطة التالية (اليمين)"
          >
            <span>{pageIndex === 4 ? 'خريطة المعمارية' : 'التالي'}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* 2. CENTER: محطات المنهج الدراسي الأربعة */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/[0.06] text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => onNavigate('research-intro')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              pageIndex === 1
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>أساسيات الخوارزمية</span>
          </button>

          <button
            onClick={() => onNavigate('research-sequential')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              pageIndex === 2
                ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>التسلسلية</span>
          </button>

          <button
            onClick={() => onNavigate('research-conditional')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              pageIndex === 3
                ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-amber-400" />
            <span>الشرطية</span>
          </button>

          <button
            onClick={() => onNavigate('research-iterative')}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              pageIndex === 4
                ? 'bg-purple-500/25 text-purple-300 font-bold border border-purple-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 text-purple-400" />
            <span>التكرارية</span>
          </button>
        </div>

        {/* 3. LEFT SIDE: زر السابق */}
        <div className="shrink-0">
          <button
            onClick={handlePrev}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-semibold border border-white/[0.08] transition-colors flex items-center gap-1.5"
            title="الانتقال للمحطة السابقة (اليسار)"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400" />
            <span>السابق</span>
          </button>
        </div>
      </div>

      {/* Main Educational Article Content */}
      <main className="flex-1 w-full">
        {pageIndex === 1 && <Page1Introduction onNext={handleNext} />}
        {pageIndex === 2 && (
          <Page2Sequential onNext={handleNext} onPrev={handlePrev} />
        )}
        {pageIndex === 3 && (
          <Page3Conditional onNext={handleNext} onPrev={handlePrev} />
        )}
        {pageIndex === 4 && (
          <Page4Iterative onNext={handleNext} onPrev={handlePrev} />
        )}
      </main>

      {/* Bottom Center Nav: أزرار متناسقة في المنتصف تماماً (خريطة المعمارية وفريق العمل) */}
      <footer className="mt-10 pt-4 border-t border-white/[0.08] flex items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('sitemap')}
          className="px-5 py-2.5 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-bold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,217,255,0.2)] hover:scale-105 active:scale-95"
        >
          <Network className="w-4 h-4 text-cyan-400" />
          <span>خريطة المعمارية التفاعلية</span>
        </button>

        <button
          onClick={() => onNavigate('team')}
          className="px-5 py-2.5 rounded-2xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 text-purple-300 font-bold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:scale-105 active:scale-95"
        >
          <Users className="w-4 h-4 text-purple-400" />
          <span>فريق العمل والهندسة</span>
        </button>
      </footer>
    </div>
  );
};
