/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { PageId } from './types';
import { TechHeader } from './components/common/TechHeader';
import { ModernProgressNavigator } from './components/common/ModernProgressNavigator';
import { QuickNavDrawer } from './components/common/QuickNavDrawer';
import { TeacherGradingPanel } from './components/common/TeacherGradingPanel';
import { DownloadPackageModal } from './components/common/DownloadPackageModal';
import { SplashScreen } from './components/views/SplashScreen';
import { WelcomeScreen } from './components/views/WelcomeScreen';
import { ConfirmationScreen } from './components/views/ConfirmationScreen';
import { ResearchPages } from './components/views/ResearchPages';
import { InteractiveSiteMap } from './components/views/InteractiveSiteMap';
import { TeamScreen } from './components/views/TeamScreen';
import { Network, Terminal, Users, Award } from 'lucide-react';

const PAGE_ORDER: PageId[] = [
  'splash',
  'welcome',
  'confirmation',
  'research-intro',
  'research-sequential',
  'research-conditional',
  'research-iterative',
  'sitemap',
  'team',
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('splash');
  const [history, setHistory] = useState<PageId[]>(['splash']);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState<boolean>(false);
  const [isGradingOpen, setIsGradingOpen] = useState<boolean>(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);

  // Keyboard shortcut ⌘K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandBarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = useCallback((nextPage: PageId) => {
    setCurrentPage(nextPage);
    setHistory((prev) => {
      if (prev[prev.length - 1] === nextPage) return prev;
      return [...prev, nextPage];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      const updated = [...history];
      updated.pop();
      const prev = updated[updated.length - 1];
      setHistory(updated);
      setCurrentPage(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'splash') navigateTo('splash');
    }
  }, [history, currentPage, navigateTo]);

  const handleHome = useCallback(() => {
    navigateTo('splash');
  }, [navigateTo]);

  const currentIndex = PAGE_ORDER.indexOf(currentPage);
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < PAGE_ORDER.length - 1;

  const handleNextFlow = () => {
    if (canNext) {
      navigateTo(PAGE_ORDER[currentIndex + 1]);
    }
  };

  const handlePrevFlow = () => {
    if (canPrev) {
      navigateTo(PAGE_ORDER[currentIndex - 1]);
    }
  };

  const isResearch = currentPage.startsWith('research-');

  return (
    <div className="min-h-screen bg-[#020817] text-[#CBD5E1] flex flex-col font-sans selection:bg-cyan-500 selection:text-white antialiased overflow-x-hidden">
      {/* SaaS Floating Header: إخفاء الشريط العلوي في الشاشة الأولى تماماً كما طلب المستخدم */}
      {currentPage !== 'splash' && (
        <TechHeader
          currentPage={currentPage}
          onNavigate={navigateTo}
          onToggleCommandBar={() => setIsCommandBarOpen(true)}
          onOpenGrading={() => setIsGradingOpen(true)}
          onOpenDownloadPackage={() => setIsDownloadOpen(true)}
        />
      )}

      {/* Progress Navigator only on welcome, confirmation, and team */}
      {(currentPage === 'welcome' || currentPage === 'confirmation' || currentPage === 'team') && (
        <div className="w-full pt-1 pb-1">
          <ModernProgressNavigator
            currentPage={currentPage}
            onNavigate={navigateTo}
            onPrev={handlePrevFlow}
            onNext={handleNextFlow}
            canPrev={canPrev}
            canNext={canNext}
          />
        </div>
      )}

      {/* Main Viewport Stage */}
      <main className="flex-1 w-full relative pb-16 sm:pb-6">
        {currentPage === 'splash' && (
          <SplashScreen onNext={() => navigateTo('welcome')} />
        )}

        {currentPage === 'welcome' && (
          <WelcomeScreen
            onConfirmKnowsNoNeed={() => navigateTo('confirmation')}
            onWantToSeeResearch={() => navigateTo('research-intro')}
            onBack={handleBack}
            onHome={handleHome}
          />
        )}

        {currentPage === 'confirmation' && (
          <ConfirmationScreen
            onGoToResearch={() => navigateTo('research-intro')}
            onBack={handleBack}
            onHome={handleHome}
          />
        )}

        {isResearch && (
          <ResearchPages
            currentPage={currentPage}
            onNavigate={navigateTo}
            onHome={handleHome}
            onBack={handleBack}
          />
        )}

        {currentPage === 'sitemap' && (
          <InteractiveSiteMap
            onNavigate={navigateTo}
            onHome={handleHome}
            onBack={handleBack}
          />
        )}

        {currentPage === 'team' && (
          <TeamScreen
            onHome={handleHome}
            onBack={handleBack}
            onOpenGrading={() => setIsGradingOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Bar: إخفاء الشريط السفلي في الشاشة الأولى تماماً لتكون سينمائية نظيفة */}
      {currentPage !== 'splash' && (
        <nav aria-label="شريط التنقل السريع للهواتف" className="sm:hidden fixed bottom-3 inset-x-3 z-40 glass-panel-elevated p-1.5 rounded-2xl flex items-center justify-around text-xs shadow-2xl border border-cyan-500/30">
          <button
            onClick={() => navigateTo('splash')}
            className="p-2 rounded-xl flex flex-col items-center gap-0.5 text-slate-400 hover:text-white"
          >
            <span className="text-[10px]">البداية</span>
          </button>

          <button
            onClick={() => navigateTo('research-intro')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              isResearch ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span className="text-[10px]">المنهج</span>
          </button>

          <button
            onClick={() => setIsGradingOpen(true)}
            className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            title="تقييم الأستاذ حمزة"
          >
            <Award className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('sitemap')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              currentPage === 'sitemap' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Network className="w-4 h-4" />
            <span className="text-[10px]">المعمارية</span>
          </button>

          <button
            onClick={() => navigateTo('team')}
            className={`p-2 rounded-xl flex flex-col items-center gap-0.5 ${
              currentPage === 'team' ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[10px]">الفريق</span>
          </button>
        </nav>
      )}

      {/* Command Palette Modal */}
      <QuickNavDrawer
        isOpen={isCommandBarOpen}
        onClose={() => setIsCommandBarOpen(false)}
        currentPage={currentPage}
        onNavigate={navigateTo}
        onBack={handleBack}
        onNext={handleNextFlow}
        onPrev={handlePrevFlow}
        canNext={canNext}
        canPrev={canPrev}
      />

      {/* Teacher Grading & Evaluation Modal */}
      <TeacherGradingPanel
        isOpen={isGradingOpen}
        onClose={() => setIsGradingOpen(false)}
      />

      {/* Cloudflare & Netlify Deployment Package Modal */}
      <DownloadPackageModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
}
