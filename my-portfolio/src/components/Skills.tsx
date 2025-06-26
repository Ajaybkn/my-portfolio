"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const skillsData = {
	frontend: [
		{ name: "Next.js", image: "/skills/nextt.png", level: 85 },
		{ name: "TypeScript", image: "/skills/typescript.webp", level: 80 },
		{ name: "React", image: "/skills/react.svg", level: 90 },
		{ name: "Javascript", image: "/skills/javascript.webp", level: 90 },
		{ name: "Vue", image: "/skills/vue.png", level: 90 },
		{ name: "Redux(RTK)", image: "/skills/redux.png", level: 90 },
		{ name: "Html", image: "/skills/html.webp", level: 90 },
		{ name: "Css", image: "/skills/css.png", level: 90 },
		{ name: "Tailwind CSS", image: "/skills/tailwind.webp", level: 95 },
		{ name: "Bootstrap", image: "/skills/bootstrap.png", level: 95 },
		{ name: "Zustand", image: "/skills/zustand.jpeg", level: 95 },
	],
	backend: [
		{ name: "Node.js", image: "/skills/nodejs.png", level: 85 },
		{ name: "Express", image: "/skills/express.png", level: 80 },
		{ name: "MongoDB", image: "/skills/mongodb.webp", level: 75 },
		{ name: "PostgreSQL", image: "/skills/postgre.png", level: 75 },
	],
	tools: [
		{ name: "Git", image: "/skills/git.png", level: 85 },
		{ name: "VS Code", image: "/skills/vs.png", level: 85 },
		{ name: "GitHub", image: "/skills/github.png", level: 85 },
		{ name: "GitHub Actions", image: "/skills/github-actions.png", level: 85 },
		{ name: "Cursor AI", image: "/skills/cursorr.jpeg", level: 70 },
		{ name: "AWS", image: "/skills/aws.png", level: 65 },
		{ name: "Neon", image: "/skills/neon.jpeg", level: 65 },
		{ name: "Arcjet", image: "/skills/arcjet.jpeg", level: 65 },
	],
};

const Skills = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
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
		<section id="skills" className="py-20 bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="text-center mb-16"
				>
					<motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
						Technical Skills
					</motion.h2>
					<motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
						My expertise in modern web development technologies
					</motion.p>
				</motion.div>

				{/* Frontend Skills */}
				<motion.div variants={itemVariants} className="mb-20">
					<h3 className="text-2xl font-semibold text-white mb-8 text-center">Frontend Development</h3>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{skillsData.frontend.map((skill) => (
							<motion.div
								key={skill.name}
								variants={itemVariants}
								className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
								whileHover={{ scale: 1.02 }}
							>
								<div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="relative z-10">
									<div className="flex items-center justify-center mb-4">
										<Image
											src={skill.image}
											alt={skill.name}
											width={48}
											height={48}
											unoptimized
											className="rounded-lg"
										/>
									</div>
									<h4 className="text-center text-white font-medium mb-3">{skill.name}</h4>
									{/* <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
										<motion.div
											className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
											initial={{ width: 0 }}
											animate={{ width: `${skill.level}%` }}
											transition={{ duration: 1, ease: "easeOut" }}
										/>
									</div> */}
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Backend & Tools Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Backend Skills */}
					<motion.div variants={itemVariants}>
						<h3 className="text-2xl font-semibold text-white mb-8 text-center">Backend Development</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{skillsData.backend.map((skill) => (
								<motion.div
									key={skill.name}
									variants={itemVariants}
									className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
									whileHover={{ scale: 1.02 }}
								>
									<div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="relative z-10 flex items-center">
										<Image
											src={skill.image}
											alt={skill.name}
											unoptimized
											width={40}
											height={40}
											className="rounded-lg mr-4"
										/>
										<div className="flex-1">
											<h4 className="text-white font-medium mb-2">{skill.name}</h4>
											{/* <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
												<motion.div
													className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
													initial={{ width: 0 }}
													animate={{ width: `${skill.level}%` }}
													transition={{ duration: 1, ease: "easeOut" }}
												/>
											</div> */}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Tools */}
					<motion.div variants={itemVariants}>
						<h3 className="text-2xl font-semibold text-white mb-8 text-center">Development Tools</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{skillsData.tools.map((skill) => (
								<motion.div
									key={skill.name}
									variants={itemVariants}
									className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
									whileHover={{ scale: 1.02 }}
								>
									<div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="relative z-10 flex items-center">
										<Image
											src={skill.image}
											alt={skill.name}
											unoptimized
											width={40}
											height={40}
											className="rounded-lg mr-4"
										/>
										<div className="flex-1">
											<h4 className="text-white font-medium mb-2">{skill.name}</h4>
											{/* <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
												<motion.div
													className="h-full bg-gradient-to-r from-green-400 to-teal-500"
													initial={{ width: 0 }}
													animate={{ width: `${skill.level}%` }}
													transition={{ duration: 1, ease: "easeOut" }}
												/>
											</div> */}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Skills;
