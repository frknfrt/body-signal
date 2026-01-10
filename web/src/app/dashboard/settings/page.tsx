"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
                    <p className="text-gray-500 mt-1">Hesap güvenliği ve uygulama tercihlerini yönet.</p>
                </div>

                <div className="space-y-6">
                    {/* Güvenlik Bölümü */}
                    <section className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            Güvenlik ve Şifre
                        </h3>

                        <div className="space-y-4 max-w-md">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 ml-1">MEVCUT ŞİFRE</label>
                                <input type="password" px-4 py-3 className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-2 ml-1">YENİ ŞİFRE</label>
                                <input type="password" px-4 py-3 className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all" />
                            </div>
                            <button className="bg-white text-black px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">
                                Şifreyi Güncelle
                            </button>
                        </div>
                    </section>

                    {/* Veri Yönetimi */}
                    <section className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Veri ve Gizlilik
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-gray-800">
                                <div>
                                    <p className="text-sm font-medium text-gray-200">Verilerimi Dışa Aktar</p>
                                    <p className="text-xs text-gray-500">Tüm sinyal geçmişini JSON formatında indir.</p>
                                </div>
                                <button className="text-blue-500 text-sm font-bold hover:underline">İndir</button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#1a0d0d] rounded-xl border border-red-900/20">
                                <div>
                                    <p className="text-sm font-medium text-red-500">Hesabı Sil</p>
                                    <p className="text-xs text-gray-600">Bu işlem geri alınamaz ve tüm verilerin silinir.</p>
                                </div>
                                <button className="text-red-500 text-sm font-bold bg-red-500/10 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-all">Hesabı Kapat</button>
                            </div>
                        </div>
                    </section>

                    {/* Uygulama Tercihleri */}
                    <section className="bg-[#111111] border border-gray-800 rounded-3xl p-8">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                            Uygulama Ayarları
                        </h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">Ölçü Birimi</p>
                            <select className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm outline-none text-green-500 font-bold">
                                <option>Metrik (kg, cm)</option>
                                <option>Imperial (lbs, ft)</option>
                            </select>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}