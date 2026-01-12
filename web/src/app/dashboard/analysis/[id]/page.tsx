"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarArea } from 'recharts';

// --- DURUM MOTORU (Backend'den gelen veriye göre her şey değişir) ---
const currentStatus = "POSITIVE"; // Burayı "PLATEAU" veya "STABLE" yaparak test edebilirsin

const STATUS_THEMES = {
    POSITIVE: {
        color: "text-green-500",
        bg: "bg-green-500/5",
        border: "border-green-500/20",
        label: "GELİŞİM RAPORU",
        sub: "SİNYAL KALİTESİ: OPTİMAL",
        diagnosis: "KAS-SİNİR UYUMU",
        actionTitle: "YÜKLEME YAP",
        actionDesc: "Sistem yeni yüklere hazır. Ağırlığı %2.5 artır veya set arası dinlenmeyi kısalt.",
        aiNote: "Mükemmel sinyal kalitesi! Sinir sistemin ve kasların tam uyum içinde çalışıyor. Uyku ve beslenme dengesi bu tempoyu destekliyor.",
        chartColor: "#22c55e"
    },
    PLATEAU: {
        color: "text-red-500",
        bg: "bg-red-500/5",
        border: "border-red-500/20",
        label: "PLATO RAPORU",
        sub: "SİNYAL KESİNTİSİ: KRİTİK",
        diagnosis: "YETERSİZ DİNLENME",
        actionTitle: "DELOAD HAFTASI",
        actionDesc: "Ağırlıkları %20 düşür. Vücuduna reset atması için 7 gün tanı, haftaya daha güçlü döneceksin.",
        aiNote: "Bench Press verilerinde duraklama noktası görüyoruz. RPE @10 olması sinir sisteminin tıkandığını kanıtlıyor.",
        chartColor: "#ef4444"
    },
    STABLE: {
        color: "text-blue-500",
        bg: "bg-blue-500/5",
        border: "border-blue-500/20",
        label: "STABİLİTE RAPORU",
        sub: "SİNYAL DURUMU: DENGELİ",
        diagnosis: "KORUMA FAZI",
        actionTitle: "TEMPOYU KORU",
        actionDesc: "Gelişim stabil. Bu hafta formu mükemmelleştirmeye ve tempoyu korumaya odaklan.",
        aiNote: "Sistem dengeli bir çizgide ilerliyor. Büyük bir sıçrama yok ancak gerileme de yok. Süreç planlandığı gibi gidiyor.",
        chartColor: "#3b82f6"
    }
};

const radarData = [
    { subject: 'GÜÇ', A: 85 },
    { subject: 'HACİM', A: 70 },
    { subject: 'UYKU', A: currentStatus === "POSITIVE" ? 90 : 40 }, // Veri de duruma göre değişebilir
    { subject: 'SİNİR SİSTEMİ', A: 60 },
    { subject: 'BESLENME', A: 90 },
];

export default function SignalDiagnosisPage() {
    const theme = STATUS_THEMES[currentStatus];

    return (
        <div className="min-h-screen bg-[#060606] text-white p-6 md:p-12 font-sans selection:bg-zinc-500/30">
            <main className="max-w-5xl mx-auto space-y-10">

                {/* ÜST BİLGİ */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <span className={`${theme.color} text-[10px] font-black uppercase tracking-[0.5em] mb-4 block`}>
                            {theme.sub} // ID_#9421
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                            {currentStatus} <span className="text-white not-italic font-black">ANALİZİ</span>
                        </h1>
                    </motion.div>

                    <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest border border-zinc-800 px-6 py-4 rounded-2xl hover:bg-white hover:text-black transition-all italic">
                        ← DASHBOARD
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* RADAR ANALİZİ */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-2 bg-[#0f0f0f] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                        <h3 className={`text-xl font-black italic uppercase tracking-tighter mb-8 ${theme.color}`}>SİNYAL DENGESİ</h3>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#27272a" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10, fontWeight: '900' }} />
                                    <RadarArea name="Analiz" dataKey="A" stroke={theme.chartColor} strokeWidth={3} fill={theme.chartColor} fillOpacity={0.15} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* ÖZET PANELİ */}
                    <div className="space-y-6">
                        <div className={`${theme.bg} ${theme.border} border rounded-[2.5rem] p-8`}>
                            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${theme.color}`}>DURUM TESPİTİ:</h3>
                            <p className="text-3xl font-black italic uppercase tracking-tighter leading-none text-white">{theme.diagnosis}</p>
                        </div>

                        <div className="bg-white text-black rounded-[2.5rem] p-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">AKSİYON PLANI:</h3>
                            <p className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-4">{theme.actionTitle}</p>
                            <p className="text-[11px] font-black uppercase leading-relaxed text-zinc-800 italic">{theme.actionDesc}</p>
                        </div>
                    </div>
                </div>

                {/* AI ANALİZ NOTU */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0f0f0f] border border-white/5 rounded-[3rem] p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`h-2 w-2 rounded-full animate-pulse ${currentStatus === "POSITIVE" ? "bg-green-500" : "bg-red-500"}`} />
                        <h3 className="text-xl font-black italic uppercase tracking-tighter italic">AI_DIAGNOSIS_ENGINE</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <p className="text-zinc-400 text-sm font-medium leading-relaxed">{theme.aiNote}</p>
                        <div className="bg-black/50 border border-white/5 rounded-3xl p-8 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">SİNYAL SAPMA ANALİZİ</h4>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-xs font-black uppercase italic text-zinc-400">Gelişim Oranı</span>
                                <span className={`${theme.color} font-black italic text-xl`}>{currentStatus === "POSITIVE" ? "+12%" : "-18%"}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}