"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Örnek Veri Seti (Gerçekçi bir dalgalanma için)
const data = [
    { day: 'Pzt', score: 85 },
    { day: 'Sal', score: 98 },
    { day: 'Çar', score: 92 },
    { day: 'Per', score: 115 },
    { day: 'Cum', score: 108 },
    { day: 'Cmt', score: 125 },
    { day: 'Paz', score: 118 },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
            {/* Header Bölümü */}
            <header className="max-w-7xl mx-auto flex justify-between items-end mb-12">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">Performans Paneli</span>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter italic">Hoş geldin, <span className="text-green-500 not-italic">Yavuz</span></h1>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <Link href="/dashboard/input">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 px-6 py-3 rounded-2xl font-black uppercase italic text-xs tracking-widest shadow-[0_10px_30px_rgba(34,197,94,0.2)] hover:bg-green-500 transition-all"
                        >
                            Yeni Sinyal Gönder +
                        </motion.button>
                    </Link>
                </motion.div>
            </header>

            <main className="max-w-7xl mx-auto space-y-8">

                {/* Üst Kısım: Grafik ve 4 Ana Sinyal Durumu */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Büyük Grafik (3 kolon kaplar) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3 bg-[#111] border border-white/5 rounded-[2.5rem] p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Strength Score Trend</h3>
                                <p className="text-zinc-500 text-xs font-medium mt-1">Haftalık güç ve hacim gelişim grafiği</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-[9px] font-black uppercase tracking-widest text-green-500 bg-green-500/5 px-3 py-1.5 rounded-full border border-green-500/10">Pozitif Trend</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/5 px-3 py-1.5 rounded-full border border-blue-500/10">Stabil</span>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis dataKey="day" stroke="#3f3f46" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="#3f3f46" fontSize={11} fontWeight="bold" tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #27272a', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}
                                        cursor={{ stroke: '#22c55e', strokeWidth: 1 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#22c55e"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorScore)"
                                        animationDuration={2500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Sağ Sinyal Kartları (4 Tane Küçük Kart) */}
                    <div className="space-y-4">
                        <SignalSummaryCard title="Toparlanma" status="Plateau" color="text-red-500" bg="bg-red-500/5" border="border-red-500/10" />
                        <SignalSummaryCard title="Nöral Verim" status="Stabil" color="text-blue-500" bg="bg-blue-500/5" border="border-blue-500/10" />
                        <SignalSummaryCard title="Metabolizma" status="Pozitif" color="text-green-500" bg="bg-green-500/5" border="border-green-500/10" />
                        <SignalSummaryCard title="Uyku Kalitesi" status="Değişken" color="text-orange-500" bg="bg-orange-500/5" border="border-orange-500/10" />
                    </div>
                </div>

                {/* Alt Kısım: Geçmiş Sinyaller Tablosu */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                    <div className="p-8 border-b border-white/5 flex justify-between items-center">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">Sinyal Geçmişi</h3>
                        <button className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] hover:text-white transition-colors">Tümünü İndir</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">
                                <th className="px-10 py-5">Tarih</th>
                                <th className="px-10 py-5">Skor</th>
                                <th className="px-10 py-5">Durum</th>
                                <th className="px-10 py-5">Değişim</th>
                                <th className="px-10 py-5 text-right">Analiz</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                            {[
                                { date: "09 Ocak 2026", score: 118, status: "Pozitif", trend: "+2.4%", color: "text-green-500" },
                                { date: "08 Ocak 2026", score: 125, status: "Pozitif", trend: "+12.2%", color: "text-green-500" },
                                { date: "07 Ocak 2026", score: 108, status: "Stabil", trend: "-6.0%", color: "text-blue-400" },
                                { date: "06 Ocak 2026", score: 115, status: "Değişken", trend: "+25.0%", color: "text-orange-500" },
                            ].map((row, index) => (
                                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-10 py-6 text-sm font-bold text-zinc-300">{row.date}</td>
                                    <td className="px-10 py-6 text-sm font-black italic">{row.score}</td>
                                    <td className={`px-10 py-6 text-[10px] font-black uppercase tracking-widest ${row.color}`}>{row.status}</td>
                                    <td className="px-10 py-6 text-sm font-medium text-zinc-500">{row.trend}</td>
                                    <td className="px-10 py-6 text-right">
                                        <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-zinc-600 transition-all">Detay</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

// Yardımcı Bileşen: Sağdaki Küçük Durum Kartları
function SignalSummaryCard({ title, status, color, bg, border }: any) {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            className={`${bg} ${border} border p-5 rounded-[1.8rem] transition-all cursor-default`}
        >
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-1">{title}</span>
            <div className="flex justify-between items-center">
                <span className={`text-sm font-black uppercase italic ${color}`}>{status}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg')} animate-pulse`} />
            </div>
        </motion.div>
    );
}