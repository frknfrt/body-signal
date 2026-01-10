"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Sayfa kaydırıldığında Navbar arka planını belirginleştir
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10 h-16" : "bg-transparent h-20"
        }`}>
            <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="font-bold text-lg tracking-tight group">
                    BodySignal<span className="text-green-500 group-hover:glow-green-500 transition-all">.</span>
                </Link>

                <nav className="flex gap-8 text-sm font-medium text-gray-400 items-center">
                    <Link href="/" className="hover:text-white transition-colors">Anasayfa</Link>
                    <a href="#nasil-calisir" className="hover:text-white transition-colors">Nasıl Çalışır</a>
                    <Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link>
                    <Link
                        href="/login"
                        className="text-white hover:text-green-500 transition-colors border-l border-white/10 pl-8 ml-2"
                    >
                        Giriş Yap
                    </Link>
                </nav>
            </div>
        </header>
    );
}