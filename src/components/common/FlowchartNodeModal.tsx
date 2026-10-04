import React from 'react';
import { FlowchartElement } from '../../types';
import { X, Code, Info, CheckCircle2 } from 'lucide-react';

interface Props {
  node: FlowchartElement | null;
  onClose: () => void;
}

export const FlowchartNodeModal: React.FC<Props> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0e172e] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-700/60 pb-4 mb-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>{node.typeLabel}</span>
              {node.subLabel && (
                <span className="text-slate-400 font-mono text-[11px] ltr">
                  ({node.subLabel})
                </span>
              )}
            </div>
            <h3 id="modal-title" className="text-xl font-bold text-white flex items-center gap-2">
              {node.label}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-sm leading-relaxed">
          {/* Explanation */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5">
            <h4 className="text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>الشرح والوظيفة المنطقية</span>
            </h4>
            <p className="text-slate-200">{node.explanation}</p>
          </div>

          {/* Importance */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5">
            <h4 className="text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>أهمية هذا العنصر في الخوارزمية</span>
            </h4>
            <p className="text-slate-300">{node.importance}</p>
          </div>

          {/* Code representation */}
          {node.exampleCode && (
            <div className="bg-black/60 border border-cyan-900/40 rounded-xl p-3.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2 border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Code className="w-3.5 h-3.5" />
                  <span>التمثيل البرمجي المقابل</span>
                </span>
                <span className="text-[10px] text-slate-500">Pseudocode / JS</span>
              </div>
              <pre className="text-cyan-200/90 whitespace-pre-wrap ltr font-mono text-left direction-ltr">
                {node.exampleCode}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.02]"
          >
            فهمت الشرح، متابعة الخريطة
          </button>
        </div>
      </div>
    </div>
  );
};
