"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function DivinationPage() {
    const router = useRouter();
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // 3x3 Grid placeholders
    const gridCells = Array.from({ length: 9 }, (_, i) => i + 1);

    const startDivination = () => {
        setIsAnalyzing(true);
        // Simulate calculation time
        setTimeout(() => {
            // Generate a random seed 1-64 (Hexagrams) or similar
            const seed = Math.floor(Math.random() * 64) + 1;
            router.push(`/result?id=${seed}`);
        }, 3000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative max-w-md w-full aspect-square bg-black/50 border border-cyan-900/50 backdrop-blur-sm p-4 rounded-lg box-glow"
            >
                {/* The Magic Square UI */}
                <div className="grid grid-cols-3 gap-2 h-full">
                    {gridCells.map((i) => (
                        <motion.div
                            key={i}
                            className="relative flex items-center justify-center bg-cyan-950/20 border border-cyan-500/10 hover:border-cyan-500/50 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="absolute top-1 left-1 text-[10px] text-cyan-900 font-mono">
                                0{i}
                            </div>
                            {isAnalyzing && (
                                <motion.span
                                    className="text-2xl font-mono text-cyan-400"
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() }}
                                >
                                    {Math.floor(Math.random() * 9) + 1}
                                </motion.span>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Overlay Action */}
                {!isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-[2px]">
                        <button
                            onClick={startDivination}
                            className="px-8 py-4 bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600/40 text-cyan-100 font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 box-glow"
                        >
                            Initiate Override
                        </button>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                        <div className="text-cyan-400 font-mono text-xs tracking-widest animate-pulse mb-4">
                            CALCULATING VECTORS...
                        </div>
                        <Loader2 className="animate-spin text-cyan-500" size={32} />
                    </div>
                )}
            </motion.div>

            <div className="mt-8 text-center space-y-2">
                <p className="text-cyan-900 text-sm font-mono">SYSTEM READY</p>
                <p className="text-cyan-900/50 text-xs">Waiting for user consciousness input...</p>
            </div>
        </div>
    );
}
