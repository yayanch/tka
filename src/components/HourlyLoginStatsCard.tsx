import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Users, 
  LogIn, 
  School, 
  Filter, 
  Crown,
  ChevronDown,
  ChevronUp,
  Table,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { LoginLogEntry } from '../types/auth';
import { normalizeSchoolName } from '../utils/schoolNormalization';

interface HourlyLoginStatsCardProps {
  loginLogs?: LoginLogEntry[];
  schoolOptions?: string[];
  onViewAllLogs?: () => void;
  className?: string;
}

interface HourData {
  hour: number;
  hourLabel: string;
  hourRange: string;
  count: number;
  uniqueStudents: number;
  googleCount: number;
  localCount: number;
  isPeak: boolean;
  isCurrent: boolean;
  isUpcoming: boolean;
  topSchool: string;
  logs: LoginLogEntry[];
}

export const HourlyLoginStatsCard: React.FC<HourlyLoginStatsCardProps> = ({
  loginLogs = [],
  schoolOptions = [],
  onViewAllLogs,
  className = ''
}) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<'siswa' | 'all'>('siswa');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [drilldownSearch, setDrilldownSearch] = useState<string>('');

  // Helper to extract WIB time information from an ISO string
  const getLogWibInfo = (isoString?: string) => {
    if (!isoString) return null;
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return null;

    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).formatToParts(d);

      const year = parts.find(p => p.type === 'year')?.value;
      const month = parts.find(p => p.type === 'month')?.value;
      const day = parts.find(p => p.type === 'day')?.value;
      let hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
      if (hour === 24) hour = 0;
      const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
      const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);

      const pad = (n: number) => String(n).padStart(2, '0');

      return {
        dateKey: `${year}-${month}-${day}`,
        hour,
        minute,
        second,
        timeFormatted: `${pad(hour)}:${pad(minute)}:${pad(second)} WIB`,
        timeShort: `${pad(hour)}:${pad(minute)} WIB`,
        hourLabel: `${pad(hour)}:00`,
        hourRange: `${pad(hour)}:00 - ${pad(hour)}:59 WIB`
      };
    } catch {
      const hour = d.getHours();
      const minute = d.getMinutes();
      const second = d.getSeconds();
      const pad = (n: number) => String(n).padStart(2, '0');
      return {
        dateKey: d.toISOString().split('T')[0],
        hour,
        minute,
        second,
        timeFormatted: `${pad(hour)}:${pad(minute)}:${pad(second)} WIB`,
        timeShort: `${pad(hour)}:${pad(minute)} WIB`,
        hourLabel: `${pad(hour)}:00`,
        hourRange: `${pad(hour)}:00 - ${pad(hour)}:59 WIB`
      };
    }
  };

  // Get today's key in WIB
  const todayWib = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        hour12: false
      }).formatToParts(new Date());

      const year = parts.find(p => p.type === 'year')?.value;
      const month = parts.find(p => p.type === 'month')?.value;
      const day = parts.find(p => p.type === 'day')?.value;
      let hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
      if (hour === 24) hour = 0;

      return {
        key: `${year}-${month}-${day}`,
        currentHour: hour
      };
    } catch {
      const now = new Date();
      return {
        key: now.toISOString().split('T')[0],
        currentHour: now.getHours()
      };
    }
  }, []);

  // Filter logs for today starting from 6 AM
  const filteredTodayLogs = useMemo(() => {
    return loginLogs.filter(log => {
      const loginTimeStr = log.loginAt || (log as any).login_at;
      const wibInfo = getLogWibInfo(loginTimeStr);
      if (!wibInfo) return false;

      // Must be today
      if (wibInfo.dateKey !== todayWib.key) return false;

      // Starting from 6 AM (hour >= 6)
      if (wibInfo.hour < 6) return false;

      // Role filter (default 'siswa' / peserta)
      const role = (log.role || 'siswa').toLowerCase();
      if (roleFilter === 'siswa' && role !== 'siswa') return false;

      // School filter
      const school = log.asalSekolah || (log as any).asal_sekolah || '';
      if (selectedSchool !== 'all' && school !== selectedSchool) return false;

      return true;
    });
  }, [loginLogs, todayWib.key, roleFilter, selectedSchool]);

  // Generate hourly distribution from 6 AM (06:00) up to max(currentHour, 16) or 18
  const hourlyData = useMemo<HourData[]>(() => {
    const startHour = 6;
    // Display up to current hour or at least 16:00 (or 18:00 if current is higher)
    const endHour = Math.max(todayWib.currentHour, 16);

    const hourMap: Record<number, LoginLogEntry[]> = {};
    for (let h = startHour; h <= endHour; h++) {
      hourMap[h] = [];
    }

    filteredTodayLogs.forEach(log => {
      const loginTimeStr = log.loginAt || (log as any).login_at;
      const wibInfo = getLogWibInfo(loginTimeStr);
      if (wibInfo && wibInfo.hour >= startHour && wibInfo.hour <= endHour) {
        hourMap[wibInfo.hour]?.push(log);
      }
    });

    // Find peak count
    let maxCount = 0;
    for (let h = startHour; h <= endHour; h++) {
      const count = hourMap[h]?.length || 0;
      if (count > maxCount) {
        maxCount = count;
      }
    }

    const pad = (n: number) => String(n).padStart(2, '0');

    const result: HourData[] = [];
    for (let h = startHour; h <= endHour; h++) {
      const logs = hourMap[h] || [];
      const count = logs.length;

      // Unique student users in this hour
      const uniqueEmails = new Set<string>();
      const schoolFrequency: Record<string, number> = {};
      let googleCount = 0;
      let localCount = 0;

      logs.forEach(l => {
        const email = l.userEmail || (l as any).user_email || l.userName || (l as any).user_name;
        if (email) uniqueEmails.add(email);

        const method = (l.loginMethod || (l as any).login_method || '').toLowerCase();
        if (method === 'google') {
          googleCount++;
        } else {
          localCount++;
        }

        const school = l.asalSekolah || (l as any).asal_sekolah || '-';
        schoolFrequency[school] = (schoolFrequency[school] || 0) + 1;
      });

      let topSchool = '-';
      let maxSchoolCount = 0;
      Object.entries(schoolFrequency).forEach(([sch, scCount]) => {
        if (scCount > maxSchoolCount) {
          maxSchoolCount = scCount;
          topSchool = sch;
        }
      });

      result.push({
        hour: h,
        hourLabel: `${pad(h)}:00`,
        hourRange: `${pad(h)}:00 - ${pad(h)}:59 WIB`,
        count,
        uniqueStudents: uniqueEmails.size,
        googleCount,
        localCount,
        isPeak: count > 0 && count === maxCount,
        isCurrent: h === todayWib.currentHour,
        isUpcoming: h > todayWib.currentHour,
        topSchool,
        logs: [...logs].sort((a, b) => {
          const tA = new Date(a.loginAt || (a as any).login_at || 0).getTime();
          const tB = new Date(b.loginAt || (b as any).login_at || 0).getTime();
          return tB - tA;
        })
      });
    }

    return result;
  }, [filteredTodayLogs, todayWib.currentHour]);

  interface SummaryMetrics {
    totalLogins: number;
    uniqueParticipants: number;
    peakHourData: HourData | null;
    averagePerHour: string;
    googleTotal: number;
    localTotal: number;
  }

  // Overall key metrics
  const summaryMetrics = useMemo<SummaryMetrics>(() => {
    const totalLogins = filteredTodayLogs.length;

    // Unique participants
    const uniqueEmails = new Set<string>();
    let googleTotal = 0;
    let localTotal = 0;

    filteredTodayLogs.forEach(l => {
      const email = l.userEmail || (l as any).user_email || l.userName || (l as any).user_name;
      if (email) uniqueEmails.add(email);

      const method = (l.loginMethod || (l as any).login_method || '').toLowerCase();
      if (method === 'google') {
        googleTotal++;
      } else {
        localTotal++;
      }
    });

    // Find peak hour data
    let peakHourData: HourData | null = null;
    let peakCount = 0;
    hourlyData.forEach(hd => {
      if (hd.count > peakCount) {
        peakCount = hd.count;
        peakHourData = hd;
      }
    });

    // Active hours count (from 6 to current hour)
    const elapsedHours = Math.max(1, Math.min(hourlyData.length, todayWib.currentHour - 6 + 1));
    const averagePerHour = elapsedHours > 0 ? (totalLogins / elapsedHours).toFixed(1) : '0';

    return {
      totalLogins,
      uniqueParticipants: uniqueEmails.size,
      peakHourData,
      averagePerHour,
      googleTotal,
      localTotal
    };
  }, [filteredTodayLogs, hourlyData, todayWib.currentHour]);

  // Max count among hours for chart bar scaling
  const maxBarValue = useMemo(() => {
    const max = Math.max(...hourlyData.map(h => h.count), 1);
    return Math.max(max, 5); // At least 5 scale ceiling
  }, [hourlyData]);

  // Set default selected hour to peak or current hour if none selected
  const activeDrilldownHour = useMemo(() => {
    if (selectedHour !== null) {
      return hourlyData.find(h => h.hour === selectedHour) || null;
    }
    // Default to peak hour if available, otherwise current hour
    const peak = hourlyData.find(h => h.isPeak && h.count > 0);
    if (peak) return peak;
    return hourlyData.find(h => h.isCurrent) || hourlyData[0] || null;
  }, [selectedHour, hourlyData]);

  // Filtered logs inside the active drilldown hour
  const filteredDrilldownLogs = useMemo(() => {
    if (!activeDrilldownHour) return [];
    if (!drilldownSearch.trim()) return activeDrilldownHour.logs;
    const q = drilldownSearch.toLowerCase().trim();
    return activeDrilldownHour.logs.filter(l => {
      const name = (l.userName || (l as any).user_name || '').toLowerCase();
      const email = (l.userEmail || (l as any).user_email || '').toLowerCase();
      const school = (l.asalSekolah || (l as any).asal_sekolah || '').toLowerCase();
      const ip = (l.ipAddress || (l as any).ip_address || '').toLowerCase();
      return name.includes(q) || email.includes(q) || school.includes(q) || ip.includes(q);
    });
  }, [activeDrilldownHour, drilldownSearch]);

  const peakData = summaryMetrics.peakHourData;

  return (
    <section className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6 ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Statistik Jumlah Login Peserta Per Jam
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Mulai 06:00 WIB Hari Ini
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribusi frekuensi login peserta ujian & modul pembelajaran setiap jam sejak pukul 06:00 pagi hingga saat ini.
            </p>
          </div>
        </div>

        {/* Controls: Filter Sekolah, Peran, View Mode */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
          {/* School filter dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer max-w-[160px] truncate"
            >
              <option value="all">Semua Sekolah ({schoolOptions.length > 0 ? schoolOptions.length : 'Semua'})</option>
              {schoolOptions.map(sch => (
                <option key={sch} value={sch}>{sch}</option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRoleFilter('siswa')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                roleFilter === 'siswa'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Hanya Peserta
            </button>
            <button
              type="button"
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                roleFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Semua Akun
            </button>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setViewMode('chart')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'chart'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Tampilan Grafik Histogram"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grafik</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Tampilan Tabel Rincian Jam"
            >
              <Table className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tabel</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Login Sejak 06:00 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Total Login Sejak 06:00
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <LogIn className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
              {summaryMetrics.totalLogins}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
              {summaryMetrics.googleTotal} Google Auth &bull; {summaryMetrics.localTotal} Sandi
            </div>
          </div>
        </div>

        {/* Card 2: Jam Puncak Login (Peak Hour) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Jam Puncak (Peak Hour)
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
              {peakData ? peakData.hourRange.replace(' WIB', '') : '-'}
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 flex items-center gap-1">
              {peakData ? (
                <>
                  <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{peakData.count} sesi masuk (tertinggi)</span>
                </>
              ) : (
                'Belum ada data login'
              )}
            </div>
          </div>
        </div>

        {/* Card 3: Rata-Rata per Jam */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Rata-Rata Login / Jam
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 tabular-nums">
              {summaryMetrics.averagePerHour}
              <span className="text-xs font-semibold text-slate-400 ml-1">sesi/jam</span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
              Aktivitas stabil sepanjang hari
            </div>
          </div>
        </div>

        {/* Card 4: Peserta Unik Login */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Peserta Unik Hari Ini
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 tabular-nums">
              {summaryMetrics.uniqueParticipants}
              <span className="text-xs font-semibold text-slate-400 ml-1">siswa</span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 truncate">
              {selectedSchool !== 'all' ? selectedSchool : 'Seluruh sekolah terdaftar'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Chart or Table View */}
      {viewMode === 'chart' ? (
        <div className="space-y-4">
          {/* Subheader info & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center gap-1.5">
              <span>Klik salah satu batang jam untuk melihat rincian nama peserta:</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                <span>Normal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                <span>Jam Puncak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Jam Saat Ini</span>
              </div>
            </div>
          </div>

          {/* Histogram Chart Container */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
            <div className="min-w-[620px] h-64 flex flex-col justify-end">
              {/* Bars Area with Guideline Grid */}
              <div className="relative flex-1 flex items-end justify-between gap-2 sm:gap-3 pt-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                {/* Horizontal guide lines */}
                <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-30 dark:opacity-20">
                  <div className="border-b border-slate-400 border-dashed w-full" />
                  <div className="border-b border-slate-400 border-dashed w-full" />
                  <div className="border-b border-slate-400 border-dashed w-full" />
                </div>

                {hourlyData.map((hData) => {
                  const isSelected = activeDrilldownHour?.hour === hData.hour;
                  const heightPercent = maxBarValue > 0 ? Math.max(8, (hData.count / maxBarValue) * 100) : 8;

                  let barColor = 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500';
                  if (hData.isPeak && hData.count > 0) {
                    barColor = 'bg-gradient-to-t from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400';
                  } else if (hData.isCurrent) {
                    barColor = 'bg-gradient-to-t from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400';
                  } else if (hData.count === 0) {
                    barColor = 'bg-slate-200 dark:bg-slate-700/60';
                  }

                  return (
                    <button
                      key={hData.hour}
                      type="button"
                      onClick={() => setSelectedHour(hData.hour)}
                      className={`group relative flex-1 flex flex-col items-center justify-end h-full focus:outline-none transition-all cursor-pointer ${
                        isSelected ? 'scale-105 z-10' : ''
                      }`}
                      title={`${hData.hourRange}: ${hData.count} login (${hData.uniqueStudents} siswa unik)`}
                    >
                      {/* Top Pill: Peak or Current badge */}
                      <div className="h-6 flex items-center justify-center mb-1">
                        {hData.isPeak && hData.count > 0 ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-500 text-white shadow-xs animate-bounce">
                            <Crown className="w-2.5 h-2.5" />
                            <span>Puncak</span>
                          </span>
                        ) : hData.isCurrent ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500 text-white shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>Kini</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                            {hData.count > 0 ? hData.count : ''}
                          </span>
                        )}
                      </div>

                      {/* Bar Column */}
                      <div className="w-full max-w-[42px] flex items-end justify-center h-full">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-xl transition-all duration-300 relative shadow-2xs ${barColor} ${
                            isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-slate-900' : ''
                          }`}
                        >
                          {/* Inner subtle glow for peak/current */}
                          {hData.isPeak && (
                            <div className="absolute inset-x-0 top-0 h-1 bg-white/40 rounded-t-xl" />
                          )}
                        </div>
                      </div>

                      {/* Count Hover Tooltip on Bar */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-8 z-30 pointer-events-none">
                        <div className="bg-slate-900 dark:bg-slate-800 text-white text-[11px] rounded-xl px-2.5 py-1.5 shadow-xl whitespace-nowrap border border-slate-700 space-y-0.5">
                          <div className="font-bold text-blue-300">{hData.hourRange}</div>
                          <div>Total Login: <strong>{hData.count}</strong> peserta</div>
                          <div className="text-[10px] text-slate-400">Siswa Unik: {hData.uniqueStudents}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* X-Axis Hour Labels (06:00, 07:00, ...) */}
              <div className="flex items-center justify-between gap-2 sm:gap-3 pt-2 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                {hourlyData.map(hData => {
                  const isSelected = activeDrilldownHour?.hour === hData.hour;
                  return (
                    <button
                      key={hData.hour}
                      type="button"
                      onClick={() => setSelectedHour(hData.hour)}
                      className={`flex-1 text-center py-1 rounded-lg transition-colors cursor-pointer ${
                        isSelected 
                          ? 'text-blue-600 dark:text-blue-400 font-black bg-blue-50 dark:bg-blue-950/60'
                          : hData.isCurrent
                          ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                          : 'hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {hData.hourLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3">Rentang Jam</th>
                <th className="px-4 py-3">Grafik Mini</th>
                <th className="px-4 py-3 text-center">Total Login</th>
                <th className="px-4 py-3 text-center">Peserta Unik</th>
                <th className="px-4 py-3">Metode (Google / Sandi)</th>
                <th className="px-4 py-3">Sekolah Terbanyak</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {hourlyData.map((hData) => {
                const widthPercent = maxBarValue > 0 ? Math.round((hData.count / maxBarValue) * 100) : 0;
                return (
                  <tr 
                    key={hData.hour} 
                    className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${
                      activeDrilldownHour?.hour === hData.hour ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {hData.hourRange}
                    </td>
                    <td className="px-4 py-3 w-40">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${hData.isPeak ? 'bg-emerald-500' : 'bg-blue-500'}`}
                          style={{ width: `${Math.max(4, widthPercent)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center font-black text-slate-900 dark:text-white tabular-nums">
                      {hData.count}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-slate-600 dark:text-slate-300 tabular-nums">
                      {hData.uniqueStudents}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-amber-600 dark:text-amber-400">{hData.googleCount} Google</span>
                      <span className="mx-1">&bull;</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">{hData.localCount} Sandi</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 uppercase text-[11px] max-w-[150px] truncate">
                      {hData.topSchool}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {hData.isPeak && hData.count > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 inline-flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-500" />
                          <span>Puncak</span>
                        </span>
                      ) : hData.isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          Aktif Sekarang
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          {hData.count > 15 ? 'Ramai' : hData.count > 0 ? 'Normal' : 'Lengang'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedHour(hData.hour)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
                      >
                        Rincian
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Drilldown Panel: Detailed Participant List for Selected Hour */}
      {activeDrilldownHour && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/70 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                {activeDrilldownHour.hourLabel}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Daftar Peserta Login Jam {activeDrilldownHour.hourRange}</span>
                  {activeDrilldownHour.isPeak && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-amber-500 text-white shadow-2xs">
                      👑 Puncak Hari Ini
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Total <strong>{activeDrilldownHour.count}</strong> kali login oleh <strong>{activeDrilldownHour.uniqueStudents}</strong> peserta berbeda
                </p>
              </div>
            </div>

            {/* Drilldown search input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={drilldownSearch}
                onChange={(e) => setDrilldownSearch(e.target.value)}
                placeholder="Cari nama atau sekolah..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Table of students in this hour */}
          <div className="overflow-x-auto max-h-72 overflow-y-auto rounded-xl border border-slate-200/60 dark:border-slate-800">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] sticky top-0 border-b border-slate-200 dark:border-slate-700 z-10">
                <tr>
                  <th className="px-3.5 py-2.5">Waktu Tepat</th>
                  <th className="px-3.5 py-2.5">Nama Peserta</th>
                  <th className="px-3.5 py-2.5">Asal Sekolah</th>
                  <th className="px-3.5 py-2.5">Metode</th>
                  <th className="px-3.5 py-2.5 font-mono">Alamat IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900/40">
                {filteredDrilldownLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                      {activeDrilldownHour.count === 0 
                        ? 'Tidak ada aktivitas login tercatat pada jam ini.' 
                        : 'Tidak ada peserta yang cocok dengan pencarian.'}
                    </td>
                  </tr>
                ) : (
                  filteredDrilldownLogs.map((log) => {
                    const info = getLogWibInfo(log.loginAt || (log as any).login_at);
                    const method = (log.loginMethod || (log as any).login_method || 'local').toLowerCase();
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-3.5 py-2.5 font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                          {info ? info.timeFormatted : '-'}
                        </td>
                        <td className="px-3.5 py-2.5 font-bold text-slate-900 dark:text-white uppercase whitespace-nowrap">
                          {log.userName || (log as any).user_name}
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 uppercase text-[11px]">
                          {normalizeSchoolName(log.asalSekolah || (log as any).asal_sekolah)}
                        </td>
                        <td className="px-3.5 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            method === 'google'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          }`}>
                            {method === 'google' ? 'Google Auth' : 'Password Local'}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 font-mono text-[10px] text-slate-400">
                          {log.ipAddress || (log as any).ip_address || '127.0.0.1'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer of Drilldown */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-[11px] text-slate-500">
              Menampilkan {filteredDrilldownLogs.length} dari {activeDrilldownHour.count} login pada jam ini
            </span>
            {onViewAllLogs && (
              <button
                type="button"
                onClick={onViewAllLogs}
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold hover:underline cursor-pointer text-xs"
              >
                <span>Lihat Semua Log Login Siswa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
