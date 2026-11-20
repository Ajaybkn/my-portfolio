"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaCode, FaServer, FaUsers, FaExchangeAlt, FaThLarge, FaTools } from "react-icons/fa";
import { TbSignal4G } from "react-icons/tb";
import { handleSpotlight, spotlightClassName, spotlightStyle } from "@/lib/spotlight";

export const experiences = [
	{
		company: "Techoon Software Solutions",
		position: "Senior Software Developer",
		period: "Sept 2025- Present",
		projects: [
			{
				name: "Vue 2 to Vue 3 Migration",
				website: "",
				description:
					"Led the Vue 2 to Vue 3 migration using the Composition API, restructuring shared logic into reusable composables to improve maintainability and scalability. Reduced page-load time by approximately 30% through route-level code splitting, lazy loading, composables, and reusable components.",
			},
			{
				name: "AI-Powered Migration Platform (CrewAI)",
				website: "",
				description:
					"Architected an AI-powered Vue 2 to Vue 3 migration platform on CrewAI (Python): a 7-agent pipeline (Analyzer, Planner, Template/Script/Style Migrators, Merger, Reviewer) with multi-LLM support, so each agent can run on a different model. Added dependency-aware ordering (topological sort), a Merger agent for template-script linkage, and a self-healing retry loop that fixes only failing parts.",
			},
			{
				name: "Centralized API Integration Layer",
				website: "",
				description:
					"Built a centralized API integration layer with unified error handling across application modules.",
			},
		],
		technologies: [
			"Vue.js 3",
			"TypeScript",
			"Composition API",
			"REST APIs",
			"Python",
			"CrewAI",
			"Multi-LLM Workflows",
			"Topological Sort",
			"Performance Optimization",
		],
	},
	{
		company: "Letese Legal Tech",
		position: "Full Stack Developer",
		period: "Sept 2024 - Sept-2025",
		website: "https://letese.co/",
		achievements: [
			{
				icon: FaCode,
				title: "Full Stack Development",
				description:
					"Built SaaS features end to end, with React.js, Next.js and TypeScript frontends and Node.js/Express backends on MongoDB, styled with Tailwind CSS.",
			},
			{
				icon: FaThLarge,
				title: "Real-Time Document Preview System",
				description:
					"Built a real-time, split-screen legal document preview system with dynamic questionnaire-to-template field synchronization.",
			},
			{
				icon: FaUsers,
				title: "Role-Based Access Control",
				description:
					"Designed and implemented role-based access control (RBAC), including permission models, authorization middleware for REST APIs, and role-aware UI.",
			},
			{
				icon: FaExchangeAlt,
				title: "REST APIs & Data Modeling",
				description:
					"Developed REST APIs and MongoDB data models for core product modules, with validation and consistent error handling.",
			},
			{
				icon: FaServer,
				title: "Cloud Deployment",
				description:
					"Managed deployments on AWS (EC2, ECS, ECR, IAM): containerized services with Docker, pushed images to ECR, and automated build and deploy with GitHub Actions CI/CD.",
			},
		],
		technologies: ["React.js", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "AWS", "Docker", "GitHub Actions"],
	},
	{
		company: "Novative Solutions Pvt Ltd",
		position: "Full Stack Developer",
		period: "Feb 2021 - Aug 2024",
		achievements: [
			{
				icon: FaCode,
				title: "SaaS Product Development",
				description: "Developed SaaS products for CA and legal professionals using React.js, JavaScript (ES6+), and REST APIs.",
			},
			{
				icon: FaBriefcase,
				title: "Core Business Modules",
				description:
					"Built core business modules, including lead management, invoicing, proposals, and accounting, covering UI, business logic, and API integration.",
			},
			{
				icon: FaThLarge,
				title: "Dashboards & Reporting",
				description:
					"Delivered dashboards and reporting modules that give firms visibility into leads, billing, and financial data.",
			},
			{
				icon: FaTools,
				title: "Workflow Automation",
				description:
					"Automated email workflows and optimized business processes, improving operational productivity by approximately 40%.",
			},
		],
		technologies: ["React.js", "JavaScript (ES6+)", "REST APIs"],
	},
	{
		company: "Rawelcom Services India Pvt Ltd",
		position: "Telecom Engineer",
		period: "Jun 2014 - Feb 2017",
		achievements: [
			{
				icon: TbSignal4G,
				title: "Reliance Jio 4G Network Rollout",
				description: "Supported the Reliance Jio 4G network rollout through site surveys, equipment installation, and commissioning.",
			},
		],
		technologies: ["Site Surveys", "Equipment Installation", "Network Commissioning"],
	},
];

const Experience = () => {
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
		<section id="experience" className="py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="text-center mb-16"
				>
					<motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
						Professional Experience
					</motion.h2>
					<motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
						My journey in software development and key achievements
					</motion.p>
				</motion.div>

				<div className="space-y-16">
					{experiences.map((experience, index) => (
						<motion.div key={experience.company} variants={itemVariants} className="relative">
							{/* Timeline Line */}
							<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-pink-500" />

							{/* Content */}
							<div className="ml-8">
								{/* Header */}
								<div className="mb-8">
									<div className="flex items-center justify-between mb-2">
										<h3 className="text-2xl font-bold text-white">{experience.position}</h3>
										<span className="text-orange-400 font-medium">{experience.period}</span>
									</div>
									<div className="flex items-center space-x-2">
										<h4 className="text-xl text-gray-300">{experience.company}</h4>
										{experience.website && (
											<a
												href={experience.website}
												target="_blank"
												rel="noopener noreferrer"
												className="text-orange-400 hover:text-orange-300 transition-colors"
											>
												<FaBriefcase className="w-4 h-4" />
											</a>
										)}
									</div>
								</div>

								{/* Achievements/Projects */}
								<div className="space-y-6">
									{experience.achievements?.map((achievement) => (
										<motion.div
											key={achievement.title}
											variants={itemVariants}
											onMouseMove={handleSpotlight}
											className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
										>
											<div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
											<div className={spotlightClassName} style={spotlightStyle} />
											<div className="relative z-10">
												<div className="flex items-start space-x-4">
													<div className="flex-shrink-0">
														<achievement.icon className="w-6 h-6 text-orange-400" />
													</div>
													<div>
														<h5 className="text-lg font-semibold text-white mb-2">{achievement.title}</h5>
														<p className="text-gray-400">{achievement.description}</p>
													</div>
												</div>
											</div>
										</motion.div>
									))}

									{experience.projects?.map((project) => (
										<motion.div
											key={project.name}
											variants={itemVariants}
											onMouseMove={handleSpotlight}
											className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
										>
											<div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
											<div className={spotlightClassName} style={spotlightStyle} />
											<div className="relative z-10">
												<div className="flex items-start justify-between mb-2">
													<h5 className="text-lg font-semibold text-white">{project.name}</h5>
													{project.website && (
														<a
															href={project.website}
															target="_blank"
															rel="noopener noreferrer"
															className="text-blue-400 hover:text-blue-300 transition-colors"
														>
															<FaCode className="w-4 h-4" />
														</a>
													)}
												</div>
												<p className="text-gray-400">{project.description}</p>
											</div>
										</motion.div>
									))}
								</div>

								{/* Technologies */}
								<div className="mt-6 flex flex-wrap gap-2">
									{experience.technologies.map((tech) => (
										<span
											key={tech}
											className="px-3 py-1 text-sm font-medium text-orange-400 bg-orange-400/10 rounded-full"
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;
