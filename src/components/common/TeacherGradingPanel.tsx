import React, { useState, useEffect } from 'react';
import {
  Award,
  X,
  School,
  UserCheck,
  Save,
  Lightbulb,
  FileText,
  Send,
  Copy,
  Check,
  Phone,
  Eye,
} from 'lucide-react';
import { PROJECT_INFO, TEAM_MEMBERS } from '../../data/researchData';
import { saveEvaluationToSupabase } from '../../services/supabase';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DESTINATION_PHONE = '218915210782';
const DISPLAY_PHONE = '+218 91 521 0782';

export const TeacherGradingPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  // الحقول فارغة تماماً للأستاذ
  const [grade, setGrade] = useState<string>('');
  const [maxGrade, setMaxGrade] = useState<string>('100');
  const [notes, setNotes] = useState<string>('');
  const [learningAdvice, setLearningAdvice] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // تحميل البيانات فقط إذا تم حفظها سابقاً
  useEffect(() => {
    try {
      const savedGrade = localStorage.getItem('teacher_grade');
      const savedMax = localStorage.getItem('teacher_max_grade');
      const savedNotes = localStorage.getItem('teacher_notes');
      const savedAdvice = localStorage.getItem('teacher_learning_advice');

      if (savedGrade !== null) setGrade(savedGrade);
      if (savedMax !== null) setMaxGrade(savedMax);
      if (savedNotes !== null) setNotes(savedNotes);
      if (savedAdvice !== null) setLearningAdvice(savedAdvice);
    } catch {
      // ignore
    }
  }, []);

  const saveToStorage = () => {
    try {
      localStorage.setItem('teacher_grade', grade);
      localStorage.setItem('teacher_max_grade', maxGrade);
      localStorage.setItem('teacher_notes', notes);
      localStorage.setItem('teacher_learning_advice', learningAdvice);
    } catch {
      // ignore
    }

    // حفظ في قاعدة بيانات Supabase أيضاً
    saveEvaluationToSupabase({
      grade,
      maxGrade,
      notes,
      learningAdvice,
    }).catch((e) => console.warn('Supabase background sync note:', e));
  };

  const handleSave = () => {
    saveToStorage();
    setIsSaved(true);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setTimeout(() => setIsSaved(false), 2500);
  };

  // توليد التقرير المنسق والمنظم الشامل مع التحية وكل التفاصيل
  const generateFormattedReport = (): string => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-LY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('ar-LY', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const gradeText = grade ? `${grade} من ${maxGrade || '100'}` : 'لم تُحدد بعد';
    const notesText = notes.trim() ? notes : 'مشروع ممتاز ومجهود استثنائي يستحق الإشادة.';
    const adviceText = learningAdvice.trim()
      ? learningAdvice
      : 'الاستمرار في التعلم والتعمق في هندسة البرمجيات والذكاء الاصطناعي.';

    const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://aistudio.google.com';

    return `🌟 *تقرير اعتماد تقييم مشروع الخوارزميات* 🌟
🏛️ *المؤسسة التعليمية:* ${PROJECT_INFO.school}
👨‍🏫 *المعلم المشرف:* ${PROJECT_INFO.teacher}
━━━━━━━━━━━━━━━━━━━
السلام عليكم ورحمة الله وبركاته،
تحية طيبة مباركة ملؤها التقدير والاحترام،

يسرنا إحاطتكم رسمياً باعتماد تقييم مشروع:
📌 *${PROJECT_INFO.title} - ${PROJECT_INFO.subtitle}*

📊 *الدرجة الممنوحة للمشروع:*
⭐ *[ ${gradeText} ]*

📝 *ملاحظات الأستاذ ${PROJECT_INFO.teacher} حول المشروع:*
"${notesText}"

💡 *نصائح وتوجيهات للتعليم والتطوير المستقبلي:*
"${adviceText}"

👥 *فريق العمل والهندسة البرمجية (الطلاب):*
1. 🔹 *${TEAM_MEMBERS[0]?.name || 'هاشم أبوبكر بليبلو'}* (${TEAM_MEMBERS[0]?.role || 'المخطط الرئيسي'})
2. 🔹 *${TEAM_MEMBERS[1]?.name || 'سالم محمود أبوغنيمة'}* (${TEAM_MEMBERS[1]?.role || 'مُعد السكربت والشرح'})
3. 🔹 *${TEAM_MEMBERS[2]?.name || 'محمد وحيد الخمائسي'}* (${TEAM_MEMBERS[2]?.role || 'المبرمج والمطور الأساسي'})

━━━━━━━━━━━━━━━━━━━
📅 *تاريخ الاعتماد:* ${dateStr} - ${timeStr}
🌐 *رابط معاينة المنصة:* ${appUrl}

"${PROJECT_INFO.appreciation}"
مع أطيب التمنيات لطلابنا بالتفوق والإبداع المستمر.`;
  };

  // إرسال التقرير الكامل إلى الرقم 218915210782 عبر WhatsApp
  const handleSendToWhatsApp = () => {
    saveToStorage();
    const reportMessage = generateFormattedReport();
    const encoded = encodeURIComponent(reportMessage);
    const whatsappUrl = `https://wa.me/${DESTINATION_PHONE}?text=${encoded}`;

    // نسخ إلى الحافظة لضمان وصولها في جميع الحالات
    try {
      navigator.clipboard.writeText(reportMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      // ignore
    }

    try {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    // فتح WhatsApp بالرابط المباشر
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // نسخ التقرير فقط
  const handleCopyReport = () => {
    saveToStorage();
    const reportMessage = generateFormattedReport();
    try {
      navigator.clipboard.writeText(reportMessage);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleClearAll = () => {
    setGrade('');
    setMaxGrade('100');
    setNotes('');
    setLearningAdvice('');
    try {
      localStorage.removeItem('teacher_grade');
      localStorage.removeItem('teacher_max_grade');
      localStorage.removeItem('teacher_notes');
      localStorage.removeItem('teacher_learning_advice');
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#061126] border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] text-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header بسيط وأنيق */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-right">
              <h3 className="text-sm sm:text-base font-black text-white">
                رصد الدرجة وإرسال التقرير للأستاذ حمزة
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {PROJECT_INFO.school}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* شريط الرقم المعتمد للإرسال */}
        <div className="px-4 py-2 bg-emerald-950/50 border-b border-emerald-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>رقم الإرسال المعتمد:</span>
            <strong className="font-mono text-white text-xs dir-ltr">{DISPLAY_PHONE}</strong>
          </div>
          <span className="font-mono text-[10px] text-emerald-400/80 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-700/40">
            WhatsApp Direct
          </span>
        </div>

        {/* Form Body: الدرجة، الملاحظة، نصائح للتعليم والتطوير (فارغة) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-right">
          {/* شريط الإشراف */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <School className="w-4 h-4 text-cyan-400" />
              <span>{PROJECT_INFO.school}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>المعلم المشرف: <strong className="text-white">{PROJECT_INFO.teacher}</strong></span>
            </div>
          </div>

          {/* 1. حقل الدرجة - فارغ */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>الدرجة الممنوحة للمشروع:</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">اكتب أي رقم</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="اكتب الدرجة هنا (مثلاً: 100 أو 20)..."
                  className="w-full bg-black/70 border-2 border-cyan-400/50 rounded-xl px-4 py-2.5 text-center font-mono font-black text-2xl text-cyan-300 placeholder:text-slate-600 placeholder:text-sm placeholder:font-normal focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <span className="text-lg font-mono text-slate-500 font-bold">من</span>

              <div className="w-24 sm:w-28">
                <input
                  type="text"
                  value={maxGrade}
                  onChange={(e) => setMaxGrade(e.target.value)}
                  placeholder="من كم"
                  className="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-3 py-2.5 text-center font-mono font-bold text-base text-slate-200 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. ملاحظة الأستاذ حول المشروع - فارغ */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <label className="text-xs font-black text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>ملاحظة الأستاذ حول المشروع:</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="اكتب ملاحظاتك وتوجيهاتك للطلاب هنا..."
              className="w-full bg-black/60 border border-white/[0.08] rounded-xl p-3 text-xs leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          {/* 3. نصائح للتعليم والتطوير - فارغ */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <label className="text-xs font-black text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>نصائح للتعليم والتطوير المستقبلي:</span>
            </label>
            <textarea
              rows={3}
              value={learningAdvice}
              onChange={(e) => setLearningAdvice(e.target.value)}
              placeholder="اكتب نصائحك وتوجيهاتك للطلاب في دراسة البرمجة والخوارزميات..."
              className="w-full bg-black/60 border border-white/[0.08] rounded-xl p-3 text-xs leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-emerald-400 focus:outline-none resize-none"
            />
          </div>

          {/* زر معاينة نص التقرير الكامل */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPreview ? 'إخفاء معاينة نص الرسالة' : 'معاينة نص الرسالة المنظمة قبل الإرسال'}</span>
            </button>

            {showPreview && (
              <pre className="mt-2 p-3 rounded-xl bg-black/80 border border-cyan-900/50 text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto ltr text-right select-all">
                {generateFormattedReport()}
              </pre>
            )}
          </div>
        </div>

        {/* Modal Footer مع زر الإرسال المباشر للرقم 218915210782 */}
        <div className="p-4 border-t border-white/[0.08] bg-slate-950/95 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* الأزرار الثانوية: مسح الحقول ونسخ التقرير */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-300 text-xs transition-all"
              title="تفريغ الحقول"
            >
              مسح
            </button>

            <button
              type="button"
              onClick={handleCopyReport}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-white/[0.08] transition-all"
              title="نسخ نص التقرير المنسق إلى الحافظة"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-[#14F195]" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{isCopied ? 'تم النسخ!' : 'نسخ التقرير'}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/30 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? 'تم الحفظ ✓' : 'حفظ فقط'}</span>
            </button>
          </div>

          {/* الزر الرئيسي الجبار: إرسال التقرير والدرجة إلى 218915210782 عبر WhatsApp */}
          <div className="w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 border border-emerald-300/40"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>إرسال التقرير والدرجة إلى {DISPLAY_PHONE} عبر WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
