"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-[#060606] text-white p-6 md:p-12 font-sans selection:bg-green-500/30">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">

                {/* ÜST BAŞLIK - Agresif Stil */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/5 pb-10">
                    <div>
                        <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">Biyometrik Kimlik</span>
                        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                            PROFİL <span className="text-white not-italic font-black">AYARLARI</span>
                        </h1>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-8 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest transition-all ${isEditing ? 'bg-green-500 text-black shadow-[0_0_30px_#22c55e]' : 'bg-[#111] border border-zinc-800 text-zinc-500 hover:border-zinc-600'}`}
                    >
                        {isEditing ? 'DEĞİŞİKLİKLERİ MÜHÜRLE' : 'PROFİLİ DÜZENLE'}
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* SOL PANEL: Sinyal Kartı */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0f0f0f] border-2 border-zinc-900 rounded-[3rem] p-10 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

                            <div className="w-32 h-32 bg-zinc-900 border-4 border-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-black italic text-green-500 shadow-[0_0_50px_rgba(0,0,0,1)] relative">
                                <span className="relative z-10">Y</span>
                                <div className="absolute inset-0 rounded-full border-2 border-green-500/10 animate-ping" />
                            </div>

                            <h2 className="text-3xl font-black italic uppercase tracking-tighter italic">Yavuz</h2>
                            <p className="text-green-900 font-black text-[10px] uppercase tracking-[0.3em] mt-2 italic bg-green-500/5 py-1 px-4 rounded-full inline-block border border-green-500/10">Sinyal Aktif</p>

                            <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-1">Toplam Sinyal</p>
                                    <p className="font-black text-2xl italic text-white leading-none">142</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-1">Sistem Günü</p>
                                    <p className="font-black text-2xl italic text-white leading-none">28</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SAĞ PANEL: Metrik Formu */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0f0f0f] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-3xl">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-10 italic">Biyometrik Parametreler</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-zinc-500 tracking-widest uppercase ml-1 italic">Boy (cm)</label>
                                    <input
                                        type="number"
                                        disabled={!isEditing}
                                        placeholder="180"
                                        className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 focus:border-green-500 outline-none transition-all text-xl font-black italic disabled:opacity-30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-zinc-500 tracking-widest uppercase ml-1 italic">Hedef Kilo (kg)</label>
                                    <input
                                        type="number"
                                        disabled={!isEditing}
                                        placeholder="75"
                                        className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 focus:border-green-500 outline-none transition-all text-xl font-black italic disabled:opacity-30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-zinc-500 tracking-widest uppercase ml-1 italic">Yaş</label>
                                    <input
                                        type="number"
                                        disabled={!isEditing}
                                        placeholder="24"
                                        className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 focus:border-green-500 outline-none transition-all text-xl font-black italic disabled:opacity-30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-zinc-500 tracking-widest uppercase ml-1 italic">Aktivite Seviyesi</label>
                                    <select
                                        disabled={!isEditing}
                                        className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 focus:border-green-500 outline-none transition-all text-sm font-black italic appearance-none disabled:opacity-30 uppercase"
                                    >
                                        <option>Haftada 3-4 Gün</option>
                                        <option>Haftada 5-6 Gün</option>
                                        <option>Profesyonel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-white/5">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 mb-8 italic">Sistem Tercihleri</h3>
                                <div className="flex items-center justify-between p-6 bg-black rounded-[2rem] border border-zinc-900">
                                    <div>
                                        <p className="text-sm font-black uppercase italic tracking-tighter">E-posta Bildirimleri</p>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase mt-1">Haftalık Analiz Raporları</p>
                                    </div>
                                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}