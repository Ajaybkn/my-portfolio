"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRocket, FaCode, FaGraduationCap, FaGlobe } from "react-icons/fa";

const goals = [
	{
		icon: FaRocket,
		title: "Master Advanced Technologies",
		description: "Deep dive into AI/ML, Web3, and cloud architecture to build cutting-edge solutions.",
		timeline: "Ongoing",
		category: "Technical Growth",
	},
	{
		icon: FaCode,
		title: "Open Source Contributions",
		description: "Actively contribute to open-source projects and build a strong developer community presence.",
		timeline: "Long-term",
		category: "Community",
	},
	{
		icon: FaGraduationCap,
		title: "Tech Leadership",
		description: "Develop leadership skills and mentor junior developers in the tech community.",
		timeline: "2030",
		category: "Career Growth",
	},
	{
		icon: FaGlobe,
		title: "Global Impact",
		description: "Create technology solutions that address real-world problems and make a positive impact.",
		timeline: "Long-term",
		category: "Impact",
	},
];

const FutureGoals = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 12,
			},
		},
	};

	return (
		<section id="goals" className="py-20 bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="text-center mb-16"
				>
					<motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
						Future Goals
					</motion.h2>
					<motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
						My vision for growth and impact in the tech industry
					</motion.p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{goals.map((goal, index) => (
						<motion.div
							key={goal.title}
							variants={itemVariants}
							className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 overflow-hidden"
						>
							{/* Background Gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							{/* Content */}
							<div className="relative z-10">
								{/* Icon */}
								<motion.div
									className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center mb-6"
									whileHover={{ scale: 1.1, rotate: 5 }}
									whileTap={{ scale: 0.9 }}
								>
									<goal.icon className="w-6 h-6 text-white" />
								</motion.div>

								{/* Category Badge */}
								<span className="inline-block px-3 py-1 text-sm font-medium text-orange-400 bg-orange-400/10 rounded-full mb-4">
									{goal.category}
								</span>

								{/* Title */}
								<h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
									{goal.title}
								</h3>

								{/* Description */}
								<p className="text-gray-400 mb-4">{goal.description}</p>

								{/* Timeline */}
								<div className="flex items-center text-sm text-gray-500">
									<span className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
									{goal.timeline}
								</div>
							</div>

							{/* Hover Effect */}
							<div className="absolute inset-0 border border-orange-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</motion.div>
					))}
				</div>

				{/* Additional Info */}
				<motion.div variants={itemVariants} className="mt-16 text-center">
					<p className="text-gray-400 max-w-2xl mx-auto">
						I'm constantly learning and adapting to new technologies and methodologies. These goals represent my
						commitment to growth and making a meaningful impact in the tech industry.
					</p>
				</motion.div>
			</div>
		</section>
	);
};

export default FutureGoals;
