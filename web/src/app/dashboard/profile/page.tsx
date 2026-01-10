"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Üst Kısım: Profil Başlığı */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Profil Ayarları</h1>
                        <p className="text-gray-500 mt-1">Biyometrik verilerini buradan güncelleyebilirsin.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-6 py-2 rounded-xl font-medium transition-all ${isEditing ? 'bg-green-600 text-white' : 'bg-[#111111] border border-gray-800 text-gray-400'}`}
                    >
                        {isEditing ? 'Değişiklikleri Kaydet' : 'Profili Düzenle'}
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sol Kolon: Avatar ve Temel Bilgi */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8 text-center relative overflow-hidden">
                            <div className="w-24 h-24 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold shadow-lg shadow-green-500/20">
                                Y
                            </div>
                            <h2 className="text-xl font-bold">Yavuz</h2>
                            <p className="text-gray-500 text-sm italic">Premium Üye</p>

                            <div className="mt-6 pt-6 border-t border-gray-800/50 flex justify-around">
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Sinyal</p>
                                    <p className="font-bold text-green-500">142</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Gün</p>
                                    <p className="font-bold text-blue-500">28</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Kolon: Form Alanları */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Vücut Metrikleri</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* BOY INPUTU */}
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 ml-1">BOY (100-250 CM)</label>
                                    <input
                                        type="number"
                                        min="100"
                                        max="250"
                                        disabled={!isEditing}
                                        placeholder="180"
                                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all disabled:opacity-50 invalid:border-red-500/50 invalid:text-red-400"
                                    />
                                </div>
                                {/* HEDEF KİLO INPUTU */}
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 ml-1">HEDEF KİLO (30-300 KG)</label>
                                    <input
                                        type="number"
                                        min="30"
                                        max="300"
                                        disabled={!isEditing}
                                        placeholder="75"
                                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all disabled:opacity-50 invalid:border-red-500/50 invalid:text-red-400"
                                    />
                                </div>
                                {/* YAŞ INPUTU */}
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 ml-1">YAŞ (13-100)</label>
                                    <input
                                        type="number"
                                        min="13"
                                        max="100"
                                        disabled={!isEditing}
                                        placeholder="24"
                                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all disabled:opacity-50 invalid:border-red-500/50 invalid:text-red-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-2 ml-1">AKTİVİTE SEVİYESİ</label>
                                    <select
                                        disabled={!isEditing}
                                        className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all appearance-none disabled:opacity-50"
                                    >
                                        <option>Haftada 3-4 Gün</option>
                                        <option>Haftada 5-6 Gün</option>
                                        <option>Profesyonel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">Hesap Ayarları</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-gray-800">
                                        <div>
                                            <p className="text-sm font-medium">E-posta Bildirimleri</p>
                                            <p className="text-xs text-gray-500">Haftalık analiz raporlarını al.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                        </div>
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