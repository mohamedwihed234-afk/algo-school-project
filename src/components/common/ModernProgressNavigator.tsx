import React from 'react';
import { PageId } from '../../types';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react';

interface Props {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const PAGE_FLOW: { id: PageId; title: string; shortLabel: string; stage: string }[] = [
  { id: 'splash', title: 'بوابة الإطلاق', shortLabel: 'الإطلاق', stage: '01' },
  { id: 'welcome', title: 'الترحيب والتحقق', shortLabel: 'الترحيب', stage: '02' },
  { id: 'confirmation', title: 'صمام التأكيد', shortLabel: 'التأكيد', stage: '03' },
  { id: 'research-intro', title: '1/4 النواة والمفاهيم', shortLabel: 'المقدمة', stage: '04' },
  { id: 'research-sequential', title: '2/4 الخوارزمية التسلسلية', shortLabel: 'التسلسلية', stage: '05' },
  { id: 'research-conditional', title: '3/4 الخوارزمية الشرطية', shortLabel: 'الشرطية', stage: '06' },
  { id: 'research-iterative', title: '4/4 الخوارزمية التكرارية', shortLabel: 'التكرارية', stage: '07' },
  { id: 'sitemap', title: 'خريطة المعمارية التفاعلية', shortLabel: 'المعمارية', stage: '08' },
  { id: 'team', title: 'فريق الهندسة والاعتماد', shortLabel: 'الفريق', stage: '09' },
];

export const ModernProgressNavigator: React.FC<Props> = ({
  currentPage,
  onNavigate,
  onPrev,
  onNext,
  canPrev,
  canNext,
}) => {
  const currentIndex = PAGE_FLOW.findIndex((p) => p.id === currentPage);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  const progressPercent = Math.round(((safeIndex + 1) / PAGE_FLOW.length) * 100);
  const activeStep = PAGE_FLOW[safeIndex];

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-1.5">
      <div className="bg-[#061126]/90 backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/30 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all">
        {/* Top Control Bar: التالي على اليمين · العنوان بالمنتصف · السابق على اليسار */}
        <div className="flex items-center justify-between text-xs mb-2">
          {/* 1. RIGHT SIDE (اليمين): زر التالي */}
          <div className="flex items-center gap-2">
            <button
              disabled={!canNext}
              onClick={onNext}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:scale-105 active:scale-95 border border-cyan-400/40"
              title="الانتقال للمحطة التالية (اليمين)"
            >
              <span>التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="hidden sm:inline-block font-mono text-[10px] text-slate-500">
              المرحلة {activeStep.stage}
            </span>
          </div>

          {/* 2. CENTER: عنوان الصفحة الحالية ونسبة الإنجاز */}
          <div className="flex items-center gap-2 overflow-hidden px-2">
            <span className="font-bold text-white tracking-wide text-xs sm:text-sm truncate">
              {activeStep.title}
            </span>
            <div className="hidden md:flex items-center gap-1 font-mono text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40 shrink-0">
              <Activity className="w-3 h-3 text-[#14F195]" />
              <span>{progressPercent}%</span>
            </div>
          </div>

          {/* 3. LEFT SIDE (اليسار): زر السابق */}
          <div>
            <button
              disabled={!canPrev}
              onClick={onPrev}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed border border-white/[0.08] text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="الانتقال للمحطة السابقة (اليسار)"
            >
              <ChevronRight className="w-4 h-4 text-cyan-400" />
              <span>السابق</span>
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Interactive Progress Strip */}
        <div className="grid grid-cols-9 gap-1 sm:gap-1.5 pt-1">
          {PAGE_FLOW.map((item, idx) => {
            const isCompleted = idx < safeIndex;
            const isCurrent = idx === safeIndex;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group relative flex flex-col items-center focus:outline-none"
                title={`${item.stage}: ${item.title}`}
              >
                <div
                  className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'bg-cyan-400 shadow-[0_0_10px_#00D9FF]'
                      : isCompleted
                      ? 'bg-[#14F195]/80'
                      : 'bg-slate-800/80 group-hover:bg-slate-700'
                  }`}
                />
                <span
                  className={`hidden md:block text-[9px] font-mono mt-1 transition-colors truncate max-w-full ${
                    isCurrent
                      ? 'text-cyan-300 font-bold'
                      : isCompleted
                      ? 'text-slate-400'
                      : 'text-slate-600'
                  }`}
                >
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
