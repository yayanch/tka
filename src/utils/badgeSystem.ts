import { OverallUserProgress } from '../types/quiz';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'sky' | 'indigo' | 'cyan' | 'amber' | 'emerald' | 'purple' | 'blue' | 'rose' | 'yellow';
  category: 'module' | 'accuracy' | 'milestone';
  weekId?: number;
  requiredAccuracy?: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progressPercentage: number;
  progressText: string;
}

export const BADGE_DEFINITIONS: Array<Omit<Badge, 'isUnlocked' | 'progressPercentage' | 'progressText' | 'unlockedAt'>> = [
  // --- 8 MODULE BADGES ---
  {
    id: 'badge_week_1',
    title: 'Pelopor K3LH & Kebencanaan',
    description: 'Selesaikan Modul 1 (K3LH & Manajemen Bencana) dengan nilai ≥ 75.0',
    icon: '🛡️',
    color: 'sky',
    category: 'module',
    weekId: 1,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_2',
    title: 'Spesialis Server & OS',
    description: 'Selesaikan Modul 2 (Instalasi Sistem Operasi & Server) dengan nilai ≥ 75.0',
    icon: '🖥️',
    color: 'indigo',
    category: 'module',
    weekId: 2,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_3',
    title: 'Arsitek Jaringan LAN/WAN',
    description: 'Selesaikan Modul 3 (Pengabelan & Perencanaan Jaringan) dengan nilai ≥ 75.0',
    icon: '🌐',
    color: 'cyan',
    category: 'module',
    weekId: 3,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_4',
    title: 'Garda Keamanan Siber',
    description: 'Selesaikan Modul 4 (Sistem Keamanan & Firewall) dengan nilai ≥ 75.0',
    icon: '🔒',
    color: 'amber',
    category: 'module',
    weekId: 4,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_5',
    title: 'Teknisi Perangkat Komputer',
    description: 'Selesaikan Modul 5 (Troubleshooting & Komponen Hardware) dengan nilai ≥ 75.0',
    icon: '⚡',
    color: 'emerald',
    category: 'module',
    weekId: 5,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_6',
    title: 'Ahli Otomasi & Cloud',
    description: 'Selesaikan Modul 6 (Konfigurasi Perangkat Komunikasi & IoT) dengan nilai ≥ 75.0',
    icon: '🤖',
    color: 'purple',
    category: 'module',
    weekId: 6,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_7',
    title: 'Master Routing & Switching',
    description: 'Selesaikan Modul 7 (Routing Protokol & VLAN) dengan nilai ≥ 75.0',
    icon: '📡',
    color: 'blue',
    category: 'module',
    weekId: 7,
    requiredAccuracy: 75,
  },
  {
    id: 'badge_week_8',
    title: 'Analis Kinerja Jaringan',
    description: 'Selesaikan Modul 8 (Monitoring & Troubleshooting Jaringan) dengan nilai ≥ 75.0',
    icon: '📊',
    color: 'rose',
    category: 'module',
    weekId: 8,
    requiredAccuracy: 75,
  },

  // --- ACCURACY BADGES ---
  {
    id: 'badge_acc_80',
    title: 'Akurasi Tinggi (≥80%)',
    description: 'Raih nilai minimal 80.0 pada salah satu ujian modul',
    icon: '🎯',
    color: 'emerald',
    category: 'accuracy',
    requiredAccuracy: 80,
  },
  {
    id: 'badge_acc_90',
    title: 'Prestasi Cemerlang (≥90%)',
    description: 'Raih nilai minimal 90.0 pada salah satu ujian modul',
    icon: '🌟',
    color: 'amber',
    category: 'accuracy',
    requiredAccuracy: 90,
  },
  {
    id: 'badge_acc_100',
    title: 'Skor Sempurna (100%)',
    description: 'Raih nilai sempurna 100.0 pada salah satu ujian modul',
    icon: '🏆',
    color: 'yellow',
    category: 'accuracy',
    requiredAccuracy: 100,
  },
  {
    id: 'badge_avg_80',
    title: 'Rata-Rata Unggul (≥80%)',
    description: 'Mencapai rata-rata nilai tertinggi ≥ 80.0 di seluruh 8 modul',
    icon: '🏅',
    color: 'indigo',
    category: 'accuracy',
    requiredAccuracy: 80,
  },

  // --- MILESTONE BADGES ---
  {
    id: 'badge_first_exam',
    title: 'Langkah Pertama',
    description: 'Selesaikan minimal 1 sesi ujian latihan atau ujian modul',
    icon: '🚀',
    color: 'blue',
    category: 'milestone',
  },
  {
    id: 'badge_half_mastery',
    title: 'Setengah Jalan (4 Modul)',
    description: 'Berhasil menguasai minimal 4 modul pembelajaran (nilai ≥ 75)',
    icon: '🥉',
    color: 'purple',
    category: 'milestone',
  },
  {
    id: 'badge_full_mastery',
    title: 'Master TKA TJKT (8 Modul)',
    description: 'Berhasil menguasai seluruh 8 modul pembelajaran (nilai ≥ 75)',
    icon: '👑',
    color: 'amber',
    category: 'milestone',
  },
  {
    id: 'badge_persistent',
    title: 'Pejuang Tangguh',
    description: 'Selesaikan minimal 5 kali percobaan ujian latihan',
    icon: '🔥',
    color: 'rose',
    category: 'milestone',
  },
];

export function calculateUserBadges(progress: OverallUserProgress): Badge[] {
  const completedWeeks = progress.completedModuleWeeks || [];
  const stats = progress.categoryStats || {};
  const totalAttempts = progress.totalAttempts || 0;
  const historyCount = progress.history?.length || 0;
  const attempts = Math.max(totalAttempts, historyCount);

  // Calculate highest score & mastered count
  let maxScore = 0;
  let totalHighestScoreSum = 0;
  let masteredCount = 0;

  for (let w = 1; w <= 8; w++) {
    const s = stats[w];
    const score = s?.highestScore || 0;
    maxScore = Math.max(maxScore, score);
    totalHighestScoreSum += score;
    if (score >= 75 || completedWeeks.includes(w)) {
      masteredCount++;
    }
  }

  const averageHighestScore = totalHighestScoreSum / 8;

  return BADGE_DEFINITIONS.map((def) => {
    let isUnlocked = false;
    let unlockedAt: string | undefined = undefined;
    let progressPercentage = 0;
    let progressText = '';

    if (def.category === 'module' && def.weekId) {
      const wId = def.weekId;
      const stat = stats[wId];
      const score = stat?.highestScore || 0;
      const isMarkedCompleted = completedWeeks.includes(wId);

      if (score >= 75 || isMarkedCompleted) {
        isUnlocked = true;
        unlockedAt = stat?.latestDate || 'Telah Dibuka';
        progressPercentage = 100;
        progressText = `Lulus (Nilai: ${score > 0 ? score : 'Selesai'})`;
      } else {
        isUnlocked = false;
        progressPercentage = Math.min(99, Math.round((score / 75) * 100));
        progressText = score > 0 ? `Nilai saat ini: ${score}/75` : 'Belum Selesai';
      }
    } else if (def.category === 'accuracy') {
      const reqAcc = def.requiredAccuracy || 80;

      if (def.id === 'badge_avg_80') {
        if (averageHighestScore >= reqAcc) {
          isUnlocked = true;
          unlockedAt = 'Telah Dibuka';
          progressPercentage = 100;
          progressText = `Rata-rata: ${averageHighestScore.toFixed(1)}/80`;
        } else {
          isUnlocked = false;
          progressPercentage = Math.min(99, Math.round((averageHighestScore / reqAcc) * 100));
          progressText = `Rata-rata saat ini: ${averageHighestScore.toFixed(1)}/80`;
        }
      } else {
        if (maxScore >= reqAcc) {
          isUnlocked = true;
          unlockedAt = 'Telah Dibuka';
          progressPercentage = 100;
          progressText = `Tersemai (Skor: ${maxScore}/100)`;
        } else {
          isUnlocked = false;
          progressPercentage = Math.min(99, Math.round((maxScore / reqAcc) * 100));
          progressText = maxScore > 0 ? `Skor tertinggi: ${maxScore}/${reqAcc}` : 'Belum Mencapai';
        }
      }
    } else if (def.category === 'milestone') {
      if (def.id === 'badge_first_exam') {
        if (attempts >= 1) {
          isUnlocked = true;
          progressPercentage = 100;
          progressText = `${attempts} Sesi Selesai`;
        } else {
          isUnlocked = false;
          progressPercentage = 0;
          progressText = '0/1 Sesi Ujian';
        }
      } else if (def.id === 'badge_half_mastery') {
        if (masteredCount >= 4) {
          isUnlocked = true;
          progressPercentage = 100;
          progressText = `${masteredCount}/4 Modul Tuntas`;
        } else {
          isUnlocked = false;
          progressPercentage = Math.round((masteredCount / 4) * 100);
          progressText = `${masteredCount}/4 Modul Tuntas`;
        }
      } else if (def.id === 'badge_full_mastery') {
        if (masteredCount >= 8) {
          isUnlocked = true;
          progressPercentage = 100;
          progressText = '8/8 Modul Tuntas';
        } else {
          isUnlocked = false;
          progressPercentage = Math.round((masteredCount / 8) * 100);
          progressText = `${masteredCount}/8 Modul Tuntas`;
        }
      } else if (def.id === 'badge_persistent') {
        if (attempts >= 5) {
          isUnlocked = true;
          progressPercentage = 100;
          progressText = `${attempts}/5 Ujian Selesai`;
        } else {
          isUnlocked = false;
          progressPercentage = Math.round((attempts / 5) * 100);
          progressText = `${attempts}/5 Ujian`;
        }
      }
    }

    return {
      ...def,
      isUnlocked,
      unlockedAt,
      progressPercentage,
      progressText,
    };
  });
}
