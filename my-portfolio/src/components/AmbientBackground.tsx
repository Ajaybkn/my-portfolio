"use client";

import React from "react";
import { motion } from "framer-motion";

const blobs = [
	{
		className: "w-[36rem] h-[36rem] bg-orange-500/20 top-[-10%] left-[-10%]",
		animate: { x: [0, 60, -20, 0], y: [0, 40, -30, 0] },
		duration: 26,
	},
	{
		className: "w-[30rem] h-[30rem] bg-pink-500/20 top-[20%] right-[-10%]",
		animate: { x: [0, -50, 30, 0], y: [0, -40, 20, 0] },
		duration: 30,
	},
	{
		className: "w-[32rem] h-[32rem] bg-blue-500/10 bottom-[-15%] left-[15%]",
		animate: { x: [0, 40, -40, 0], y: [0, -30, 30, 0] },
		duration: 34,
	},
	{
		className: "w-[26rem] h-[26rem] bg-purple-500/10 bottom-[5%] right-[10%]",
		animate: { x: [0, -30, 20, 0], y: [0, 30, -20, 0] },
		duration: 22,
	},
];

const AmbientBackground = () => {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950" aria-hidden="true">
			{/* Grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.15]"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
					maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
					WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
				}}
			/>

			{/* Floating gradient blobs */}
			{blobs.map((blob, i) => (
				<motion.div
					key={i}
					className={`absolute rounded-full blur-[110px] ${blob.className}`}
					animate={blob.animate}
					transition={{
						duration: blob.duration,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "easeInOut",
					}}
				/>
			))}

			{/* Vignette to keep edges dark and readable */}
			<div className="absolute inset-0 bg-gradient-to-b from-gray-950/40 via-transparent to-gray-950" />
		</div>
	);
};

export default AmbientBackground;
