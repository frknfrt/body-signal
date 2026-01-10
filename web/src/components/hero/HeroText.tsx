"use client";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroText() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
        <span className="relative flex h-2 w-2 inline-block mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
                SİNYAL ANALİZ MOTORU v1.0
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic leading-[0.9]">
                Vücut Sinyallerini <br />
                <span className="text-green-500 not-italic relative">
            Anlamlandır.
                    {/* Alt çizgi animasyonu */}
                    <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="absolute bottom-0 left-0 h-[6px] bg-green-500/20 -z-10"
                    />
        </span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl mb-8 max-w-md leading-relaxed font-medium">
                Trendlerin, platoların ve performans değişkenliğinin objektif analizi.
                <span className="text-white"> Gelişimini şansa değil, verilere bırak.</span>
            </p>

            <div className="flex gap-4">
                <Link href="/login">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button className="px-8 py-4 text-lg font-bold uppercase tracking-tight relative overflow-hidden group">
                            <span className="relative z-10">Sinyalleri Analiz Et</span>
                            {/* Buton içi parlama efekti */}
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                                initial={false}
                                whileHover={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 0.5 }}
                            />
                        </Button>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    );
}