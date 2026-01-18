"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

    const router = useRouter();
     const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!res.ok) {
                // Backend'den gelen hata mesajını yakalayabiliriz
                throw new Error("Giriş başarısız");
            }
debugger;
            const data = await res.json();

            // --- GÜNCELLEME: LOCALSTORAGE KAYIT ---
            // Backend AuthResponse içindeki JWT token'ı burada 'token' anahtarıyla kaydediyoruz
            if (data.token) {
                localStorage.setItem("token", data.token);
                // İsteğe bağlı: Kullanıcı bilgilerini de saklayabilirsiniz
                // localStorage.setItem("userEmail", email);
            }
            // --------------------------------------

            // Başarılı giriş sonrası yönlendirme
            login(data.user, data.token);
            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message || "E-posta veya şifre hatalı");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 font-sans text-white relative">

            {/* SOL ÜST */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-white transition-all group text-sm"
            >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anasayfaya Dön
            </Link>

            {/* Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md z-10">

                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        BodySignal<span className="text-green-500">.</span>
                    </Link>
                    <p className="text-gray-400 mt-3 text-sm">
                        Vücut sinyallerini analiz etmek için geri dön.
                    </p>
                </div>

                <div className="bg-[#111111] border border-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                E-posta
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                Şifre
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-green-900/20 disabled:opacity-50"
                        >
                            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                        </button>
                    </form>

                </div>

                <p className="text-center mt-8 text-gray-500 text-sm">
                    Hesabın yok mu?{" "}
                    <Link href="/register" className="text-green-500 hover:underline font-medium">
                        Hemen katıl.
                    </Link>
                </p>

            </div>
        </div>
    );
}