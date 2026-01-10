"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignalInputPage() {
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // Hata mesajı state'i
    const [fatigue, setFatigue] = useState(5);
    const [isShaking, setIsShaking] = useState(false);

    const fatigueLevels = [
        { val: 1, label: "Zinde", color: "bg-green-500" },
        { val: 2, label: "Zinde", color: "bg-green-500" },
        { val: 3, label: "İyi", color: "bg-emerald-500" },
        { val: 4, label: "İyi", color: "bg-emerald-500" },
        { val: 5, label: "Orta", color: "bg-yellow-500" },
        { val: 6, label: "Orta", color: "bg-yellow-500" },
        { val: 7, label: "Yorgun", color: "bg-orange-500" },
        { val: 8, label: "Yorgun", color: "bg-orange-500" },
        { val: 9, label: "Bitkin", color: "bg-red-500" },
        { val: 10, label: "Bitkin", color: "bg-red-600" },
    ];

    const shakeVariants = {
        shake: {
            x: [-10, 10, -10, 10, 0],
            transition: { duration: 0.4 }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const sleep = Number(formData.get("sleep"));
        const weight = Number(formData.get("weight"));

        // Kendi kontrolümüzü yapıyoruz
        if (sleep > 24) {
            setError("Uyku süresi bir günün sınırlarını (24 saat) aşamaz.");
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        if (weight > 250 || weight < 30) {
            setError("Lütfen geçerli bir vücut ağırlığı giriniz (30-250 kg).");
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        // Hata yoksa devam et
        setError(null);
        setStatus("Sinyal başarıyla işlendi!");
        setTimeout(() => setStatus(null), 3000);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isShaking ? "shake" : { opacity: 1, y: 0 }}
                variants={shakeVariants}
                className="max-w-2xl mx-auto"
            >
                <div className="mb-10">
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter italic">Sinyal Gönder</h1>
                    <p className="text-zinc-500 mt-2 font-medium">Bugünkü biyometrik ve performans verilerini analiz motoruna işle.</p>
                </div>

                {/* noValidate ekleyerek tarayıcı uyarısını kapattık */}
                <form onSubmit={handleSubmit} noValidate className="space-y-10 bg-[#111] border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl relative">

                    {/* HATA MESAJI PANELİ */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute -top-6 left-8 right-8 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-full text-center shadow-xl z-20"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ANTRENMAN YÜKÜ */}
                    <div className="group">
                        <div className="flex justify-between mb-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-green-500 transition-colors">Antrenman Yükü (KG)</label>
                        </div>
                        <input
                            name="load"
                            type="number"
                            required
                            placeholder="Bugünkü toplam hacim veya ana set ağırlığı"
                            className={`w-full bg-zinc-900 border ${error?.includes('ağırlık') ? 'border-red-500' : 'border-zinc-800'} rounded-2xl px-5 py-4 focus:border-green-500 outline-none transition-all text-sm font-bold placeholder:text-zinc-700`}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* UYKU SÜRESİ */}
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 group-focus-within:text-green-500 transition-colors">Uyku (SAAT)</label>
                            <input
                                name="sleep"
                                type="number"
                                required
                                placeholder="Örn: 7.5"
                                className={`w-full bg-zinc-900 border ${error?.includes('Uyku') ? 'border-red-500' : 'border-zinc-800'} rounded-2xl px-5 py-4 focus:border-green-500 outline-none transition-all text-sm font-bold placeholder:text-zinc-700`}
                            />
                        </div>

                        {/* GÜNCEL KİLO */}
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 group-focus-within:text-green-500 transition-colors">Vücut Ağırlığı (KG)</label>
                            <input
                                name="weight"
                                type="number"
                                required
                                placeholder="Örn: 82.5"
                                className={`w-full bg-zinc-900 border ${error?.includes('ağırlık') ? 'border-red-500' : 'border-zinc-800'} rounded-2xl px-5 py-4 focus:border-green-500 outline-none transition-all text-sm font-bold placeholder:text-zinc-700`}
                            />
                        </div>
                    </div>

                    {/* YORGUNLUK SEÇİCİ VE DİĞERLERİ AYNI KALACAK... */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                Yorgunluk Durumu
                            </label>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={fatigue}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase italic ${fatigueLevels[fatigue-1].color} text-black shadow-lg shadow-black/20`}
                                >
                                    {fatigue} - {fatigueLevels[fatigue-1].label}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <div className="flex justify-between gap-1.5 h-12">
                            {fatigueLevels.map((item) => (
                                <button
                                    key={item.val}
                                    type="button"
                                    onClick={() => setFatigue(item.val)}
                                    className="relative flex-1 group"
                                >
                                    <div className={`w-full h-full rounded-xl transition-all duration-300 ${
                                        fatigue === item.val
                                            ? `${item.color} shadow-[0_0_20px_rgba(34,197,94,0.2)] scale-y-110`
                                            : 'bg-zinc-800 hover:bg-zinc-700'
                                    }`} />
                                    <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-black transition-colors ${
                                        fatigue === item.val ? 'text-black' : 'text-zinc-600'
                                    }`}>
                                        {item.val}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 group-focus-within:text-green-500 transition-colors">Ek Notlar (Opsiyonel)</label>
                        <textarea
                            name="notes"
                            rows={3}
                            placeholder="Sakatlık durumu, stres seviyesi veya antrenman kalitesi hakkında kısa notlar..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-[1.5rem] px-5 py-4 focus:border-green-500 outline-none transition-all text-sm font-medium placeholder:text-zinc-700 resize-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-black uppercase italic py-5 rounded-[1.5rem] transition-all shadow-[0_10px_40px_rgba(34,197,94,0.15)] active:scale-[0.98]"
                        >
                            Sinyali İşle ve Analiz Et
                        </button>
                    </div>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl"
                        >
                            <p className="text-center text-green-500 font-bold text-xs uppercase tracking-widest">
                                {status}
                            </p>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    );
}