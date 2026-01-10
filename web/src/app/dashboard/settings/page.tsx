"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[#060606] text-white p-6 md:p-12 font-sans selection:bg-red-500/30">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">

                <header className="mb-12 border-b border-white/5 pb-10">
                    <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] mb-2 block italic">Sistem Yapılandırması</span>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter italic">AYARLAR</h1>
                </header>

                <div className="space-y-8">
                    {/* GÜVENLİK */}
                    <section className="bg-[#0f0f0f] border border-white/5 rounded-[3rem] p-10 shadow-3xl">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-10 italic flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            Güvenlik Protokolü
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 tracking-widest uppercase italic ml-1">Mevcut Şifre</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-4 focus:border-red-500 outline-none transition-all text-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-600 tracking-widest uppercase italic ml-1">Yeni Şifre</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-black border border-zinc-900 rounded-2xl px-6 py-4 focus:border-red-500 outline-none transition-all text-xl" />
                            </div>
                        </div>
                        <button className="mt-8 bg-white text-black px-10 py-4 rounded-2xl text-[11px] font-black uppercase italic tracking-widest hover:bg-zinc-200 transition-all">
                            Şifreyi Mühürle
                        </button>
                    </section>

                    {/* VERİ YÖNETİMİ */}
                    <section className="bg-[#0f0f0f] border border-white/5 rounded-[3rem] p-10 shadow-3xl">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-10 italic">Veri Terminali</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-6 bg-black rounded-[2.5rem] border border-zinc-900 group hover:border-zinc-700 transition-all">
                                <div>
                                    <p className="text-sm font-black uppercase italic tracking-tighter italic">Veri Dışa Aktarımı</p>
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase mt-1 italic tracking-widest">Tüm Sinyal Geçmişi (JSON)</p>
                                </div>
                                <button className="text-green-500 text-[10px] font-black uppercase tracking-widest bg-green-500/5 px-6 py-3 rounded-xl border border-green-500/10 hover:bg-green-500 hover:text-black transition-all">İndir</button>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-red-500/5 rounded-[2.5rem] border border-red-500/10 group">
                                <div>
                                    <p className="text-sm font-black uppercase italic tracking-tighter text-red-500 italic">Sistemden Ayrıl</p>
                                    <p className="text-[10px] text-red-900/50 font-bold uppercase mt-1 italic">Tüm veriler kalıcı olarak silinir</p>
                                </div>
                                <button className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Hesabı Kapat</button>
                            </div>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}