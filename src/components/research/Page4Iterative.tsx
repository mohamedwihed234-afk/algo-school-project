import React, { useState, useEffect, useRef } from 'react';
import { ITERATIVE_STEPS } from '../../data/researchData';
import { FlowchartElement, SimulatorSpeed } from '../../types';
import { FlowchartNodeModal } from '../common/FlowchartNodeModal';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Clock,
  RotateCw,
  Layers,
  Cpu,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onNext?: () => void;
  onPrev: () => void;
}

export const Page4Iterative: React.FC<Props> = ({ onNext: _onNext, onPrev: _onPrev }) => {
  const [selectedNode, setSelectedNode] = useState<FlowchartElement | null>(null);

  // Simulator state
  const [currentX, setCurrentX] = useState<number>(4);
  const [iteration, setIteration] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SimulatorSpeed>(1);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const loopStateRef = useRef<{ x: number; iter: number; phase: number }>({
    x: 4,
    iter: 0,
    phase: 0,
  });

  const stepCycle = () => {
    const s = loopStateRef.current;
    const ts = new Date().toLocaleTimeString('ar-EG');

    if (s.phase === 0) {
      s.x = 4;
      s.iter = 0;
      setCurrentX(4);
      setIteration(0);
      setCurrentStep(1);
      setTerminalLogs((prev) => [...prev, `[${ts}] ⚡ البداية: إسناد القيمة الابتدائية للعداد (X = 4)`]);
      s.phase = 1;
    } else if (s.phase === 1) {
      s.iter++;
      setIteration(s.iter);
      setCurrentStep(2);
      setTerminalLogs((prev) => [
        ...prev,
        `[${ts}] 🖨️ [الدورة ${s.iter}]: طباعة القيمة الحالية للعداد X = ${s.x}`,
      ]);
      s.phase = 2;
    } else if (s.phase === 2) {
      s.x = s.x - 1;
      setCurrentX(s.x);
      setCurrentStep(3);
      setTerminalLogs((prev) => [
        ...prev,
        `[${ts}] ➖ [الدورة ${s.iter}]: إنقاص العداد (X = X - 1) لتصبح X = ${s.x}`,
      ]);
      s.phase = 3;
    } else if (s.phase === 3) {
      setCurrentStep(4);
      const isGreater = s.x > 0;
      setTerminalLogs((prev) => [
        ...prev,
        `[${ts}] ❓ فحص شرط الاستمرار: هل (${s.x} > 0) ؟ ← ${isGreater ? 'نعم (تكرار الحلقة)' : 'لا (توقف الخوارزمية)'}`,
      ]);

      if (isGreater) {
        s.phase = 1;
      } else {
        setCurrentStep(6);
        setIsFinished(true);
        setIsPlaying(false);
        setTerminalLogs((prev) => [
          ...prev,
          `[${ts}] 🛑 تحقق شرط التوقف (X = 0). اكتملت كافة دورات التكرار بنجاح!`,
        ]);
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
        } catch {
          // ignore
        }
      }
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 1000 / speed;

    timerRef.current = setInterval(() => {
      stepCycle();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed]);

  const handleStartPlay = () => {
    if (isFinished || currentStep === -1) {
      loopStateRef.current = { x: 4, iter: 0, phase: 0 };
      setTerminalLogs([]);
      setIsFinished(false);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleStepForward = () => {
    setIsPlaying(false);
    if (!isFinished) {
      stepCycle();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    loopStateRef.current = { x: 4, iter: 0, phase: 0 };
    setCurrentX(4);
    setIteration(0);
    setCurrentStep(-1);
    setIsFinished(false);
    setTerminalLogs([]);
  };

  return (
    <article className="space-y-8 animate-fadeIn text-right font-sans max-w-4xl mx-auto">
      {/* 1. Article Header */}
      <header className="border-b border-white/[0.08] pb-5 space-y-2">
        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
          <RotateCw className="w-4 h-4" />
          <span>الوحدة الرابعة · النمط التكراري وحلقات الدوران</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          الخوارزمية التكرارية (Iterative Loop Algorithm)
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          قوة الحواسيب الجبارة تكمن في قدرتها على تكرار تنفيذ الأوامر ملايين المرات بسرعة فائقة دون ملل أو خطأ، من خلال حلقات التكرار المحكومة بشرط توقف صارم.
        </p>
      </header>

      {/* 2. الشرح المنهجي لحلقة العد التنازلي */}
      <section className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <span>تحليل المسألة المنهجية: حلقة العد التنازلي من X = 4 حتى X &gt; 0</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          تبدأ الخوارزمية بتعيين قيمة أولية للمتغير العداد <strong>X = 4</strong>. ثم تدخل في دورة تطبع فيها قيمة X وتُنقص منها 1 في كل مرة ($X = X - 1$). ثم تفحص شرط الاستمرار: <strong>هل X &gt; 0؟</strong> طالما أن الجواب (نعم) تعود الخوارزمية لتكرار الطباعة والإنقاص. وعندما تصبح X مساوية للصفر، يتحقق شرط التوقف وتخرج الخوارزمية بنجاح.
        </p>
      </section>

      {/* 3. المختبر التفاعلي المتكامل */}
      <section className="p-5 sm:p-7 rounded-3xl bg-slate-950/70 border border-purple-500/25 space-y-6">
        {/* شريط التحكم */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">تشغيل حلقة الدوران خطوة بخطوة:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300"
              title="إعادة التعيين"
            >
              <RotateCcw className="w-4 h-4" />
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>بدء دورات التكرار</span>
              </button>
            )}

            <button
              onClick={handleStepForward}
              disabled={isFinished}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-white/[0.08] text-slate-300"
              title="دورة للأمام"
            >
              <SkipForward className="w-4 h-4" />
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

        {/* عدادات الذاكرة مدمجة بنعومة */}
        <div className="flex items-center justify-around p-4 rounded-2xl bg-black/40 border border-white/[0.06] text-center font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">القيمة الابتدائية</span>
            <span className="text-sm font-bold text-slate-200">X = 4</span>
          </div>

          <div className="border-x border-white/[0.08] px-6">
            <span className="text-[10px] text-cyan-400 block mb-0.5">القيمة اللحظية للعداد X</span>
            <span className="text-xl font-black text-cyan-300">{currentX}</span>
          </div>

          <div>
            <span className="text-[10px] text-purple-400 block mb-0.5">رقم الدورة الحالية</span>
            <span className="text-xl font-black text-purple-300">{iteration} / 4</span>
          </div>
        </div>

        {/* مخطط حلقة التدفق التكراري */}
        <div className="space-y-2 py-2 max-w-md mx-auto w-full">
          <button
            onClick={() => setSelectedNode(ITERATIVE_STEPS[0])}
            className="w-full py-2 px-3 rounded-2xl text-xs font-bold border bg-slate-900 border-white/[0.08] text-slate-200"
          >
            ابدأ (تهيئة حلقة التكرار)
          </button>

          <div className="w-0.5 h-2.5 bg-slate-700 mx-auto" />

          <button
            onClick={() => setSelectedNode(ITERATIVE_STEPS[1])}
            className={`w-full py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === 1
                ? 'bg-cyan-500 text-slate-950 border-white shadow-lg scale-105'
                : 'bg-slate-900 border-white/[0.08] text-slate-200'
            }`}
          >
            تعيين العداد: X = 4
          </button>

          <div className="w-0.5 h-2.5 bg-slate-700 mx-auto" />

          <button
            onClick={() => setSelectedNode(ITERATIVE_STEPS[2])}
            className={`w-full py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === 2
                ? 'bg-blue-500 text-white border-white shadow-lg scale-105'
                : 'bg-slate-900 border-white/[0.08] text-slate-200'
            }`}
          >
            اطبع قيمة X في هذه الدورة
          </button>

          <div className="w-0.5 h-2.5 bg-slate-700 mx-auto" />

          <button
            onClick={() => setSelectedNode(ITERATIVE_STEPS[3])}
            className={`w-full py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === 3
                ? 'bg-purple-500 text-white border-white shadow-lg scale-105'
                : 'bg-slate-900 border-white/[0.08] text-slate-200'
            }`}
          >
            تعديل العداد: X = X - 1
          </button>

          <div className="w-0.5 h-2.5 bg-slate-700 mx-auto" />

          {/* فحص الشرط المعين */}
          <button
            onClick={() => setSelectedNode(ITERATIVE_STEPS[4])}
            className={`w-full py-2.5 px-3 rounded-2xl text-xs font-extrabold border-2 transition-all ${
              currentStep === 4
                ? 'bg-amber-500 text-slate-950 border-white shadow-[0_0_15px_#f59e0b] scale-105'
                : 'bg-slate-900 border-amber-400/60 text-amber-200'
            }`}
          >
            <span>هل X &gt; 0 ؟</span>
            <span className="block text-[10px] font-mono text-amber-300 font-normal mt-0.5">
              (نعم: دورة جديدة / لا: توقف الخوارزمية)
            </span>
          </button>

          <div className="w-0.5 h-2.5 bg-slate-700 mx-auto" />

          <button
            onClick={() => setSelectedNode(ITERATIVE_STEPS[6])}
            className={`w-full py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
              currentStep === 6
                ? 'bg-cyan-500 text-slate-950 border-white shadow-lg'
                : 'bg-slate-900 border-white/[0.08] text-slate-200'
            }`}
          >
            توقف (نهاية الخوارزمية بنجاح)
          </button>
        </div>

        {/* سجل الأحداث المدمج */}
        <div className="p-3.5 rounded-2xl bg-black/70 border border-white/[0.06] text-xs font-mono space-y-1">
          <span className="text-[10px] text-purple-400 font-bold block mb-1">
            سجل دورات المعالجة (Iteration Log):
          </span>
          {terminalLogs.length === 0 ? (
            <p className="text-slate-600 italic">
              اضغط &quot;بدء دورات التكرار&quot; لمشاهدة العد التنازلي التلقائي...
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
          <Cpu className="w-5 h-5 text-purple-400" />
          <span>القيمة الهندسية للخوارزميات التكرارية</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          تعتبر الحلقات التكرارية هي العمود الفقري لمعالجة البيانات الضخمة (Big Data) ومحركات ألعاب الفيديو والذكاء الاصطناعي. فبدلاً من كتابة مليون سطر كود لطباعة مليون رقم، نكتب سطرين فقط داخل حلقة تكرارية تقوم بالمهمة كاملة خلال أجزاء من الثانية.
        </p>
      </section>

      <FlowchartNodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </article>
  );
};
