import React from 'react';
import { PageId } from '../../types';
import { PROJECT_INFO } from '../../data/researchData';
import {
  Cpu,
  Command,
  School,
  Award,
  Download,
  Terminal,
  Sparkles,
} from 'lucide-react';

interface Props {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleCommandBar: () => void;
  onOpenGrading: () => void;
  onOpenDownloadPackage?: () => void;
}

export const TechHeader: React.FC<Props> = ({
  currentPage,
  onNavigate,
  onToggleCommandBar,
  onOpenGrading,
  onOpenDownloadPackage,
}) => {
  const isResearch = currentPage.startsWith('research-');

  return (
    <header className="sticky top-0 z-40 w-full glass-panel-elevated border-b border-white/[0.08] px-3 sm:px-6 py-2.5 flex items-center justify-between transition-all select-none">
      {/* Brand / Logo (Zone 1) */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('splash')}
          className="flex items-center gap-2 group text-right focus:outline-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.4)] group-hover:scale-105 transition-transform">
            <Cpu className="w-3.5 h-3.5 text-cyan-200" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              {PROJECT_INFO.title}
            </span>
            <span className="hidden lg:inline-block font-mono text-[10px] text-cyan-400/80 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              PRO
            </span>
          </div>
        </button>

        {/* Live Engine Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
          <span className="font-mono text-[10px] text-slate-400">ENGINE // RUNNING</span>
        </div>
      </div>

      {/* Nav Tabs (Zone 2) */}
      <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-950/70 border border-white/[0.06] text-xs font-medium">
        <button
          onClick={() => onNavigate('splash')}
          className={`px-3 py-1 rounded-lg transition-all ${
            currentPage === 'splash'
              ? 'bg-cyan-500/15 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,217,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          البداية
        </button>

        <button
          onClick={() => onNavigate('welcome')}
          className={`px-3 py-1 rounded-lg transition-all ${
            currentPage === 'welcome' || currentPage === 'confirmation'
              ? 'bg-cyan-500/15 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,217,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          الترحيب
        </button>

        <button
          onClick={() => onNavigate('research-intro')}
          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            isResearch
              ? 'bg-cyan-500/15 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,217,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span>المحاكيات والبحث</span>
        </button>

        <button
          onClick={() => onNavigate('sitemap')}
          className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
            currentPage === 'sitemap'
              ? 'bg-cyan-500/15 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,217,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#A855F7]" />
          <span>خريطة المعمارية</span>
        </button>

        <button
          onClick={() => onNavigate('team')}
          className={`px-3 py-1 rounded-lg transition-all ${
            currentPage === 'team'
              ? 'bg-cyan-500/15 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,217,255,0.2)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          فريق الهندسة
        </button>
      </nav>

      {/* Actions (Zone 3): تنزيل الحزمة الكاملة Zip + تقييم الأستاذ حمزة + Command Bar */}
      <div className="flex items-center gap-2">
        {/* زر تنزيل الحزمة الكاملة Zip (بجانب زر العلامة تماماً كما طلب المستخدم) */}
        {onOpenDownloadPackage && (
          <button
            type="button"
            onClick={onOpenDownloadPackage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 border border-cyan-400/60 text-cyan-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:scale-105 active:scale-95"
            title="تنزيل حزمة المشروع كاملة (ZIP) تدعم استضافة Cloudflare Pages و Netlify ومربوطة بـ Supabase"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">تنزيل الحزمة</span>
            <span className="font-mono text-[10px] bg-cyan-950 px-1.5 py-0.5 rounded text-cyan-300 border border-cyan-800/40">
              ZIP
            </span>
          </button>
        )}

        {/* زر رصد تقييم ودرجة الأستاذ حمزة (العلامة) */}
        <button
          type="button"
          onClick={onOpenGrading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95"
          title="رصد تقييم ودرجة الأستاذ حمزة"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">تقييم الأستاذ</span>
          <span className="font-mono text-[10px] bg-amber-950 px-1 py-0.5 rounded text-amber-300">
            العلامة
          </span>
        </button>

        <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-400 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
          <School className="w-3.5 h-3.5 text-cyan-400" />
          <span>{PROJECT_INFO.school}</span>
        </div>

        {/* Command bar shortcut trigger */}
        <button
          type="button"
          onClick={onToggleCommandBar}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/[0.08] hover:border-cyan-500/40 text-xs transition-all shadow-sm group"
          title="فتح لوحة الأوامر والدليل السريع"
        >
          <Command className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-mono text-[11px]">الدليل</span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};
