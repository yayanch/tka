import React, { useState } from 'react';
import { Question } from '../types/quiz';
import { Maximize2, X, Check, ShieldCheck, Info } from 'lucide-react';

export interface DiagramProps {
  className?: string;
  compact?: boolean;
}

// ---------------------------------------------------------------------------
// 1. FTTH GPON Architecture Diagram (Modul 1 & 6)
// ---------------------------------------------------------------------------
export const FtthArchitectureDiagram: React.FC<DiagramProps> = ({ className = '', compact = false }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Arsitektur Jaringan FTTH GPON (ODN)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-medium">Bebas Lisensi (Public Domain)</span>
      </div>

      <svg viewBox="0 0 900 210" className="w-full h-auto text-xs font-sans" fill="none">
        <defs>
          <linearGradient id="fiberGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Transmission Lines */}
        <path d="M 130 95 L 260 95" stroke="url(#fiberGlow)" strokeWidth="4" />
        <path d="M 370 95 L 510 95" stroke="url(#fiberGlow)" strokeWidth="3" />
        <path d="M 620 95 L 750 95" stroke="url(#fiberGlow)" strokeWidth="2.5" strokeDasharray="6 3" />

        {/* 1. OLT */}
        <g transform="translate(30, 45)">
          <rect width="100" height="95" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <rect x="15" y="12" width="70" height="18" rx="3" fill="#0f172a" stroke="#475569" />
          <circle cx="25" cy="21" r="3" fill="#10b981" />
          <circle cx="35" cy="21" r="3" fill="#38bdf8" />
          <text x="50" y="52" fill="#e2e8f0" fontWeight="bold" fontSize="13" textAnchor="middle">OLT</text>
          <text x="50" y="66" fill="#94a3b8" fontSize="10" textAnchor="middle">Central Office</text>
          <text x="50" y="80" fill="#38bdf8" fontSize="9" textAnchor="middle">TX: 1490nm</text>
        </g>
        <text x="195" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Kabel Feeder</text>

        {/* 2. ODC */}
        <g transform="translate(260, 45)">
          <rect width="110" height="95" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
          <text x="55" y="45" fill="#e2e8f0" fontWeight="bold" fontSize="13" textAnchor="middle">ODC</text>
          <text x="55" y="60" fill="#94a3b8" fontSize="10" textAnchor="middle">Kabinet Distribusi</text>
          <rect x="20" y="68" width="70" height="18" rx="4" fill="#312e81" />
          <text x="55" y="81" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">Splitter 1:4</text>
        </g>
        <text x="440" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Kabel Distribusi</text>

        {/* 3. ODP */}
        <g transform="translate(510, 45)">
          <rect width="110" height="95" rx="8" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
          <circle cx="55" cy="20" r="7" fill="#334155" stroke="#64748b" />
          <text x="55" y="45" fill="#e2e8f0" fontWeight="bold" fontSize="13" textAnchor="middle">ODP</text>
          <text x="55" y="60" fill="#94a3b8" fontSize="10" textAnchor="middle">Titik Tiang / Pole</text>
          <rect x="20" y="68" width="70" height="18" rx="4" fill="#4c1d95" />
          <text x="55" y="81" fill="#ddd6fe" fontSize="9" fontWeight="bold" textAnchor="middle">Splitter 1:8</text>
        </g>
        <text x="685" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Drop Cable Udara</text>

        {/* 4. ONT */}
        <g transform="translate(750, 45)">
          <rect width="110" height="95" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
          <path d="M 55 15 L 75 30 L 70 30 L 70 42 L 40 42 L 40 30 L 35 30 Z" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" />
          <text x="55" y="58" fill="#e2e8f0" fontWeight="bold" fontSize="13" textAnchor="middle">ONT / ONU</text>
          <text x="55" y="73" fill="#94a3b8" fontSize="10" textAnchor="middle">Rumah Pelanggan</text>
          <text x="55" y="86" fill="#34d399" fontSize="9" textAnchor="middle">RJ45 & Wi-Fi</text>
        </g>

        {/* Wavelength Indicator Footer */}
        <g transform="translate(180, 165)">
          <rect width="540" height="26" rx="6" fill="#0f172a" stroke="#334155" />
          <text x="270" y="17" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Downstream: 1490nm (Data) / 1550nm (Video) · Upstream: 1310nm (ONT ke OLT)
          </text>
        </g>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 2. Microwave Link LOS & VSAT Satellite Diagram (Modul 1)
// ---------------------------------------------------------------------------
export const MicrowaveVsatDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Transmisi Gelombang Radio Microwave Link (LOS) & VSAT</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 800 200" className="w-full h-auto text-xs" fill="none">
        {/* Sky gradient background */}
        <rect width="800" height="200" fill="#090d16" />

        {/* Ground level */}
        <path d="M 0 170 Q 200 160 400 165 T 800 170 L 800 200 L 0 200 Z" fill="#1e293b" />
        <path d="M 330 165 Q 400 135 470 165 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
        <text x="400" y="185" fill="#64748b" fontSize="10" textAnchor="middle">Bukit Penghalang (Interference Terrain)</text>

        {/* Tower Site A */}
        <g transform="translate(60, 50)">
          {/* Lattice Tower */}
          <path d="M 30 120 L 45 20 L 55 20 L 70 120" stroke="#94a3b8" strokeWidth="2" />
          <line x1="37" y1="90" x2="63" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="41" y1="60" x2="59" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="37" y1="90" x2="59" y2="60" stroke="#64748b" strokeWidth="1" />
          <line x1="63" y1="90" x2="41" y2="60" stroke="#64748b" strokeWidth="1" />
          {/* Parabolic dish */}
          <path d="M 55 20 Q 70 20 65 35" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <text x="50" y="135" fill="#e2e8f0" fontWeight="bold" fontSize="11" textAnchor="middle">Site A (BTS Master)</text>
        </g>

        {/* Tower Site B */}
        <g transform="translate(640, 50)">
          <path d="M 30 120 L 45 20 L 55 20 L 70 120" stroke="#94a3b8" strokeWidth="2" />
          <line x1="37" y1="90" x2="63" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="41" y1="60" x2="59" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="37" y1="90" x2="59" y2="60" stroke="#64748b" strokeWidth="1" />
          <line x1="63" y1="90" x2="41" y2="60" stroke="#64748b" strokeWidth="1" />
          {/* Parabolic dish */}
          <path d="M 45 20 Q 30 20 35 35" stroke="#f59e0b" strokeWidth="3" fill="none" />
          <text x="50" y="135" fill="#e2e8f0" fontWeight="bold" fontSize="11" textAnchor="middle">Site B (Remote Node)</text>
        </g>

        {/* Line of Sight (LOS) Direct Beam */}
        <line x1="120" y1="70" x2="680" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
        <text x="400" y="60" fill="#f59e0b" fontWeight="bold" fontSize="11" textAnchor="middle">Direct LOS (Line of Sight)</text>

        {/* 1st Fresnel Zone Ellipse */}
        <ellipse cx="400" cy="70" rx="270" ry="38" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <text x="400" y="95" fill="#38bdf8" fontSize="10" textAnchor="middle">Fresnel Zone Clearance (&ge; 60% bebas halangan)</text>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 3. Hypervisor Type 1 vs Type 2 Architecture (Modul 2)
// ---------------------------------------------------------------------------
export const HypervisorDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Komparasi Arsitektur Hypervisor Tipe 1 vs Tipe 2</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type 1: Bare Metal */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-violet-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-violet-300">Tipe 1: Bare-Metal Hypervisor</span>
            <span className="text-[10px] bg-violet-950 text-violet-300 px-2 py-0.5 rounded">Enterprise Data Center</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Berjalan langsung di atas perangkat keras fisik tanpa sistem operasi induk. Contoh: <strong>VMware ESXi, Proxmox VE, KVM</strong>.
          </p>

          <div className="space-y-1.5 text-center text-xs font-semibold pt-1">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200">
                <span className="block text-[11px]">VM 1 (Linux Web)</span>
                <span className="text-[9px] text-emerald-400 font-normal">App + Guest OS</span>
              </div>
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200">
                <span className="block text-[11px]">VM 2 (Win Server)</span>
                <span className="text-[9px] text-emerald-400 font-normal">App + Guest OS</span>
              </div>
            </div>
            <div className="p-2.5 bg-violet-900/60 border border-violet-400/60 rounded-lg text-violet-200">
              Type 1 Hypervisor (ESXi / Proxmox VE)
            </div>
            <div className="p-2.5 bg-slate-700 rounded-lg text-slate-200 border border-slate-600">
              Hardware Fisik Server (CPU, RAM, Storage, NIC)
            </div>
          </div>
        </div>

        {/* Type 2: Hosted */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-sky-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-sky-300">Tipe 2: Hosted Hypervisor</span>
            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded">Workstation / Lab Belajar</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Berjalan sebagai aplikasi di atas OS induk pengguna. Overhead lebih tinggi. Contoh: <strong>VirtualBox, VMware Workstation</strong>.
          </p>

          <div className="space-y-1.5 text-center text-xs font-semibold pt-1">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200">
                <span className="block text-[11px]">Guest VM 1</span>
                <span className="text-[9px] text-emerald-400 font-normal">MikroTik CHR</span>
              </div>
              <div className="p-2 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200">
                <span className="block text-[11px]">Guest VM 2</span>
                <span className="text-[9px] text-emerald-400 font-normal">Debian Server</span>
              </div>
            </div>
            <div className="p-2 bg-sky-900/60 border border-sky-400/60 rounded-lg text-sky-200">
              Type 2 Hypervisor (VirtualBox / VMware Workstation)
            </div>
            <div className="p-2 bg-blue-900/50 border border-blue-400/50 rounded-lg text-blue-200">
              Host Operating System (Windows 11 / Ubuntu / macOS)
            </div>
            <div className="p-2 bg-slate-700 rounded-lg text-slate-200 border border-slate-600">
              Hardware Fisik PC / Laptop
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 4. Data Center Hot Aisle & Cold Aisle Cooling (Modul 2)
// ---------------------------------------------------------------------------
export const DataCenterAisleDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Pengaturan Aliran Udara Server Hot Aisle / Cold Aisle</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 750 190" className="w-full h-auto text-xs" fill="none">
        {/* Cold Air Inflow (Left) */}
        <rect x="50" y="30" width="130" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="115" y="70" fill="#e2e8f0" fontWeight="bold" fontSize="12" textAnchor="middle">Rack Server A</text>
        <text x="115" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">Menghadap Depan</text>
        <text x="115" y="115" fill="#38bdf8" fontSize="10" textAnchor="middle">Front Intake</text>

        {/* Cold Aisle Corridor (Center Front) */}
        <g transform="translate(220, 25)">
          <rect width="140" height="140" rx="8" fill="#082f49" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="70" y="60" fill="#38bdf8" fontWeight="bold" fontSize="13" textAnchor="middle">COLD AISLE</text>
          <text x="70" y="80" fill="#bae6fd" fontSize="10" textAnchor="middle">Udara Dingin Masuk</text>
          <text x="70" y="100" fill="#7dd3fc" fontSize="9" textAnchor="middle">Suhu: 18°C – 22°C</text>
          {/* Arrow */}
          <path d="M 70 120 L 70 35 M 65 45 L 70 35 L 75 45" stroke="#38bdf8" strokeWidth="2" fill="none" />
        </g>

        {/* Rack Server B (Facing Cold Aisle) */}
        <rect x="400" y="30" width="130" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="465" y="70" fill="#e2e8f0" fontWeight="bold" fontSize="12" textAnchor="middle">Rack Server B</text>
        <text x="465" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">Menghadap Depan</text>
        <text x="465" y="115" fill="#38bdf8" fontSize="10" textAnchor="middle">Front Intake</text>

        {/* Hot Aisle Exhaust (Right) */}
        <g transform="translate(560, 25)">
          <rect width="140" height="140" rx="8" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
          <text x="70" y="60" fill="#f87171" fontWeight="bold" fontSize="13" textAnchor="middle">HOT AISLE</text>
          <text x="70" y="80" fill="#fecaca" fontSize="10" textAnchor="middle">Pembuangan Panas</text>
          <text x="70" y="100" fill="#fca5a5" fontSize="9" textAnchor="middle">Suhu: 30°C – 35°C</text>
          <path d="M 70 35 L 70 120 M 65 110 L 70 120 L 75 110" stroke="#ef4444" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 5. VLAN Trunking & 802.1Q Encapsulation (Modul 3)
// ---------------------------------------------------------------------------
export const VlanTrunkingDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Trunking VLAN IEEE 802.1Q & Isolasi Broadcast Domain</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 800 200" className="w-full h-auto text-xs" fill="none">
        {/* Switch 1 */}
        <g transform="translate(180, 40)">
          <rect width="130" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="65" y="35" fill="#e2e8f0" fontWeight="bold" fontSize="12" textAnchor="middle">Switch SW-1</text>
          <text x="65" y="55" fill="#6ee7b7" fontSize="10" textAnchor="middle">Managed L2</text>
          <circle cx="35" cy="70" r="4" fill="#38bdf8" />
          <circle cx="65" cy="70" r="4" fill="#f59e0b" />
          <circle cx="95" cy="70" r="4" fill="#10b981" />
        </g>

        {/* Switch 2 */}
        <g transform="translate(490, 40)">
          <rect width="130" height="90" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="65" y="35" fill="#e2e8f0" fontWeight="bold" fontSize="12" textAnchor="middle">Switch SW-2</text>
          <text x="65" y="55" fill="#6ee7b7" fontSize="10" textAnchor="middle">Managed L2</text>
          <circle cx="35" cy="70" r="4" fill="#38bdf8" />
          <circle cx="65" cy="70" r="4" fill="#f59e0b" />
          <circle cx="95" cy="70" r="4" fill="#10b981" />
        </g>

        {/* Trunk Link */}
        <line x1="310" y1="85" x2="490" y2="85" stroke="#10b981" strokeWidth="4" />
        <rect x="350" y="65" width="100" height="40" rx="6" fill="#064e3b" stroke="#34d399" />
        <text x="400" y="80" fill="#ecfdf5" fontWeight="bold" fontSize="10" textAnchor="middle">TRUNK LINK</text>
        <text x="400" y="95" fill="#a7f3d0" fontSize="9" textAnchor="middle">802.1Q Tagged</text>

        {/* Access Ports Left */}
        {/* VLAN 10 */}
        <path d="M 60 40 L 180 65" stroke="#38bdf8" strokeWidth="2" />
        <rect x="10" y="20" width="100" height="35" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
        <text x="60" y="42" fill="#e0f2fe" fontWeight="bold" fontSize="10" textAnchor="middle">PC A (VLAN 10)</text>

        {/* VLAN 20 */}
        <path d="M 60 140 L 180 105" stroke="#f59e0b" strokeWidth="2" />
        <rect x="10" y="125" width="100" height="35" rx="6" fill="#78350f" stroke="#f59e0b" />
        <text x="60" y="147" fill="#fef3c7" fontWeight="bold" fontSize="10" textAnchor="middle">PC B (VLAN 20)</text>

        {/* Access Ports Right */}
        {/* VLAN 10 */}
        <path d="M 620 65 L 740 40" stroke="#38bdf8" strokeWidth="2" />
        <rect x="690" y="20" width="100" height="35" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
        <text x="740" y="42" fill="#e0f2fe" fontWeight="bold" fontSize="10" textAnchor="middle">PC C (VLAN 10)</text>

        {/* VLAN 20 */}
        <path d="M 620 105 L 740 140" stroke="#f59e0b" strokeWidth="2" />
        <rect x="690" y="125" width="100" height="35" rx="6" fill="#78350f" stroke="#f59e0b" />
        <text x="740" y="147" fill="#fef3c7" fontWeight="bold" fontSize="10" textAnchor="middle">PC D (VLAN 20)</text>

        {/* Explanation text */}
        <text x="400" y="180" fill="#94a3b8" fontSize="10" textAnchor="middle">
          PC A hanya bisa berkomunikasi langsung dengan PC C (sesama VLAN 10). Trafik antar VLAN diisolasi.
        </text>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 6. Subnetting IPv4 & CIDR Visualizer (Modul 3)
// ---------------------------------------------------------------------------
export const SubnettingDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Pembagian Alamat IPv4 CIDR (/24, /25, /26, /27)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-sky-400 block mb-1">Prefix /24</span>
          <span className="text-slate-300 text-[11px] block">Netmask: 255.255.255.0</span>
          <span className="text-emerald-400 font-mono text-[10px] block mt-1">Total: 256 IP</span>
          <span className="text-slate-400 text-[10px]">Host: 254 (2⁸ - 2)</span>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-amber-400 block mb-1">Prefix /25</span>
          <span className="text-slate-300 text-[11px] block">Netmask: 255.255.255.128</span>
          <span className="text-emerald-400 font-mono text-[10px] block mt-1">Total: 128 IP</span>
          <span className="text-slate-400 text-[10px]">Host: 126 (2⁷ - 2)</span>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-purple-400 block mb-1">Prefix /26</span>
          <span className="text-slate-300 text-[11px] block">Netmask: 255.255.255.192</span>
          <span className="text-emerald-400 font-mono text-[10px] block mt-1">Total: 64 IP</span>
          <span className="text-slate-400 text-[10px]">Host: 62 (2⁶ - 2)</span>
        </div>
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-emerald-400 block mb-1">Prefix /27</span>
          <span className="text-slate-300 text-[11px] block">Netmask: 255.255.255.224</span>
          <span className="text-emerald-400 font-mono text-[10px] block mt-1">Total: 32 IP</span>
          <span className="text-slate-400 text-[10px]">Host: 30 (2⁵ - 2)</span>
        </div>
      </div>

      <div className="p-3 bg-slate-950/70 rounded-lg text-xs text-slate-300 space-y-1">
        <span className="font-semibold text-amber-300 block">Aturan Utama Perhitungan IP:</span>
        <p className="text-[11px]">
          1. <strong>Network ID:</strong> IP pertama (alamat jaringan, tidak boleh dipakai host).<br />
          2. <strong>Broadcast ID:</strong> IP terakhir (alamat broadcast semua host).<br />
          3. <strong>Usable Host:</strong> Alamat di antara Network ID dan Broadcast ID.
        </p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 7. Router-on-a-Stick Inter-VLAN Routing (Modul 4)
// ---------------------------------------------------------------------------
export const RouterOnAStickDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Arsitektur Router-on-a-Stick (Sub-Interface Trunk)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 750 190" className="w-full h-auto text-xs" fill="none">
        {/* Router (Top) */}
        <g transform="translate(300, 15)">
          <rect width="150" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="35" cy="30" r="12" fill="#0f172a" stroke="#38bdf8" />
          <text x="35" y="34" fill="#38bdf8" fontSize="10" textAnchor="middle">R1</text>
          <text x="95" y="27" fill="#e2e8f0" fontWeight="bold" fontSize="11">ROUTER</text>
          <text x="95" y="44" fill="#93c5fd" fontSize="9">fa0/0.10 & fa0/0.20</text>
        </g>

        {/* Trunk Single Cable */}
        <line x1="375" y1="75" x2="375" y2="120" stroke="#38bdf8" strokeWidth="4" />
        <text x="430" y="100" fill="#38bdf8" fontSize="10" fontWeight="bold">Trunk 802.1Q</text>

        {/* Switch (Bottom) */}
        <g transform="translate(290, 120)">
          <rect width="170" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="85" y="25" fill="#e2e8f0" fontWeight="bold" fontSize="11" textAnchor="middle">SWITCH LAYER 2</text>
          <text x="85" y="40" fill="#6ee7b7" fontSize="9" textAnchor="middle">VLAN 10 & VLAN 20</text>
        </g>

        {/* PC VLAN 10 (Left) */}
        <line x1="290" y1="145" x2="160" y2="145" stroke="#38bdf8" strokeWidth="2" />
        <rect x="50" y="125" width="110" height="40" rx="6" fill="#0c4a6e" stroke="#38bdf8" />
        <text x="105" y="142" fill="#e0f2fe" fontWeight="bold" fontSize="10" textAnchor="middle">PC A (VLAN 10)</text>
        <text x="105" y="156" fill="#7dd3fc" fontSize="9" textAnchor="middle">GW: fa0/0.10</text>

        {/* PC VLAN 20 (Right) */}
        <line x1="460" y1="145" x2="590" y2="145" stroke="#f59e0b" strokeWidth="2" />
        <rect x="590" y="125" width="110" height="40" rx="6" fill="#78350f" stroke="#f59e0b" />
        <text x="645" y="142" fill="#fef3c7" fontWeight="bold" fontSize="10" textAnchor="middle">PC B (VLAN 20)</text>
        <text x="645" y="156" fill="#fcd34d" fontSize="9" textAnchor="middle">GW: fa0/0.20</text>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 8. OSPF & Static Routing Topology (Modul 4)
// ---------------------------------------------------------------------------
export const RoutingTopologyDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Topologi Dinamis OSPF Area 0 (Backbone) vs Redundansi</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 750 190" className="w-full h-auto text-xs" fill="none">
        {/* Backbone Area Circle */}
        <ellipse cx="375" cy="95" rx="260" ry="75" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="375" y="45" fill="#a5b4fc" fontWeight="bold" fontSize="11" textAnchor="middle">OSPF AREA 0 (BACKBONE)</text>

        {/* Router 1 (HQ) */}
        <g transform="translate(160, 65)">
          <rect width="100" height="60" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
          <text x="50" y="30" fill="#e2e8f0" fontWeight="bold" fontSize="11" textAnchor="middle">R-Kantor Pusat</text>
          <text x="50" y="48" fill="#a5b4fc" fontSize="9" textAnchor="middle">Router ID: 1.1.1.1</text>
        </g>

        {/* Router 2 (Branch 1) */}
        <g transform="translate(480, 65)">
          <rect width="100" height="60" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
          <text x="50" y="30" fill="#e2e8f0" fontWeight="bold" fontSize="11" textAnchor="middle">R-Cabang A</text>
          <text x="50" y="48" fill="#a5b4fc" fontSize="9" textAnchor="middle">Router ID: 2.2.2.2</text>
        </g>

        {/* Router 3 (Branch 2 - Redundant) */}
        <g transform="translate(325, 110)">
          <rect width="100" height="50" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
          <text x="50" y="26" fill="#e2e8f0" fontWeight="bold" fontSize="10" textAnchor="middle">R-Cadangan</text>
          <text x="50" y="40" fill="#6ee7b7" fontSize="8" textAnchor="middle">Backup Link</text>
        </g>

        {/* Links */}
        <line x1="260" y1="95" x2="480" y2="95" stroke="#818cf8" strokeWidth="3" />
        <line x1="230" y1="125" x2="325" y2="135" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
        <line x1="425" y1="135" x2="510" y2="125" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 9. RJ45 T568A vs T568B Wiring Diagram (Modul 5)
// ---------------------------------------------------------------------------
export const Rj45WiringDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  const pinColorsT568B = [
    { num: 1, name: 'Putih Oranye', bg: '#fb923c' },
    { num: 2, name: 'Oranye', bg: '#ea580c' },
    { num: 3, name: 'Putih Hijau', bg: '#4ade80' },
    { num: 4, name: 'Biru', bg: '#2563eb' },
    { num: 5, name: 'Putih Biru', bg: '#60a5fa' },
    { num: 6, name: 'Hijau', bg: '#16a34a' },
    { num: 7, name: 'Putih Cokelat', bg: '#a8715a' },
    { num: 8, name: 'Cokelat', bg: '#78350f' },
  ];

  const pinColorsT568A = [
    { num: 1, name: 'Putih Hijau', bg: '#4ade80' },
    { num: 2, name: 'Hijau', bg: '#16a34a' },
    { num: 3, name: 'Putih Oranye', bg: '#fb923c' },
    { num: 4, name: 'Biru', bg: '#2563eb' },
    { num: 5, name: 'Putih Biru', bg: '#60a5fa' },
    { num: 6, name: 'Oranye', bg: '#ea580c' },
    { num: 7, name: 'Putih Cokelat', bg: '#a8715a' },
    { num: 8, name: 'Cokelat', bg: '#78350f' },
  ];

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram Pinout Modular RJ45 (8P8C): Standar T568A vs T568B</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* T568B Standard */}
        <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-amber-400">Standar T568B (Paling Umum)</span>
            <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">Kabel Straight</span>
          </div>

          <div className="space-y-1">
            {pinColorsT568B.map(pin => (
              <div key={pin.num} className="flex items-center gap-2 text-xs">
                <span className="w-5 font-mono text-slate-400 font-bold">P{pin.num}</span>
                <div 
                  className="w-6 h-3.5 rounded border border-slate-600 shrink-0" 
                  style={{ backgroundColor: pin.bg }}
                />
                <span className="text-slate-200 text-[11px]">{pin.name}</span>
                <span className="ml-auto text-[9px] text-slate-500 font-mono">
                  {pin.num === 1 || pin.num === 2 ? 'TX Pair' : pin.num === 3 || pin.num === 6 ? 'RX Pair' : 'Gigabit'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* T568A Standard */}
        <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-emerald-400">Standar T568A</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded">Silang (Cross)</span>
          </div>

          <div className="space-y-1">
            {pinColorsT568A.map(pin => (
              <div key={pin.num} className="flex items-center gap-2 text-xs">
                <span className="w-5 font-mono text-slate-400 font-bold">P{pin.num}</span>
                <div 
                  className="w-6 h-3.5 rounded border border-slate-600 shrink-0" 
                  style={{ backgroundColor: pin.bg }}
                />
                <span className="text-slate-200 text-[11px]">{pin.name}</span>
                <span className="ml-auto text-[9px] text-slate-500 font-mono">
                  {pin.num === 1 || pin.num === 2 ? 'RX Pair' : pin.num === 3 || pin.num === 6 ? 'TX Pair' : 'Gigabit'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-2.5 bg-slate-950/70 rounded-lg text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <span><strong>Straight-Through:</strong> Ujung A (T568B) &harr; Ujung B (T568B)</span>
        <span><strong>Crossover:</strong> Ujung A (T568A) &harr; Ujung B (T568B)</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 10. Fiber Cleaver & Fusion Splicer Mechanism (Modul 5)
// ---------------------------------------------------------------------------
export const FusionSplicerDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Mekanisme Fusion Splicer & Sudut Pemotongan Cleaver 90°</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 750 180" className="w-full h-auto text-xs" fill="none">
        {/* Fiber Left */}
        <g transform="translate(60, 60)">
          <rect width="180" height="30" rx="4" fill="#334155" />
          <text x="80" y="20" fill="#94a3b8" fontSize="10">Cladding 125µm</text>
          <rect x="180" y="10" width="80" height="10" fill="#38bdf8" />
          <line x1="260" y1="10" x2="260" y2="20" stroke="#f87171" strokeWidth="2" />
          <text x="260" y="35" fill="#f87171" fontSize="9" textAnchor="middle">Potongan 90°</text>
        </g>

        {/* Electrodes Arc */}
        <g transform="translate(375, 20)">
          {/* Top Electrode */}
          <polygon points="0,0 -8,30 8,30" fill="#facc15" stroke="#eab308" />
          {/* Arc spark */}
          <line x1="0" y1="35" x2="0" y2="85" stroke="#facc15" strokeWidth="3" strokeDasharray="3 2" />
          {/* Bottom Electrode */}
          <polygon points="0,120 -8,90 8,90" fill="#facc15" stroke="#eab308" />
          <text x="0" y="65" fill="#fef08a" fontWeight="bold" fontSize="10" textAnchor="middle">BUSUR LISTRIK (ARC)</text>
        </g>

        {/* Fiber Right */}
        <g transform="translate(450, 60)">
          <line x1="30" y1="10" x2="30" y2="20" stroke="#f87171" strokeWidth="2" />
          <rect x="30" y="10" width="80" height="10" fill="#38bdf8" />
          <rect x="110" y="0" width="180" height="30" rx="4" fill="#334155" />
          <text x="180" y="20" fill="#94a3b8" fontSize="10">Cladding 125µm</text>
          <text x="30" y="35" fill="#f87171" fontSize="9" textAnchor="middle">Potongan 90°</text>
        </g>

        <text x="375" y="160" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Fiber Cleaver memotong ujung serat kaca tegak lurus (90° presisi) sebelum dileburkan elektroda (&lt; 0.05 dB loss).
        </text>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 11. Fiber Optic Anatomy & Total Internal Reflection (Modul 6)
// ---------------------------------------------------------------------------
export const FiberOpticStructureDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Anatomi Serat Optik & Hukum Pantulan Internal Total (TIR)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 800 160" className="w-full h-auto text-xs" fill="none">
        {/* Outer Jacket */}
        <rect x="40" y="15" width="720" height="130" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <text x="60" y="35" fill="#94a3b8" fontSize="10" fontWeight="bold">Outer Jacket & Buffer Coating (250 µm)</text>

        {/* Cladding */}
        <rect x="110" y="40" width="620" height="80" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
        <text x="130" y="58" fill="#a5b4fc" fontSize="10">Cladding Silika: Indeks Bias n₂ (125 µm)</text>

        {/* Core */}
        <rect x="170" y="65" width="530" height="30" rx="4" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="190" y="84" fill="#38bdf8" fontSize="10" fontWeight="bold">Core (Inti Kaca n₁ &gt; n₂): SMF 9µm / MMF 50µm</text>

        {/* Light Beam Reflection */}
        <path 
          d="M 170 80 L 240 70 L 310 90 L 380 70 L 450 90 L 520 70 L 590 90 L 660 80" 
          stroke="#facc15" 
          strokeWidth="2.5" 
          strokeDasharray="4 2" 
        />
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
        <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
          <strong className="text-sky-400 block font-semibold mb-0.5">Single-Mode Fiber (SMF):</strong>
          Core kecil 9 µm, laser satu mode, dispersi modal minimal untuk jarak hingga 40-80 km.
        </div>
        <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700">
          <strong className="text-purple-400 block font-semibold mb-0.5">Multimode Fiber (MMF):</strong>
          Core besar 50/62.5 µm, sumber LED berkas banyak pantulan, dispersi tinggi untuk jarak pendek &lt; 500m.
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 12. Optical Splitter & Redaman Link (Modul 6)
// ---------------------------------------------------------------------------
export const OpticalSplitterDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Rasio Passive Splitter PLC & Redaman Teoretis (Loss dB)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-fuchsia-300 block">Splitter 1:2</span>
          <span className="text-emerald-400 font-mono font-bold text-sm block my-0.5">~3.5 dB</span>
          <span className="text-slate-400 text-[10px]">Redaman Teoretis</span>
        </div>
        <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-fuchsia-300 block">Splitter 1:4</span>
          <span className="text-emerald-400 font-mono font-bold text-sm block my-0.5">~7.2 dB</span>
          <span className="text-slate-400 text-[10px]">Redaman Teoretis</span>
        </div>
        <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-fuchsia-300 block">Splitter 1:8</span>
          <span className="text-emerald-400 font-mono font-bold text-sm block my-0.5">~10.5 dB</span>
          <span className="text-slate-400 text-[10px]">Redaman Teoretis</span>
        </div>
        <div className="p-2.5 bg-slate-800 rounded-lg border border-slate-700">
          <span className="font-bold text-fuchsia-300 block">Splitter 1:16</span>
          <span className="text-emerald-400 font-mono font-bold text-sm block my-0.5">~14.0 dB</span>
          <span className="text-slate-400 text-[10px]">Redaman Teoretis</span>
        </div>
      </div>

      <p className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg">
        <strong>Standar Redaman Link Budget FTTH:</strong> Total loss seluruh link dari OLT hingga ONT tidak boleh melebihi <strong>-28 dBm</strong> agar ONT dapat mendeteksi sinyal dengan sensitivitas memadai.
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 13. 7 OSI Layer vs 4 TCP/IP Model (Modul 7)
// ---------------------------------------------------------------------------
export const OsiTcpIpStackDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  const osiLayers = [
    { num: 7, name: 'Application', pdu: 'Data', color: '#3b82f6' },
    { num: 6, name: 'Presentation', pdu: 'Data', color: '#3b82f6' },
    { num: 5, name: 'Session', pdu: 'Data', color: '#3b82f6' },
    { num: 4, name: 'Transport', pdu: 'Segment', color: '#8b5cf6' },
    { num: 3, name: 'Network', pdu: 'Packet', color: '#06b6d4' },
    { num: 2, name: 'Data Link', pdu: 'Frame', color: '#10b981' },
    { num: 1, name: 'Physical', pdu: 'Bits', color: '#f59e0b' },
  ];

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram Komparasi: Model 7 Layer OSI & 4 Layer TCP/IP</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* OSI 7 Layers */}
        <div className="md:col-span-7 space-y-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Model Referensi OSI (7 Layer)
          </span>
          {osiLayers.map(l => (
            <div
              key={l.num}
              className="p-2 rounded-lg flex items-center justify-between text-xs border border-slate-700/60"
              style={{ backgroundColor: `${l.color}15` }}
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded font-bold text-[10px] flex items-center justify-center text-slate-900" style={{ backgroundColor: l.color }}>
                  {l.num}
                </span>
                <span className="font-semibold text-slate-100">{l.name} Layer</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                PDU: {l.pdu}
              </span>
            </div>
          ))}
        </div>

        {/* TCP/IP 4 Layers */}
        <div className="md:col-span-5 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Model Protokol TCP/IP (4 Layer)
          </span>

          <div className="p-3 rounded-xl border border-blue-500/40 bg-blue-950/30 text-xs space-y-0.5">
            <span className="font-bold text-blue-400 block">4. Application Layer</span>
            <span className="text-slate-300 text-[10px] block">HTTP, HTTPS, DNS, DHCP, SSH</span>
          </div>

          <div className="p-3 rounded-xl border border-purple-500/40 bg-purple-950/30 text-xs space-y-0.5">
            <span className="font-bold text-purple-400 block">3. Transport Layer</span>
            <span className="text-slate-300 text-[10px] block">TCP (Reliable) / UDP (Fast Stream)</span>
          </div>

          <div className="p-3 rounded-xl border border-cyan-500/40 bg-cyan-950/30 text-xs space-y-0.5">
            <span className="font-bold text-cyan-400 block">2. Internet Layer</span>
            <span className="text-slate-300 text-[10px] block">IPv4, IPv6, ICMP, Routing</span>
          </div>

          <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-xs space-y-0.5">
            <span className="font-bold text-emerald-400 block">1. Network Access Layer</span>
            <span className="text-slate-300 text-[10px] block">Ethernet MAC (802.3), Wi-Fi (802.11)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 14. TCP 3-Way Handshake Connection (Modul 7)
// ---------------------------------------------------------------------------
export const TcpHandshakeDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Alur Pembentukan Sesi TCP 3-Way Handshake (SYN, SYN-ACK, ACK)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 700 170" className="w-full h-auto text-xs" fill="none">
        {/* Client Column */}
        <line x1="150" y1="20" x2="150" y2="150" stroke="#475569" strokeWidth="2" />
        <rect x="90" y="5" width="120" height="25" rx="4" fill="#0284c7" />
        <text x="150" y="22" fill="#ffffff" fontWeight="bold" fontSize="11" textAnchor="middle">Client (Pengirim)</text>

        {/* Server Column */}
        <line x1="550" y1="20" x2="550" y2="150" stroke="#475569" strokeWidth="2" />
        <rect x="490" y="5" width="120" height="25" rx="4" fill="#059669" />
        <text x="550" y="22" fill="#ffffff" fontWeight="bold" fontSize="11" textAnchor="middle">Server (Penerima)</text>

        {/* Step 1: SYN */}
        <line x1="150" y1="50" x2="540" y2="70" stroke="#38bdf8" strokeWidth="2" />
        <polygon points="545,70 535,66 537,74" fill="#38bdf8" />
        <text x="350" y="52" fill="#38bdf8" fontWeight="bold" fontSize="10" textAnchor="middle">1. SYN (Synchronize Sequence Number)</text>

        {/* Step 2: SYN-ACK */}
        <line x1="550" y1="85" x2="160" y2="105" stroke="#a78bfa" strokeWidth="2" />
        <polygon points="155,105 165,101 163,109" fill="#a78bfa" />
        <text x="350" y="90" fill="#a78bfa" fontWeight="bold" fontSize="10" textAnchor="middle">2. SYN-ACK (Acknowledge & Sync)</text>

        {/* Step 3: ACK */}
        <line x1="150" y1="120" x2="540" y2="140" stroke="#34d399" strokeWidth="2" />
        <polygon points="545,140 535,136 537,144" fill="#34d399" />
        <text x="350" y="125" fill="#34d399" fontWeight="bold" fontSize="10" textAnchor="middle">3. ACK (Koneksi Terjalin / Established)</text>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 15. OTDR Trace Graph Reflectometry (Modul 8)
// ---------------------------------------------------------------------------
export const OtdrTraceGraphDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Diagram: Grafik Jejak Reflektometri OTDR (Event Analysis)</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <svg viewBox="0 0 750 200" className="w-full h-auto text-xs" fill="none">
        {/* Graph Axes */}
        <line x1="70" y1="20" x2="70" y2="160" stroke="#64748b" strokeWidth="2" />
        <line x1="70" y1="160" x2="720" y2="160" stroke="#64748b" strokeWidth="2" />
        <text x="35" y="90" fill="#94a3b8" fontSize="10" transform="rotate(-90 35 90)" textAnchor="middle">Daya Optik (dB)</text>
        <text x="400" y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">Jarak Serat Optik (Kilometer / Meter)</text>

        {/* Trace Curve */}
        {/* Deadzone Peak at start */}
        <path 
          d="M 70 160 L 75 35 L 90 80 L 220 100 
             L 225 60 L 235 105 L 380 115 
             L 395 125 L 560 138 
             L 565 75 L 575 160 L 700 160" 
          stroke="#38bdf8" 
          strokeWidth="2.5" 
          fill="none" 
        />

        {/* Annotation 1: Launch Dead Zone */}
        <g transform="translate(85, 30)">
          <circle cx="0" cy="0" r="4" fill="#f87171" />
          <text x="10" y="4" fill="#fca5a5" fontSize="9">Dead Zone & Konektor Pertama</text>
        </g>

        {/* Annotation 2: Reflective Event (Mechanical Connector) */}
        <g transform="translate(230, 50)">
          <circle cx="0" cy="0" r="4" fill="#facc15" />
          <text x="10" y="4" fill="#fef08a" fontSize="9">Event Reflektif (Konektor / ODF)</text>
        </g>

        {/* Annotation 3: Non-Reflective Event (Splice Loss Step) */}
        <g transform="translate(390, 110)">
          <circle cx="0" cy="0" r="4" fill="#4ade80" />
          <text x="10" y="4" fill="#86efac" fontSize="9">Sambungan Redaman (Splice Loss &le; 0.05dB)</text>
        </g>

        {/* Annotation 4: End of Fiber Break */}
        <g transform="translate(565, 70)">
          <circle cx="0" cy="0" r="4" fill="#ef4444" />
          <text x="10" y="4" fill="#f87171" fontWeight="bold" fontSize="9">Ujung Serat / Kabel Putus (Fiber End)</text>
        </g>
      </svg>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 16. Network Measuring Tools (Modul 8)
// ---------------------------------------------------------------------------
export const NetworkMeasuringToolsDiagram: React.FC<DiagramProps> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900 text-white p-4 sm:p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Skema Instrumen Pengukuran & Alat Uji Jaringan</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Bebas Lisensi</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
          <span className="font-bold text-sm text-sky-400 block">OTDR</span>
          <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded inline-block">Jarak & Event Jejak</span>
          <p className="text-[11px] text-slate-300">
            Mengirim pulsa laser Rayleigh untuk menentukan lokasi titik putus kabel, nilai loss sambungan, dan panjang total fiber.
          </p>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
          <span className="font-bold text-sm text-emerald-400 block">OPM + OLS</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded inline-block">Total Redaman Link</span>
          <p className="text-[11px] text-slate-300">
            Kombinasi sumber cahaya stabil (OLS) dan pengukur daya (OPM) untuk mengukur total insertion loss end-to-end (dB).
          </p>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
          <span className="font-bold text-sm text-rose-400 block">VFL Laser</span>
          <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded inline-block">Visual Fault Locator</span>
          <p className="text-[11px] text-slate-300">
            Laser merah 650nm kasatmata untuk mendeteksi tekukan mikro (bending), patahan core di patch cord, atau urutan core.
          </p>
        </div>

        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5">
          <span className="font-bold text-sm text-amber-400 block">LAN Cable Tester</span>
          <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded inline-block">Wire Map RJ45</span>
          <p className="text-[11px] text-slate-300">
            Menguji kontinuitas 8 pin kawat tembaga kabel UTP: mendeteksi kondisi Pass, Open (putus), Short, dan Miswire.
          </p>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Helper: Map diagram ID to Component
// ---------------------------------------------------------------------------
export function renderTechnicalDiagram(diagramId: string, className?: string): React.ReactNode {
  switch (diagramId) {
    case 'ftth_architecture':
      return <FtthArchitectureDiagram className={className} />;
    case 'microwave_vsat':
      return <MicrowaveVsatDiagram className={className} />;
    case 'hypervisor':
      return <HypervisorDiagram className={className} />;
    case 'datacenter_aisle':
      return <DataCenterAisleDiagram className={className} />;
    case 'vlan_trunking':
      return <VlanTrunkingDiagram className={className} />;
    case 'subnetting':
      return <SubnettingDiagram className={className} />;
    case 'router_on_a_stick':
      return <RouterOnAStickDiagram className={className} />;
    case 'routing_topology':
      return <RoutingTopologyDiagram className={className} />;
    case 'rj45_wiring':
      return <Rj45WiringDiagram className={className} />;
    case 'fusion_splicer':
      return <FusionSplicerDiagram className={className} />;
    case 'fiber_structure':
      return <FiberOpticStructureDiagram className={className} />;
    case 'optical_splitter':
      return <OpticalSplitterDiagram className={className} />;
    case 'osi_tcpip':
      return <OsiTcpIpStackDiagram className={className} />;
    case 'tcp_handshake':
      return <TcpHandshakeDiagram className={className} />;
    case 'otdr_trace':
      return <OtdrTraceGraphDiagram className={className} />;
    case 'measuring_tools':
      return <NetworkMeasuringToolsDiagram className={className} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Helper: Automatically detect if question benefits from a technical diagram
// ---------------------------------------------------------------------------
export function getQuestionDiagramId(q: Question): string | null {
  if (q.diagramId) return q.diagramId;

  const text = `${q.kasus} ${q.subKompetensi} ${q.kompetensi} ${q.pembahasan}`.toLowerCase();

  if (text.includes('t568a') || text.includes('t568b') || text.includes('kabel straight') || text.includes('kabel crossover') || (text.includes('rj45') && text.includes('pin'))) {
    return 'rj45_wiring';
  }
  if (text.includes('otdr') || text.includes('reflectometr') || text.includes('dead zone') || text.includes('event loss') || text.includes('jejak otdr')) {
    return 'otdr_trace';
  }
  if (text.includes('gpon') || text.includes('ftth') || text.includes('odc') || text.includes('odp') || (text.includes('olt') && text.includes('ont'))) {
    return 'ftth_architecture';
  }
  if (text.includes('splicing') || text.includes('cleaver') || text.includes('fusion splicer') || text.includes('v-groove') || text.includes('elektroda arc')) {
    return 'fusion_splicer';
  }
  if (text.includes('osi') || (text.includes('tcp/ip') && text.includes('layer')) || text.includes('7 layer')) {
    return 'osi_tcpip';
  }
  if (text.includes('3-way handshake') || text.includes('syn-ack') || text.includes('three-way handshake')) {
    return 'tcp_handshake';
  }
  if (text.includes('router-on-a-stick') || (text.includes('sub-interface') && text.includes('vlan')) || text.includes('subinterface')) {
    return 'router_on_a_stick';
  }
  if (text.includes('trunking') || text.includes('802.1q') || text.includes('dot1q') || (text.includes('vlan') && text.includes('switch'))) {
    return 'vlan_trunking';
  }
  if (text.includes('hypervisor') || text.includes('bare metal') || text.includes('tipe 1') || text.includes('tipe 2') || text.includes('proxmox') || text.includes('esxi')) {
    return 'hypervisor';
  }
  if (text.includes('hot aisle') || text.includes('cold aisle') || (text.includes('data center') && text.includes('rak'))) {
    return 'datacenter_aisle';
  }
  if (text.includes('core') && text.includes('cladding') && (text.includes('single-mode') || text.includes('multimode') || text.includes('pantulan'))) {
    return 'fiber_structure';
  }
  if (text.includes('opm') || text.includes('optical power meter') || text.includes('ols') || text.includes('cable tester') || text.includes('vfl')) {
    return 'measuring_tools';
  }
  if (text.includes('splitter') && (text.includes('1:4') || text.includes('1:8') || text.includes('1:16') || text.includes('redaman'))) {
    return 'optical_splitter';
  }
  if (text.includes('subnet') || text.includes('prefix /') || text.includes('/24') || text.includes('/25') || text.includes('/26') || text.includes('/27')) {
    return 'subnetting';
  }
  if (text.includes('microwave') || text.includes('fresnel') || (text.includes('line of sight') && text.includes('los'))) {
    return 'microwave_vsat';
  }
  if (text.includes('ospf') && (text.includes('area 0') || text.includes('routing dinamis'))) {
    return 'routing_topology';
  }

  return null;
}
