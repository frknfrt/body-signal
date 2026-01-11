"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                })
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err || "Kayıt başarısız");
            }

            setMessage("✅ Kayıt başarılı! Giriş yapabilirsiniz.");
            setFullName("");
            setEmail("");
            setPassword("");

        } catch (error: any) {
            setMessage("❌ " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 font-sans text-white">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md z-10">

                <div className="text-center mb-10">
                    <Link href="/" className="text-3xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        BodySignal<span className="text-green-500">.</span>
                    </Link>
                    <p className="text-gray-400 mt-3 text-sm">
                        Vücudunun dilini çözmek için ilk adımı at.
                    </p>
                </div>

                <div className="bg-[#111111] border border-gray-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">

                    <form className="space-y-5" onSubmit={handleSubmit}>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Can Yılmaz"
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3
                                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                                transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                E-posta
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="can@ornek.com"
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3
                                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                                transition-all text-sm"
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
                                placeholder="Minimum 8 karakter"
                                required
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3
                                focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                                transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black hover:bg-gray-200
                            font-semibold py-3 rounded-lg transition-all
                            transform active:scale-[0.98] shadow-lg shadow-white/5"
                        >
                            {loading ? "Gönderiliyor..." : "Hesap Oluştur"}
                        </button>
                    </form>

                    {message && (
                        <p className="mt-4 text-center text-sm">
                            {message}
                        </p>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            Zaten üye misin?{" "}
                            <Link href="/login" className="text-green-500 hover:underline font-medium">
                                Giriş yap.
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
