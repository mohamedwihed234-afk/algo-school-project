import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import {
  X,
  Search,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  ArrowDownSquare,
  GitFork,
  RotateCw,
  Network,
  Users,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { PROJECT_INFO } from '../../data/researchData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  canNext?: boolean;
  canPrev?: boolean;
}

interface CommandItem {
  id: PageId;
  title: string;
  category: string;
  badge: string;
  shortcut: string;
  icon: React.ReactNode;
}

export const QuickNavDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Handle keyboard ESC and shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle from parent or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items: CommandItem[] = [
    {
      id: 'splash',
      title: 'بوابة الإطلاق والتعريف الأكاديمي',
      category: 'النظام الأساسي',
      badge: '01',
      shortcut: 'S',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: 'welcome',
      title: 'واجهة الترحيب بالأستاذ حمزة',
      category: 'المسار الشرطي',
      badge: '02',
      shortcut: 'W',
      icon: <HelpCircle className="w-4 h-4 text-blue-400" />,
    },
    {
      id: 'confirmation',
      title: 'صمام التأكيد والتوجيه المنطقي',
      category: 'المسار الشرطي',
      badge: '03',
      shortcut: 'C',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 'research-intro',
      title: 'مقدمة عن الخوارزميات (1/4)',
      category: 'وحدات البحث',
      badge: '04',
      shortcut: '1',
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: 'research-sequential',
      title: 'الخوارزمية التسلسلية ومحاكي C = A × B / 3',
      category: 'وحدات البحث',
      badge: '05',
      shortcut: '2',
      icon: <ArrowDownSquare className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: 'research-conditional',
      title: 'الخوارزمية الشرطية ومستشعر الحرارة',
      category: 'وحدات البحث',
      badge: '06',
      shortcut: '3',
      icon: <GitFork className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'research-iterative',
      title: 'الخوارزمية التكرارية ومحاكي العد التنازلي',
      category: 'وحدات البحث',
      badge: '07',
      shortcut: '4',
      icon: <RotateCw className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'sitemap',
      title: 'خريطة المعمارية التفاعلية (Miro/Figma Graph)',
      category: 'طوبولوجيا النظام',
      badge: '08',
      shortcut: 'M',
      icon: <Network className="w-4 h-4 text-[#14F195]" />,
    },
    {
      id: 'team',
      title: 'فريق الهندسة والاعتماد (هاشم، سالم، محمد)',
      category: 'الفريق',
      badge: '09',
      shortcut: 'T',
      icon: <Users className="w-4 h-4 text-[#A855F7]" />,
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.includes(query) ||
      item.category.includes(query) ||
      item.shortcut.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#061126] border border-cyan-500/30 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] text-slate-100 overflow-hidden flex flex-col max-h-[85vh] mt-12 sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar (Raycast Style) */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-slate-950/60">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن صفحة، محاكي، أو مفهوم... (مثل: تسلسلية، شرطية، خريطة)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none text-right font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-white/[0.04]">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              لا توجد نتائج مطابقة لبحثك &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right transition-all group ${
                    isSelected
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-white shadow-sm'
                      : 'hover:bg-slate-900/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40">
                            الصفحة الحالية
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <kbd className="font-mono text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {item.shortcut}
                    </kbd>
                    <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Meta */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>{PROJECT_INFO.school}</span>
            <span>·</span>
            <span>إشراف: {PROJECT_INFO.teacher}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">انتقال فوري</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
