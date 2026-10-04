import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PageId, SiteMapNodeData } from '../../types';
import { SITEMAP_NODES } from '../../data/researchData';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  ArrowDownSquare,
  GitFork,
  RotateCw,
  Users,
  Network,
  ExternalLink,
  Info,
  Target,
  Code2,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Play,
  Square,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onNavigate: (page: PageId) => void;
  onHome: () => void;
  onBack: () => void;
}

export const InteractiveSiteMap: React.FC<Props> = ({
  onNavigate,
  onHome: _onHome,
  onBack: _onBack,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Canvas Viewport State (transformOrigin: 0 0)
  const [scale, setScale] = useState<number>(0.55);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 30 });
  const [selectedNodeId, setSelectedNodeId] = useState<PageId>('research-sequential');
  const [activeTab, setActiveTab] = useState<'overview' | 'purpose' | 'concepts' | 'code'>('overview');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

  // Live Simulation state
  const [isSimulatingFlow, setIsSimulatingFlow] = useState<boolean>(false);
  const [activeSimNodeId, setActiveSimNodeId] = useState<PageId | null>(null);
  const simulationTimerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedNode: SiteMapNodeData =
    SITEMAP_NODES.find((n) => n.id === selectedNodeId) || SITEMAP_NODES[4];

  // Touch & Pinch-to-Zoom State Ref
  const touchStateRef = useRef<{
    mode: 'none' | 'pan' | 'pinch';
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
    startDist: number;
    startScale: number;
  }>({
    mode: 'none',
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    startDist: 0,
    startScale: 0.55,
  });

  // Mouse Drag State Ref
  const mouseDragRef = useRef<{
    isDown: boolean;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
  }>({
    isDown: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  // Fit all nodes into the current viewport perfectly centered
  const fitAllNodes = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const isMobile = rect.width < 768;

    const targetScale = isMobile
      ? Math.max(Math.min((rect.width - 20) / 1080, 0.44), 0.3)
      : Math.min(rect.width / 1180, (rect.height - 60) / 820, 0.85);

    setScale(targetScale);
    setPan({
      x: rect.width / 2 - 550 * targetScale,
      y: Math.max((rect.height - 740 * targetScale) / 2, 20),
    });
  }, []);

  useEffect(() => {
    fitAllNodes();
  }, [fitAllNodes]);

  useEffect(() => {
    const handleResize = () => fitAllNodes();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitAllNodes]);

  // Safe Clamping
  const clampPan = (newX: number, newY: number, curScale = scale) => {
    if (!containerRef.current) return { x: newX, y: newY };
    const rect = containerRef.current.getBoundingClientRect();
    const stageWidth = 1100 * curScale;
    const stageHeight = 800 * curScale;

    const minX = rect.width - stageWidth - 140;
    const maxX = 140;
    const minY = rect.height - stageHeight - 120;
    const maxY = 100;

    return {
      x: Math.min(Math.max(newX, minX), maxX),
      y: Math.min(Math.max(newY, minY), maxY),
    };
  };

  // Horizontal Panning buttons
  const panLeft = () => setPan((prev) => clampPan(prev.x + 180, prev.y));
  const panRight = () => setPan((prev) => clampPan(prev.x - 180, prev.y));

  // 1-Finger Pan & 2-Finger Pinch-to-Zoom Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      // 1 Finger = Smooth Pan
      const t = e.touches[0];
      touchStateRef.current = {
        mode: 'pan',
        startX: t.clientX,
        startY: t.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
        startDist: 0,
        startScale: scale,
      };
    } else if (e.touches.length === 2) {
      // 2 Fingers = Pinch to Zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStateRef.current = {
        mode: 'pinch',
        startX: (t1.clientX + t2.clientX) / 2,
        startY: (t1.clientY + t2.clientY) / 2,
        startPanX: pan.x,
        startPanY: pan.y,
        startDist: dist || 1,
        startScale: scale,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const s = touchStateRef.current;
    if (s.mode === 'none') return;

    if (s.mode === 'pan' && e.touches.length === 1) {
      const t = e.touches[0];
      const dx = t.clientX - s.startX;
      const dy = t.clientY - s.startY;
      setPan(clampPan(s.startPanX + dx, s.startPanY + dy));
    } else if (s.mode === 'pinch' && e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = currentDist / s.startDist;
      const nextScale = Math.min(Math.max(s.startScale * ratio, 0.28), 2.2);
      setScale(nextScale);
    }
  };

  const handleTouchEnd = () => {
    touchStateRef.current.mode = 'none';
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    mouseDragRef.current = {
      isDown: true,
      startX: e.clientX,
      startY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const m = mouseDragRef.current;
    if (!m.isDown) return;
    const dx = e.clientX - m.startX;
    const dy = e.clientY - m.startY;
    setPan(clampPan(m.startPanX + dx, m.startPanY + dy));
  };

  const handleMouseUp = () => {
    mouseDragRef.current.isDown = false;
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.92 : 1.08;
    setScale((prev) => Math.min(Math.max(prev * zoomFactor, 0.28), 2.2));
  };

  // Safe, non-blocking simulation flow
  const handleStopFlow = () => {
    if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
    setIsSimulatingFlow(false);
    setActiveSimNodeId(null);
  };

  const handleToggleFlow = () => {
    if (isSimulatingFlow) {
      handleStopFlow();
      return;
    }

    setIsSimulatingFlow(true);
    const steps: PageId[] = [
      'splash',
      'welcome',
      'confirmation',
      'research-intro',
      'research-sequential',
      'research-conditional',
      'research-iterative',
      'team',
    ];

    let idx = 0;
    setActiveSimNodeId(steps[0]);
    setSelectedNodeId(steps[0]);

    simulationTimerRef.current = setInterval(() => {
      idx++;
      if (idx >= steps.length) {
        handleStopFlow();
        try {
          confetti({ particleCount: 50, spread: 75, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
        return;
      }
      setActiveSimNodeId(steps[idx]);
      setSelectedNodeId(steps[idx]);
    }, 550);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4 text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-[#14F195]" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-indigo-400" />;
      case 'ArrowDownSquare': return <ArrowDownSquare className="w-4 h-4 text-cyan-400" />;
      case 'GitFork': return <GitFork className="w-4 h-4 text-amber-400" />;
      case 'RotateCw': return <RotateCw className="w-4 h-4 text-[#A855F7]" />;
      case 'Users': return <Users className="w-4 h-4 text-pink-400" />;
      case 'Network': return <Network className="w-4 h-4 text-cyan-400" />;
      default: return <BookOpen className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-54px)] bg-[#020817] overflow-hidden flex flex-col select-none">
      {/* 1. TOP TOOLBAR: 완전히 독립된 레이어 (لا يتأثر بالكانفاس) */}
      <header className="relative z-30 w-full px-3 py-2 bg-[#061126]/95 backdrop-blur-md border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 shadow-lg">
        {/* Right in RTL: Direct Navigation to Algorithms */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            type="button"
            onClick={() => onNavigate('research-sequential')}
            className="px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
          >
            <ArrowDownSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>التسلسلية</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('research-conditional')}
            className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
          >
            <GitFork className="w-3.5 h-3.5 text-amber-400" />
            <span>الشرطية</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('research-iterative')}
            className="px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 text-purple-300 font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5 text-purple-400" />
            <span>التكرارية</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('research-intro')}
            className="px-2 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300 text-xs transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">الأساسيات</span>
          </button>
        </div>

        {/* Center: Quick Pan & Center View */}
        <div className="flex items-center gap-1 bg-black/70 p-1 rounded-xl border border-white/[0.08]">
          <button
            type="button"
            onClick={panLeft}
            className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-cyan-300 font-bold text-xs transition-all flex items-center gap-1"
            title="تحريك المعمارية لليسار"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] hidden sm:inline">يسار</span>
          </button>

          <button
            type="button"
            onClick={fitAllNodes}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 font-bold text-[11px] transition-all"
            title="توسيط المعمارية في قلب الشاشة"
          >
            توسيط ⊡
          </button>

          <button
            type="button"
            onClick={panRight}
            className="px-2.5 py-1 rounded-lg hover:bg-slate-800 text-cyan-300 font-bold text-xs transition-all flex items-center gap-1"
            title="تحريك المعمارية لليمين"
          >
            <span className="text-[10px] hidden sm:inline">يمين</span>
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Left: Simulation & Inspector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFlow}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
              isSimulatingFlow
                ? 'bg-amber-500 text-slate-950 animate-pulse border border-amber-300'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400'
            }`}
          >
            {isSimulatingFlow ? (
              <>
                <Square className="w-3 h-3 fill-current" />
                <span>إيقاف ⏹</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] hidden sm:inline">تشغيل المسار الحي</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border ${
              isInspectorOpen
                ? 'bg-cyan-500/25 text-cyan-300 border-cyan-400'
                : 'bg-slate-900 text-slate-300 border-white/[0.08] hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] hidden sm:inline">المفتش</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN PINCH-TO-ZOOM & PAN CANVAS (touchAction: none يمنع تجمد أندرويد نهائياً) */}
      <div
        ref={containerRef}
        style={{ touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={fitAllNodes}
        className="relative flex-1 w-full h-full cyber-grid cursor-grab active:cursor-grabbing overflow-hidden select-none"
      >
        {/* Scaled/Panned Graph Stage with transformOrigin: 0 0 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '1100px',
            height: '800px',
            transformOrigin: '0 0',
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: touchStateRef.current.mode !== 'none' || mouseDragRef.current.isDown ? 'none' : 'transform 100ms ease-out',
            pointerEvents: 'none',
          }}
        >
          {/* Animated Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="glowPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="purplePulse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Launchpad -> Welcome */}
            <path
              d="M 550 130 C 550 170, 550 190, 550 215"
              fill="none"
              stroke="url(#glowPulse)"
              strokeWidth="3.5"
              className="animate-pulse-photon"
            />

            {/* Welcome -> Confirmation */}
            <path
              d="M 550 280 C 550 310, 550 330, 550 365"
              fill="none"
              stroke="url(#glowPulse)"
              strokeWidth="3.5"
              className="animate-pulse-photon"
            />

            {/* Confirmation -> 4 Research Modules */}
            <path
              d="M 550 425 C 550 470, 140 470, 140 515"
              fill="none"
              stroke="#00D9FF"
              strokeWidth="3"
              strokeOpacity="0.6"
              className={isSimulatingFlow ? 'animate-pulse-photon' : ''}
            />
            <path
              d="M 550 425 C 550 470, 410 470, 410 515"
              fill="none"
              stroke="url(#glowPulse)"
              strokeWidth="3.5"
              className="animate-pulse-photon"
            />
            <path
              d="M 550 425 C 550 470, 680 470, 680 515"
              fill="none"
              stroke="url(#glowPulse)"
              strokeWidth="3.5"
              className="animate-pulse-photon"
            />
            <path
              d="M 550 425 C 550 470, 950 470, 950 515"
              fill="none"
              stroke="#00D9FF"
              strokeWidth="3"
              strokeOpacity="0.6"
              className={isSimulatingFlow ? 'animate-pulse-photon' : ''}
            />

            {/* Research Core -> Team */}
            <path
              d="M 550 585 C 550 640, 550 660, 550 690"
              fill="none"
              stroke="url(#purplePulse)"
              strokeWidth="4"
              className="animate-pulse-photon"
            />
          </svg>

          {/* Architecture Nodes (يبقى وين ما تريد دون قفز) */}
          {SITEMAP_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isSimActive = activeSimNodeId === node.id;

            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="z-10 pointer-events-auto"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                    setIsInspectorOpen(true);
                  }}
                  className={`group relative cursor-pointer select-none transition-all duration-150 w-56 p-3.5 rounded-2xl ${
                    isSimActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_40px_#00D9FF] scale-105 border-2 border-white'
                      : isSelected
                      ? 'bg-[#081A34] border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,217,255,0.4)] scale-105 ring-4 ring-cyan-500/20'
                      : 'bg-[#061126]/95 hover:bg-[#081A34] border border-white/[0.12] hover:border-cyan-500/50 shadow-xl'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                      {node.typeBadge}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-300 font-mono">
                      <span>{node.progressPercent}%</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-right">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected || isSimActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 border border-white/[0.08] text-cyan-300'
                      }`}
                    >
                      {renderIcon(node.iconName)}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <h4 className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors truncate">
                        {node.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {node.purpose.slice(0, 30)}...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. FLOATING ZOOM CONTROLS (تكبير وتصغير سلس بلمسة زر أو بإصبعين) */}
      <aside aria-label="أدوات التحكم في التكبير والتصغير" className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel-elevated shadow-2xl">
        <button
          type="button"
          onClick={() => setScale((s) => Math.min(s + 0.14, 2.2))}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom In (تكبير)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setScale((s) => Math.max(s - 0.14, 0.28))}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Zoom Out (تصغير)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={fitAllNodes}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
          title="توسيط الشاشة"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="px-2 py-1 font-mono text-[10px] text-cyan-400 bg-slate-950/80 rounded-lg border border-white/[0.06]">
          {Math.round(scale * 100)}%
        </div>
      </aside>

      {/* 4. MODERN INSPECTOR PANEL */}
      {isInspectorOpen && (
        <aside className="absolute top-14 left-2.5 sm:left-auto sm:right-4 z-40 w-[calc(100vw-20px)] sm:w-80 md:w-96 max-h-[calc(100vh-80px)] glass-panel-elevated rounded-2xl flex flex-col shadow-2xl border border-cyan-500/40 overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between p-3.5 border-b border-white/[0.08] bg-slate-950/90">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                {renderIcon(selectedNode.iconName)}
              </div>
              <div className="text-right">
                <span className="font-mono text-[9px] text-cyan-400 block uppercase">
                  {selectedNode.typeBadge}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-white">
                  {selectedNode.title}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsInspectorOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 p-1.5 bg-slate-950/40 border-b border-white/[0.06] text-[11px] font-medium text-center">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              نظرة عامة
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('purpose')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'purpose'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الهدف
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('concepts')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'concepts'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              المفاهيم
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'code'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              الشفرة
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 text-xs space-y-3 text-right">
            {activeTab === 'overview' && (
              <div className="space-y-3">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-1 font-semibold">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>الوظيفة المنطقية:</span>
                  </span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {selectedNode.purpose}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-1 font-semibold">
                    <Target className="w-3.5 h-3.5 text-[#14F195]" />
                    <span>محطة الانتقال التالية:</span>
                  </span>
                  <p className="text-cyan-300 font-mono text-[11px]">
                    {selectedNode.leadsTo}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'purpose' && (
              <div className="space-y-3">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-1 font-semibold">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>سبب الوجود والأهمية في المنظومة:</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedNode.whyExists}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'concepts' && (
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  المفاهيم الهندسية المعيارية:
                </span>
                {selectedNode.keyConcepts?.map((concept, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-white/[0.06] text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#14F195]" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'code' && (
              <div>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mb-1.5">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architecture Logic Code:</span>
                </span>
                <pre className="bg-black/80 p-3 rounded-xl border border-cyan-900/40 text-[11px] font-mono text-cyan-300 ltr text-left overflow-x-auto whitespace-pre-wrap">
                  {selectedNode.codeSnippet || '// Module execution initialized'}
                </pre>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/[0.08] bg-slate-950/80">
            <button
              type="button"
              onClick={() => onNavigate(selectedNode.id)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>فتح هذه الوحدة والتنفيذ الآن</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
