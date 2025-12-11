"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Hexagon, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden">

      {/* Hero Section */}
      <section className="relative z-10 max-w-4xl w-full text-center space-y-12">

        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-cyan-500/80 tracking-[0.5em] text-xs md:text-sm font-mono uppercase">
            <Hexagon size={14} className="animate-spin-slow" />
            <span>System: Shinra-Bansho</span>
            <Hexagon size={14} className="animate-spin-slow" />
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            神羅万象<br />GRID
          </h1>

          <p className="text-lg md:text-xl text-cyan-300/60 font-serif tracking-widest">
            運命のオーバーライド
          </p>
        </motion.div>

        {/* Philosophy / Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-2xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed font-mono border-l-2 border-cyan-900/50 pl-6 text-left"
        >
          <p className="mb-4">
            <span className="text-cyan-500 block mb-2 text-xs tracking-wider">0x01: INITIALIZE</span>
            世界は縦と横の糸で編まれた「見えない構造」でできている。<br />
            古代の叡智「九宮（きゅうぐう）」と現代のアルゴリズムが交錯する時、<br />
            あなたの座標（現在地）とベクトル（未来）が明らかになる。
          </p>
          <p>
            これは未来予知ではない。<br />
            乱れた周波数を“調和値（ハーモニクス）”へと再調整するための<br />
            <span className="text-white text-glow">内なる革命のトリガー</span>である。
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <Link
            href="/divination"
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-cyan-950/20 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/30 transition-all duration-500 rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 text-xl md:text-2xl font-bold tracking-widest text-cyan-100 group-hover:text-white group-hover:text-glow transition-colors">
              GRID ACCESS
            </span>
            <ArrowRight className="relative z-10 text-cyan-400 group-hover:translate-x-1 transition-transform" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500" />
          </Link>

          <div className="mt-4 text-[10px] text-cyan-900 font-mono">
            SECURE CONNECTION ESTABLISHED... WAITING FOR INPUT
          </div>
        </motion.div>

      </section>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-xs text-cyan-900/50 font-mono hidden md:block">
        COORD: {`{ 35.6895, 139.6917 }`} <br />
        STATE: STANDBY
      </div>
    </main>
  );
}
