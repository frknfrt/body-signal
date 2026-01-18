"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function DashboardPage() {

const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    // Veritabanından gelecek gerçek veriler için state'ler
    const [status, setStatus] = useState("STABLE");
    const [chartData, setChartData] = useState([]);
    const [latestScore, setLatestScore] = useState(0);
    const [latestDate, setLatestDate] = useState("-");

    useEffect(() => {
        // Backend'den verileri çeken fonksiyon
        const fetchData = async () => {
            try {
                // Not: Kendi API endpoint'ine göre burayı düzenleyebilirsin
                const response = await fetch('http://localhost:8081/api/signals/latest');
                if (response.ok) {
                    const result = await response.json();

                    // Backend'den gelen verileri state'lere dağıtıyoruz
                    setStatus(result.status || "STABLE");
                    setLatestScore(result.score || 0);
                    setLatestDate(result.formattedDate || "YENİ");

                    // Eğer backend grafik verisi gönderiyorsa onu da set ediyoruz
                    if (result.history) {
                        setChartData(result.history);
                    }
                }
            } catch (error) {
                console.error("Backend bağlantı hatası! Port 8081'i kontrol et.", error);
            } finally {
                // 1 saniye bekletip loading'i kapatıyoruz ki o cool animasyon görünsün
                setTimeout(() => setIsLoading(false), 1000);
            }
        };

        fetchData();
    }, []);

    // Dinamik Tema Ayarları
    const theme = {
        POSITIVE: { color: "#22c55e", text: "text-green-500", bg: "bg-green-500/5", border: "border-green-500/20", shadow: "shadow-green-500/20" },
        PLATEAU: { color: "#ef4444", text: "text-red-500", bg: "bg-red-500/5", border: "border-red-500/20", shadow: "shadow-red-500/20" },
        STABLE: { color: "#3b82f6", text: "text-blue-500", bg: "bg-blue-500/5", border: "border-blue-500/20", shadow: "shadow-blue-500/20" }
    }[status as keyof typeof theme] || { color: "#22c55e", text: "text-green-500" };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#060606] flex items-center justify-center">
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-white font-black italic tracking-tighter text-2xl"
                >
                    SİNYAL ALINIYOR...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#060606] text-white p-4 md:p-8 font-sans selection:bg-zinc-800">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${status === "PLATEAU" ? 'bg-red-500' : 'bg-green-500'}`} />
                        <span className={`${theme.text} text-[10px] font-black uppercase tracking-[0.4em] block`}>
                            {status === "PLATEAU" ? "SİSTEM ALARMI: ANALİZ GEREKLİ" : "SİSTEM DURUMU: OPTİMAL"}
                        </span>
                    </div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                        HOŞ GELDİN, <span className={`${theme.text} not-italic`}>{user.fullName}</span>
                    </h1>
                </motion.div>

                <Link href="/dashboard/input">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase italic text-sm tracking-tighter shadow-2xl"
                    >
                        YENİ SİNYAL GÖNDER +
                    </motion.button>
                </Link>
            </header>

            <main className="max-w-7xl mx-auto space-y-6">
                {/* DİNAMİK ANALİZ KARTI */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${theme.bg} ${theme.border} border-2 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden`}
                >
                    <div className="relative z-10 flex items-center gap-6">
                        <div className={`p-4 rounded-2xl bg-black border-2 ${theme.border} font-black text-3xl ${theme.text} italic`}>!</div>
                        <div>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${theme.text} mb-1`}>AI ANALİZ MOTORU BİLDİRİMİ</p>
                            <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">
                                {status === "PLATEAU" ? "GELİŞİM DURAKLADI: ACİL DELOAD VEYA HACİM DEĞİŞİKLİĞİ." : "GELİŞİM TRENDİ POZİTİF: PERFORMANS ARTIŞI BEKLENİYOR."}
                            </h3>
                        </div>
                    </div>
                    <Link href="/dashboard/analysis/latest" className="relative z-10">
                        <button className={`px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl`}>
                            DETAYLI TEŞHİSİ GÖR
                        </button>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* DİNAMİK RENKLİ GRAFİK */}
                    <div className="lg:col-span-3 bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] p-8 shadow-3xl">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter underline underline-offset-8 decoration-white/5">STRENGTH_VELOCITY</h3>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData.length > 0 ? chartData : defaultData}>
                                    <defs>
                                        <linearGradient id="dynamicColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={theme.color} stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor={theme.color} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="day" stroke="#27272a" fontSize={10} fontWeight="900" />
                                    <YAxis stroke="#27272a" fontSize={10} fontWeight="900" />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', fontWeight: '900' }} />
                                    <Area type="monotone" dataKey="strength" stroke={theme.color} strokeWidth={4} fill="url(#dynamicColor)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* SAĞ KARTLAR */}
                    <div className="space-y-4">
                        <SignalSummaryCard title="PLATO RİSKİ" status={status === "PLATEAU" ? "%88 (YÜKSEK)" : "%12 (DÜŞÜK)"} color={theme.text} />
                        <SignalSummaryCard title="RECOVERY STATUS" status={status === "PLATEAU" ? "KRİTİK" : "OPTIMAL"} color={theme.text} />
                        <SignalSummaryCard title="SİNYAL GÜCÜ" status="%94" color="text-white" />
                    </div>
                </div>

                {/* SİNYAL GÜNLÜĞÜ */}
                <div className="bg-[#0f0f0f] border border-white/5 rounded-[2.5rem] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">SİNYAL GEÇMİŞİ</h3>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                            <tr>
                                <th className="p-4">TARİH</th>
                                <th className="p-4">SKOR</th>
                                <th className="p-4">DURUM</th>
                                <th className="p-4 text-right">AKSİYON</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                            <tr className="group hover:bg-white/[0.02] transition-all">
                                <td className="p-4 font-bold text-sm">{latestDate}</td>
                                <td className="p-4 font-black italic text-xl">{latestScore}</td>
                                <td className={`p-4 font-black text-[10px] uppercase tracking-widest ${theme.text}`}>{status}</td>
                                <td className="p-4 text-right">
                                    <button className="text-[10px] font-black uppercase tracking-widest bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">DETAY</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Grafik boşken görünecek yedek veriler
const defaultData = [
    { day: 'Pzt', volume: 2400, strength: 110 },
    { day: 'Sal', volume: 2800, strength: 112 },
    { day: 'Çar', volume: 2600, strength: 112 },
    { day: 'Per', volume: 3200, strength: 115 },
];

function SignalSummaryCard({ title, status, color }: any) {
    return (
        <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-[2rem] transition-all hover:border-zinc-700 group">
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-2">{title}</span>
            <span className={`text-lg font-black uppercase italic tracking-tighter ${color}`}>{status}</span>
        </div>
    );
}