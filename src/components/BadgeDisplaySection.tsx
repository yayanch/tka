import React, { useState, useMemo } from 'react';
import { OverallUserProgress } from '../types/quiz';
import { calculateUserBadges, Badge } from '../utils/badgeSystem';
import { 
  Award, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  X, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Target, 
  Trophy, 
  Zap, 
  Star,
  Layers
} from 'lucide-react';

interface BadgeDisplaySectionProps {
  progress: OverallUserProgress;
  className?: string;
  onNavigateToModules?: () => void;
  compact?: boolean;
}

export const BadgeDisplaySection: React.FC<BadgeDisplaySectionProps> = ({
  progress,
  className = '',
  onNavigateToModules,
  compact = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'module' | 'accuracy' | 'milestone'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  // Accordion categories open state
  const [openCategories, setOpenCategories] = useState<{
    module: boolean;
    accuracy: boolean;
    milestone: boolean;
  }>({
    module: true,
    accuracy: true,
    milestone: true,
  });

  const badges = useMemo(() => calculateUserBadges(progress), [progress]);

  const unlockedCount = useMemo(() => badges.filter(b => b.isUnlocked).length, [badges]);
  const totalCount = badges.length;
  const overallUnlockedPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredBadges = useMemo(() => {
    if (activeTab === 'all') return badges;
    return badges.filter(b => b.category === activeTab);
  }, [badges, activeTab]);

  const moduleBadges = useMemo(() => badges.filter(b => b.category === 'module'), [badges]);
  const accuracyBadges = useMemo(() => badges.filter(b => b.category === 'accuracy'), [badges]);
  const milestoneBadges = useMemo(() => badges.filter(b => b.category === 'milestone'), [badges]);

  const toggleCategory = (cat: 'module' | 'accuracy' | 'milestone') => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const getBadgeCardBg = (badge: Badge) => {
    if (!badge.isUnlocked) {
      return 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100';
    }

    switch (badge.color) {
      case 'amber':
      case 'yellow':
        return 'bg-gradient-to-br from-amber-50 to-orange-50/80 dark:from-amber-950/40 dark:to-orange-950/20 border-amber-300 dark:border-amber-800 shadow-xs';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-50 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-300 dark:border-emerald-800 shadow-xs';
      case 'sky':
      case 'cyan':
        return 'bg-gradient-to-br from-sky-50 to-blue-50/80 dark:from-sky-950/40 dark:to-blue-950/20 border-sky-300 dark:border-sky-800 shadow-xs';
      case 'purple':
      case 'indigo':
        return 'bg-gradient-to-br from-purple-50 to-indigo-50/80 dark:from-purple-950/40 dark:to-indigo-950/20 border-purple-300 dark:border-purple-800 shadow-xs';
      case 'rose':
        return 'bg-gradient-to-br from-rose-50 to-pink-50/80 dark:from-rose-950/40 dark:to-pink-950/20 border-rose-300 dark:border-rose-800 shadow-xs';
      default:
        return 'bg-gradient-to-br from-blue-50 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/20 border-blue-300 dark:border-blue-800 shadow-xs';
    }
  };

  const getBadgeIconBg = (badge: Badge) => {
    if (!badge.isUnlocked) {
      return 'bg-slate-200 dark:bg-slate-700 text-slate-400 grayscale';
    }

    switch (badge.color) {
      case 'amber':
      case 'yellow':
        return 'bg-amber-100 dark:bg-amber-900/60 ring-2 ring-amber-400/40';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-900/60 ring-2 ring-emerald-400/40';
      case 'sky':
      case 'cyan':
        return 'bg-sky-100 dark:bg-sky-900/60 ring-2 ring-sky-400/40';
      case 'purple':
      case 'indigo':
        return 'bg-purple-100 dark:bg-purple-900/60 ring-2 ring-purple-400/40';
      case 'rose':
        return 'bg-rose-100 dark:bg-rose-900/60 ring-2 ring-rose-400/40';
      default:
        return 'bg-blue-100 dark:bg-blue-900/60 ring-2 ring-blue-400/40';
    }
  };

  return (
    <section className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 ${className}`}>
      {/* Header Section (Accordion Main Toggle) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/80 shrink-0 shadow-2xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Lencana & Pencapaian Siswa
              </h2>
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Akordion Gamifikasi</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selesaikan modul mingguan dan dapatkan akurasi tinggi untuk membuka lencana kompetensi TKA TJKT
            </p>
          </div>
        </div>

        {/* Total Progress Badge Counter & Expand/Collapse Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shrink-0">
            <div className="text-right space-y-0.5">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                <span className="text-amber-600 dark:text-amber-400 text-sm font-black">{unlockedCount}</span>
                <span className="text-slate-400"> / {totalCount} Lencana</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {overallUnlockedPercent}% Terbuka
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shadow-xs border border-amber-400/50">
              {overallUnlockedPercent}%
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            title={isExpanded ? "Tutup Akordion Lencana" : "Buka Akordion Lencana"}
          >
            <span>{isExpanded ? "Tutup" : "Buka"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="space-y-5 animate-fadeIn">
          {/* Tabs Filter */}
          {!compact && (
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Semua ({badges.length})
                </button>
                <button
                  onClick={() => setActiveTab('module')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === 'module'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Modul (8)
                </button>
                <button
                  onClick={() => setActiveTab('accuracy')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === 'accuracy'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Akurasi (4)
                </button>
                <button
                  onClick={() => setActiveTab('milestone')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === 'milestone'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Pencapaian (4)
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-semibold">
                Klik lencana untuk petunjuk pembukaan
              </div>
            </div>
          )}

          {/* If 'all' tab is selected, show Accordion Groups for categories */}
          {activeTab === 'all' && !compact ? (
            <div className="space-y-4">
              {/* Category 1: Modul Mingguan */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  onClick={() => toggleCategory('module')}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Lencana Modul Mingguan (Minggu 1 - 8)
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Selesaikan ujian modul atau raih nilai ≥ 75
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {moduleBadges.filter(b => b.isUnlocked).length} / {moduleBadges.length} Terbuka
                    </span>
                    {openCategories.module ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {openCategories.module && (
                  <div className="p-4 grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
                    {moduleBadges.map((badge) => (
                      <div
                        key={badge.id}
                        onClick={() => setSelectedBadge(badge)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group select-none ${getBadgeCardBg(badge)} hover:scale-[1.01]`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${getBadgeIconBg(badge)}`}>
                            {badge.icon}
                          </div>
                          {badge.isUnlocked ? (
                            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Terbuka</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Terkunci</span>
                            </span>
                          )}
                        </div>
                        <div className="mt-3 space-y-1">
                          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {badge.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={badge.isUnlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}>
                              {badge.progressText}
                            </span>
                            <span className="text-slate-400">{badge.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                badge.isUnlocked ? 'bg-emerald-500' : badge.progressPercentage > 0 ? 'bg-amber-500' : 'bg-slate-400'
                              }`}
                              style={{ width: `${Math.max(5, badge.progressPercentage)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category 2: Akurasi & Performa */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  onClick={() => toggleCategory('accuracy')}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Lencana Akurasi & Performa
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Capai tingkat akurasi tinggi pada latihan dan ujian
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {accuracyBadges.filter(b => b.isUnlocked).length} / {accuracyBadges.length} Terbuka
                    </span>
                    {openCategories.accuracy ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {openCategories.accuracy && (
                  <div className="p-4 grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
                    {accuracyBadges.map((badge) => (
                      <div
                        key={badge.id}
                        onClick={() => setSelectedBadge(badge)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group select-none ${getBadgeCardBg(badge)} hover:scale-[1.01]`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${getBadgeIconBg(badge)}`}>
                            {badge.icon}
                          </div>
                          {badge.isUnlocked ? (
                            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Terbuka</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Terkunci</span>
                            </span>
                          )}
                        </div>
                        <div className="mt-3 space-y-1">
                          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {badge.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={badge.isUnlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}>
                              {badge.progressText}
                            </span>
                            <span className="text-slate-400">{badge.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                badge.isUnlocked ? 'bg-emerald-500' : badge.progressPercentage > 0 ? 'bg-amber-500' : 'bg-slate-400'
                              }`}
                              style={{ width: `${Math.max(5, badge.progressPercentage)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category 3: Milestone & Konsistensi */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                <button
                  onClick={() => toggleCategory('milestone')}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-100/80 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Lencana Milestone & Pencapaian Khusus
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Selesaikan tantangan khusus dan master keseluruhan materi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {milestoneBadges.filter(b => b.isUnlocked).length} / {milestoneBadges.length} Terbuka
                    </span>
                    {openCategories.milestone ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {openCategories.milestone && (
                  <div className="p-4 grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
                    {milestoneBadges.map((badge) => (
                      <div
                        key={badge.id}
                        onClick={() => setSelectedBadge(badge)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group select-none ${getBadgeCardBg(badge)} hover:scale-[1.01]`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${getBadgeIconBg(badge)}`}>
                            {badge.icon}
                          </div>
                          {badge.isUnlocked ? (
                            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Terbuka</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Terkunci</span>
                            </span>
                          )}
                        </div>
                        <div className="mt-3 space-y-1">
                          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {badge.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {badge.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className={badge.isUnlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}>
                              {badge.progressText}
                            </span>
                            <span className="text-slate-400">{badge.progressPercentage}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                badge.isUnlocked ? 'bg-emerald-500' : badge.progressPercentage > 0 ? 'bg-amber-500' : 'bg-slate-400'
                              }`}
                              style={{ width: `${Math.max(5, badge.progressPercentage)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Regular Grid for specific tabs or compact mode */
            <div className={`grid gap-3.5 ${compact ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
              {filteredBadges.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group select-none ${getBadgeCardBg(badge)} hover:scale-[1.01]`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${getBadgeIconBg(badge)}`}>
                      {badge.icon}
                    </div>

                    {badge.isUnlocked ? (
                      <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Terbuka</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Terkunci</span>
                      </span>
                    )}
                  </div>

                  {/* Badge Content */}
                  <div className="mt-3 space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>

                  {/* Progress Bar & Status */}
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className={badge.isUnlocked ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'}>
                        {badge.progressText}
                      </span>
                      <span className="text-slate-400">
                        {badge.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          badge.isUnlocked 
                            ? 'bg-emerald-500' 
                            : badge.progressPercentage > 0 
                            ? 'bg-amber-500' 
                            : 'bg-slate-400 dark:bg-slate-600'
                        }`}
                        style={{ width: `${Math.max(5, badge.progressPercentage)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Badge Detail Modal Popover */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-md ${getBadgeIconBg(selectedBadge)}`}>
                {selectedBadge.icon}
              </div>

              <div className="space-y-1">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  selectedBadge.isUnlocked
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60'
                    : 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/60'
                }`}>
                  {selectedBadge.isUnlocked ? 'Lencana Terbuka' : 'Lencana Terkunci'}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white pt-1">
                  {selectedBadge.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                {selectedBadge.description}
              </p>

              <div className="w-full space-y-2 pt-2 text-left">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Status Kemajuan:</span>
                  <span className={selectedBadge.isUnlocked ? 'text-emerald-600' : 'text-amber-600'}>
                    {selectedBadge.progressText} ({selectedBadge.progressPercentage}%)
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${selectedBadge.isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${selectedBadge.progressPercentage}%` }}
                  />
                </div>
              </div>

              {!selectedBadge.isUnlocked && onNavigateToModules && (
                <button
                  onClick={() => {
                    setSelectedBadge(null);
                    onNavigateToModules();
                  }}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs mt-3"
                >
                  <Target className="w-4 h-4" />
                  <span>Kerjakan Ujian Modul Sekarang</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
