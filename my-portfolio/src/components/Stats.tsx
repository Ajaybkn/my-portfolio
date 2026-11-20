"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { FaBriefcase, FaCode, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";
import { projects } from "./Projects";
import { experiences } from "./Experience";

const uniqueTechCount = (() => {
	const set = new Set<string>();
	projects.forEach((p) => p.technologies.forEach((t) => set.add(t.toLowerCase())));
	experiences.forEach((e) => e.technologies.forEach((t) => set.add(t.toLowerCase())));
	return set.size;
})();

// Letese was delivered but dropped from the showcase since its site is no longer live.
const PROJECTS_DELIVERED = projects.length + 1;

const stats = [
	{ icon: FaCalendarAlt, value: 5, suffix: "+", label: "Years of Experience" },
	{ icon: FaBriefcase, value: experiences.length, suffix: "", label: "Companies Worked With" },
	{ icon: FaCode, value: PROJECTS_DELIVERED, suffix: "", label: "Projects Delivered" },
	{ icon: FaLayerGroup, value: uniqueTechCount, suffix: "+", label: "Technologies Used" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (!isInView) return;
		const controls = animate(0, value, {
			duration: 1.4,
			ease: "easeOut",
			onUpdate: (latest) => setDisplay(Math.round(latest)),
		});
		return () => controls.stop();
	}, [isInView, value]);

	return (
		<span ref={ref}>
			{display}
			{suffix}
		</span>
	);
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 100, damping: 14 },
	},
};

const Stats = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section className="relative py-16">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="grid grid-cols-2 md:grid-cols-4 gap-6"
				>
					{stats.map((stat) => (
						<motion.div
							key={stat.label}
							variants={itemVariants}
							whileHover={{ y: -4 }}
							className="group relative text-center bg-gray-800/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<div className="relative z-10">
								<stat.icon className="w-6 h-6 mx-auto mb-3 text-orange-400" />
								<div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
									<Counter value={stat.value} suffix={stat.suffix} />
								</div>
								<p className="text-sm text-gray-400">{stat.label}</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Stats;
