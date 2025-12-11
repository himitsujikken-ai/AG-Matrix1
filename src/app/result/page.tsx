"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { getResult, GridResult } from "@/lib/data";
import { Share2, Download, Copy, RefreshCw, History } from "lucide-react";
import Link from "next/link";
import { toPng } from "html-to-image";

function ResultContent() {
    const searchParams = useSearchParams();
    const idParam = searchParams.get("id");
    const [result, setResult] = useState<GridResult | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (idParam) {
            const id = parseInt(idParam, 10);
            const data = getResult(id);
            setResult(data);

            // Save to History
            const historyItem = {
                id: data.id,
                title: data.title,
                timestamp: new Date().toISOString(),
            };
            const saved = localStorage.getItem("grid_history");
            const history = saved ? JSON.parse(saved) : [];
            // Prevent duplicates if just refreshed? No, meaningful to keep record.
            // But maybe limit 50.
            const newHistory = [historyItem, ...history].slice(0, 50);
            localStorage.setItem("grid_history", JSON.stringify(newHistory));
        }
    }, [idParam]);

    const handleShare = (platform: "twitter" | "line") => {
        if (!result) return;
        const text = `【神羅万象GRID】\nMy Coordinate: ${result.title}\n${result.subtitle}\n\n運命をオーバーライドしました。\n`;
        const url = "https://eki-grid.vercel.app"; // Replace with actual domain

        if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        } else {
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
        }
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement("a");
            link.download = `grid-result-${result?.id}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to generate image", err);
        }
    };

    if (!result) return <div className="text-cyan-500 animate-pulse mt-20 text-center">DECODING...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">

            {/* Result Card */}
            <motion.div
                ref={cardRef}
                initial={{ filter: "blur(20px)", opacity: 0, scale: 0.9 }}
                animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative max-w-lg w-full bg-black border border-cyan-500/50 p-8 rounded-sm box-glow overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

                {/* Header */}
                <div className="flex justify-between items-start mb-8 opacity-80">
                    <div className="text-[10px] font-mono text-cyan-500 tracking-widest">
                        GRID SYSTEM <br /> RESULT_V2.0
                    </div>
                    <div className="text-3xl font-black text-cyan-800/20">{String(result.id).padStart(2, '0')}</div>
                </div>

                {/* Content */}
                <div className="text-center space-y-6 mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-white text-glow mb-2">
                        {result.title}
                    </h2>
                    <p className="text-cyan-400 text-sm tracking-[0.2em] font-mono uppercase border-b border-cyan-900/50 pb-4 inline-block">
                        {result.subtitle}
                    </p>

                    <p className="text-gray-300 font-serif leading-loose text-sm md:text-base text-justify">
                        {result.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                        {result.keywords.map((k) => (
                            <span key={k} className="px-2 py-1 text-[10px] border border-cyan-900 text-cyan-600 rounded">
                                #{k}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="text-[10px] text-center text-cyan-900 font-mono tracking-widest">
          // SHINRA-BANSHO // OVERRIDE COMPLETE
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 flex flex-wrap gap-4 justify-center"
            >
                <button onClick={() => handleShare("twitter")} className="flex items-center gap-2 px-4 py-2 bg-black border border-cyan-900 hover:border-cyan-500 text-cyan-100 text-sm transition-colors">
                    <Share2 size={16} /> Twitter
                </button>
                <button onClick={() => handleShare("line")} className="flex items-center gap-2 px-4 py-2 bg-black border border-cyan-900 hover:border-cyan-500 text-cyan-100 text-sm transition-colors">
                    <Share2 size={16} /> LINE
                </button>
                <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-black border border-cyan-900 hover:border-cyan-500 text-cyan-100 text-sm transition-colors">
                    <Download size={16} /> Image
                </button>
            </motion.div>

            <div className="mt-12 flex gap-8 text-xs text-gray-600 font-mono">
                <Link href="/divination" className="hover:text-cyan-400 flex items-center gap-2"><RefreshCw size={12} /> RE-INITIALIZE</Link>
                <Link href="/history" className="hover:text-cyan-400 flex items-center gap-2"><History size={12} /> LOGS</Link>
                <Link href="/" className="hover:text-cyan-400 text-cyan-900">EXIT</Link>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="text-center mt-20 text-cyan-900">LOADING GRID...</div>}>
            <ResultContent />
        </Suspense>
    );
}
