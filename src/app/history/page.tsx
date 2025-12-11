"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";

type HistoryItem = {
    id: number;
    title: string;
    timestamp: string;
};

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("grid_history");
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    const clearHistory = () => {
        localStorage.removeItem("grid_history");
        setHistory([]);
    };

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleString("ja-JP", {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-12">
                <Link href="/" className="text-cyan-600 hover:text-cyan-400 flex items-center gap-2">
                    <ArrowLeft size={16} /> BACK To GRID
                </Link>
                <h1 className="text-2xl font-black text-white tracking-widest flex items-center gap-2">
                    <Clock className="text-cyan-500" /> LOGS
                </h1>
            </div>

            {history.length === 0 ? (
                <div className="text-center text-gray-600 font-mono mt-20">
                    DATA STRATA EMPTY.<br />NO RECORDS FOUND.
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item, index) => (
                        <motion.div
                            key={`${item.id}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={`/result?id=${item.id}`}
                                className="block p-4 border border-cyan-900/30 bg-black/40 hover:bg-cyan-900/10 hover:border-cyan-500 transition-all group rounded-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-[10px] text-cyan-600 font-mono mb-1">{formatDate(item.timestamp)}</div>
                                        <div className="text-lg text-gray-200 font-serif group-hover:text-cyan-300 transition-colors">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-cyan-900/30 group-hover:text-cyan-500/30 font-mono">
                                        {String(item.id).padStart(2, '0')}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-12 text-center">
                    <button
                        onClick={clearHistory}
                        className="text-xs text-red-900 hover:text-red-500 flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                        <Trash2 size={12} /> PURGE DATA LOGS
                    </button>
                </div>
            )}
        </div>
    );
}
