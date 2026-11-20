"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor-hover]';

const CustomCursor = () => {
	const [enabled, setEnabled] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [isPointerDown, setIsPointerDown] = useState(false);

	const mouseX = useMotionValue(-100);
	const mouseY = useMotionValue(-100);

	const ringX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
	const ringY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

	useEffect(() => {
		const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!supportsFinePointer || prefersReducedMotion) return;

		setEnabled(true);

		const handleMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);

			const target = e.target as HTMLElement;
			setIsHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
		};

		const handleDown = () => setIsPointerDown(true);
		const handleUp = () => setIsPointerDown(false);

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mousedown", handleDown);
		window.addEventListener("mouseup", handleUp);

		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mousedown", handleDown);
			window.removeEventListener("mouseup", handleUp);
		};
	}, [mouseX, mouseY]);

	if (!enabled) return null;

	return (
		<>
			<style>{`
				@media (pointer: fine) {
					html, a, button, input, textarea, [role="button"] {
						cursor: none !important;
					}
				}
			`}</style>

			{/* Core dot - tracks instantly */}
			<motion.div
				className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full bg-orange-400 mix-blend-difference"
				style={{
					x: mouseX,
					y: mouseY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					width: isPointerDown ? 6 : 8,
					height: isPointerDown ? 6 : 8,
				}}
				transition={{ duration: 0.15 }}
			/>

			{/* Trailing ring - eases behind, expands on hover */}
			<motion.div
				className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border border-orange-400/80 mix-blend-difference"
				style={{
					x: ringX,
					y: ringY,
					translateX: "-50%",
					translateY: "-50%",
				}}
				animate={{
					width: isHovering ? 56 : 32,
					height: isHovering ? 56 : 32,
					opacity: isHovering ? 0.9 : 0.5,
				}}
				transition={{ type: "spring", stiffness: 300, damping: 25 }}
			/>
		</>
	);
};

export default CustomCursor;
