"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
	const [visible, setVisible] = useState(false);
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setVisible(latest > 0.08);
	});

	const [dashoffset, setDashoffset] = useState(CIRCUMFERENCE);
	useEffect(() => {
		return progress.on("change", (v) => setDashoffset(CIRCUMFERENCE - v * CIRCUMFERENCE));
	}, [progress]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.6, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.6, y: 10 }}
					whileHover={{ scale: 1.08 }}
					whileTap={{ scale: 0.92 }}
					onClick={scrollToTop}
					aria-label="Scroll to top"
					className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-700 text-orange-400 shadow-lg"
				>
					<svg className="absolute inset-0 -rotate-90" width="48" height="48" viewBox="0 0 48 48">
						<circle cx="24" cy="24" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
						<circle
							cx="24"
							cy="24"
							r={RADIUS}
							fill="none"
							stroke="url(#scrollGradient)"
							strokeWidth="2"
							strokeLinecap="round"
							strokeDasharray={CIRCUMFERENCE}
							strokeDashoffset={dashoffset}
						/>
						<defs>
							<linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="#fb923c" />
								<stop offset="100%" stopColor="#ec4899" />
							</linearGradient>
						</defs>
					</svg>
					<FaArrowUp className="w-4 h-4 relative z-10" />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export default ScrollToTop;
