"use client";

import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 font-sans text-white relative">

            {/* SOL ÜST: Anasayfaya Dönüş */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-white transition-all group text-sm"
            >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anasayfaya Dön
            </Link>

            {/* Arka plan dekoratif parlamalar */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md z-10">
                {/* Logo / Başlık */}
                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        BodySignal<span className="text-green-500">.</span>
                    </Link>
                    <p className="text-gray-400 mt-3 text-sm">Vücut sinyallerini analiz etmek için geri dön.</p>
                </div>

                {/* Giriş Formu Kartı */}
                <div className="bg-[#111111] border border-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">E-posta</label>
                            <input
                                type="email"
                                placeholder="ad@ornek.com"
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Şifre</label>
                                <a href="forgot-password" className="text-xs text-green-500 hover:underline">Şifremi Unuttum</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                            />
                        </div>

                        <Link href="/dashboard" className="block w-full">
                            <button
                                type="button"
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-green-900/20"
                            >
                                Giriş Yap
                            </button>
                        </Link>
                    </form>

                    {/* Alternatif Giriş */}
                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-6">
                            <div className="border-t border-gray-800 w-full"></div>
                            <span className="bg-[#111111] px-3 text-xs text-gray-500 absolute uppercase">Veya</span>
                        </div>

                        <div className="space-y-3">
                            {/* Google Butonu */}
                            <button className="w-full bg-white text-black hover:bg-gray-200 font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google ile devam et
                            </button>

                            {/* Apple Butonu */}
                            <button className="w-full bg-[#1a1a1a] text-white hover:bg-zinc-800 font-medium py-2.5 rounded-lg border border-gray-700 transition-all flex items-center justify-center gap-2 text-sm">
                                <svg className="w-4 h-4 mb-0.5" fill="currentColor" viewBox="0 0 384 512">
                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.8-42.3 0-89.7 24.9-115.3 71-46.9 83-16.1 211.9 24.9 280.8 20.8 33 54.8 68.3 92.5 68.3 35.5 0 44.2-22.3 88.5-22.3 43.1 0 52.8 22.3 88.5 22.3 38.8 0 68.3-31.2 91.5-64.4 26.2-37.1 36.9-72.9 37.1-74.8-.8-.3-71.1-27.4-71.1-107.1zM233 105c15.5-18.3 25.8-44.1 23-71.1-22.9 1-52 16.1-68.5 35.4-15.5 17.5-27.1 44.9-23.2 71.1 25.8 1.4 53.2-15.5 68.7-35.4z"/>
                                </svg>
                                Apple ile devam et
                            </button>
                        </div>
                    </div>
                </div>

                {/* Kayıt Ol Linki */}
                <p className="text-center mt-8 text-gray-500 text-sm">
                    Hesabın yok mu? <Link href="/register" className="text-green-500 hover:underline font-medium">Hemen katıl.</Link>
                </p>
            </div>
        </div>
    );
}