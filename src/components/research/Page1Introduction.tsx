import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Cpu,
  Layers,
  CheckCircle2,
  GitFork,
  RotateCw,
  ArrowDownSquare,
  Sparkles,
} from 'lucide-react';

interface Props {
  onNext: () => void;
}

export const Page1Introduction: React.FC<Props> = ({ onNext }) => {
  return (
    <article className="space-y-8 animate-fadeIn text-right font-sans max-w-4xl mx-auto">
      {/* 1. Article Header: أساسيات الخوارزمية */}
      <header className="border-b border-white/[0.08] pb-6 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
          <BookOpen className="w-4 h-4" />
          <span>الوحدة الأولى · المنهاج الدراسي لعلوم الحاسوب</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          أساسيات الخوارزميات
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          المدخل المنهجي الشامل لفهم التفكير المنطقي، وهندسة الأوامر الحاسوبية، والتحول من المسائل الحياتية إلى برامج تنفيذية ذكية.
        </p>
      </header>

      {/* 2. Reading Section 1: ما هي الخوارزمية؟ */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>1. المفهوم المنهجي للخوارزمية</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          الخوارزمية هي <strong className="text-white">مجموعة من الخطوات الرياضية والمنطقية المتسلسلة والمحددة بدقة</strong>، تُكتب لحل مشكلة معينة أو أداء مهمة حاسوبية محددة. سُميت بهذا الاسم نسبةً إلى عالم الرياضيات المسلم <strong>محمد بن موسى الخوارزمي</strong> الذي أسس قواعد الجبر والحساب الإجرائي في القرن التاسع الميلادي، وأصبحت أفكاره هي حجر الزاوية الذي يقوم عليه كل حاسوب وهاتف ذكي اليوم.
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          لكي نُطلق على أي خطوات اسم &quot;خوارزمية معتمدة&quot;، يجب أن تبدأ بمدخلات معروفة (Inputs)، وتمر بمراحل معالجة محددة لا تقبل الشك (Processing)، وتصل حتماً إلى نتائج واضحة ومخرجات صحيحة (Outputs) بعد عدد منتهٍ من الخطوات.
        </p>
      </section>

      {/* 3. Reading Section 2: طرق التعبير عن الخوارزمية (المنهج الدراسي) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>2. طرق تمثيل الخوارزمية في المنهج الدراسي</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          يتعلم الطالب في المنهج طريقتين أساسيتين لصياغة وتوثيق الخوارزميات قبل تحويلها إلى لغة برمجية فعلية:
        </p>

        <div className="space-y-3 pr-2">
          <div className="border-r-2 border-cyan-400 pr-4 py-1">
            <h3 className="text-sm sm:text-base font-bold text-white mb-1">
              أ. الشفرة الوصفية أو الكود الزائف (Pseudocode):
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              كتابة الخطوات بلغة بشرية مفهومة (مثل العربية أو الإنجليزية) تجمع بين التعبير البسيط والصيغ البرمجية المنطقية دون التقيد الصارم بقواعد لغة برمجة بعينها.
            </p>
          </div>

          <div className="border-r-2 border-[#14F195] pr-4 py-1">
            <h3 className="text-sm sm:text-base font-bold text-white mb-1">
              ب. خرائط التدفق (Flowcharts):
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تمثيل بياني هندسي يوضح مسار تدفق البيانات والعمليات باستخدام أشكال هندسية معيارية معتمدة دولياً:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
              <li><strong>الشكل البيضاوي (Oval):</strong> لتحديد نقطتي البداية والنهاية.</li>
              <li><strong>متوازي الأضلاع (Parallelogram):</strong> لعمليات إدخال البيانات وقراءة المدخلات وطباعة المخرجات.</li>
              <li><strong>المستطيل (Rectangle):</strong> للعمليات الحسابية والمعالجة المنطقية.</li>
              <li><strong>المعين (Diamond):</strong> لاتخاذ القرار وفحص الشروط المنطقية (تفرع نعم / لا).</li>
              <li><strong>الأسهم وخطوط الانسياب (Flowlines):</strong> لتحديد اتجاه التنفيذ بدقة.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Reading Section 3: الأنماط الثلاثة للخوارزميات المقررة في المنهج */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span>3. الأنماط الأساسية الثلاثة للخوارزميات</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          تنقسم كافة الخوارزميات في المنهاج الدراسي وعالم البرمجة إلى ثلاثة هياكل بنائية أساسية لا يخرج عنها أي برنامج حاسوبي:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <ArrowDownSquare className="w-4 h-4 text-cyan-400" />
              <span>النمط الأول: الخوارزميات التسلسلية (Sequential Algorithms)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تسير فيها التعليمات خطوة بخطوة بالترتيب من الأعلى إلى الأسفل دون تفرع أو تكرار. مثل خوارزمية حساب المعادلة: قراءة المدخلات، إجراء الضرب والقسمة، ثم طباعة الناتج النهائي والتوقف.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <GitFork className="w-4 h-4 text-amber-400" />
              <span>النمط الثاني: الخوارزميات الشرطية والتفرعية (Conditional / Branching)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تحتوي على قرار منطقي (شرط)؛ بناءً على صحة هذا الشرط (نعم أم لا) يختار المعالج مساراً مختلفاً لتنفيذه. مثل فحص درجة الحرارة: إذا كانت أقل من 40 نطلق الإنذار ونوقف الآلات، وإلا نواصل القراءة.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <RotateCw className="w-4 h-4 text-purple-400" />
              <span>النمط الثالث: الخوارزميات التكرارية وحلقات الدوران (Iterative / Loops)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تُستخدم لتكرار تنفيذ كتلة من الأوامر عدة مرات طالما أن شرط الاستمرار محقق، مع وجود عداد يتغير في كل دورة ليضمن الوصول لنقطة التوقف وتفادي الحلقات اللانهائية. مثل حلقة العد التنازلي من 4 إلى 0.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Reading Section 4: مصفوفة المقارنة المنهجية */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>4. المقارنة المنهجية الشاملة بين الأنماط الثلاثة</span>
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-slate-950/70 p-1">
          <table className="w-full text-right text-xs border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono">
                <th className="py-2.5 px-3">النمط</th>
                <th className="py-2.5 px-3">طبيعة المسار</th>
                <th className="py-2.5 px-3">عنصر التحكم الأساسي</th>
                <th className="py-2.5 px-3">مثال تطبيقي من المنهج</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-200">
              <tr>
                <td className="py-3 px-3 font-bold text-cyan-300">التسلسلية</td>
                <td className="py-3 px-3">خط مستقيم متتابع</td>
                <td className="py-3 px-3">ترتيب كتابة الأوامر</td>
                <td className="py-3 px-3">حساب مساحة، معادلة C = (A × B) / 3</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-amber-300">الشرطية</td>
                <td className="py-3 px-3">تفرع شجري (مساران أو أكثر)</td>
                <td className="py-3 px-3">الشرط المنطقي في شكل المعين</td>
                <td className="py-3 px-3">ناجح / راسب، إنذار درجة الحرارة &lt; 40</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-purple-300">التكرارية</td>
                <td className="py-3 px-3">دوران حلقي يعود للبداية</td>
                <td className="py-3 px-3">العداد وشرط إنهاء الحلقة</td>
                <td className="py-3 px-3">طباعة الأعداد، حلقة العد التنازلي X = X - 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Launch CTA to Sequential Simulator */}
      <footer className="pt-4">
        <button
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-sm sm:text-base shadow-[0_0_25px_rgba(0,217,255,0.3)] transition-all flex items-center justify-between hover:scale-[1.01] active:scale-98 border border-cyan-400/40"
        >
          <span>الانتقال لقراءة ومحاكاة الخوارزمية التسلسلية</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </footer>
    </article>
  );
};
