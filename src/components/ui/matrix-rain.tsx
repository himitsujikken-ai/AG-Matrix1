"use client";

import { useEffect, useRef } from "react";

export const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const nums = "01";
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = width / fontSize;

        const rainDrops: number[] = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#0F0"; // Green text
            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < rainDrops.length; i++) {
                // Random character
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

                // Color variation for "glitch" feel - sometimes white, mostly green
                if (Math.random() > 0.98) {
                    ctx.fillStyle = "#FFF";
                } else {
                    // Gradient or varying shades of green could go here, but pure #0F0 is classic
                    ctx.fillStyle = "#0F0";
                }

                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 30);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-init columns if needed, strictly speaking we should re-calc columns but simple resize works okay usually
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-2] opacity-20 pointer-events-none mix-blend-screen"
        />
    );
};
