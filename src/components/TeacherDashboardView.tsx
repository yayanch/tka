import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  FileSpreadsheet, 
  Printer, 
  GraduationCap, 
  Layers, 
  Clock, 
  Database, 
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
  Settings,
  School,
  Mail,
  UserCheck,
  AlertTriangle,
  AlertCircle,
  Trash2,
  Shield,
  ShieldCheck,
  Key,
  Eye,
  EyeOff,
  Calendar,
  BadgeCheck,
  Edit3,
  Phone,
  Image as ImageIcon,
  Server,
  Cpu,
  HardDrive,
  Activity,
  MessageSquarePlus,
  Star,
  Zap,
  RefreshCw,
  Radio,
  Wifi,
  BookOpen,
  Plus,
  PlusCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  BarChart3,
  Trophy,
  Target,
  FileText
} from 'lucide-react';
import { TeacherClassOverview, TeacherStudentSummary, UserProfile, ServerMetrics } from '../types/auth';
import { HourlyLoginStatsCard } from './HourlyLoginStatsCard';
import { SecurityMonitoringView } from './SecurityMonitoringView';
import { StudentReportModal } from './StudentReportModal';
import { ItemAnalysisView } from './ItemAnalysisView';
import { 
  fetchTeacherOverview, 
  deleteStudentAccount,
  fetchServerMetrics,
  fetchQuestionBank,
  addCustomQuestion,
  deleteCustomQuestion
} from '../services/api';

interface DonutDiagramProps {
  title: string;
  subtitle: string;
  percentage: number;
  centerText: string;
  centerSubtext: string;
  icon: React.ReactNode;
  colorScheme: 'emerald' | 'blue' | 'indigo' | 'purple' | 'amber';
  legendItems: { label: string; value: string; color: string }[];
}

const DonutDiagram: React.FC<DonutDiagramProps> = ({
  title,
  subtitle,
  percentage,
  centerText,
  centerSubtext,
  icon,
  colorScheme,
  legendItems
}) => {
  const safePercent = Math.min(100, Math.max(0, percentage));
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * safePercent) / 100;

  const colorMap = {
    emerald: {
      stroke: 'stroke-emerald-500',
      text: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/60',
    },
    blue: {
      stroke: 'stroke-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800/60',
    },
    indigo: {
      stroke: 'stroke-indigo-500',
      text: 'text-indigo-600 dark:text-indigo-400',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800/60',
    },
    purple: {
      stroke: 'stroke-purple-500',
      text: 'text-purple-600 dark:text-purple-400',
      bgLight: 'bg-purple-50 dark:bg-purple-950/40',
      border: 'border-purple-200 dark:border-purple-800/60',
    },
    amber: {
      stroke: 'stroke-amber-500',
      text: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/60',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.blue;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${scheme.bgLight} ${scheme.border} border shrink-0`}>
              {icon}
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                {title}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium">
                {subtitle}
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${scheme.bgLight} ${scheme.text} border ${scheme.border}`}>
            {safePercent}%
          </span>
        </div>

        {/* Diagram Lingkaran (SVG Donut Chart) */}
        <div className="relative flex items-center justify-center my-2.5">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`${scheme.stroke} transition-all duration-700 ease-out`}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className={`text-base sm:text-lg font-black tracking-tight ${scheme.text}`}>
              {centerText}
            </span>
            <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 max-w-[85px] leading-tight truncate">
              {centerSubtext}
            </span>
          </div>
        </div>
      </div>

      {/* Legend list */}
      <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
              <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
              <span className="text-[10px]">{item.label}</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  subLabel?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 44,
  strokeWidth = 4,
  subLabel,
}) => {
  const clampedValue = Math.max(0, Math.min(100, Math.round(value)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  const strokeColor =
    clampedValue === 100
      ? 'text-emerald-500'
      : clampedValue >= 75
      ? 'text-blue-500'
      : clampedValue >= 50
      ? 'text-amber-500'
      : clampedValue > 0
      ? 'text-orange-500'
      : 'text-slate-300 dark:text-slate-600';

  const textColor =
    clampedValue === 100
      ? 'text-emerald-600 dark:text-emerald-400'
      : clampedValue >= 75
      ? 'text-blue-600 dark:text-blue-400'
      : clampedValue >= 50
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-slate-600 dark:text-slate-400';

  return (
    <div className="flex items-center gap-2.5">
      <div 
        className="relative inline-flex items-center justify-center shrink-0" 
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-slate-700/80 fill-none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${strokeColor} fill-none transition-all duration-700 ease-out`}
          />
        </svg>
        <span className={`absolute font-black text-[10px] ${textColor}`}>
          {clampedValue}%
        </span>
      </div>
      {subLabel && (
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
            {clampedValue}%
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">
            {subLabel}
          </span>
        </div>
      )}
    </div>
  );
};

const getRankBadgeClasses = (_rank?: number): string => {
  return 'bg-blue-500 text-white shadow-xs';
};

const MODULE_SHORT_NAMES: Record<number, string> = {
  1: 'Dunia Kerja & Bisnis',
  2: 'Hardware, OS & Server',
  3: 'Switch, VLAN & Routing',
  4: 'K3LH & Budaya 5R',
  5: 'Kabel & Topologi',
  6: 'Fiber Optik & FTTH',
  7: 'OSI/TCP-IP & WLAN',
  8: 'Alat Ukur & SOP TKA',
};

interface TeacherDashboardViewProps {
  currentUser?: UserProfile | null;
  onRefresh?: () => void;
  onOpenHeroSettings?: () => void;
  onOpenContactSettings?: () => void;
  onOpenBrandingSettings?: () => void;
  onOpenExamSettings?: () => void;
  onNavigateToUsers?: () => void;
  showScoreRecap?: boolean;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ 
  currentUser, 
  onRefresh, 
  onOpenHeroSettings,
  onOpenContactSettings,
  onOpenBrandingSettings,
  onOpenExamSettings,
  onNavigateToUsers,
  showScoreRecap = true
}) => {
  const [data, setData] = useState<TeacherClassOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudentSummary | null>(null);
  const [showStudentPasswordModal, setShowStudentPasswordModal] = useState(false);

  // Active section state
  const [activeSection, setActiveSection] = useState<'grades' | 'users' | 'loginLogs' | 'questionBank' | 'security' | 'feedback' | 'itemAnalysis'>('grades');
  const [feedbacksList, setFeedbacksList] = useState<any[]>([]);

  const loadFeedbacks = async () => {
    try {
      const res = await fetch('/api/settings/tka_user_feedbacks');
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.value)) {
          setFeedbacksList(data.value);
          return;
        }
      }
    } catch {
      // ignore
    }
    const list = JSON.parse(localStorage.getItem('tka_user_feedbacks') || '[]');
    setFeedbacksList(list);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Question Bank Management States
  const [questionBankList, setQuestionBankList] = useState<any[]>([]);
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [newQWeek, setNewQWeek] = useState(1);
  const [newQType, setNewQType] = useState('PG');
  const [newQKompetensi, setNewQKompetensi] = useState('Instalasi Perangkat Jaringan');
  const [newQSubKompetensi, setNewQSubKompetensi] = useState('Konfigurasi Router & Switch');
  const [newQKasus, setNewQKasus] = useState('');
  const [newQOptA, setNewQOptA] = useState('');
  const [newQOptB, setNewQOptB] = useState('');
  const [newQOptC, setNewQOptC] = useState('');
  const [newQOptD, setNewQOptD] = useState('');
  const [newQOptE, setNewQOptE] = useState('');
  const [newQCorrect, setNewQCorrect] = useState('A');
  const [newQPembahasan, setNewQPembahasan] = useState('');
  const [qBankSearch, setQBankSearch] = useState('');
  const [qBankWeekFilter, setQBankWeekFilter] = useState(0);

  const loadQuestionBank = async () => {
    const qList = await fetchQuestionBank();
    setQuestionBankList(qList);
  };

  useEffect(() => {
    loadQuestionBank();
  }, []);

  const handleAddQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQKasus.trim()) {
      alert('Pertanyaan/Kasus soal wajib diisi.');
      return;
    }
    const options = [newQOptA, newQOptB, newQOptC, newQOptD, newQOptE].filter(Boolean);
    const res = await addCustomQuestion({
      week: newQWeek,
      type: newQType,
      kompetensi: newQKompetensi,
      subKompetensi: newQSubKompetensi,
      kasus: newQKasus,
      options,
      correctAnswer: newQCorrect,
      pembahasan: newQPembahasan,
    });
    if (res.success) {
      alert('Soal berhasil ditambahkan ke Bank Soal!');
      setIsAddQuestionOpen(false);
      setNewQKasus('');
      setNewQOptA('');
      setNewQOptB('');
      setNewQOptC('');
      setNewQOptD('');
      setNewQOptE('');
      setNewQPembahasan('');
      loadQuestionBank();
    } else {
      alert(`Gagal menambah soal: ${res.message || 'Error'}`);
    }
  };

  const handleDeleteQuestion = async (qId: string) => {
    if (!window.confirm('Hapus soal ini dari Bank Soal?')) return;
    const res = await deleteCustomQuestion(qId);
    if (res.success) {
      loadQuestionBank();
    } else {
      alert('Gagal menghapus soal.');
    }
  };

  const filteredCustomQuestions = useMemo(() => {
    return questionBankList.filter(q => {
      if (qBankWeekFilter !== 0 && q.week !== qBankWeekFilter) return false;
      if (qBankSearch.trim()) {
        const query = qBankSearch.toLowerCase();
        const matchKasus = q.kasus?.toLowerCase().includes(query);
        const matchComp = q.kompetensi?.toLowerCase().includes(query) || q.subKompetensi?.toLowerCase().includes(query);
        if (!matchKasus && !matchComp) return false;
      }
      return true;
    });
  }, [questionBankList, qBankWeekFilter, qBankSearch]);

  // Pagination states
  const [studentPage, setStudentPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [topPage, setTopPage] = useState(1);
  const [onlinePage, setOnlinePage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const TOP_PER_PAGE = 5;
  const ONLINE_PER_PAGE = 5;

  // State for Registered User List (Admin View)
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'siswa' | 'guru' | 'admin'>('all');
  const [userVerificationFilter, setUserVerificationFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Dropdown Action Menu state
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Server Monitoring Metrics State
  const [liveMetrics, setLiveMetrics] = useState<ServerMetrics | null>(null);
  const [isRefreshingMetrics, setIsRefreshingMetrics] = useState(false);
  const [autoRefreshMetrics, setAutoRefreshMetrics] = useState(true);

  const handleRefreshMetrics = async () => {
    setIsRefreshingMetrics(true);
    const [m, overview] = await Promise.all([
      fetchServerMetrics(),
      fetchTeacherOverview(currentUser?.email, currentUser?.role)
    ]);
    if (m) setLiveMetrics(m);
    if (overview) setData(overview);
    setIsRefreshingMetrics(false);
  };

  useEffect(() => {
    if (data?.serverMetrics) {
      setLiveMetrics(data.serverMetrics);
    }
  }, [data?.serverMetrics]);

  useEffect(() => {
    if (!autoRefreshMetrics || currentUser?.role === 'siswa') return;
    const interval = setInterval(async () => {
      const [m, overview] = await Promise.all([
        fetchServerMetrics(),
        fetchTeacherOverview(currentUser?.email, currentUser?.role)
      ]);
      if (m) setLiveMetrics(m);
      if (overview) setData(overview);
    }, 10000);
    return () => clearInterval(interval);
  }, [autoRefreshMetrics, currentUser?.email, currentUser?.role]);

  // Periodic 10-second ticker to smoothly advance displayed online duration
  const [, setDurationTicker] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setDurationTicker(prev => prev + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };
    if (isActionMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionMenuOpen]);


  const schoolOptions = useMemo(() => {
    if (!data?.students) return [];
    const set = new Set<string>();
    data.students.forEach(s => {
      if (s.role !== 'admin' && s.asalSekolah) set.add(s.asalSekolah);
    });
    return Array.from(set);
  }, [data?.students]);

  const totalSchoolsCount = useMemo(() => {
    const set = new Set<string>();
    if (data?.students) {
      data.students.forEach(s => {
        if (s.role !== 'admin' && s.asalSekolah && s.asalSekolah.trim()) {
          set.add(s.asalSekolah.trim().toUpperCase());
        }
      });
    }
    return set.size;
  }, [data?.students]);

  // Table Rekap Sorting types & states
  type StudentSortField = 'name' | 'school' | 'verification' | 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6' | 'm7' | 'm8' | 'belumTuntas';
  type SortDirection = 'asc' | 'desc';

  const [sortField, setSortField] = useState<StudentSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: StudentSortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortField(null);
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      if (field.startsWith('m') || field === 'belumTuntas' || field === 'verification') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
    }
    setStudentPage(1);
  };

  const renderSortIndicator = (field: StudentSortField) => {
    if (sortField === field) {
      return (
        <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold">
          {sortDirection === 'asc' ? (
            <ArrowUp className="w-3.5 h-3.5 inline shrink-0 ml-1" />
          ) : (
            <ArrowDown className="w-3.5 h-3.5 inline shrink-0 ml-1" />
          )}
        </span>
      );
    }
    return (
      <ArrowUpDown className="w-3 h-3 text-slate-300 dark:text-slate-500 opacity-40 group-hover:opacity-100 group-hover:text-slate-600 dark:group-hover:text-slate-300 inline shrink-0 ml-1 transition-opacity" />
    );
  };

  // Filtered students (Excludes Admin accounts from Peserta / Siswa)
  const filteredStudents = useMemo(() => {
    if (!data?.students) return [];
    return data.students.filter(s => {
      if (s.role === 'admin') return false;
      const matchSearch = 
        s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.asalSekolah.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSchool = selectedSchool === 'all' || s.asalSekolah === selectedSchool;
      return matchSearch && matchSchool;
    });
  }, [data?.students, searchQuery, selectedSchool]);

  // Sorted students for Rekap Table
  const sortedStudents = useMemo(() => {
    if (!sortField) return filteredStudents;
    return [...filteredStudents].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = (a.namaLengkap || '').localeCompare(b.namaLengkap || '');
      } else if (sortField === 'school') {
        comparison = (a.asalSekolah || '').localeCompare(b.asalSekolah || '');
      } else if (sortField === 'verification') {
        const aVal = a.isVerified ? 1 : 0;
        const bVal = b.isVerified ? 1 : 0;
        comparison = aVal - bVal;
      } else if (sortField.startsWith('m')) {
        const modNum = parseInt(sortField.replace('m', ''), 10);
        const aScore = a.moduleScores?.[modNum] ?? 0;
        const bScore = b.moduleScores?.[modNum] ?? 0;
        comparison = aScore - bScore;
      } else if (sortField === 'belumTuntas') {
        const aComp = Math.min(8, Math.max(a.completedModulesCount || 0, Object.keys(a.moduleScores || {}).length));
        const bComp = Math.min(8, Math.max(b.completedModulesCount || 0, Object.keys(b.moduleScores || {}).length));
        if (aComp !== bComp) {
          comparison = aComp - bComp;
        } else {
          const aTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (a.moduleScores?.[w] ?? 0) >= 75).length;
          const bTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (b.moduleScores?.[w] ?? 0) >= 75).length;
          if (aTuntas !== bTuntas) {
            comparison = aTuntas - bTuntas;
          } else {
            comparison = (a.averageScore || 0) - (b.averageScore || 0);
          }
        }
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredStudents, sortField, sortDirection]);

  // Apply student pagination
  const paginatedStudents = useMemo(() => {
    const start = (studentPage - 1) * ITEMS_PER_PAGE;
    return sortedStudents.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedStudents, studentPage]);

  // Filter for students currently online opening the application
  const onlineStudentsList = useMemo(() => {
    return filteredStudents.filter(s => Boolean(s.isOnline));
  }, [filteredStudents]);

  const paginatedOnlineStudents = useMemo(() => {
    const start = (onlinePage - 1) * ONLINE_PER_PAGE;
    return onlineStudentsList.slice(start, start + ONLINE_PER_PAGE);
  }, [onlineStudentsList, onlinePage]);

  const totalOnlineCount = useMemo(() => {
    if (!data?.students) return liveMetrics?.activeOnlineStudents || onlineStudentsList.length;
    const online = data.students.filter(s => s.role !== 'admin' && Boolean(s.isOnline)).length;
    return online > 0 ? online : (liveMetrics?.activeOnlineStudents || onlineStudentsList.length);
  }, [data?.students, liveMetrics?.activeOnlineStudents, onlineStudentsList.length]);

  // Top Students list sorted and paginated (5 per page)
  const topStudentsList = useMemo(() => {
    if (!data?.students) return [];
    const studentList = data.students.filter(s => s.role !== 'admin');
    return [...studentList].sort((a, b) => {
      const aTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (a.moduleScores[w] ?? 0) >= 75).length;
      const bTuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (b.moduleScores[w] ?? 0) >= 75).length;
      if (bTuntas !== aTuntas) return bTuntas - aTuntas;

      const aComp = a.completedModulesCount || 0;
      const bComp = b.completedModulesCount || 0;
      if (bComp !== aComp) return bComp - aComp;

      const aAvg = a.averageScore || 0;
      const bAvg = b.averageScore || 0;
      if (bAvg !== aAvg) return bAvg - aAvg;

      return a.namaLengkap.localeCompare(b.namaLengkap);
    });
  }, [data?.students]);

  const paginatedTopStudents = useMemo(() => {
    const start = (topPage - 1) * TOP_PER_PAGE;
    return topStudentsList.slice(start, start + TOP_PER_PAGE);
  }, [topStudentsList, topPage]);

  // Module 1 - 8 Completion Statistics (for Rekap Nilai Siswa)
  const moduleCompletionStats = useMemo(() => {
    const list = filteredStudents || [];
    const totalCount = list.length;

    // Modul 1 s.d. 8 individual statistics
    const modules = [1, 2, 3, 4, 5, 6, 7, 8].map(modNum => {
      const completedStudents = list.filter(s => s.moduleScores?.[modNum] !== undefined && s.moduleScores?.[modNum] !== null);
      const completedCount = completedStudents.length;

      const passedStudents = list.filter(s => (s.moduleScores?.[modNum] ?? 0) >= 75);
      const passedCount = passedStudents.length;

      const totalScore = completedStudents.reduce((acc, s) => acc + (s.moduleScores?.[modNum] || 0), 0);
      const avgScore = completedCount > 0 ? (totalScore / completedCount).toFixed(1) : '-';

      const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      const passPercentage = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

      return {
        modNum,
        completedCount,
        passedCount,
        avgScore,
        completionPercentage,
        passPercentage,
      };
    });

    // Students who completed all 8 modules (has scores for all 8 modules or completedModulesCount >= 8)
    const all8Completed = list.filter(s => {
      const completedModules = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => s.moduleScores?.[w] !== undefined && s.moduleScores?.[w] !== null).length;
      return completedModules === 8 || (s.completedModulesCount || 0) >= 8;
    });

    // Students who passed all 8 modules (all scores >= 75)
    const all8Passed = list.filter(s => {
      return [1, 2, 3, 4, 5, 6, 7, 8].every(w => (s.moduleScores?.[w] ?? 0) >= 75);
    });

    // Students currently in progress (1 - 7 modules)
    const inProgress = list.filter(s => {
      const count = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => s.moduleScores?.[w] !== undefined && s.moduleScores?.[w] !== null).length;
      return count >= 1 && count < 8;
    });

    // Students who have not started (0 modules completed)
    const notStarted = list.filter(s => {
      const count = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => s.moduleScores?.[w] !== undefined && s.moduleScores?.[w] !== null).length;
      return count === 0;
    });

    const totalTuntasAll = list.reduce((acc, s) => {
      const tuntas = [1, 2, 3, 4, 5, 6, 7, 8].filter(w => (s.moduleScores?.[w] ?? 0) >= 75).length;
      return acc + tuntas;
    }, 0);
    const avgTuntasPerStudent = totalCount > 0 ? (totalTuntasAll / totalCount).toFixed(1) : '0';

    return {
      totalCount,
      all8CompletedCount: all8Completed.length,
      all8PassedCount: all8Passed.length,
      inProgressCount: inProgress.length,
      notStartedCount: notStarted.length,
      avgTuntasPerStudent,
      modules,
    };
  }, [filteredStudents]);



  // Filtered Registered Users (Admin View)
  const filteredUsersList = useMemo(() => {
    if (!data?.students) return [];
    return data.students.filter(u => {
      const q = userSearchQuery.toLowerCase();
      const matchSearch =
        u.namaLengkap.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.asalSekolah.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q);

      const userRole = u.role || 'siswa';
      const matchRole = userRoleFilter === 'all' || userRole === userRoleFilter;

      const matchVerification =
        userVerificationFilter === 'all' ||
        (userVerificationFilter === 'verified' && u.isVerified) ||
        (userVerificationFilter === 'unverified' && !u.isVerified);

      return matchSearch && matchRole && matchVerification;
    });
  }, [data?.students, userSearchQuery, userRoleFilter, userVerificationFilter]);

  // Apply user pagination
  const paginatedUsersList = useMemo(() => {
    const start = (userPage - 1) * ITEMS_PER_PAGE;
    return filteredUsersList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsersList, userPage]);

  // Pagination helpers
  const Pagination = ({ 
    currentPage, 
    totalItems, 
    onPageChange,
    label = 'data',
    itemsPerPage = ITEMS_PER_PAGE
  }: { 
    currentPage: number; 
    totalItems: number; 
    onPageChange: (p: number) => void;
    label?: string;
    itemsPerPage?: number;
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-xs bg-slate-50/50 dark:bg-slate-800/40">
        <span className="text-slate-500 font-medium">
          Menampilkan {startItem} - {endItem} dari {totalItems} {label}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))} 
            disabled={currentPage === 1} 
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs"
          >
            Sebelumnya
          </button>
          <span className="font-bold text-slate-800 dark:text-slate-200 px-2">
            {currentPage} / {totalPages}
          </span>
          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} 
            disabled={currentPage === totalPages} 
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors shadow-2xs"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    );
  };





  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'siswa';

  const loadData = async () => {
    setIsLoading(true);
    const result = await fetchTeacherOverview(currentUser?.email, currentUser?.role);
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [currentUser?.email, currentUser?.role]);

  // Delete student account
  const handleDeleteStudent = async (student: TeacherStudentSummary) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data siswa "${student.namaLengkap}" (${student.email}) beserta seluruh riwayat nilainya?`)) {
      return;
    }
    setActionFeedback(null);
    const res = await deleteStudentAccount(student.userId);
    if (res.success) {
      setActionFeedback(`Data siswa "${student.namaLengkap}" berhasil dihapus.`);
      if (selectedStudent?.userId === student.userId) {
        setSelectedStudent(null);
      }
      await loadData();
    } else {
      setActionFeedback(`Gagal menghapus siswa: ${res.message || 'Terjadi kesalahan'}`);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  const formatOnlineTime = (isoString?: string) => {
    if (!isoString) return 'Baru saja';
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return 'Baru saja';
      const isToday = new Date().toDateString() === d.toDateString();
      const timeStr = d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' WIB';

      if (isToday) {
        return timeStr;
      }
      return `${d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}, ${timeStr}`;
    } catch {
      return 'Baru saja';
    }
  };

  const formatOnlineDuration = (seconds?: number, startIso?: string) => {
    let s = seconds;
    if ((s === undefined || s === null || isNaN(s)) && startIso) {
      try {
        const d = new Date(startIso).getTime();
        if (!isNaN(d)) {
          s = Math.max(0, Math.floor((Date.now() - d) / 1000));
        }
      } catch {
        // fallback
      }
    }

    if (s === undefined || s === null || isNaN(s) || s < 0) {
      return '< 1 menit';
    }

    if (s < 60) {
      return `${Math.max(1, s)} detik`;
    }

    const minutes = Math.floor(s / 60);
    if (minutes < 60) {
      return `${minutes} menit`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    if (hours < 24) {
      return remainingMins > 0 ? `${hours} jam ${remainingMins} menit` : `${hours} jam`;
    }

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days} hari ${remainingHours} jam` : `${days} hari`;
  };

  const handleDownloadCsv = () => {
    window.open('/api/teacher/export-csv', '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Action Feedback Notification */}
      {actionFeedback && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs font-semibold text-blue-900 dark:text-blue-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
          <button 
            onClick={() => setActionFeedback(null)}
            className="text-xs font-bold hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Container 1: Header Title & Actions Banner */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-3xl border border-blue-600/30 p-6 sm:p-8 shadow-md relative overflow-visible">
        {/* Decorative background glow circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-200">
              <GraduationCap className="w-4 h-4 text-blue-300" />
              <span>{isStudent ? 'Rapor Nilai Siswa TJKT' : showScoreRecap ? 'Portal Evaluasi & Rekapitulasi Nilai' : 'Portal Guru & Administrator'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isStudent ? 'Rekapitulasi Nilai Saya' : showScoreRecap ? 'Rekap Nilai Siswa' : 'Dashboard Pemantauan Admin'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
              {isStudent 
                ? 'Pantau rekam jejak pengerjaan modul, hasil kuis, dan status verifikasi akun Anda.'
                : showScoreRecap
                ? 'Rekapitulasi capaian nilai 8 modul pembelajaran siswa, evaluasi status ketuntasan (KKM ≥ 75.0), dan cetak lembar rapor.'
                : 'Ringkasan aktivitas belajar siswa, peringkat 10 siswa tuntas, daftar siswa online, dan pemantauan server VPS.'
              }
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            {isStudent && data?.students?.[0] && (
              <button
                type="button"
                onClick={() => setSelectedStudent(data.students[0])}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-blue-900 bg-white hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                title="Buka 10 Rancangan Rapor Anda"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Buka 10 Rancangan Rapor</span>
              </button>
            )}

            {/* Single Consolidated Dropdown Action Button */}
            <div className="relative" ref={actionMenuRef}>
              <button
                type="button"
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-white/25 active:bg-white/30 border border-white/25 backdrop-blur-md shadow-xs transition-colors cursor-pointer"
                title="Buka menu aksi dan pengaturan"
                aria-expanded={isActionMenuOpen}
              >
                <Settings className="w-4 h-4 text-blue-200" />
                <span>Menu Aksi & Pengaturan</span>
                <ChevronDown className={`w-3.5 h-3.5 text-blue-200 transition-transform duration-200 ${isActionMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isActionMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      const target = (data?.students && data.students.length > 0) ? data.students[0] : null;
                      if (target) setSelectedStudent(target);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">10 Desain Rapor Siswa</div>
                      <div className="text-[10px] text-slate-400 font-normal">Pilih & cetak 10 model rapor resmi</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  {!isStudent && (
                    <>
                      <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Pengaturan Tampilan
                      </div>

                      {onOpenContactSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenContactSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Kontak</div>
                            <div className="text-[10px] text-slate-400 font-normal">Kontak bantuan WhatsApp & email</div>
                          </div>
                        </button>
                      )}

                      {onOpenBrandingSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenBrandingSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Logo & Favicon</div>
                            <div className="text-[10px] text-slate-400 font-normal">Logo header, favicon, & simpan ke database</div>
                          </div>
                        </button>
                      )}

                      {onOpenHeroSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenHeroSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                            <Edit3 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Hero</div>
                            <div className="text-[10px] text-slate-400 font-normal">Teks banner beranda depan</div>
                          </div>
                        </button>
                      )}

                      {onOpenExamSettings && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsActionMenuOpen(false);
                            onOpenExamSettings();
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">Pengaturan Durasi Ujian</div>
                            <div className="text-[10px] text-slate-400 font-normal">Waktu timer & durasi per modul</div>
                          </div>
                        </button>
                      )}

                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

                      <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Navigasi & Analitik
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setActiveSection('loginLogs');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                          <BarChart3 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">Statistik & Log Login</div>
                          <div className="text-[10px] text-slate-400 font-normal">Grafik per jam & audit login</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setActiveSection('questionBank');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                          <BookOpen className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">Bank Soal TKA</div>
                          <div className="text-[10px] text-slate-400 font-normal">Kelola & tambah butir soal</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setActiveSection('itemAnalysis');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">Analisis Butir Soal</div>
                          <div className="text-[10px] text-slate-400 font-normal">Tingkat kesukaran, daya pembeda & pengecoh</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setActiveSection('security');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">Monitoring Keamanan</div>
                          <div className="text-[10px] text-slate-400 font-normal">Audit log, Rate Limiter & Proteksi</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          loadFeedbacks();
                          setActiveSection('feedback');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                          <MessageSquarePlus className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">Kritik & Saran Siswa</div>
                          <div className="text-[10px] text-slate-400 font-normal">Kotak masuk masukan & rating</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsActionMenuOpen(false);
                          setActiveSection('grades');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                          <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">Dashboard Utama</div>
                          <div className="text-[10px] text-slate-400 font-normal">Ringkasan Top 10 & siswa online</div>
                        </div>
                      </button>

                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />
                    </>
                  )}

                  <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Ekspor & Cetak
                  </div>

                  {!isStudent && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsActionMenuOpen(false);
                        handleDownloadCsv();
                      }}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">Ekspor Excel / CSV</div>
                        <div className="text-[10px] text-slate-400 font-normal">Unduh rekap nilai & data siswa</div>
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsActionMenuOpen(false);
                      handlePrint();
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 shrink-0">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">Cetak Rekap</div>
                      <div className="text-[10px] text-slate-400 font-normal">Cetak fisik atau simpan PDF</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Quick Refresh Data Button */}
            <button
              type="button"
              onClick={loadData}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Segarkan Data"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Container 2: Quick Summary Stats Grid (Only on Dashboard Admin) */}
      {!showScoreRecap && (
        <section className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Card 1: Total Siswa */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700/60 transition-all flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
                  {isStudent ? 'Siswa' : 'Total Siswa Terdaftar'}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                {data?.totalStudents || 0}
              </span>
            </div>

            {/* Card 2: Jumlah Sekolah Terdaftar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700/60 transition-all flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold block leading-tight">
                  Jumlah Sekolah Terdaftar
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-xs">
                  <School className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 tabular-nums">
                {totalSchoolsCount}
              </span>
            </div>

            {/* Card 3: Siswa Sedang Online */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
                    Siswa Sedang Online
                  </span>
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Radio className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                {totalOnlineCount}
              </span>
            </div>

            {/* Card 4: Total Ujian Selesai / Modul Diselesaikan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
                  {isStudent ? 'Modul Diselesaikan' : 'Total Ujian Selesai'}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                {isStudent ? `${data?.students?.[0]?.completedModulesCount || 0} / 8` : (data?.totalExamsTaken || 0)}
              </span>
            </div>

            {/* Card 5: Rata-Rata Nilai / Rata-Rata Angkatan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-300 dark:hover:border-amber-700/60 transition-all flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium block truncate">
                  {isStudent ? 'Rata-Rata Nilai' : 'Rata-Rata Angkatan'}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-black text-amber-500 tabular-nums">
                {isStudent ? `${data?.students?.[0]?.averageScore || 0}%` : `${data?.classAverageScore ? data.classAverageScore : 0}%`}
              </span>
            </div>
          </div>

        </section>
      )}



      {/* Conditional View: Login Logs vs Grades Recap */}
      {activeSection === 'loginLogs' && !isStudent ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveSection('grades')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <span>&larr; Kembali ke Ringkasan Dashboard</span>
            </button>
            <button
              onClick={loadData}
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Muat Ulang Data</span>
            </button>
          </div>

          {/* Hourly Login Stats Card */}
          <HourlyLoginStatsCard 
            loginLogs={data?.loginLogs} 
            schoolOptions={schoolOptions}
          />

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Log Audit Riwayat Login Siswa (Tabel Lengkap)
                </h3>
                <p className="text-xs text-slate-500">
                  Catatan riwayat masuk (login) akun siswa beserta metode autentikasi dan alamat IP
                </p>
              </div>
            </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">Waktu Login</th>
                  <th className="px-4 py-3">Nama Siswa</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Asal Sekolah</th>
                  <th className="px-4 py-3">Peran (Role)</th>
                  <th className="px-4 py-3">Metode Login</th>
                  <th className="px-4 py-3">Alamat IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(!data?.loginLogs || data.loginLogs.filter((log: any) => log.role !== 'admin').length === 0) ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      Belum ada log login siswa yang terekam.
                    </td>
                  </tr>
                ) : (
                  data.loginLogs.filter((log: any) => log.role !== 'admin').map((log: any) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {formatDate(log.loginAt || log.login_at)}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-slate-900 dark:text-white uppercase whitespace-nowrap">
                        {log.userName || log.user_name}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                        {log.userEmail || log.user_email}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 uppercase">
                        {log.asalSekolah || log.asal_sekolah}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          (log.role === 'admin' || log.role === 'guru')
                            ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                            : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        }`}>
                          {log.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          (log.loginMethod === 'google' || log.login_method === 'google')
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        }`}>
                          {log.loginMethod === 'google' || log.login_method === 'google' ? 'Google Auth' : 'Password Local'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                        {log.ipAddress || log.ip_address || '127.0.0.1'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ) : null}

      {activeSection === 'questionBank' && !isStudent && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Manajemen Bank Soal TKA TJKT</span>
              </h3>
              <p className="text-xs text-slate-500">
                Kelola dan tambahkan butir soal ujian/latihan baru ke dalam database bank soal platform
              </p>
            </div>
            <button
              onClick={() => setIsAddQuestionOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Soal Baru</span>
            </button>
          </div>

          {/* Add Question Modal */}
          {isAddQuestionOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-blue-600" />
                    <span>Form Tambah Soal Baru ke Bank Soal</span>
                  </h3>
                  <button
                    onClick={() => setIsAddQuestionOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
                  >
                    ✕ Tutup
                  </button>
                </div>

                <form onSubmit={handleAddQuestionSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Modul Minggu (1 - 8)</label>
                      <select
                        value={newQWeek}
                        onChange={(e) => setNewQWeek(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
                          <option key={w} value={w}>Minggu {w}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tipe Soal</label>
                      <select
                        value={newQType}
                        onChange={(e) => setNewQType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-white"
                      >
                        <option value="PG">Pilihan Ganda (PG)</option>
                        <option value="PGK_KATEGORI">PGK Kategori (Benar/Salah)</option>
                        <option value="PGK_MCMA">PGK MCMA (Pilihan Ganda Kompleks)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kompetensi</label>
                      <input
                        type="text"
                        value={newQKompetensi}
                        onChange={(e) => setNewQKompetensi(e.target.value)}
                        placeholder="Contoh: Instalasi Perangkat Jaringan"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Sub-Kompetensi</label>
                      <input
                        type="text"
                        value={newQSubKompetensi}
                        onChange={(e) => setNewQSubKompetensi(e.target.value)}
                        placeholder="Contoh: Konfigurasi VLAN & Trunking"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pertanyaan / Kasus Soal *</label>
                    <textarea
                      rows={3}
                      value={newQKasus}
                      onChange={(e) => setNewQKasus(e.target.value)}
                      placeholder="Tuliskan skenario kasus atau pertanyaan ujian di sini..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold text-slate-700 dark:text-slate-300">Opsi Jawaban</label>
                    <input type="text" value={newQOptA} onChange={(e) => setNewQOptA(e.target.value)} placeholder="Opsi A" className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" />
                    <input type="text" value={newQOptB} onChange={(e) => setNewQOptB(e.target.value)} placeholder="Opsi B" className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" />
                    <input type="text" value={newQOptC} onChange={(e) => setNewQOptC(e.target.value)} placeholder="Opsi C" className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" />
                    <input type="text" value={newQOptD} onChange={(e) => setNewQOptD(e.target.value)} placeholder="Opsi D" className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" />
                    <input type="text" value={newQOptE} onChange={(e) => setNewQOptE(e.target.value)} placeholder="Opsi E (Opsional)" className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kunci Jawaban Benar</label>
                      <input
                        type="text"
                        value={newQCorrect}
                        onChange={(e) => setNewQCorrect(e.target.value)}
                        placeholder="Contoh: A atau [0]"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pembahasan Terperinci</label>
                    <textarea
                      rows={2}
                      value={newQPembahasan}
                      onChange={(e) => setNewQPembahasan(e.target.value)}
                      placeholder="Penjelasan mengapa jawaban tersebut benar..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setIsAddQuestionOpen(false)}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm cursor-pointer"
                    >
                      Simpan Soal Baru
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Filter & Search Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={qBankSearch}
                onChange={(e) => setQBankSearch(e.target.value)}
                placeholder="Cari kata kunci soal atau kompetensi..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Modul:</span>
              <select
                value={qBankWeekFilter}
                onChange={(e) => setQBankWeekFilter(Number(e.target.value))}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value={0}>Semua Minggu (1 - 8)</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
                  <option key={w} value={w}>Minggu {w}</option>
                ))}
              </select>
              <button
                onClick={loadQuestionBank}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl text-slate-700 dark:text-slate-300 cursor-pointer"
                title="Muat Ulang Bank Soal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredCustomQuestions.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-bold">Belum ada soal kustom dalam bank soal.</p>
                <p className="text-xs mt-1">Tekan tombol "Tambah Soal Baru" untuk mulai memasukkan soal ujian.</p>
              </div>
            ) : (
              filteredCustomQuestions.map((q, idx) => (
                <div key={q.id || idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-extrabold">
                        Modul Minggu {q.week}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] font-bold">
                        {q.type}
                      </span>
                      <span className="text-xs text-slate-400 font-medium truncate max-w-xs sm:max-w-md">
                        {q.kompetensi} &bull; {q.subKompetensi}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Soal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                    {q.kasus}
                  </p>

                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map((opt: string, optIdx: number) => {
                        const optLetter = String.fromCharCode(65 + optIdx);
                        const isCorrect = q.correctAnswer?.toUpperCase() === optLetter || q.correctAnswer === String(optIdx);
                        return (
                          <div 
                            key={optIdx} 
                            className={`p-2 rounded-xl text-xs border flex items-start gap-2 ${
                              isCorrect 
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="font-mono font-bold shrink-0">{optLetter}.</span>
                            <span>{opt}</span>
                            {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-auto" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {q.pembahasan && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-300">Pembahasan:</strong> {q.pembahasan}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeSection === 'security' && !isStudent && currentUser && (
        <SecurityMonitoringView currentUser={currentUser} onRefresh={onRefresh} />
      )}

      {activeSection === 'itemAnalysis' && !isStudent && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveSection('grades')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <span>&larr; Kembali ke Ringkasan Dashboard</span>
            </button>
          </div>

          <ItemAnalysisView 
            sessionAnswersList={[]}
            onBackToDashboard={() => setActiveSection('grades')}
          />
        </div>
      )}

      {activeSection === 'feedback' && !isStudent && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveSection('grades')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <span>&larr; Kembali ke Ringkasan Dashboard</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={loadFeedbacks}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Muat Ulang</span>
              </button>
              {feedbacksList.length > 0 && (
                <button
                  onClick={async () => {
                    if (window.confirm('Hapus semua riwayat kritik dan saran?')) {
                      try {
                        await fetch('/api/settings/tka_user_feedbacks', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify([]),
                        });
                      } catch {
                        // ignore
                      }
                      localStorage.removeItem('tka_user_feedbacks');
                      setFeedbacksList([]);
                    }
                  }}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Bersihkan Semua</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-blue-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <MessageSquarePlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    Kotak Masuk Kritik & Saran Siswa
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Menampilkan seluruh masukan, ide fitur, evaluasi soal, dan laporan bug yang dikirimkan oleh siswa.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-3">
              {feedbacksList.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <MessageSquarePlus className="w-12 h-12 mx-auto opacity-40" />
                  <p className="text-sm font-semibold">Belum ada kritik atau saran yang dikirimkan siswa.</p>
                  <p className="text-xs text-slate-400">Siswa dapat mengirimkan masukan melalui pop-up notifikasi di akun masing-masing.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {feedbacksList.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm uppercase">
                            {item.user}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            ({item.email})
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 uppercase">
                            {item.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= (item.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {new Date(item.createdAt).toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'grades' && (
        showScoreRecap ? (
          <>
            {/* Card Statistik Jumlah yang Sudah Selesai Modul 1 - 8 */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{isStudent ? 'Status Penyelesaian Modul 1 - 8' : 'Penyelesaian Modul 1 s.d. 8'}</span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                        {selectedSchool === 'all' ? 'Semua Sekolah' : selectedSchool}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isStudent 
                        ? 'Capaian dan kelengkapan 8 modul pembelajaran yang telah Anda selesaikan.' 
                        : 'Ringkasan jumlah siswa yang telah menyelesaikan Modul 1 sampai 8 beserta rincian capaian per modul.'}
                    </p>
                  </div>
                </div>

                {!isStudent && (
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Total Terdata: <strong className="text-slate-900 dark:text-white font-bold">{moduleCompletionStats.totalCount} Siswa</strong>
                    </span>
                  </div>
                )}
              </div>

              {/* Highlight Stat Cards: Selesai Penuh 1-8, Berproses, Belum Mulai */}
              {!isStudent ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Card 1: Selesai Seluruh Modul 1-8 */}
                  <div 
                    onClick={() => handleSort('belumTuntas')}
                    className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs hover:shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
                    title="Klik untuk mengurutkan siswa berdasarkan ketuntasan modul"
                  >
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 truncate">
                        <Trophy className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>Selesai Modul 1 - 8</span>
                      </span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                        {moduleCompletionStats.totalCount > 0 ? Math.round((moduleCompletionStats.all8CompletedCount / moduleCompletionStats.totalCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="text-2xl font-black text-indigo-950 dark:text-white tabular-nums">
                      {moduleCompletionStats.all8CompletedCount} <span className="text-xs font-semibold text-slate-500">Siswa</span>
                    </div>
                    <div className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{moduleCompletionStats.all8PassedCount} tuntas KKM (≥75)</span>
                    </div>
                  </div>

                  {/* Card 2: Berproses (1 - 7 Modul) */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 truncate">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Sedang Berproses (1-7)</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                        {moduleCompletionStats.totalCount > 0 ? Math.round((moduleCompletionStats.inProgressCount / moduleCompletionStats.totalCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                      {moduleCompletionStats.inProgressCount} <span className="text-xs font-semibold text-slate-500">Siswa</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Menyelesaikan 1 s.d. 7 modul
                    </div>
                  </div>

                  {/* Card 3: Belum Memulai (0 Modul) */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 truncate">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Belum Mulai (0 Modul)</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {moduleCompletionStats.totalCount > 0 ? Math.round((moduleCompletionStats.notStartedCount / moduleCompletionStats.totalCount) * 100) : 0}%
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                      {moduleCompletionStats.notStartedCount} <span className="text-xs font-semibold text-slate-500">Siswa</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Belum mengerjakan ujian
                    </div>
                  </div>

                  {/* Card 4: Rata-Rata Modul Tuntas */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 truncate">
                        <Award className="w-3.5 h-3.5 text-blue-500" />
                        <span>Rata-Rata Modul Tuntas</span>
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                      {moduleCompletionStats.avgTuntasPerStudent} <span className="text-xs font-semibold text-slate-500">/ 8 Modul</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Standar kelulusan KKM ≥ 75.0
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-0.5">
                      Progres Pembelajaran Anda
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {data?.students?.[0]?.completedModulesCount || 0} dari 8 Modul Selesai
                    </div>
                  </div>
                  <div className="w-full sm:w-64 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round(((data?.students?.[0]?.completedModulesCount || 0) / 8) * 100))}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Grid 8 Cards: Modul 1 s.d. Modul 8 */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-500" />
                    <span>Rincian Jumlah Siswa Selesai per Modul (Modul 1 - 8)</span>
                  </span>
                  {!isStudent && (
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Klik card modul untuk mengurutkan nilai di tabel
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
                  {moduleCompletionStats.modules.map(mod => {
                    const isCurrentSorted = sortField === `m${mod.modNum}`;
                    const studentScore = isStudent ? data?.students?.[0]?.moduleScores?.[mod.modNum] : undefined;

                    return (
                      <div
                        key={mod.modNum}
                        onClick={() => {
                          if (!isStudent) {
                            handleSort(('m' + mod.modNum) as StudentSortField);
                          }
                        }}
                        className={`p-3 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                          !isStudent ? 'cursor-pointer' : ''
                        } ${
                          isCurrentSorted
                            ? 'bg-blue-50/90 dark:bg-blue-950/50 border-blue-400 dark:border-blue-600 ring-2 ring-blue-500/30 shadow-xs'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                        title={!isStudent ? `Klik untuk mengurutkan tabel berdasarkan Nilai Modul ${mod.modNum}` : undefined}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-black text-blue-600 dark:text-blue-400">
                              Modul {mod.modNum}
                            </span>
                            {isCurrentSorted && (
                              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                {sortDirection === 'asc' ? '▲' : '▼'}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 line-clamp-1 leading-snug" title={MODULE_SHORT_NAMES[mod.modNum]}>
                            {MODULE_SHORT_NAMES[mod.modNum]}
                          </div>
                        </div>

                        <div>
                          {isStudent ? (
                            <div>
                              <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums leading-none">
                                {studentScore !== undefined ? studentScore.toFixed(0) : '-'}
                              </div>
                              <div className="text-[10px] mt-1">
                                {studentScore !== undefined ? (
                                  studentScore >= 75 ? (
                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tuntas</span>
                                  ) : (
                                    <span className="text-amber-600 dark:text-amber-400 font-bold">Belum Tuntas</span>
                                  )
                                ) : (
                                  <span className="text-slate-400">Belum Selesai</span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-xl font-black text-slate-900 dark:text-white tabular-nums leading-none">
                                {mod.completedCount}
                                <span className="text-[10px] font-medium text-slate-500 ml-1">selesai</span>
                              </div>
                              
                              {/* Circular Donut Chart */}
                              <div className="flex items-center justify-center my-2">
                                <div className="relative w-14 h-14 flex items-center justify-center">
                                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                      className="text-slate-200 dark:text-slate-700"
                                      strokeWidth="3.5"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                      className="text-blue-600 dark:text-blue-400 transition-all duration-500"
                                      strokeDasharray={`${mod.completionPercentage}, 100`}
                                      strokeWidth="3.5"
                                      strokeLinecap="round"
                                      stroke="currentColor"
                                      fill="none"
                                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] font-black text-slate-900 dark:text-white tabular-nums leading-none">
                                      {mod.completionPercentage}%
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                  {mod.completedCount} selesai
                                </span>
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                  {mod.passedCount} tuntas
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Search and School Filter Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setStudentPage(1);
                  }}
                  placeholder="Cari nama siswa, email, atau asal sekolah..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value);
                    setStudentPage(1);
                  }}
                  className="py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 cursor-pointer w-full sm:w-auto"
                >
                  <option value="all">Semua Asal Sekolah ({schoolOptions.length})</option>
                  {schoolOptions.map(sch => (
                    <option key={sch} value={sch}>{sch}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Student Performance Table with Score Recap (Modul 1 s.d. 8) */}
            <div id="section-students" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Tabel Rekapitulasi Nilai Siswa (Modul 1 s.d. 8)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Nilai capaian 8 modul pembelajaran siswa. Standar KKM kelulusan adalah 75.0.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {sortField && (
                    <button
                      onClick={() => { setSortField(null); setSortDirection('asc'); }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer shadow-2xs"
                      title="Klik untuk menghapus pengurutan dan kembali ke default"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        Urut: <strong className="uppercase">{sortField.startsWith('m') ? `Modul ${sortField.replace('m', '')}` : sortField === 'belumTuntas' ? 'Status' : sortField === 'name' ? 'Nama Siswa' : sortField === 'verification' ? 'Verifikasi' : sortField}</strong> ({sortDirection === 'asc' ? 'A-Z / Naik' : 'Z-A / Turun'})
                      </span>
                      <span className="text-blue-400 dark:text-blue-500 font-bold ml-1">✕</span>
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.open('/api/teacher/export-csv', '_blank')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                      title="Unduh Rekap Nilai Format CSV (.csv)"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Ekspor CSV</span>
                    </button>
                    <button
                      onClick={() => {
                        // Export Excel / Tab-separated CSV
                        let csv = 'No,Nama Siswa,Asal Sekolah,Email,Verifikasi,M1,M2,M3,M4,M5,M6,M7,M8,Rata-Rata,Status\n';
                        filteredStudents.forEach((s, idx) => {
                          const scores = [1, 2, 3, 4, 5, 6, 7, 8].map(w => s.moduleScores?.[w] !== undefined ? s.moduleScores[w] : '-');
                          const avg = s.averageScore !== undefined ? s.averageScore.toFixed(1) : '0';
                          const status = (s.averageScore || 0) >= 75 ? 'KOMPETEN' : 'BELUM KOMPETEN';
                          csv += `${idx + 1},"${s.namaLengkap}","${s.asalSekolah}","${s.email}","${s.isVerified ? 'Aktif' : 'Belum'}",${scores.join(',')},${avg},"${status}"\n`;
                        });
                        const blob = new Blob([csv], { type: 'application/vnd.ms-excel;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `Rekap_Nilai_TKA_SMK_TJKT_${selectedSchool}.xls`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                      title="Unduh Rekap Format Excel (.xls)"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ekspor Excel</span>
                    </button>
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                    Total {filteredStudents.length} Siswa
                  </span>
                </div>
              </div>
        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {paginatedStudents.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              Tidak ada data siswa yang cocok dengan pencarian.
            </div>
          ) : (
            paginatedStudents.map((s) => {
              const completedCount = Math.min(8, Math.max(s.completedModulesCount || 0, Object.keys(s.moduleScores || {}).length));
              const completionPct = Math.round((completedCount / 8) * 100);

              return (
                <div 
                  key={s.userId}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-normal text-slate-900 dark:text-white uppercase text-xs flex items-center gap-1.5">
                        <span>{s.namaLengkap}</span>
                        {s.email === currentUser?.email && (
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded normal-case">Anda</span>
                        )}
                      </div>
                      <div className="text-[11px] font-normal text-slate-500 flex items-center gap-1">
                        <School className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="uppercase">{s.asalSekolah}</span>
                      </div>
                    </div>
                    {s.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Aktif</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center">
                      <CircularProgress 
                        value={completionPct}
                        size={36}
                        strokeWidth={3.5}
                        subLabel={`${completedCount}/8 Modul`}
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedStudent(s)}
                        className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                      >
                        Detail Rapor
                      </button>
                      {!isStudent && (
                        <button
                          onClick={() => handleDeleteStudent(s)}
                          title="Hapus Data Siswa"
                          className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th 
                  onClick={() => handleSort('name')}
                  className={`py-3 px-4 cursor-pointer select-none hover:bg-slate-100/90 dark:hover:bg-slate-700/60 transition-colors group ${
                    sortField === 'name' ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' : ''
                  }`}
                  title="Klik untuk mengurutkan Nama Siswa (A-Z / Z-A)"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Nama Siswa & Sekolah</span>
                    {renderSortIndicator('name')}
                  </div>
                </th>

                <th 
                  onClick={() => handleSort('verification')}
                  className={`py-3 px-3 text-center cursor-pointer select-none hover:bg-slate-100/90 dark:hover:bg-slate-700/60 transition-colors group ${
                    sortField === 'verification' ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' : ''
                  }`}
                  title="Klik untuk mengurutkan status Verifikasi (Aktif / Pending)"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Verifikasi</span>
                    {renderSortIndicator('verification')}
                  </div>
                </th>

                {[1, 2, 3, 4, 5, 6, 7, 8].map(mod => {
                  const field = `m${mod}` as StudentSortField;
                  const isActive = sortField === field;
                  return (
                    <th 
                      key={mod}
                      onClick={() => handleSort(field)}
                      className={`py-3 px-2.5 text-center cursor-pointer select-none hover:bg-slate-100/90 dark:hover:bg-slate-700/60 transition-colors group ${
                        isActive ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' : ''
                      }`}
                      title={`Klik untuk mengurutkan Nilai Modul ${mod} (Tertinggi / Terendah)`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span>M{mod}</span>
                        {renderSortIndicator(field)}
                      </div>
                    </th>
                  );
                })}

                <th 
                  onClick={() => handleSort('belumTuntas')}
                  className={`py-3.5 px-4 text-center cursor-pointer select-none hover:bg-slate-100/90 dark:hover:bg-slate-700/60 transition-colors group min-w-[140px] ${
                    sortField === 'belumTuntas' ? 'bg-blue-50/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400' : ''
                  }`}
                  title="Klik untuk mengurutkan status penyelesaian modul (Tertinggi / Terendah)"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Status</span>
                    {renderSortIndicator('belumTuntas')}
                  </div>
                </th>

                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    Tidak ada data siswa yang cocok dengan pencarian.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => {
                  const completedCount = Math.min(8, Math.max(s.completedModulesCount || 0, Object.keys(s.moduleScores || {}).length));
                  const completionPct = Math.round((completedCount / 8) * 100);

                  return (
                    <tr 
                      key={s.userId} 
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-normal text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span className="uppercase">{s.namaLengkap}</span>
                          {s.email === currentUser?.email && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded normal-case">Anda</span>
                          )}
                        </div>
                        <div className="text-[11px] font-normal text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <School className="w-3 h-3 text-slate-400" />
                          <span className="uppercase">{s.asalSekolah}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        {s.isVerified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Aktif</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>

                      {/* Modules 1 to 8 Scores */}
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
                        const score = s.moduleScores[w];
                        return (
                          <td key={w} className="py-3 px-2.5 text-center font-mono">
                            {score !== undefined ? (
                              <span className={`px-1.5 py-0.5 rounded font-bold ${
                                score >= 75 
                                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' 
                                  : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                              }`}>
                                {score.toFixed(0)}
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">-</span>
                            )}
                          </td>
                        );
                      })}

                      {/* Status Progress Penyelesaian Modul (Grafik Lingkaran seperti Top Ten) */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <CircularProgress 
                            value={completionPct}
                            size={40}
                            strokeWidth={3.5}
                            subLabel={`${completedCount} dari 8 Modul`}
                          />
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
                          >
                            Rapor
                          </button>

                          {!isStudent && (
                            <button
                              onClick={() => handleDeleteStudent(s)}
                              title="Hapus Data Siswa"
                              className="p-1 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={studentPage} totalItems={filteredStudents.length} onPageChange={setStudentPage} label="siswa" />
      </div>
          </>
        ) : (
          /* Section: Dashboard Admin Overview (Top 10 Siswa Tuntas & List Siswa Online) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Container 1: Daftar 10 Siswa Paling Banyak Menyelesaikan Modul & Tuntas */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Header Banner Top 10 */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-50/50 via-white to-blue-50/30 dark:from-amber-950/20 dark:via-slate-900 dark:to-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Top 10
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peringkat 10 siswa terbaik berdasarkan jumlah modul tuntas (nilai ≥ 75), total modul diselesaikan, dan rata-rata nilai.
              </p>
            </div>
          </div>
        </div>

        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {paginatedTopStudents.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              Belum ada data pengerjaan modul siswa.
            </div>
          ) : (
            paginatedTopStudents.map((s, idx) => {
              const rank = (topPage - 1) * TOP_PER_PAGE + idx + 1;
              const completedCount = Math.min(8, Math.max(s.completedModulesCount || 0, Object.keys(s.moduleScores || {}).length));
              const completionPct = Math.round((completedCount / 8) * 100);

              return (
                <div 
                  key={s.userId}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-normal text-slate-900 dark:text-white uppercase text-xs">
                        {s.namaLengkap}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-normal text-slate-500 dark:text-slate-400">
                        <School className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="uppercase">{s.asalSekolah || '-'}</span>
                      </div>
                    </div>
                    <span 
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 ${getRankBadgeClasses(rank)}`}
                      title={`Peringkat ${rank}`}
                    >
                      {rank}
                    </span>
                  </div>

                  {/* Progress Bar Melingkar & Persentase Penyelesaian */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      Penyelesaian Modul:
                    </span>
                    <CircularProgress 
                      value={completionPct}
                      size={38}
                      strokeWidth={3.5}
                      subLabel={`${completedCount}/8 Modul`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4 text-center w-20">Peringkat</th>
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Asal Sekolah</th>
                <th className="py-3.5 px-4 text-center w-56">Progress Penyelesaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedTopStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    Belum ada data pengerjaan modul siswa.
                  </td>
                </tr>
              ) : (
                paginatedTopStudents.map((s, idx) => {
                  const rank = (topPage - 1) * TOP_PER_PAGE + idx + 1;
                  const completedCount = Math.min(8, Math.max(s.completedModulesCount || 0, Object.keys(s.moduleScores || {}).length));
                  const completionPct = Math.round((completedCount / 8) * 100);

                  return (
                    <tr 
                      key={s.userId} 
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <span 
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${getRankBadgeClasses(rank)}`}
                            title={`Peringkat ${rank}`}
                          >
                            {rank}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-normal text-slate-900 dark:text-white uppercase">
                          {s.namaLengkap}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-normal">
                        <div className="flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="uppercase">{s.asalSekolah || '-'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center">
                          <CircularProgress 
                            value={completionPct}
                            size={42}
                            strokeWidth={4}
                            subLabel={`${completedCount} dari 8 Modul`}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={topPage} totalItems={topStudentsList.length} onPageChange={setTopPage} label="peringkat" itemsPerPage={TOP_PER_PAGE} />
      </div>

      {/* Container 2: Tabel Siswa Sedang Online */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Header Filter & Status Online Siswa */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-3.5 w-full md:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                {totalOnlineCount}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Online
              </h3>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari siswa online..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Tampilan Mobile: Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50">
          {paginatedOnlineStudents.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              Tidak ada siswa yang sedang online membuka aplikasi saat ini.
            </div>
          ) : (
            paginatedOnlineStudents.map((s) => (
              <div 
                key={s.userId}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="font-normal text-slate-900 dark:text-white uppercase text-xs flex items-center gap-1.5">
                      <span>{s.namaLengkap}</span>
                      <span className="relative flex h-2 w-2" title="Siswa Sedang Online Membuka Aplikasi">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-normal text-slate-500 dark:text-slate-400">
                      <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="uppercase">{s.asalSekolah || '-'}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                    Online
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tampilan Desktop: Tabel */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4">Nama Siswa</th>
                <th className="py-3.5 px-4">Asal Sekolah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedOnlineStudents.length === 0 ? (
                <tr>
                  <td colSpan={2} className="py-12 text-center text-slate-400">
                    Tidak ada siswa yang sedang online membuka aplikasi saat ini.
                  </td>
                </tr>
              ) : (
                paginatedOnlineStudents.map((s) => (
                  <tr 
                    key={s.userId} 
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-normal text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="uppercase">{s.namaLengkap}</span>
                        <span className="relative flex h-2 w-2" title="Siswa Sedang Online Membuka Aplikasi">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-normal">
                      <div className="flex items-center gap-1.5">
                        <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="uppercase">{s.asalSekolah || '-'}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={onlinePage} totalItems={onlineStudentsList.length} onPageChange={setOnlinePage} label="siswa online" itemsPerPage={ONLINE_PER_PAGE} />
      </div>
    </div>
        )
      )}

      {/* Container: Statistik Jumlah Login Peserta Per Jam (Mulai Sejak 06:00 WIB Pagi) */}
      {!showScoreRecap && !isStudent && (
        <HourlyLoginStatsCard 
          loginLogs={data?.loginLogs} 
          schoolOptions={schoolOptions}
          onViewAllLogs={() => setActiveSection('loginLogs')}
        />
      )}

      {/* Container Monitoring Server VPS (Hanya pada Dashboard Admin) */}
      {!showScoreRecap && !isStudent && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
          {/* Section Title & Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Server className="w-4 h-4" />
                <span>Monitoring Spesifikasi & Performa Hardware VPS</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  {liveMetrics?.serverStatus === 'critical' ? 'Beban Tinggi' : liveMetrics?.serverStatus === 'warning' ? 'Perhatian' : 'Sistem Optimal'}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Pemantauan Server VPS (Diagram Lingkaran)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Data realtime diambil langsung dari spek hardware keseluruhan VPS: Multi-Core CPU, pemakaian RAM fisik VPS, koneksi Database, dan Disk Storage VPS.
              </p>
            </div>

            {/* Quick Status Badges & Refresh Action */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Latensi: <strong className="text-slate-900 dark:text-white">{liveMetrics?.latencyMs || 8} ms</strong></span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Uptime VPS: <strong className="text-slate-900 dark:text-white">{liveMetrics?.uptimeFormatted || '0m'}</strong></span>
              </div>

              <button
                type="button"
                onClick={handleRefreshMetrics}
                disabled={isRefreshingMetrics}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer transition-colors"
                title="Segarkan Metrik VPS Realtime"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingMetrics ? 'animate-spin' : ''}`} />
                <span>Segarkan Metrik</span>
              </button>
            </div>
          </div>

          {/* Grid Diagram Lingkaran (4 Donut Charts) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Diagram Lingkaran 1: CPU Load */}
            <DonutDiagram
              title="Beban CPU VPS"
              subtitle={`${liveMetrics?.cpuCount || 2} Core CPU (${liveMetrics?.cpuModel ? liveMetrics.cpuModel.slice(0, 18) + '...' : 'Virtual CPU'})`}
              percentage={liveMetrics?.cpuUsagePercent || 18}
              centerText={`${liveMetrics?.cpuUsagePercent || 18}%`}
              centerSubtext={liveMetrics?.cpuUsagePercent && liveMetrics.cpuUsagePercent > 75 ? 'Beban Tinggi' : 'Beban Normal'}
              icon={<Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              colorScheme="emerald"
              legendItems={[
                { label: 'Beban CPU VPS Aktif', value: `${liveMetrics?.cpuUsagePercent || 18}%`, color: 'bg-emerald-500' },
                { label: 'Kapasitas Idle / Cadangan', value: `${100 - (liveMetrics?.cpuUsagePercent || 18)}%`, color: 'bg-slate-300 dark:bg-slate-700' },
              ]}
            />

            {/* Diagram Lingkaran 2: Memory RAM */}
            <DonutDiagram
              title="Total RAM VPS"
              subtitle="Memori Fisik Hardware"
              percentage={liveMetrics?.memoryUsagePercent || 35}
              centerText={`${liveMetrics?.memoryUsagePercent || 35}%`}
              centerSubtext={`${liveMetrics?.memoryUsedGB ? liveMetrics.memoryUsedGB + ' GB' : (liveMetrics?.memoryUsedMB || 512) + ' MB'} / ${liveMetrics?.memoryTotalGB ? liveMetrics.memoryTotalGB + ' GB' : (liveMetrics?.memoryTotalMB || 2048) + ' MB'}`}
              icon={<Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              colorScheme="blue"
              legendItems={[
                { label: 'RAM Terpakai', value: `${liveMetrics?.memoryUsedGB ? liveMetrics.memoryUsedGB + ' GB' : (liveMetrics?.memoryUsedMB || 512) + ' MB'}`, color: 'bg-blue-500' },
                { label: 'RAM Tersedia', value: `${liveMetrics?.memoryTotalGB && liveMetrics?.memoryUsedGB ? parseFloat((liveMetrics.memoryTotalGB - liveMetrics.memoryUsedGB).toFixed(1)) + ' GB' : (liveMetrics?.memoryTotalMB || 2048) - (liveMetrics?.memoryUsedMB || 512) + ' MB'}`, color: 'bg-slate-300 dark:bg-slate-700' },
              ]}
            />

            {/* Diagram Lingkaran 3: Database Pool Connections */}
            <DonutDiagram
              title="Pool Koneksi Basis Data"
              subtitle={data?.databaseStatus?.isMySqlConnected ? 'MySQL Active Pool' : 'Memory Store Sync'}
              percentage={liveMetrics?.dbPoolUsagePercent || 20}
              centerText={`${liveMetrics?.dbPoolUsagePercent || 20}%`}
              centerSubtext={`${liveMetrics?.dbActiveConnections || 2} / ${liveMetrics?.dbConnectionLimit || 10} Pool`}
              icon={<Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              colorScheme="indigo"
              legendItems={[
                { label: 'Koneksi Aktif', value: `${liveMetrics?.dbActiveConnections || 2} Session`, color: 'bg-indigo-500' },
                { label: 'Slot Standby', value: `${(liveMetrics?.dbConnectionLimit || 10) - (liveMetrics?.dbActiveConnections || 2)} Slot`, color: 'bg-slate-300 dark:bg-slate-700' },
              ]}
            />

            {/* Diagram Lingkaran 4: Storage VPS */}
            <DonutDiagram
              title="Penyimpanan Disk VPS"
              subtitle="Kapasitas HDD/SSD VPS"
              percentage={liveMetrics?.storageUsagePercent || 30}
              centerText={`${liveMetrics?.storageUsagePercent || 30}%`}
              centerSubtext={`${liveMetrics?.storageUsedGB || 12.0} GB / ${liveMetrics?.storageTotalGB || 40.0} GB`}
              icon={<HardDrive className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              colorScheme="purple"
              legendItems={[
                { label: 'Disk VPS Terpakai', value: `${liveMetrics?.storageUsedGB || 12.0} GB`, color: 'bg-purple-500' },
                { label: 'Disk Kosong Tersedia', value: `${liveMetrics?.storageTotalGB && liveMetrics?.storageUsedGB ? parseFloat((liveMetrics.storageTotalGB - liveMetrics.storageUsedGB).toFixed(1)) + ' GB' : '28.0 GB'}`, color: 'bg-slate-300 dark:bg-slate-700' },
              ]}
            />
          </div>

          {/* Footer Info Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>
                Engine Node.js v20.x Express Server • {data?.databaseStatus?.isMySqlConnected ? 'MySQL Connected' : 'High-Availability In-Memory Active'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                Siswa Aktif Online: <strong className="text-emerald-600 dark:text-emerald-400">{liveMetrics?.activeOnlineStudents ?? onlineStudentsList.length} Siswa</strong>
              </span>
              <span>•</span>
              <span>Pembaruan Otomatis Setiap 10 Detik</span>
            </div>
          </div>
        </section>
      )}



      {/* Modal 10 Rancangan Rapor Siswa Informatif & Profesional */}
      <StudentReportModal
        student={selectedStudent}
        onClose={() => {
          setSelectedStudent(null);
          setShowStudentPasswordModal(false);
        }}
        currentUser={currentUser}
      />
    </div>
  );
};
