import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomeOverviewView } from './components/HomeOverviewView';
import { DashboardView } from './components/DashboardView';
import { QuizSessionView } from './components/QuizSessionView';
import { SessionResultView } from './components/SessionResultView';
import { ProgressStatsView } from './components/ProgressStatsView';
import { LearningMaterialView } from './components/LearningMaterialView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { UserManagementView } from './components/UserManagementView';
import { SchoolListView } from './components/SchoolListView';
import { QuestionBankView } from './components/QuestionBankView';
import { ScrollToTop } from './components/ScrollToTop';
import { Phone } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { AccountSettingsModal } from './components/AccountSettingsModal';
import { HeroSettingsModal } from './components/HeroSettingsModal';
import { ContactSettingsModal } from './components/ContactSettingsModal';
import { ContactModal } from './components/ContactModal';
import { BrandingSettingsModal } from './components/BrandingSettingsModal';
import { TopScoresModal } from './components/TopScoresModal';
import { FeedbackNotificationModal } from './components/FeedbackNotificationModal';
import { HeroConfig, DEFAULT_HERO_CONFIG } from './utils/heroStorage';
import { ContactConfig, DEFAULT_CONTACT_CONFIG } from './utils/contactStorage';
import { BrandingConfig, DEFAULT_BRANDING_CONFIG, applyBrandingToDOM } from './utils/brandingStorage';
import { 
  fetchHeroConfig, 
  saveHeroConfigToDB, 
  fetchContactConfig, 
  saveContactConfigToDB, 
  fetchBrandingConfig, 
  saveBrandingConfigToDB 
} from './services/settingsSync';
import { Theme, getStoredTheme, applyTheme } from './utils/theme';

import { 
  getQuestionsForWeek, 
  ALL_400_QUESTIONS,
  QUESTION_MAP 
} from './data/questions';
import { 
  ExamSession, 
  Question, 
  QuestionState, 
  UserAnswerValue 
} from './types/quiz';
import { UserProfile } from './types/auth';
import { 
  getStoredUser, 
  setStoredUser, 
  checkUserSession,
  saveExamToDatabase,
  resetRemoteUserProgress,
  sendHeartbeat,
  sendOfflineStatus
} from './services/api';
import { 
  loadUserProgress, 
  saveUserProgress, 
  recordCompletedSession, 
  recordCompletedSimulation,
  toggleBookmarkQuestion,
  toggleModuleCompleted,
  resetAllUserProgress,
  syncUserProgressFromServer
} from './utils/storage';
import { calculateSessionSummary } from './utils/scoring';

export type AppTab = 'home' | 'dashboard' | 'learning' | 'bank' | 'stats' | 'teacher' | 'users' | 'schools';

export interface AppHistoryState {
  tab: AppTab;
  learningWeek?: number;
  bankWeek?: number;
  isExamActive?: boolean;
  isExamFinished?: boolean;
  examWeekId?: number;
  examMode?: 'exam' | 'practice';
  isAuthOpen?: boolean;
  isSettingsOpen?: boolean;
}

const tabToHash = (
  tab: AppTab,
  opts?: {
    learningWeek?: number;
    bankWeek?: number;
    isExamActive?: boolean;
    isExamFinished?: boolean;
    examWeekId?: number;
  }
): string => {
  if (opts?.isExamActive && opts?.examWeekId) {
    return `#ujian?week=${opts.examWeekId}`;
  }
  if (opts?.isExamFinished && opts?.examWeekId) {
    return `#hasil?week=${opts.examWeekId}`;
  }
  switch (tab) {
    case 'home':
      return '#home';
    case 'dashboard':
      return '#modul';
    case 'learning':
      return opts?.learningWeek ? `#materi?week=${opts.learningWeek}` : '#materi';
    case 'bank':
      return opts?.bankWeek ? `#bank-soal?week=${opts.bankWeek}` : '#bank-soal';
    case 'stats':
      return '#statistik';
    case 'teacher':
      return '#guru';
    case 'users':
      return '#pengguna';
    case 'schools':
      return '#sekolah';
    default:
      return '#home';
  }
};

const parseHashToState = (hash: string, fallbackTab: AppTab = 'home'): AppHistoryState => {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean || clean === 'home' || clean === 'beranda') {
    return { tab: 'home' };
  }
  const [path, queryString] = clean.split('?');
  const params = new URLSearchParams(queryString || '');
  const weekParam = params.get('week') || params.get('minggu');
  const parsedWeek = weekParam ? parseInt(weekParam, 10) : undefined;
  const validWeek = parsedWeek && !isNaN(parsedWeek) ? parsedWeek : undefined;

  if (path === 'ujian' || path === 'exam' || path === 'quiz') {
    return { tab: 'dashboard', isExamActive: true, examWeekId: validWeek || 1 };
  }
  if (path === 'hasil' || path === 'result') {
    return { tab: 'dashboard', isExamFinished: true, examWeekId: validWeek || 1 };
  }
  if (path === 'modul' || path === 'dashboard') {
    return { tab: 'dashboard' };
  }
  if (path === 'materi' || path === 'learning') {
    return { tab: 'dashboard' };
  }
  if (path === 'bank-soal' || path === 'bank') {
    return { tab: 'bank', bankWeek: validWeek || 0 };
  }
  if (path === 'statistik' || path === 'stats') {
    return { tab: 'stats' };
  }
  if (path === 'guru' || path === 'teacher' || path === 'admin') {
    return { tab: 'teacher' };
  }
  if (path === 'pengguna' || path === 'users' || path === 'daftar-pengguna') {
    return { tab: 'users' };
  }
  if (path === 'sekolah' || path === 'schools' || path === 'daftar-sekolah') {
    return { tab: 'schools' };
  }

  return { tab: fallbackTab };
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [userProgress, setUserProgress] = useState(() => loadUserProgress());
  const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [bankSelectedWeek, setBankSelectedWeek] = useState<number>(0);
  const [learningSelectedWeek, setLearningSelectedWeek] = useState<number>(1);

  // Theme & Dark Mode State
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  // Authentication & MySQL User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTopScoresOpen, setIsTopScoresOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHeroSettingsOpen, setIsHeroSettingsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isContactSettingsOpen, setIsContactSettingsOpen] = useState(false);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [contactConfig, setContactConfig] = useState<ContactConfig>(DEFAULT_CONTACT_CONFIG);
  const [brandingConfig, setBrandingConfig] = useState<BrandingConfig>(DEFAULT_BRANDING_CONFIG);
  const [isBrandingSettingsOpen, setIsBrandingSettingsOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'register' | 'login'>('register');

  useEffect(() => {
    applyBrandingToDOM(brandingConfig);
  }, [brandingConfig]);

  // Synchronous refs to prevent stale closure during popstate & back button navigation
  const isPopstateNavigatingRef = useRef(false);
  const currentTabRef = useRef<AppTab>(currentTab);
  const currentSessionRef = useRef<ExamSession | null>(currentSession);
  const currentUserRef = useRef<UserProfile | null>(currentUser);
  const isAuthOpenRef = useRef<boolean>(isAuthModalOpen);
  const isSettingsOpenRef = useRef<boolean>(isSettingsOpen);
  const learningWeekRef = useRef<number>(learningSelectedWeek);
  const bankWeekRef = useRef<number>(bankSelectedWeek);

  useEffect(() => { currentTabRef.current = currentTab; }, [currentTab]);
  useEffect(() => { currentSessionRef.current = currentSession; }, [currentSession]);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);
  useEffect(() => { isAuthOpenRef.current = isAuthModalOpen; }, [isAuthModalOpen]);
  useEffect(() => { isSettingsOpenRef.current = isSettingsOpen; }, [isSettingsOpen]);
  useEffect(() => { learningWeekRef.current = learningSelectedWeek; }, [learningSelectedWeek]);
  useEffect(() => { bankWeekRef.current = bankSelectedWeek; }, [bankSelectedWeek]);

  // Periodic online presence heartbeat (every 20 seconds) when user is logged in
  useEffect(() => {
    if (!currentUser?.email) return;
    const email = currentUser.email;

    sendHeartbeat(email);
    const interval = setInterval(() => {
      sendHeartbeat(email);
    }, 20000);

    const handleUnload = () => {
      sendOfflineStatus(email);
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [currentUser?.email]);

  // Centralized history navigation dispatcher that supports browser Back & Forward buttons
  const navigateState = useCallback((
    newState: Partial<AppHistoryState>,
    options?: { replace?: boolean; skipScroll?: boolean }
  ) => {
    // If state change is originating from popstate, do NOT push duplicate history entry
    if (isPopstateNavigatingRef.current) return;

    const targetTab = newState.tab ?? currentTabRef.current;
    const targetLearningWeek = newState.learningWeek ?? learningWeekRef.current;
    const targetBankWeek = newState.bankWeek ?? bankWeekRef.current;
    const targetExamActive = newState.isExamActive !== undefined 
      ? newState.isExamActive 
      : (currentSessionRef.current !== null && !currentSessionRef.current.isFinished);
    const targetExamFinished = newState.isExamFinished !== undefined
      ? newState.isExamFinished
      : (currentSessionRef.current !== null && currentSessionRef.current.isFinished);
    const targetExamWeek = newState.examWeekId ?? currentSessionRef.current?.weekId;
    const targetAuthOpen = newState.isAuthOpen !== undefined ? newState.isAuthOpen : isAuthOpenRef.current;
    const targetSettingsOpen = newState.isSettingsOpen !== undefined ? newState.isSettingsOpen : isSettingsOpenRef.current;

    const fullState: AppHistoryState = {
      tab: targetTab,
      learningWeek: targetLearningWeek,
      bankWeek: targetBankWeek,
      isExamActive: targetExamActive,
      isExamFinished: targetExamFinished,
      examWeekId: targetExamWeek,
      isAuthOpen: targetAuthOpen,
      isSettingsOpen: targetSettingsOpen,
    };

    const newHash = tabToHash(targetTab, {
      learningWeek: targetLearningWeek,
      bankWeek: targetBankWeek,
      isExamActive: targetExamActive,
      isExamFinished: targetExamFinished,
      examWeekId: targetExamWeek,
    });

    const currentState = window.history.state as AppHistoryState | null;
    const isDuplicate = currentState &&
      currentState.tab === fullState.tab &&
      currentState.learningWeek === fullState.learningWeek &&
      currentState.bankWeek === fullState.bankWeek &&
      currentState.isExamActive === fullState.isExamActive &&
      currentState.isExamFinished === fullState.isExamFinished &&
      currentState.isAuthOpen === fullState.isAuthOpen &&
      currentState.isSettingsOpen === fullState.isSettingsOpen &&
      window.location.hash === newHash;

    if (isDuplicate) return;

    if (options?.replace) {
      window.history.replaceState(fullState, '', newHash);
    } else {
      window.history.pushState(fullState, '', newHash);
    }

    if (!options?.skipScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to browser Back and Forward button events (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      isPopstateNavigatingRef.current = true;

      try {
        const activeSession = currentSessionRef.current;

        // If user is inside an ongoing active exam and hits browser Back:
        if (activeSession && !activeSession.isFinished) {
          const confirmLeave = window.confirm(
            'Anda sedang dalam sesi pengerjaan ujian. Kembali ke halaman sebelumnya akan mengakhiri sesi saat ini. Lanjutkan?'
          );
          if (!confirmLeave) {
            // User aborted back action: keep user in exam by pushing exam state back
            const examHash = `#ujian?week=${activeSession.weekId}`;
            const stayState: AppHistoryState = {
              tab: currentTabRef.current,
              isExamActive: true,
              isExamFinished: false,
              examWeekId: activeSession.weekId,
            };
            window.history.pushState(stayState, '', examHash);
            isPopstateNavigatingRef.current = false;
            return;
          }
          // Confirmed leaving active exam
          setCurrentSession(null);
          setSessionQuestions([]);
        }

        // Close modals if open on back navigation
        if (isAuthOpenRef.current) {
          setIsAuthModalOpen(false);
        }
        if (isSettingsOpenRef.current) {
          setIsSettingsOpen(false);
        }

        // Determine destination state from event.state or parse current hash
        const historyState = (event.state as AppHistoryState | null) || parseHashToState(window.location.hash);

        // Apply modals state if targeted
        if (historyState.isAuthOpen !== undefined) {
          setIsAuthModalOpen(historyState.isAuthOpen);
        }
        if (historyState.isSettingsOpen !== undefined) {
          setIsSettingsOpen(historyState.isSettingsOpen);
        }

        // If destination state does not indicate active/finished exam, exit session
        if (!historyState.isExamActive && !historyState.isExamFinished) {
          setCurrentSession(null);
          setSessionQuestions([]);
        }

        // Restore week sub-selections
        if (historyState.learningWeek) {
          setLearningSelectedWeek(historyState.learningWeek);
        }
        if (historyState.bankWeek !== undefined) {
          setBankSelectedWeek(historyState.bankWeek);
        }

        // Restore tab
        if (historyState.tab) {
          setCurrentTab(historyState.tab);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        setTimeout(() => {
          isPopstateNavigatingRef.current = false;
        }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Fetch configs from database on mount for cross-device persistence
  useEffect(() => {
    let isMounted = true;
    async function loadDbConfigs() {
      try {
        const [hCfg, cCfg, bCfg] = await Promise.all([
          fetchHeroConfig(),
          fetchContactConfig(),
          fetchBrandingConfig(),
        ]);
        if (isMounted) {
          if (hCfg) setHeroConfig(hCfg);
          if (cCfg) setContactConfig(cCfg);
          if (bCfg) setBrandingConfig(bCfg);
        }
      } catch (e) {
        console.warn('Error loading remote settings from DB:', e);
      }
    }
    loadDbConfigs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Initial history setup on load or direct URL access
  useEffect(() => {
    const initialHash = window.location.hash;
    const stored = getStoredUser();
    const fallbackTab: AppTab = stored?.role === 'admin' ? 'home' : (stored ? 'dashboard' : 'home');
    const parsed = parseHashToState(initialHash, fallbackTab);

    let targetTab = parsed.tab;
    if (!initialHash || initialHash === '#') {
      targetTab = fallbackTab;
    }

    const targetWeek = parsed.learningWeek || 1;
    const targetBankWeek = parsed.bankWeek !== undefined ? parsed.bankWeek : 0;

    setCurrentTab(targetTab);
    if (parsed.learningWeek) setLearningSelectedWeek(parsed.learningWeek);
    if (parsed.bankWeek !== undefined) setBankSelectedWeek(parsed.bankWeek);

    const baseState: AppHistoryState = {
      tab: targetTab,
      learningWeek: targetWeek,
      bankWeek: targetBankWeek,
      isExamActive: false,
      isExamFinished: false,
      isAuthOpen: false,
      isSettingsOpen: false,
    };
    const baseHash = tabToHash(targetTab, {
      learningWeek: targetWeek,
      bankWeek: targetBankWeek,
    });

    window.history.replaceState(baseState, '', baseHash);
  }, []);

  // Verify saved browser session on initial load
  useEffect(() => {
    const stored = getStoredUser();
    if (stored && stored.email) {
      checkUserSession(stored.email)
        .then((res) => {
          if (res.valid && res.user) {
            setCurrentUser(res.user);
            setStoredUser(res.user);
            // Transition to home if admin (where Admin Dashboard resides), or keep tab for student
            if (res.user.role === 'admin') {
              setCurrentTab('home');
              navigateState({ tab: 'home' }, { replace: true });
            } else {
              setCurrentTab((prev) => (prev === 'home' ? 'dashboard' : prev));
              navigateState({ tab: 'dashboard' }, { replace: true });
            }
          } else {
            // Clear stale stored session if invalid in DB
            setCurrentUser(null);
            setStoredUser(null);
            navigateState({ tab: 'home' }, { replace: true });
          }
        })
        .catch(() => {
          // Keep stored user offline fallback
        });
    }
  }, [navigateState]);

  // Auto-sync user progress whenever currentUser changes (login, session restore)
  useEffect(() => {
    if (currentUser?.id || currentUser?.email) {
      const userKey = currentUser.id || currentUser.email;
      setUserProgress(loadUserProgress(userKey));
      syncUserProgressFromServer(currentUser.id, currentUser.email).then((synced) => {
        setUserProgress(synced);
      });
    } else {
      setUserProgress(loadUserProgress());
    }
  }, [currentUser?.id, currentUser?.email]);

  // Sync user progress whenever updated
  const refreshProgress = useCallback(() => {
    const userKey = currentUser?.id || currentUser?.email;
    setUserProgress(loadUserProgress(userKey));
  }, [currentUser?.id, currentUser?.email]);

  const handleSyncProgress = useCallback(async () => {
    if (currentUser?.id || currentUser?.email) {
      const synced = await syncUserProgressFromServer(currentUser.id, currentUser.email);
      setUserProgress(synced);
    } else {
      refreshProgress();
    }
  }, [currentUser?.id, currentUser?.email, refreshProgress]);

  const handleOpenAuth = (mode: 'register' | 'login' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    navigateState({ isAuthOpen: true }, { skipScroll: true });
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setStoredUser(user);
    setIsAuthModalOpen(false);
    const destinationTab: AppTab = 'home';
    setCurrentTab(destinationTab);
    navigateState({ tab: destinationTab, isAuthOpen: false }, { replace: true });
  };

  const handleLogout = () => {
    if (currentUser?.email) {
      sendOfflineStatus(currentUser.email);
    }
    setCurrentUser(null);
    setStoredUser(null);
    setCurrentSession(null);
    setCurrentTab('home');
    navigateState({ tab: 'home', isExamActive: false, isExamFinished: false }, { replace: true });
  };

  // Select Tab with History Support
  const handleSelectTab = useCallback((tab: AppTab) => {
    if (!currentUser) {
      handleOpenAuth('register');
      return;
    }
    if (currentSession && !currentSession.isFinished) {
      const confirmLeave = window.confirm(
        'Anda sedang dalam sesi pengerjaan ujian. Pindah halaman akan mengakhiri sesi saat ini. Lanjutkan?'
      );
      if (!confirmLeave) return;
      setCurrentSession(null);
      setSessionQuestions([]);
    } else if (currentSession && currentSession.isFinished) {
      setCurrentSession(null);
      setSessionQuestions([]);
    }

    setCurrentTab(tab);
    navigateState({ tab, isExamActive: false, isExamFinished: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentUser, currentSession, navigateState]);

  // Start exam for a specific week (1 to 8)
  const handleStartWeekSession = useCallback((weekId: number, mode: 'exam' | 'practice' = 'exam') => {
    const questions = getQuestionsForWeek(weekId);
    if (!questions || questions.length === 0) return;

    const initialAnswers: Record<string, QuestionState> = {};
    questions.forEach(q => {
      initialAnswers[q.id] = {
        answered: false,
        isFlagged: false,
      };
    });

    const newSession: ExamSession = {
      sessionId: `sess_${Date.now()}_${weekId}`,
      weekId,
      title: `Modul Minggu ${weekId} (${questions.length} Soal)`,
      mode,
      startTime: Date.now(),
      timeLimitMinutes: mode === 'exam' ? 50 : 0,
      elapsedSeconds: 0,
      isFinished: false,
      questionIds: questions.map(q => q.id),
      currentIndex: 0,
      answers: initialAnswers,
    };

    setSessionQuestions(questions);
    setCurrentSession(newSession);

    // Push exam state to history
    navigateState({
      tab: currentTabRef.current,
      isExamActive: true,
      isExamFinished: false,
      examWeekId: weekId,
      examMode: mode,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigateState]);

  // Start simulation (1 to 5, 10 questions each)
  const handleStartSimulation = useCallback((weekId: number, simIndex: number) => {
    const allQs = getQuestionsForWeek(weekId);
    const startIdx = (simIndex - 1) * 10;
    const simQuestions = allQs.slice(startIdx, startIdx + 10);
    if (simQuestions.length === 0) return;

    const initialAnswers: Record<string, QuestionState> = {};
    simQuestions.forEach(q => {
      initialAnswers[q.id] = { answered: false, isFlagged: false };
    });

    const newSession: ExamSession = {
      sessionId: `sim_${weekId}_${simIndex}_${Date.now()}`,
      weekId,
      title: `Simulasi ${simIndex} - Modul Minggu ${weekId} (10 Soal)`,
      mode: 'simulation',
      simulationIndex: simIndex,
      startTime: Date.now(),
      timeLimitMinutes: 0,
      elapsedSeconds: 0,
      isFinished: false,
      questionIds: simQuestions.map(q => q.id),
      currentIndex: 0,
      answers: initialAnswers,
    };

    setSessionQuestions(simQuestions);
    setCurrentSession(newSession);

    navigateState({
      tab: currentTabRef.current,
      isExamActive: true,
      isExamFinished: false,
      examWeekId: weekId,
      examMode: 'practice',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigateState]);

  // Drill specifically on missed questions
  const handleDrillWrong = useCallback((wrongQuestions: Question[]) => {
    if (!wrongQuestions || wrongQuestions.length === 0) return;

    const initialAnswers: Record<string, QuestionState> = {};
    wrongQuestions.forEach(q => {
      initialAnswers[q.id] = {
        answered: false,
        isFlagged: false,
      };
    });

    const newSession: ExamSession = {
      sessionId: `sess_remedial_${Date.now()}`,
      weekId: currentSession?.weekId || 1,
      title: `Remedial Mandiri (${wrongQuestions.length} Soal Perlu Perbaikan)`,
      mode: 'practice',
      startTime: Date.now(),
      timeLimitMinutes: 0,
      elapsedSeconds: 0,
      isFinished: false,
      questionIds: wrongQuestions.map(q => q.id),
      currentIndex: 0,
      answers: initialAnswers,
    };

    setSessionQuestions(wrongQuestions);
    setCurrentSession(newSession);

    navigateState({
      tab: currentTabRef.current,
      isExamActive: true,
      isExamFinished: false,
      examWeekId: newSession.weekId,
      examMode: 'practice',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSession, navigateState]);

  // Handle answering a question
  const handleAnswerQuestion = useCallback((questionId: string, value: UserAnswerValue) => {
    if (!currentSession || currentSession.isFinished) return;

    setCurrentSession(prev => {
      if (!prev) return null;
      const prevAnswers = prev.answers;
      const prevQState = prevAnswers[questionId] || { answered: false, isFlagged: false };

      return {
        ...prev,
        answers: {
          ...prevAnswers,
          [questionId]: {
            ...prevQState,
            answered: true,
            value,
          },
        },
      };
    });
  }, [currentSession]);

  // Toggle flag / ragu-ragu
  const handleToggleFlag = useCallback((questionId: string) => {
    if (!currentSession || currentSession.isFinished) return;

    setCurrentSession(prev => {
      if (!prev) return null;
      const prevAnswers = prev.answers;
      const prevQState = prevAnswers[questionId] || { answered: false, isFlagged: false };

      return {
        ...prev,
        answers: {
          ...prevAnswers,
          [questionId]: {
            ...prevQState,
            isFlagged: !prevQState.isFlagged,
          },
        },
      };
    });
  }, [currentSession]);

  // Toggle bookmark for a question
  const handleToggleBookmark = useCallback((questionId: string) => {
    const userKey = currentUser?.id || currentUser?.email;
    toggleBookmarkQuestion(questionId, userKey);
    refreshProgress();
  }, [currentUser?.id, currentUser?.email, refreshProgress]);

  // Jump question index
  const handleJumpToQuestion = useCallback((index: number) => {
    if (!currentSession) return;
    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIndex: Math.max(0, Math.min(index, sessionQuestions.length - 1)),
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sessionQuestions.length]);

  // Finish session & record statistics
  const handleFinishSession = useCallback(() => {
    if (!currentSession || currentSession.isFinished) return;

    const summary = calculateSessionSummary(sessionQuestions, currentSession.answers);
    const elapsed = Math.floor((Date.now() - currentSession.startTime) / 1000);

    const finishedSession: ExamSession = {
      ...currentSession,
      isFinished: true,
      elapsedSeconds: elapsed,
      finalScore: summary.finalScore,
      accuracyRate: summary.accuracyRate,
      summary: {
        total: summary.totalQuestions,
        correct: summary.correctCount,
        partial: summary.partialCount,
        wrong: summary.wrongCount,
        unanswered: summary.unansweredCount,
      },
    };

    const userKey = currentUser?.id || currentUser?.email;

    // 1. Save record to local persistent storage (user-scoped)
    recordCompletedSession({
      sessionId: finishedSession.sessionId,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      weekId: finishedSession.weekId,
      score: summary.finalScore,
      correct: summary.correctCount,
      total: summary.totalQuestions,
      timeSpentSeconds: elapsed,
      mode: finishedSession.mode,
    }, userKey);

    // 2. Save record to remote MySQL backend via .env configuration
    const wrongQuestionIds = sessionQuestions
      .filter(q => {
        const state = currentSession.answers[q.id];
        return !state || !state.answered;
      })
      .map(q => q.id);

    saveExamToDatabase({
      userId: currentUser?.id || 'guest',
      userEmail: currentUser?.email || 'guest@smk.belajar.id',
      userName: currentUser?.namaLengkap || 'Siswa Mandiri',
      asalSekolah: currentUser?.asalSekolah || 'SMK TJKT',
      weekId: finishedSession.weekId,
      title: finishedSession.title,
      score: summary.finalScore,
      correctCount: summary.correctCount,
      totalQuestions: summary.totalQuestions,
      timeSpentSeconds: elapsed,
      isCompetent: summary.finalScore >= 75,
      mode: finishedSession.mode,
      wrongQuestionIds,
    });

    if (currentSession.mode === 'simulation' && currentSession.simulationIndex) {
      recordCompletedSimulation(currentSession.weekId, currentSession.simulationIndex, userKey);
      setUserProgress(loadUserProgress(userKey));
    }

    refreshProgress();
    setCurrentSession(finishedSession);
    navigateState({
      tab: currentTabRef.current,
      isExamActive: false,
      isExamFinished: true,
      examWeekId: finishedSession.weekId,
    }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSession, sessionQuestions, currentUser, navigateState, refreshProgress]);

  // Exit back to dashboard or previous view via history
  const handleExitSession = useCallback(() => {
    currentSessionRef.current = null;
    setCurrentSession(null);
    setSessionQuestions([]);
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleSelectTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [handleSelectTab]);

  // Retry active session
  const handleRetrySession = useCallback(() => {
    if (!currentSession) return;
    const mode: 'exam' | 'practice' = currentSession.mode === 'exam' ? 'exam' : 'practice';
    handleStartWeekSession(currentSession.weekId || 1, mode);
  }, [currentSession, handleStartWeekSession]);

  // Jump from week card to Question Bank view
  const handleExploreWeek = useCallback((weekId: number) => {
    setBankSelectedWeek(weekId);
    setCurrentTab('bank');
    navigateState({ tab: 'bank', bankWeek: weekId, isExamActive: false, isExamFinished: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigateState]);

  // Jump from week card to Learning Material view
  const handleReadMaterial = useCallback((weekId: number) => {
    setLearningSelectedWeek(weekId);
    setCurrentTab('learning');
    navigateState({ tab: 'learning', learningWeek: weekId, isExamActive: false, isExamFinished: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigateState]);

  // Reset all progress
  const handleResetProgress = useCallback(async () => {
    const userKey = currentUser?.id || currentUser?.email;
    resetAllUserProgress(userKey);
    if (currentUser) {
      await resetRemoteUserProgress(currentUser.email, currentUser.id);
    }
    refreshProgress();
  }, [currentUser, refreshProgress]);

  // Toggle module completed
  const handleToggleModuleCompleted = useCallback((weekId: number) => {
    const userKey = currentUser?.id || currentUser?.email;
    toggleModuleCompleted(weekId, userKey);
    refreshProgress();
  }, [currentUser?.id, currentUser?.email, refreshProgress]);

  return (
    <div className={`min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${brandingConfig.fontStyle || 'font-sans'} selection:bg-blue-500 selection:text-white flex flex-col`}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenSettings={() => {
          setIsSettingsOpen(true);
          navigateState({ isSettingsOpen: true }, { skipScroll: true });
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenTopScores={() => setIsTopScoresOpen(true)}
        brandingConfig={brandingConfig}
      />

      {/* Main Container */}
      <main className={`flex-1 w-full mx-auto ${!currentUser ? 'p-0 max-w-none' : 'max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8'}`}>
        {/* Render Active Quiz Session if ongoing */}
        {currentSession && !currentSession.isFinished ? (
          <QuizSessionView
            session={currentSession}
            questions={sessionQuestions}
            isBookmarked={
              sessionQuestions[currentSession.currentIndex]
                ? userProgress.bookmarkedQuestionIds.includes(
                    sessionQuestions[currentSession.currentIndex].id
                  )
                : false
            }
            onAnswerQuestion={handleAnswerQuestion}
            onToggleFlag={handleToggleFlag}
            onToggleBookmark={handleToggleBookmark}
            onJumpToQuestion={handleJumpToQuestion}
            onFinishSession={handleFinishSession}
            onExitSession={handleExitSession}
          />
        ) : currentSession && currentSession.isFinished ? (
          /* Render Session Results & Pembahasan Otomatis */
          <SessionResultView
            session={currentSession}
            questions={sessionQuestions}
            bookmarkedIds={userProgress.bookmarkedQuestionIds}
            onRetry={handleRetrySession}
            onDrillWrong={handleDrillWrong}
            onBackToDashboard={handleExitSession}
            onToggleBookmark={handleToggleBookmark}
          />
        ) : !currentUser ? (
          /* Sebelum Login: Halaman Depan Publik & Autentikasi */
          <HomeOverviewView
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onOpenDashboard={() => handleOpenAuth('login')}
            onOpenHeroSettings={() => setIsHeroSettingsOpen(true)}
            onOpenTopScores={() => setIsTopScoresOpen(true)}
            heroConfig={heroConfig}
          />
        ) : (
          /* Render Tabs Setelah Siswa Terautentikasi */
          <div key={currentTab} className="animate-fade-in w-full">
            {currentTab === 'home' && (
              (currentUser.role === 'admin' || currentUser.role === 'guru') ? (
                <TeacherDashboardView 
                  currentUser={currentUser} 
                  onRefresh={refreshProgress} 
                  onOpenHeroSettings={() => setIsHeroSettingsOpen(true)}
                  onOpenContactSettings={() => setIsContactSettingsOpen(true)}
                  onOpenBrandingSettings={() => setIsBrandingSettingsOpen(true)}
                  showScoreRecap={false}
                />
              ) : (
                <DashboardView
                  progress={userProgress}
                  viewMode="home"
                  onNavigateToModules={() => {
                    setCurrentTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onStartExam={handleStartWeekSession}
                  onStartSimulation={handleStartSimulation}
                  onExploreWeek={handleExploreWeek}
                  onReadMaterial={handleReadMaterial}
                  currentUser={currentUser}
                  onOpenAuth={handleOpenAuth}
                  onOpenTeacher={() => {
                    setCurrentTab('teacher');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenTopScores={() => setIsTopScoresOpen(true)}
                />
              )
            )}

            {currentTab === 'dashboard' && (
              <DashboardView
                progress={userProgress}
                viewMode="modules"
                onNavigateToModules={() => {
                  setCurrentTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onStartExam={handleStartWeekSession}
                onStartSimulation={handleStartSimulation}
                onExploreWeek={handleExploreWeek}
                onReadMaterial={handleReadMaterial}
                currentUser={currentUser}
                onOpenAuth={handleOpenAuth}
                onOpenTeacher={() => {
                  setCurrentTab('teacher');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenTopScores={() => setIsTopScoresOpen(true)}
              />
            )}

            {currentTab === 'learning' && (
              <LearningMaterialView
                initialWeekId={learningSelectedWeek}
                completedModuleWeeks={userProgress.completedModuleWeeks}
                onStartExam={(weekId, mode) => handleStartWeekSession(weekId, mode)}
                onExploreQuestions={handleExploreWeek}
                onToggleModuleCompleted={handleToggleModuleCompleted}
                onBack={() => {
                  setCurrentTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectWeek={(w) => setLearningSelectedWeek(w)}
              />
            )}

            {currentTab === 'bank' && (
              <QuestionBankView
                initialWeekId={bankSelectedWeek}
                bookmarkedIds={userProgress.bookmarkedQuestionIds}
                onToggleBookmark={handleToggleBookmark}
                onStartExam={(weekId, mode) => handleStartWeekSession(weekId, mode)}
                onBack={() => {
                  setCurrentTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectWeek={(w) => setBankSelectedWeek(w)}
              />
            )}

            {currentTab === 'stats' && (
              <ProgressStatsView
                progress={userProgress}
                currentUser={currentUser}
                onStartWeekExam={handleStartWeekSession}
                onResetProgress={handleResetProgress}
                onSyncProgress={handleSyncProgress}
                onToggleModuleCompleted={handleToggleModuleCompleted}
              />
            )}

            {currentTab === 'teacher' && (
              <TeacherDashboardView 
                currentUser={currentUser} 
                onRefresh={refreshProgress} 
                onOpenHeroSettings={() => setIsHeroSettingsOpen(true)}
                onOpenContactSettings={() => setIsContactSettingsOpen(true)}
                onOpenBrandingSettings={() => setIsBrandingSettingsOpen(true)}
                showScoreRecap={true}
                onNavigateToUsers={() => {
                  setCurrentTab('users');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'users' && (
              <UserManagementView
                currentUser={currentUser}
                onRefresh={refreshProgress}
                onNavigateToTeacher={() => {
                  setCurrentTab('teacher');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'schools' && (
              <SchoolListView
                currentUser={currentUser}
                onRefresh={refreshProgress}
                onNavigateToUsers={() => {
                  setCurrentTab('users');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Auth Modal (Form & Google Sign-In with mandatory 6-digit Email Verification) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          if ((window.history.state as AppHistoryState | null)?.isAuthOpen) {
            window.history.back();
          }
        }}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* Top Scores / Leaderboard Modal */}
      <TopScoresModal
        isOpen={isTopScoresOpen}
        onClose={() => setIsTopScoresOpen(false)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Feedback / Kritik dan Saran Notification Notification */}
      <FeedbackNotificationModal currentUser={currentUser} />

      {/* Account Settings Modal */}
      {currentUser && (
        <AccountSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => {
            setIsSettingsOpen(false);
            if ((window.history.state as AppHistoryState | null)?.isSettingsOpen) {
              window.history.back();
            }
          }}
          currentUser={currentUser}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            setStoredUser(updated);
          }}
          onOpenHeroSettings={() => setIsHeroSettingsOpen(true)}
        />
      )}

      {/* Hero Settings Modal */}
      <HeroSettingsModal
        isOpen={isHeroSettingsOpen}
        onClose={() => setIsHeroSettingsOpen(false)}
        currentUser={currentUser}
        onConfigChange={(newConfig) => {
          setHeroConfig(newConfig);
          saveHeroConfigToDB(newConfig);
        }}
      />

      {/* Contact Info Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentUser={currentUser}
        onOpenSettings={() => setIsContactSettingsOpen(true)}
        contactConfig={contactConfig}
      />

      {/* Contact Settings Modal (Admin Only) */}
      <ContactSettingsModal
        isOpen={isContactSettingsOpen}
        onClose={() => setIsContactSettingsOpen(false)}
        currentUser={currentUser}
        onConfigChange={(newConfig) => {
          setContactConfig(newConfig);
          saveContactConfigToDB(newConfig);
        }}
      />

      {/* Branding & Logo Settings Modal (Admin Only) */}
      <BrandingSettingsModal
        isOpen={isBrandingSettingsOpen}
        onClose={() => setIsBrandingSettingsOpen(false)}
        currentUser={currentUser}
        onConfigChange={(newConfig) => {
          setBrandingConfig(newConfig);
        }}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Simulasi TKA SMK TJKT
            </span>
            <span aria-hidden="true">·</span>
            <span>Bank Soal 8 Minggu (400 Butir)</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="hidden md:inline">Sistem Skor Real-Time</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span className="hidden md:inline">Pembahasan Otomatis Sesi</span>
            {currentUser && (
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hubungi Kami</span>
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
