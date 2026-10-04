import React from 'react';
import { HelpCircle, ChevronRight, Home, Eye, Check, Sparkles } from 'lucide-react';
import { PROJECT_INFO } from '../../data/researchData';

interface Props {
  onConfirmKnowsNoNeed: () => void;
  onWantToSeeResearch: () => void;
  onBack: () => void;
  onHome: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({
  onConfirmKnowsNoNeed,
  onWantToSeeResearch,
  onBack,
  onHome,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between py-6 px-4 sm:px-8 max-w-4xl mx-auto overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between z-10">
        <button
          onClick={onHome}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <Home className="w-4 h-4 text-cyan-400" />
          <span>الرئيسية</span>
        </button>

        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <span>رجوع</span>
          <ChevronRight className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Main SaaS Decision Dialog (Linear / Raycast Style) */}
      <div className="w-full max-w-xl mx-auto my-auto z-10 text-center py-6">
        {/* Glowing Orb */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(0,217,255,0.3)]">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-cyan-400/20 blur-xl -z-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/[0.08] text-[11px] font-mono text-cyan-400 mb-3">
          <Sparkles className="w-3 h-3" />
          <span>CONDITIONAL ACCESS PROTOCOL</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          مرحبًا يا {PROJECT_INFO.teacher}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-lg mx-auto mb-8">
          نعلم خبرتكم الواسعة بالخوارزميات، ولكن للتأكد نود معرفة مساركم المفضل قبل بدء تدفق المعطيات.
        </p>

        {/* 2 High-End Decision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
          {/* Option A: Want to see research (Electric Primary Glow) */}
          <button
            onClick={onWantToSeeResearch}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(0,217,255,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-98 border border-cyan-400/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 w-full">
              <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full">
                مسار الاستكشاف [1]
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-base font-black mb-1">
                لا، أعرفها لكن أريد رؤية البحث
              </h3>
              <p className="text-[11px] text-cyan-100 font-normal">
                الانتقال المباشر للبحث التفاعلي ومحاكيات التنفيذ.
              </p>
            </div>
          </button>

          {/* Option B: Knows it (Sleek Dark Luxury Glass) */}
          <button
            onClick={onConfirmKnowsNoNeed}
            className="group relative p-5 rounded-2xl glass-panel hover:bg-[#081A34] text-slate-200 font-bold text-sm shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-98 border border-white/[0.08] hover:border-cyan-500/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4 w-full">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-white/[0.06]">
                مسار التحقق [2]
              </span>
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/[0.08] flex items-center justify-center">
                <Check className="w-4 h-4 text-cyan-400" />
              </div>
            </div>

            <div>
              <h3 className="text-base font-black mb-1 text-white">
                نعم أعرفها
              </h3>
              <p className="text-[11px] text-slate-400 font-normal">
                (لا أريد رؤية البحث - انتقال لصمام التأكيد)
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer System Note */}
      <div className="w-full text-center z-10 pt-4 border-t border-white/[0.06]">
        <p className="text-xs text-slate-500 font-mono">
          SYSTEM_LOGIC // CONDITIONAL GATEWAY: IF (USER_CONFIRM == FALSE) GOTO CONFIRMATION
        </p>
      </div>
    </div>
  );
};
