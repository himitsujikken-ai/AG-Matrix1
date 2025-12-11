"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const GridBackground = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        // Set initial window size
        setWindowSize({ w: window.innerWidth, h: window.innerHeight });

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        const handleResize = () => {
            setWindowSize({ w: window.innerWidth, h: window.innerHeight });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none">
            {/* Perspective Grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    transform: "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)",
                    transformOrigin: "top center",
                }}
            />

            {/* Floating Particles / Matrix characters can go here */}

            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            />

            {/* Ambient Glow following mouse */}
            {windowSize.w > 0 && (
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px]"
                    animate={{
                        x: mousePos.x * windowSize.w - 250,
                        y: mousePos.y * windowSize.h - 250,
                    }}
                    transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
                />
            )}
        </div>
    );
};
