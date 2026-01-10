"use client";

import HeroText from "./HeroText";
import HeroChartPreview from "./HeroChartPreview";

export default function HeroSection() {
    return (
        <section className="relative py-12 md:py-24 border-b border-white/5">
            {/* Arka planda sabit, çok hafif bir parıltı (isteğe bağlı, hareket etmez) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                <HeroText />
                <HeroChartPreview />
            </div>
        </section>
    );
}