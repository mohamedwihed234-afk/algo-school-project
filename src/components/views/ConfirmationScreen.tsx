import React, { useState } from 'react';
import { ShieldCheck, ChevronRight, Home, Eye, RefreshCw, Sparkles, ChevronLeft } from 'lucide-react';

interface Props {
  onGoToResearch: () => void;
  onBack: () => void;
  onHome: () => void;
}

export const ConfirmationScreen: React.FC<Props> = ({
  onGoToResearch,
  onBack,
  onHome,
}) => {
  const [hasRefused, setHasRefused] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between py-6 px-4 sm:px-8 max-w-4xl mx-auto overflow-hidden">
      {/* Ambient glow */}
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

      {/* Main Content Modal */}
      <div className="w-full max-w-xl mx-auto my-auto z-10 text-center py-6">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#14F195]/20 to-cyan-500/30 border border-[#14F195]/40 flex items-center justify-center text-[#14F195] shadow-[0_0_30px_rgba(20,241,149,0.25)]">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-[#14F195]/20 blur-xl -z-10" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          هل أنت متأكد أنك لا تريد رؤية البحث؟
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-lg mx-auto mb-8">
          لقد تم إعداد هذا البحث بطريقة تفاعلية تساعدك على فهم الخوارزميات بشكل أسرع وأكثر متعة.
        </p>

        {!hasRefused ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
            {/* Primary Button */}
            <button
              onClick={onGoToResearch}
              className="group p-5 rounded-2xl bg-gradient-to-b from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(0,217,255,0.25)] transition-all duration-200 hover:scale-[1.02] active:scale-98 border border-cyan-400/40 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4 w-full">
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full">
                  المسار الموصى به
                </span>
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-black mb-1">
                  أريد أن أرى البحث
                </h3>
                <p className="text-[11px] text-cyan-100 font-normal">
                  بدء تجربة المحاكيات والخرائط التفاعلية.
                </p>
              </div>
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => setHasRefused(true)}
              className="group p-5 rounded-2xl glass-panel hover:bg-[#081A34] text-slate-200 font-bold text-sm shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-98 border border-white/[0.08] hover:border-cyan-500/40 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4 w-full">
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-white/[0.06]">
                  تأكيد الرفض
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/[0.08] flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-black mb-1 text-white">
                  نعم لا أريد رؤية البحث
                </h3>
                <p className="text-[11px] text-slate-400 font-normal">
                  (استعراض رسالة المبرمجين التوضيحية)
                </p>
              </div>
            </button>
          </div>
        ) : (
          /* Response State */
          <div className="glass-panel-elevated p-6 sm:p-8 rounded-2xl max-w-lg mx-auto shadow-2xl animate-fadeIn space-y-5 border border-cyan-500/30">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>PERSUASIVE ENGINE // TEAM MESSAGE</span>
            </div>

            <p className="text-sm font-medium text-slate-200 leading-relaxed text-right">
              لقد تم إعداد هذا البحث بطريقة تفاعلية تساعد على فهم الخوارزميات بشكل أسرع وأكثر متعة، ونأمل بصدق أن تمنحنا دقيقة واحدة للاطلاع على المحاكيات التي طورناها!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onGoToResearch}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>عرض البحث</span>
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onBack}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-white/[0.08] transition-colors flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                <span>رجوع للترحيب</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={onGoToResearch}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
          >
            <span>← عرض البحث التفاعلي مباشرة</span>
          </button>
        </div>
      </div>

      <div className="w-full text-center z-10 pt-4 border-t border-white/[0.06]">
        <p className="text-xs text-slate-500 font-mono">
          GATEWAY // CONFIRMATION_HANDSHAKE: STATUS_OK
        </p>
      </div>
    </div>
  );
};
