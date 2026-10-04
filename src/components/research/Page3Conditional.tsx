import React, { useState, useEffect, useRef } from 'react';
import { CONDITIONAL_STEPS } from '../../data/researchData';
import { FlowchartElement, SimulatorSpeed } from '../../types';
import { FlowchartNodeModal } from '../common/FlowchartNodeModal';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Clock,
  GitFork,
  ShieldAlert,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Page3Conditional: React.FC<Props> = ({ onNext: _onNext, onPrev: _onPrev }) => {
  const [selectedNode, setSelectedNode] = useState<FlowchartElement | null>(null);

  // Simulator state
  const [temperature, setTemperature] = useState<number>(35);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulatorSpeed>(1);
  const [activeBranch, setActiveBranch] = useState<'yes' | 'no' | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const executeStep = (stepIdx: number) => {
    setCurrentStep(stepIdx);
    const ts = new Date().toLocaleTimeString('ar-EG');

    switch (stepIdx) {
      case 0:
        setTerminalLogs((prev) => [...prev, `[${ts}] ⚡ البداية: تشغيل منظومة مراقبة حساس الحرارة.`]);
        break;
      case 1:
        setTerminalLogs((prev) => [...prev, `[${ts}] 🌡️ إدخال: قراءة درجة الحرارة الآنية = ${temperature}°C`]);
        break;
      case 2: {
        const isLess = temperature < 40;
        setTerminalLogs((prev) => [
          ...prev,
          `[${ts}] ❓ اتخاذ قرار: فحص الشرط (هل ${temperature} < 40 ؟) ← ${isLess ? 'نعم (تحقق الشرط)' : 'لا (الشرط غير محقق)'}`,
        ]);
        break;
      }
      case 3:
        if (temperature < 40) {
          setActiveBranch('yes');
          setTerminalLogs((prev) => [
            ...prev,
            `[${ts}] 🚨 [مسار نعم]: إطلاق صافرة الإنذار وإيقاف تشغيل الآليات فوراً!`,
          ]);
        } else {
          setActiveBranch('no');
          setTerminalLogs((prev) => [
            ...prev,
            `[${ts}] 🔄 [مسار لا]: الحرارة طبيعية، العودة لقراءة الحساس مرة أخرى...`,
          ]);
        }
        break;
      case 4:
        if (temperature < 40) {
          setTerminalLogs((prev) => [...prev, `[${ts}] 🛑 توقف: تم تأمين المنظومة وإنهاء التدفق.`]);
          setIsPlaying(false);
          try {
            confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
          } catch {
            // ignore
          }
        } else {
          setTerminalLogs((prev) => [...prev, `[${ts}] 🔁 مستمر: استمرار حلقة المراقبة الدورية.`]);
          setIsPlaying(false);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 1200 / speed;

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= 5) {
          setIsPlaying(false);
          return prev;
        }
        executeStep(next);
        return next;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, temperature]);

  const handleStartPlay = () => {
    if (currentStep >= 4) {
      setCurrentStep(0);
      setTerminalLogs([]);
      setActiveBranch(null);
      executeStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStep < 4) {
      const next = currentStep + 1;
      executeStep(next);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStep > 0) {
      const prev = currentStep - 1;
      executeStep(prev);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setActiveBranch(null);
    setTerminalLogs([]);
  };

  return (
    <article className="space-y-8 animate-fadeIn text-right font-sans max-w-4xl mx-auto">
      {/* 1. Article Header */}
      <header className="border-b border-white/[0.08] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
          <GitFork className="w-4 h-4" />
          <span>الوحدة الثالثة · النمط الشرطي واتخاذ القرار</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          الخوارزمية الشرطية والتفرعية (Conditional Branching)
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          جوهر الذكاء في البرمجيات؛ حيث لا ينفذ الحاسوب الأوامر بشكل أعمى، بل يفحص شرطاً منطقياً معيناً ويتخذ قراراً يتفرع بموجبه مسار التنفيذ إلى مسارين مختلفين تماماً (نعم أو لا).
        </p>
      </header>

      {/* 2. الشرح المنهجي لمسألة الحساس والحرارة */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>تحليل المسألة المنهجية: نظام حماية درجات الحرارة الصناعية</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          تقرأ الخوارزمية قيمة درجة الحرارة من مستشعر الحماية. ثم يأتي القرار المنطقي داخل شكل المعين: <strong>&quot;هل درجة الحرارة &lt; 40؟&quot;</strong>. فإذا كان الجواب <strong>(نعم)</strong>، فهذا يعني وجود هبوط غير آمن في درجة الحرارة يستدعي إطلاق صافرة الإنذار وإيقاف الآلات لحمايتها والتوقف. أما إذا كان الجواب <strong>(لا)</strong>، فالنظام يعود تلقائياً لقراءة درجة الحرارة مرة أخرى دون توقف.
        </p>
      </section>

      {/* 3. المختبر التفاعلي المتكامل (غير مقسم إلى مربعات مبعثرة) */}
      <section className="p-5 sm:p-7 rounded-3xl bg-slate-950/70 border border-amber-500/25 space-y-6">
        {/* شريط التحكم */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">تشغيل فحص الشرط والتفرع خطوة بخطوة:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStepBackward}
              disabled={currentStep <= 0}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/[0.08] text-slate-300"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {isPlaying ? (
              <button
                onClick={handlePause}
                className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>إيقاف مؤقت</span>
              </button>
            ) : (
              <button
                onClick={handleStartPlay}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>فحص ومحاكاة المسار</span>
              </button>
            )}

            <button
              onClick={handleStepForward}
              disabled={currentStep >= 4}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/[0.08] text-slate-300"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-white/[0.08] font-mono text-[10px]">
              <Clock className="w-3 h-3 text-amber-400 mr-1" />
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s as SimulatorSpeed)}
                  className={`px-1.5 py-0.5 rounded ${
                    speed === s ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-500'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* زالاق تغيير الحرارة مدمج بنعومة */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">جرّب تغيير قراءة المستشعر لمشاهدة كلا المسارين:</span>
            <span
              className={`font-mono text-sm font-bold px-2.5 py-0.5 rounded-lg ${
                temperature < 40
                  ? 'bg-red-950/80 text-red-300 border border-red-800'
                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
              }`}
            >
              {temperature}°C · {temperature < 40 ? 'أقل من 40 (مسار نعم)' : 'أكبر أو يساوي 40 (مسار لا)'}
            </span>
          </div>

          <input
            type="range"
            min="20"
            max="60"
            disabled={isPlaying}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-amber-400 bg-slate-900 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <button
              onClick={() => setTemperature(30)}
              disabled={isPlaying}
              className="text-amber-300 underline"
            >
              اختبر 30°C (إنذار وإيقاف)
            </button>
            <span className="text-slate-500">العتبة المنطقية: 40°C</span>
            <button
              onClick={() => setTemperature(50)}
              disabled={isPlaying}
              className="text-cyan-300 underline"
            >
              اختبر 50°C (استمرار المراقبة)
            </button>
          </div>
        </div>

        {/* شجرة التدفق الشرطي بصرياً */}
        <div className="space-y-3 py-2 max-w-md mx-auto w-full">
          <button
            onClick={() => setSelectedNode(CONDITIONAL_STEPS[0])}
            className={`w-full py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === 0
                ? 'bg-cyan-500 text-slate-950 border-white shadow-lg'
                : 'bg-slate-900 border-white/[0.08] text-slate-200'
            }`}
          >
            ابدأ (تهيئة نظام المراقبة)
          </button>

          <div className="w-0.5 h-3 bg-slate-700 mx-auto" />

          <button
            onClick={() => setSelectedNode(CONDITIONAL_STEPS[1])}
            className={`w-full py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === 1
                ? 'bg-cyan-500 text-slate-950 border-white shadow-lg'
                : 'bg-slate-900 border-white/[0.08] text-slate-200'
            }`}
          >
            اقرأ درجة الحرارة ({temperature}°C)
          </button>

          <div className="w-0.5 h-3 bg-slate-700 mx-auto" />

          {/* شكل المعين الشرطي */}
          <button
            onClick={() => setSelectedNode(CONDITIONAL_STEPS[2])}
            className={`w-full py-3 px-3 rounded-2xl text-xs font-extrabold border-2 transition-all ${
              currentStep === 2
                ? 'bg-amber-500 text-slate-950 border-white shadow-[0_0_20px_#f59e0b] scale-105'
                : 'bg-slate-900 border-amber-400/60 text-amber-200'
            }`}
          >
            <span>هل درجة الحرارة &lt; 40 ؟</span>
          </button>

          {/* تفرع نعم / لا */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-2xl border border-red-500/30 bg-red-950/20 text-center space-y-1.5">
              <span className="text-[11px] font-bold text-red-400 block">مسار نعم (True)</span>
              <button
                onClick={() => setSelectedNode(CONDITIONAL_STEPS[3])}
                className={`w-full py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                  activeBranch === 'yes' && currentStep >= 3
                    ? 'bg-red-500 text-white border-white animate-pulse shadow-lg'
                    : 'bg-slate-900 border-red-500/40 text-slate-300'
                }`}
              >
                صافرة إنذار وإيقاف الآلات
              </button>
              <span className="text-[10px] text-slate-500 block">↓ نهاية وتوقف</span>
            </div>

            <div className="p-3 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 text-center space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 block">مسار لا (False)</span>
              <button
                onClick={() => setSelectedNode(CONDITIONAL_STEPS[5])}
                className={`w-full py-2 px-2 rounded-xl text-[11px] font-bold border transition-all ${
                  activeBranch === 'no' && currentStep >= 3
                    ? 'bg-cyan-500 text-slate-950 border-white shadow-lg'
                    : 'bg-slate-900 border-cyan-500/40 text-slate-300'
                }`}
              >
                إعادة قراءة الحرارة مجدداً
              </button>
              <span className="text-[10px] text-slate-500 block">↺ دوران مستمر</span>
            </div>
          </div>
        </div>

        {/* سجل الأحداث المدمج */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-white/[0.06] text-xs font-mono space-y-1">
          <span className="text-[10px] text-amber-400 font-bold block mb-1">
            سجل المراقبة والإنذار (Telemetry Log):
          </span>
          {terminalLogs.length === 0 ? (
            <p className="text-slate-600 italic">
              اضغط &quot;فحص ومحاكاة المسار&quot; لمشاهدة القرار المنطقي...
            </p>
          ) : (
            terminalLogs.map((log, i) => (
              <div key={i} className="text-amber-200/90 leading-relaxed">
                {log}
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. الخلاصة العلمية للمنهج */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400" />
          <span>القيمة الهندسية للخوارزميات الشرطية</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          الشرط المنطقي هو الأساس الذي يعتمد عليه الذكاء الاصطناعي، وجدران الحماية، والسيارات ذاتية القيادة. من خلال فحص الشروط، ينتقل الحاسوب من مجرد آلة حاسبة جامدة إلى منظومة حية قادرة على الاستجابة للمتغيرات المحيطة واتخاذ قرارات الأمان الفورية.
        </p>
      </section>

      <FlowchartNodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </article>
  );
};
