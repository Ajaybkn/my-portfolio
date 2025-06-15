"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBriefcase, FaCode, FaServer, FaTools, FaUsers } from "react-icons/fa";

const experiences = [
	{
		company: "Letese Legal Tech",
		position: "Front-End Developer",
		period: "Sept 2024 - Present",
		website: "https://letese.co/",
		achievements: [
			{
				icon: FaUsers,
				title: "Role-Based Access Control",
				description:
					"Built and integrated role-based access modules for different user types, including Admin, RM/VRM, and End Users, ensuring secure access control and a tailored user experience.",
			},
			{
				icon: FaCode,
				title: "Frontend Development",
				description:
					"Designed and developed the complete frontend of web applications from scratch using Next.js, TypeScript, and Tailwind CSS, ensuring high performance, responsiveness, and scalability.",
			},
			{
				icon: FaServer,
				title: "AWS Cloud Services",
				description:
					"Gained hands-on experience with AWS cloud services, including ECS Fargate, EC2, ECR, and IAM for deploying and managing containerized applications.",
			},
			{
				icon: FaTools,
				title: "CI/CD & Automation",
				description:
					"Automated CI/CD pipelines using GitHub Actions to streamline build, test, and deployment processes, improving development efficiency and reducing manual errors.",
			},
		],
		technologies: [
			"Next.js",
			"TypeScript",
			"React",
			"Redux (RTK)",
			"Tailwind CSS",
			"AWS",
			"GitHub Actions",
			"SaaS",
			"REST APIs",
		],
	},
	{
		company: "Novative Solutions Pvt Ltd",
		position: "Full Stack Developer",
		period: "Feb 2023 - Sept 2024",
		projects: [
			{
				name: "OAS36ty – CA & Legal Management Software",
				website: "https://oas36ty.com/",
				description:
					"Developed a feature-rich SaaS platform using Vue.js, covering lead generation, task/client management, accounting, bulk emails, invoicing, proposals, and a dynamic dashboard. Integrated email services and streamlined workflows, improving productivity by 40%.",
			},
			{
				name: "Corporate Insolvency Claim Portal",
				website: "https://insolv-assist.oas36ty.com/",
				description:
					"Improved Vue.js component communication and integrated APIs for enhanced features and performance. Enabled seamless redirection from the OAS36TY app, boosting navigation and app efficiency by 25%.",
			},
			{
				name: "HR Portal",
				description: "Built with React.js, featuring employee management and attendance tracking systems.",
			},
		],
		technologies: ["Vue.js", "React.js", "Bootstrap", "REST APIs", "SaaS", "Javascript"],
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
		<section id="experience" className="py-20 bg-gray-950">
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
											className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
										>
											<div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
											className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
										>
											<div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
