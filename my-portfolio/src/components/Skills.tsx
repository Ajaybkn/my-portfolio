"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { IconType } from "react-icons";
import { SiGithubcopilot, SiClaude, SiMysql, SiDocker, SiJira, SiConfluence, SiPostman, SiPython } from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import {
	TbApi,
	TbStack2,
	TbStack3,
	TbShieldLock,
	TbPlugConnected,
	TbAlertTriangle,
	TbTopologyStar3,
} from "react-icons/tb";
import { handleSpotlight, spotlightClassName, spotlightStyle } from "@/lib/spotlight";

type Skill = {
	name: string;
	image?: string;
	Icon?: IconType;
};

const aiToolsData: Skill[] = [
	{ name: "Python", Icon: SiPython },
	{ name: "CrewAI", Icon: FaRobot },
	{ name: "Multi-Agent & Multi-LLM Workflows", Icon: TbTopologyStar3 },
	{ name: "Claude", Icon: SiClaude },
	{ name: "GitHub Copilot", Icon: SiGithubcopilot },
];

const toolsData: Skill[] = [
	{ name: "Postman", Icon: SiPostman },
	{ name: "Jira", Icon: SiJira },
	{ name: "Confluence", Icon: SiConfluence },
];

const skillsData = {
	frontend: [
		{ name: "React.js", image: "/skills/react.svg" },
		{ name: "Next.js", image: "/skills/nextt.png" },
		{ name: "Vue.js (2 & 3)", image: "/skills/vue.png" },
		{ name: "TypeScript", image: "/skills/typescript.webp" },
		{ name: "JavaScript (ES6+)", image: "/skills/javascript.webp" },
		{ name: "Redux", image: "/skills/redux.png" },
		{ name: "Zustand", image: "/skills/zustand.jpeg" },
		{ name: "Vuex", Icon: TbStack2 },
		{ name: "Pinia", Icon: TbStack3 },
		{ name: "Tailwind CSS", image: "/skills/tailwind.webp" },
		{ name: "HTML5", image: "/skills/html.webp" },
		{ name: "CSS3", image: "/skills/css.png" },
	] as Skill[],
	backend: [
		{ name: "Node.js", image: "/skills/nodejs.png" },
		{ name: "Express.js", image: "/skills/express.png" },
		{ name: "REST API Design", Icon: TbApi },
		{ name: "Authentication & RBAC", Icon: TbShieldLock },
		{ name: "Middleware", Icon: TbPlugConnected },
		{ name: "Centralized Error Handling", Icon: TbAlertTriangle },
	] as Skill[],
	databases: [
		{ name: "MongoDB", image: "/skills/mongodb.webp" },
		{ name: "MySQL", Icon: SiMysql },
	] as Skill[],
	cloudDevops: [
		{ name: "AWS (EC2, ECS, ECR, IAM)", image: "/skills/aws.png" },
		{ name: "Docker", Icon: SiDocker },
		{ name: "GitHub Actions (CI/CD)", image: "/skills/github-actions.png" },
		{ name: "Git", image: "/skills/git.png" },
	] as Skill[],
};

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
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

const SkillIcon = ({ skill, size }: { skill: Skill; size: number }) => {
	if (skill.image) {
		return (
			<Image
				src={skill.image}
				alt={skill.name}
				width={size}
				height={size}
				unoptimized
				className="rounded-lg"
			/>
		);
	}
	if (skill.Icon) {
		return <skill.Icon className="text-white" size={size} />;
	}
	return null;
};

const GridCard = ({ skill, gradient, size = 40 }: { skill: Skill; gradient: string; size?: number }) => (
	<motion.div
		variants={itemVariants}
		onMouseMove={handleSpotlight}
		className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
		whileHover={{ scale: 1.02 }}
	>
		<div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
		<div className={spotlightClassName} style={spotlightStyle} />
		<div className="relative z-10">
			<div className="flex items-center justify-center mb-4">
				<SkillIcon skill={skill} size={size} />
			</div>
			<h4 className="text-center text-white font-medium mb-3">{skill.name}</h4>
		</div>
	</motion.div>
);

const RowCard = ({ skill, gradient }: { skill: Skill; gradient: string }) => (
	<motion.div
		variants={itemVariants}
		onMouseMove={handleSpotlight}
		className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
		whileHover={{ scale: 1.02 }}
	>
		<div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
		<div className={spotlightClassName} style={spotlightStyle} />
		<div className="relative z-10 flex items-center">
			<div className="mr-4 flex items-center justify-center w-10 h-10 shrink-0">
				<SkillIcon skill={skill} size={40} />
			</div>
			<div className="flex-1">
				<h4 className="text-white font-medium">{skill.name}</h4>
			</div>
		</div>
	</motion.div>
);

const Skills = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section id="skills" className="py-20">
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
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
						{skillsData.frontend.map((skill) => (
							<GridCard key={skill.name} skill={skill} gradient="from-orange-400/10 to-pink-500/10" size={44} />
						))}
					</div>
				</motion.div>

				{/* AI & Automation */}
				<motion.div variants={itemVariants} className="mb-20">
					<h3 className="text-2xl font-semibold text-white mb-2 text-center">AI & Automation</h3>
					<p className="text-gray-400 text-sm text-center mb-8 max-w-2xl mx-auto">
						Used for development productivity & debugging
					</p>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
						{aiToolsData.map((tool) => (
							<GridCard key={tool.name} skill={tool} gradient="from-purple-400/10 to-pink-500/10" />
						))}
					</div>
				</motion.div>

				{/* Backend & Databases */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
					<motion.div variants={itemVariants}>
						<h3 className="text-2xl font-semibold text-white mb-8 text-center">Backend Development</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{skillsData.backend.map((skill) => (
								<RowCard key={skill.name} skill={skill} gradient="from-blue-400/10 to-purple-500/10" />
							))}
						</div>
					</motion.div>

					<motion.div variants={itemVariants}>
						<h3 className="text-2xl font-semibold text-white mb-8 text-center">Databases</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{skillsData.databases.map((skill) => (
								<RowCard key={skill.name} skill={skill} gradient="from-emerald-400/10 to-teal-500/10" />
							))}
						</div>
					</motion.div>
				</div>

				{/* Cloud & DevOps and Tools */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<motion.div variants={itemVariants}>
						<h3 className="text-2xl font-semibold text-white mb-8 text-center">Cloud & DevOps</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{skillsData.cloudDevops.map((skill) => (
								<RowCard key={skill.name} skill={skill} gradient="from-amber-400/10 to-orange-500/10" />
							))}
						</div>
					</motion.div>

					<motion.div variants={itemVariants}>
						<h3 className="text-2xl font-semibold text-white mb-8 text-center">Tools</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{toolsData.map((tool) => (
								<RowCard key={tool.name} skill={tool} gradient="from-violet-400/10 to-indigo-500/10" />
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Skills;
