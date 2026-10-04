import React, { useState, useEffect } from 'react';
import { TEAM_MEMBERS, PROJECT_INFO } from '../../data/researchData';
import { Home, ChevronRight, ExternalLink, Heart, Award, CheckCircle2, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onHome: () => void;
  onBack: () => void;
  onOpenGrading?: () => void;
}

export const TeamScreen: React.FC<Props> = ({ onHome, onBack, onOpenGrading }) => {
  const [customLinks, setCustomLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('team_custom_tiktok_links');
      if (saved) setCustomLinks(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const triggerCelebration = () => {
    try {
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleUpdateLink = (id: string, currentUrl: string) => {
    const newUrl = window.prompt(
      'أدخل رابط حساب TikTok الرسمي المباشر:',
      customLinks[id] || currentUrl
    );
    if (newUrl && newUrl.trim() !== '') {
      const updated = { ...customLinks, [id]: newUrl.trim() };
      setCustomLinks(updated);
      try {
        localStorage.setItem('team_custom_tiktok_links', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between py-6 px-4 sm:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Top Nav */}
      <div className="w-full flex items-center justify-between z-10 mb-4">
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <Home className="w-4 h-4 text-cyan-400" />
          <span>الرئيسية</span>
        </button>

        <div className="flex items-center gap-2">
          {onOpenGrading && (
            <button
              onClick={onOpenGrading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>تقييم الأستاذ حمزة</span>
            </button>
          )}

          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <span>رجوع</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center z-10 mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
          فريق العمل والهندسة البرمجية
        </h2>
        <p className="text-sm text-cyan-300/80 font-medium">
          طلاب مدرسة الوصال العامرة · بإشراف {PROJECT_INFO.teacher}
        </p>
      </div>

      {/* 3 High-End Engineering Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 z-10 my-auto py-2">
        {TEAM_MEMBERS.map((member) => {
          const effectiveUrl = customLinks[member.id] || member.tiktokUrl;

          return (
            <div
              key={member.id}
              className="group relative glass-panel-elevated hover:bg-[#081A34] rounded-3xl p-5 text-right transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 border border-white/[0.08] hover:border-cyan-500/50 shadow-xl"
            >
              <div>
                {/* Top Row: Avatar & Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(0,217,255,0.25)] group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#14F195] border-2 border-[#061126]" />
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/40">
                    {member.highlightTag}
                  </span>
                </div>

                {/* Role & Name */}
                <span className="text-[11px] font-bold text-cyan-300 block mb-0.5">
                  {member.role}
                </span>
                <h3 className="text-lg font-black text-white group-hover:text-cyan-200 transition-colors mb-2">
                  {member.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed min-h-[44px] mb-3">
                  {member.roleDescription}
                </p>

                {/* Specialties / Skills Tags */}
                <div className="space-y-1 pt-2 border-t border-white/[0.06]">
                  {member.specialties.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#14F195]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TikTok Verified Action Button + Edit Link Icon */}
              <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center gap-2">
                <a
                  href={effectiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerCelebration}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-black text-white font-bold text-xs border border-white/[0.08] hover:border-cyan-400 transition-all flex items-center justify-center gap-2 shadow-sm group/btn"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current text-cyan-400 group-hover/btn:text-white transition-colors"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.37 6.37 0 0 0 1.96-4.57V8.78a8.28 8.28 0 0 0 4.81 1.54V6.87a4.83 4.83 0 0 1-1-.18z" />
                  </svg>
                  <span>فتح TikTok الرسمي</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover/btn:text-cyan-300" />
                </a>

                <button
                  type="button"
                  onClick={() => handleUpdateLink(member.id, member.tiktokUrl)}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-cyan-300 transition-colors"
                  title="تعديل رابط الحساب"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Teacher Evaluation Banner Card in Team Page */}
      {onOpenGrading && (
        <div className="z-10 mt-3 p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div>
            <h4 className="text-xs font-bold text-white">
              رصد تقييم ودرجة المشرف الأكاديمي ({PROJECT_INFO.teacher})
            </h4>
            <p className="text-[11px] text-slate-400">
              يمكن للأستاذ رصد الدرجة وكتابة الملاحظات والنصائح للطلاب.
            </p>
          </div>

          <button
            onClick={onOpenGrading}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(0,217,255,0.35)] transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            فتح لوحة التقييم ورصد الدرجة
          </button>
        </div>
      )}

      {/* Appreciation Quote */}
      <div className="text-center z-10 pt-4 border-t border-white/[0.08]">
        <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
          <span>&quot;{PROJECT_INFO.appreciation}&quot;</span>
          <Heart className="w-4 h-4 text-red-400 fill-red-400" />
        </p>
        <p className="text-xs text-slate-500 font-mono mt-1">
          {PROJECT_INFO.motto}
        </p>
      </div>
    </div>
  );
};
