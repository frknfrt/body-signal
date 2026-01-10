"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignalInputPage() {
    const [step, setStep] = useState(1);
    const [fatigue, setFatigue] = useState(5);
    const [rpe, setRpe] = useState(8);
    const [exercise, setExercise] = useState("BENCH PRESS");
    const [error, setError] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        load: "",
        reps: "",
        sleep: "",
        weight: "",
    });

    const exercises = ["BENCH PRESS", "SQUAT", "DEADLIFT", "OHP"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const shakeTrigger = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
    };

    // --- DOĞRULAMA MOTORU (VALIDATION) ---
    const validateStep1 = () => {
        const loadNum = Number(formData.load);
        const repsNum = Number(formData.reps);

        if (!formData.load || !formData.reps) {
            setError("PARAMETRELER EKSİK: TÜM ALANLARI DOLDUR");
            shakeTrigger();
            return;
        }

        // Mantıksal Sınırlar
        if (loadNum <= 0 || loadNum > 500) {
            setError("GEÇERSİZ YÜK: SINIRLAR DIŞI VERİ (1-500 KG)");
            shakeTrigger();
            return;
        }

        if (repsNum <= 0 || repsNum > 50) {
            setError("GEÇERSİZ TEKRAR: LİMİT AŞILDI (1-50 TEKRAR)");
            shakeTrigger();
            return;
        }

        setError(null);
        setStep(2);
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const sleepNum = Number(formData.sleep);
        const weightNum = Number(formData.weight);

        if (!formData.sleep || !formData.weight) {
            setError("BİYOMETRİK VERİ EKSİK: ANALİZ BAŞLATILAMAZ");
            shakeTrigger();
            return;
        }

        if (sleepNum < 0 || sleepNum > 24) {
            setError("UYKU HATASI: ZAMAN DÖNGÜSÜ HATALI (0-24 SAAT)");
            shakeTrigger();
            return;
        }

        if (weightNum < 30 || weightNum > 250) {
            setError("KİLO HATASI: GEÇERSİZ PARAMETRE (30-250 KG)");
            shakeTrigger();
            return;
        }

        setError(null);
        setIsProcessing(true);
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 2500);
    };

    const getRpeDescription = (val: number) => {
        if (val === 10) return "MAKSİMUM: HİÇ TEKRAR KALMADI";
        if (val >= 9) return "ÇOK ZOR: BELKİ 1 TEKRAR DAHA";
        if (val >= 8) return "ZOR: 2 TEKRAR KALDI";
        return "HAREKET AKICIYDI";
    };

    return (
        <div className="min-h-screen bg-[#060606] text-white p-6 md:p-12 overflow-x-hidden relative">
            <style dangerouslySetInnerHTML={{ __html: `
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
            `}} />

            {/* --- ANALİZ OVERLAY ANİMASYONU --- */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#060606] flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                        <motion.div
                            initial={{ top: "-10%" }}
                            animate={{ top: "110%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-green-500 shadow-[0_0_20px_#22c55e] z-10"
                        />

                        <div className="relative space-y-8">
                            <div className="relative flex justify-center items-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-40 h-40 border-t-2 border-b-2 border-green-500/20 rounded-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-green-500 text-5xl font-black italic animate-pulse">!</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                                    SİNYAL <span className="text-green-500">İŞLENİYOR</span>
                                </h2>
                                <p className="text-zinc-600 font-black uppercase text-[10px] tracking-[0.6em] animate-pulse italic text-green-500/50">
                                    Biyometrik Veriler Analiz Ediliyor...
                                </p>
                            </div>

                            <div className="w-64 mx-auto h-1 bg-zinc-900 rounded-full overflow-hidden mt-4">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    className="h-full bg-green-500 shadow-[0_0_15px_#22c55e]"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1 }}
                className="max-w-xl mx-auto"
            >
                {/* PROGRESS BARS */}
                <div className="flex gap-3 mb-12 px-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-1 flex-1 bg-zinc-900 rounded-full relative overflow-hidden">
                            {step >= i && (
                                <motion.div layoutId="stepBar" className="absolute inset-0 bg-green-500 shadow-[0_0_20px_#22c55e]" />
                            )}
                        </div>
                    ))}
                </div>

                <header className="mb-10 text-center relative flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        <motion.div key={step} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-green-500 leading-[0.8]">
                                {step === 1 ? 'PERFORMANS' : 'TOPARLANMA'} <br />
                                <span className="text-white not-italic text-4xl md:text-5xl font-black italic underline underline-offset-8 decoration-green-500/30">SİNYALİ</span>
                            </h1>
                        </motion.div>
                    </AnimatePresence>

                    <div className="h-10 mt-6">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-red-600 text-white font-black text-[9px] uppercase tracking-widest py-2.5 px-6 rounded-full border border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.5)] z-50 whitespace-nowrap italic"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                <form onSubmit={handleFinalSubmit} className="bg-[#0f0f0f] border border-zinc-800/50 p-8 md:p-10 rounded-[2.5rem] shadow-3xl relative">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-zinc-600 tracking-widest uppercase ml-1 italic">EGZERSİZ SEÇİMİ</label>
                                    <div className="grid grid-cols-2 gap-2 p-1 bg-black/50 rounded-2xl border border-zinc-900">
                                        {exercises.map((ex) => (
                                            <button key={ex} type="button" onClick={() => setExercise(ex)} className="relative py-3.5 rounded-xl text-[10px] font-black z-10 transition-colors uppercase italic">
                                                {exercise === ex && <motion.div layoutId="activeEx" className="absolute inset-0 bg-green-500 rounded-lg -z-10 shadow-[0_0_20px_rgba(34,197,94,0.3)]" />}
                                                <span className={exercise === ex ? 'text-black font-black' : 'text-zinc-600'}>{ex}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <div className="flex justify-between px-1 text-[9px] font-black uppercase text-zinc-500 tracking-tighter italic">
                                            <span>YÜK (KG)</span>
                                            <span className="opacity-50 tracking-widest group-focus-within:text-green-500 transition-colors">MAX LOAD</span>
                                        </div>
                                        <input name="load" type="number" value={formData.load} onChange={handleInputChange} placeholder="000" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 focus:border-green-500 outline-none text-4xl font-black italic transition-all placeholder:text-zinc-900" />
                                    </div>
                                    <div className="space-y-2 group">
                                        <div className="flex justify-between px-1 text-[9px] font-black uppercase text-zinc-500 tracking-tighter italic">
                                            <span>TEKRAR</span>
                                            <span className="opacity-50 tracking-widest group-focus-within:text-green-500 transition-colors">INTENSITY</span>
                                        </div>
                                        <input name="reps" type="number" value={formData.reps} onChange={handleInputChange} placeholder="0" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 focus:border-green-500 outline-none text-4xl font-black italic transition-all placeholder:text-zinc-900" />
                                    </div>
                                </div>

                                <div className="py-4 space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <div className="flex flex-col">
                                            <label className="text-[10px] font-black text-zinc-600 tracking-widest uppercase italic">ZORLUK (RPE)</label>
                                            <motion.span key={rpe} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] font-bold text-green-900/50 uppercase mt-0.5 italic">
                                                {getRpeDescription(rpe)}
                                            </motion.span>
                                        </div>
                                        <div className="overflow-hidden h-12 flex items-center">
                                            <AnimatePresence mode="wait">
                                                <motion.span key={rpe} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="text-5xl font-black italic text-green-500">
                                                    {rpe}
                                                </motion.span>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <input type="range" min="5" max="10" step="0.5" value={rpe} onChange={(e) => setRpe(parseFloat(e.target.value))} className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-green-500" />
                                </div>

                                <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={validateStep1} className="w-full bg-white text-black font-black uppercase italic py-6 rounded-2xl text-2xl tracking-tighter shadow-xl">
                                    SONRAKİ AŞAMA →
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 group">
                                        <div className="flex justify-between px-1 text-[9px] font-black uppercase text-zinc-500 tracking-tighter italic">
                                            <span>UYKU (ST)</span>
                                            <span className="opacity-50 tracking-widest group-focus-within:text-green-500 transition-colors">SLEEP CYCLE</span>
                                        </div>
                                        <input name="sleep" type="number" value={formData.sleep} onChange={handleInputChange} placeholder="8" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 outline-none text-4xl font-black italic placeholder:text-zinc-900 transition-all focus:border-green-500" />
                                    </div>
                                    <div className="space-y-2 group">
                                        <div className="flex justify-between px-1 text-[9px] font-black uppercase text-zinc-500 tracking-tighter italic">
                                            <span>KİLO (KG)</span>
                                            <span className="opacity-50 tracking-widest group-focus-within:text-green-500 transition-colors">BODY MASS</span>
                                        </div>
                                        <input name="weight" type="number" value={formData.weight} onChange={handleInputChange} placeholder="80" className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-5 outline-none text-4xl font-black italic placeholder:text-zinc-900 transition-all focus:border-green-500" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col px-1">
                                        <label className="text-[10px] font-black text-zinc-600 tracking-widest uppercase italic">SİSTEMİK YORGUNLUK</label>
                                        <span className="text-[8px] font-black text-zinc-800 uppercase mt-0.5 tracking-tighter italic opacity-50 underline decoration-green-500/20">MERKEZİ SİNİR SİSTEMİ ANALİZİ</span>
                                    </div>
                                    <div className="flex gap-1.5 h-12">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
                                            <button key={v} type="button" onClick={() => setFatigue(v)} className="relative flex-1 group">
                                                {fatigue === v && <motion.div layoutId="fatigueGlow" className="absolute inset-0 bg-green-500 rounded-lg shadow-[0_0_20px_#22c55e] z-0" />}
                                                <div className="relative z-10 w-full h-full flex items-center justify-center font-black text-[10px]">
                                                    <span className={fatigue === v ? 'text-black scale-125 transition-transform' : 'text-zinc-700'}>{v}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6">
                                    <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-green-500 text-black font-black uppercase italic py-6 rounded-2xl text-2xl tracking-tighter shadow-[0_0_40px_-10px_#22c55e]">
                                        SİNYALİ ANALİZ ET
                                    </motion.button>
                                    <button type="button" onClick={() => {setStep(1); setError(null);}} className="w-full text-zinc-700 text-[9px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors italic">
                                        ← VERİLERİ DÜZENLE
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </div>
    );
}