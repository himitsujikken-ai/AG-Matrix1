"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, Clock, Download, Upload } from "lucide-react";
import { motion } from "framer-motion";

type HistoryItem = {
    id: number;
    title: string;
    timestamp: string;
};

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("grid_history");
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    const clearHistory = () => {
        if (confirm("WARNING: MEMORY PURGE INITIATED.\nAre you sure you want to delete all records?")) {
            localStorage.removeItem("grid_history");
            setHistory([]);
        }
    };

    const formatDate = (iso: string) => {
        return new Date(iso).toLocaleString("ja-JP", {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(history, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `grid_memory_dump_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                    // Simple validation: check if items have id and title
                    const isValid = parsed.every(item => item.id && item.title);
                    if (isValid) {
                        const newHistory = [...parsed, ...history];
                        // Remove duplicates by timestamp + id
                        const uniqueHistory = Array.from(new Map(newHistory.map(item => [item.timestamp + item.id, item])).values());
                        // Sort by timestamp desc
                        uniqueHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

                        setHistory(uniqueHistory);
                        localStorage.setItem("grid_history", JSON.stringify(uniqueHistory));
                        alert("MEMORY OVERRIDE COMPLETE: Data restored successfully.");
                    } else {
                        alert("ERROR: CORRUPTED DATA. Structure invalid.");
                    }
                }
            } catch (err) {
                console.error(err);
                alert("ERROR: DECODING FAILED. File not valid.");
            }
        };
        reader.readAsText(file);
        // Reset input
        event.target.value = "";
    };

    return (
        <div className="min-h-screen p-8 max-w-2xl mx-auto">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".json"
            />

            <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-cyan-600 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                    <ArrowLeft size={16} /> BACK To GRID
                </Link>
                <div className="flex gap-4">
                    <button
                        onClick={handleImportClick}
                        className="text-xs text-cyan-800 hover:text-cyan-500 flex items-center gap-2 border border-cyan-900/30 hover:border-cyan-500 px-3 py-1 rounded transition-colors"
                        title="Import JSON"
                    >
                        <Upload size={14} /> RESTORE
                    </button>
                    <button
                        onClick={handleExport}
                        className="text-xs text-cyan-800 hover:text-cyan-500 flex items-center gap-2 border border-cyan-900/30 hover:border-cyan-500 px-3 py-1 rounded transition-colors"
                        title="Export JSON"
                    >
                        <Download size={14} /> BACKUP
                    </button>
                </div>
            </div>

            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-800 tracking-widest flex items-center gap-4 mb-12">
                <Clock className="text-cyan-500" /> SYSTEM LOGS
            </h1>

            {history.length === 0 ? (
                <div className="text-center text-gray-600 font-mono mt-20 p-8 border border-neutral-800 border-dashed rounded">
                    <p className="mb-4">DATA STRATA EMPTY.</p>
                    <p className="text-xs text-neutral-500">No divination records found in local storage.</p>
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
                                className="block p-4 border border-cyan-900/30 bg-black/40 hover:bg-cyan-950/30 hover:border-cyan-500/50 transition-all group rounded-sm relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-900/50 group-hover:bg-cyan-500 transition-colors" />
                                <div className="flex justify-between items-center pl-4">
                                    <div>
                                        <div className="text-[10px] text-cyan-600 font-mono mb-1 flex items-center gap-2">
                                            {formatDate(item.timestamp)}
                                        </div>
                                        <div className="text-lg text-gray-200 font-serif group-hover:text-cyan-300 transition-colors tracking-wide">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="text-3xl font-black text-cyan-900/20 group-hover:text-cyan-500/20 font-mono transition-colors">
                                        {String(item.id).padStart(2, '0')}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-16 text-center border-t border-cyan-900/20 pt-8">
                    <button
                        onClick={clearHistory}
                        className="text-xs text-red-900 hover:text-red-500 hover:bg-red-950/10 px-4 py-2 rounded flex items-center justify-center gap-2 mx-auto transition-all"
                    >
                        <Trash2 size={12} /> PURGE ALL DATA
                    </button>
                    <div className="mt-2 text-[10px] text-cyan-900/50">
                        CAUTION: ACTION IS IRREVERSIBLE
                    </div>
                </div>
            )}
        </div>
    );
}
