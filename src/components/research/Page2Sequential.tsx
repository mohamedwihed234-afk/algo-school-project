import React, { useState, useEffect, useRef } from 'react';
import { SEQUENTIAL_STEPS } from '../../data/researchData';
import { FlowchartElement, SimulatorSpeed } from '../../types';
import { FlowchartNodeModal } from '../common/FlowchartNodeModal';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Clock,
  ArrowDownSquare,
  Sparkles,
  Layers,
  Cpu,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Page2Sequential: React.FC<Props> = ({ onNext: _onNext, onPrev: _onPrev }) => {
  const [selectedNode, setSelectedNode] = useState<FlowchartElement | null>(null);

  // Simulator state
  const [valA, setValA] = useState<number>(6);
  const [valB, setValB] = useState<number>(9);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulatorSpeed>(1);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [resultC, setResultC] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const executeStep = (stepIdx: number) => {
    setCurrentStep(stepIdx);
    const ts = new Date().toLocaleTimeString('ar-EG');

    switch (stepIdx) {
      case 0:
        setTerminalLogs((prev) => [...prev, `[${ts}] ⚡ البداية: تهيئة البرنامج ومسجلات الذاكرة.`]);
        break;
      case 1:
        setTerminalLogs((prev) => [...prev, `[${ts}] 📥 إدخال: قراءة وتسجيل المتغير A = ${valA}`]);
        break;
      case 2:
        setTerminalLogs((prev) => [...prev, `[${ts}] 📥 إدخال: قراءة وتسجيل المتغير B = ${valB}`]);
        break;
      case 3: {
        const res = Number(((valA * valB) / 3).toFixed(2));
        setResultC(res);
        setTerminalLogs((prev) => [
          ...prev,
          `[${ts}] ⚙️ معالجة حسابية: حساب C = (${valA} × ${valB}) / 3 = ${res}`,
        ]);
        break;
      }
      case 4: {
        const res = Number(((valA * valB) / 3).toFixed(2));
        setTerminalLogs((prev) => [...prev, `[${ts}] 🖨️ إخراج: طباعة القيمة الناتجة C = ${res}`]);
        break;
      }
      case 5:
        setTerminalLogs((prev) => [...prev, `[${ts}] 🛑 توقف: اكتمال الأوامر بنجاح وتحرير المعالج.`]);
        setIsPlaying(false);
        try {
          confetti({ particleCount: 45, spread: 65, origin: { y: 0.7 } });
        } catch {
          // ignore
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

    const intervalMs = 1100 / speed;

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= SEQUENTIAL_STEPS.length) {
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
  }, [isPlaying, speed, valA, valB]);

  const handleStartPlay = () => {
    if (currentStep >= SEQUENTIAL_STEPS.length - 1) {
      setCurrentStep(0);
      setTerminalLogs([]);
      executeStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStep < SEQUENTIAL_STEPS.length - 1) {
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
    setTerminalLogs([]);
    setResultC(null);
  };

  return (
    <article className="space-y-8 animate-fadeIn text-right font-sans max-w-4xl mx-auto">
      {/* 1. Article Header: قراءة معلومات واضحة دون مربعات متناثرة */}
      <header className="border-b border-white/[0.08] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <ArrowDownSquare className="w-4 h-4" />
          <span>الوحدة الثانية · النمط التسلسلي المنهجي</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          الخوارزمية التسلسلية (Sequential Algorithm)
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          النمط الخوارزمي الأبسط والأكثر حتمية في علم الحساب؛ حيث تُنفذ التعليمات البرمجية سطراً بسطر في خط مستقيم من البداية إلى النهاية، دون أي قفزات أو تفرعات مشروطة.
        </p>
      </header>

      {/* 2. الشرح المنهجي لمسألة المعادلة */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>تحليل المسألة الحسابية المقررة: حساب قيمة المعادلة C = (A × B) / 3</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          في هذه الخوارزمية، يحتاج البرنامج إلى استقبال عددين من المستخدم (A و B)، ثم تنفذ وحدة الحساب والمنطق (ALU) عملية ضربهما معاً وقسمة الناتج على 3 وتخزينه في المتغير C، ثم طباعة الناتج وإيقاف البرنامج. لا يمكن إجراء الحساب قبل قراءة المدخلات، ولا يمكن الطباعة قبل إتمام الحساب، وهذا جوهر التسلسل.
        </p>
      </section>

      {/* 3. المختبر التفاعلي المندمج في النص (غير مقسم إلى مربعات مبعثرة) */}
      <section className="p-5 sm:p-7 rounded-3xl bg-slate-950/70 border border-cyan-500/25 space-y-6">
        {/* شريط التحكم في المحاكاة */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">تحكم في تشغيل الأوامر خطوة بخطوة:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStepBackward}
              disabled={currentStep <= 0}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/[0.08] text-slate-300"
              title="خطوة سابقة"
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,217,255,0.35)]"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>تشغيل المحاكاة الحية</span>
              </button>
            )}

            <button
              onClick={handleStepForward}
              disabled={currentStep >= SEQUENTIAL_STEPS.length - 1}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/[0.08] text-slate-300"
              title="خطوة تالية"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300"
              title="إعادة التعيين"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-white/[0.08] font-mono text-[10px]">
              <Clock className="w-3 h-3 text-cyan-400 mr-1" />
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s as SimulatorSpeed)}
                  className={`px-1.5 py-0.5 rounded ${
                    speed === s ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-500'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* مدخلات المتغيرات A و B مدمجة بسلاسة */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/[0.06]">
          <div className="text-xs text-slate-300">
            <span className="font-bold text-white block mb-0.5">قيم المدخلات التجريبية:</span>
            <span>عدّل قيم A و B وشاهد كيف يعيد المعالج حساب المعادلة فورياً.</span>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-cyan-300 font-bold">A =</span>
              <input
                type="number"
                disabled={isPlaying}
                value={valA}
                onChange={(e) => setValA(Number(e.target.value) || 0)}
                className="w-16 bg-slate-900 border border-white/[0.1] rounded-lg px-2 py-1 text-xs text-center font-bold text-white focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-cyan-300 font-bold">B =</span>
              <input
                type="number"
                disabled={isPlaying}
                value={valB}
                onChange={(e) => setValB(Number(e.target.value) || 0)}
                className="w-16 bg-slate-900 border border-white/[0.1] rounded-lg px-2 py-1 text-xs text-center font-bold text-white focus:border-cyan-400"
              />
            </div>

            <div className="px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-xs font-bold text-[#14F195]">
              الناتج C = {resultC !== null ? resultC : '--'}
            </div>
          </div>
        </div>

        {/* مسار خريطة التدفق التسلسلي بصرياً */}
        <div className="space-y-2 py-2">
          <span className="text-xs font-mono text-slate-400 block mb-3">
            مسار خريطة التدفق (اضغط على أي خطوة للاطلاع على دورها البرمجي):
          </span>

          <div className="flex flex-col items-center space-y-2 max-w-md mx-auto w-full">
            {SEQUENTIAL_STEPS.map((step, idx) => {
              const isActive = currentStep === idx;
              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setSelectedNode(step)}
                    className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold transition-all text-center border ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-white shadow-[0_0_25px_rgba(0,217,255,0.45)] scale-105'
                        : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-white/[0.08]'
                    }`}
                  >
                    <span>{step.label}</span>
                    <span className="block text-[10px] font-mono text-cyan-300/80 font-normal">
                      {step.subLabel}
                    </span>
                  </button>

                  {idx < SEQUENTIAL_STEPS.length - 1 && (
                    <div
                      className={`w-0.5 h-3 transition-colors ${
                        currentStep > idx ? 'bg-cyan-400' : 'bg-slate-700'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* سجل المعالجة اللحظي مدمج أسفل الخريطة */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-white/[0.06] text-xs font-mono space-y-1">
          <span className="text-[10px] text-cyan-400 font-bold block mb-1">
            سجل التنفيذ اللحظي (Execution Output):
          </span>
          {terminalLogs.length === 0 ? (
            <p className="text-slate-600 italic">
              اضغط &quot;تشغيل المحاكاة الحية&quot; لمتابعة حركة البيانات بين مسجلات الذاكرة...
            </p>
          ) : (
            terminalLogs.map((log, i) => (
              <div key={i} className="text-cyan-300/90 leading-relaxed">
                {log}
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. الخلاصة العلمية للمنهج */}
      <section className="space-y-3 pt-2">
        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span>القيمة الهندسية للخوارزميات التسلسلية</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          تتميز الخوارزميات التسلسلية بزمن تنفيذ ثابت وبسيط جداً $O(1)$؛ لأن كل خطوة تُنفذ مرة واحدة فقط وبطريقة حتمية مطلقة (Deterministic). وهذا يجعلها النواة الأساسية التي تُبنى عليها العمليات المعقدة داخل وحدات المعالجة المركزية، وحساب الفواتير المالية، وبروتوكولات التشفير التي تتطلب مساراً صارماً لا يحتمل الخطأ.
        </p>
      </section>

      <FlowchartNodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </article>
  );
};
