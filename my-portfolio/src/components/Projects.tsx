"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
	title: string;
	description: string;
	image: string;
	technologies: string[];
	liveLink: string;
	comingSoon?: boolean;
}

const projects: Project[] = [
	{
		title: "Letese",
		description:
			"Simplified global compliance through AI-powered, secure, and integrated legal, accounting, and regulatory solutions that adapt, empower, and deliver with integrity.",
		image: "/LeteseLogoBlack.svg",
		technologies: [
			"Next.js",
			"Typescript",
			"React",
			"Redux",
			"Javascript",
			"Tailwind Css",
			"AWS",
			"Github Actions",
			"SaaS",
		],
		liveLink: "https://letese.co/",
		comingSoon: false,
	},
	{
		title: "Oas36ty",
		description: "All-in-one Cloud Based Office Automation Software",
		image: "/oas.png",
		technologies: ["Vue.js", "Javascript", "Bootstrap", "Vuex", "Vuetify", "SaaS"],
		liveLink: "https://oas36ty.com/",
		comingSoon: false,
		// liveLink: "https://ecommerce-demo.com",
	},
	{
		title: "CIRP Portal",
		description: "Corporate Insolvency Claim Portal",
		image: "/cirp.jpg",
		technologies: ["Vue.Js", "Bootstrap", "Vuex", "SaaS"],
		liveLink: "https://insolv-assist.oas36ty.com/",
	},
	{
		title: "Chatty",
		description: "A full-stack real-time chat application built with Next.js, Node.js,Websocket and MongoDB.",
		image: "/chatty.webp",
		technologies: ["Next.js", "Node.js", "MongoDB", "Websocket"],
		liveLink: "https://ecommerce-demo.com",
		comingSoon: true,
	},
	{
		title: "Dimension",
		description: "Demo website for a company.",
		image: "/ddmen.webp",
		technologies: ["React", "Tailwind CSS", "Framer Motion", "Javascript"],
		liveLink: "https://dimensions1.netlify.app/",
	},
];

const Projects = () => {
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
		<section id="projects" className="py-20 bg-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="text-center mb-16"
				>
					<motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
						Featured Projects
					</motion.h2>
					<motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
						Here are some of my recent projects that showcase my skills and experience
					</motion.p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<motion.div
							key={project.title}
							variants={itemVariants}
							className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col h-full"
						>
							{/* Project Image */}
							<div className="relative h-48 w-full overflow-hidden">
								{project.image.endsWith(".svg") ? (
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
									/>
								) : (
									<Image
										src={project.image}
										alt={project.title}
										fill
										unoptimized
										className="object-cover transform group-hover:scale-110 transition-transform duration-500"
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
							</div>

							{/* Project Content */}
							<div className="p-6 flex flex-col flex-grow">
								<h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
								<p className="text-gray-400 mb-4">{project.description}</p>

								{/* Technologies */}
								<div className="flex flex-wrap gap-2 mb-6">
									{project.technologies.map((tech) => (
										<span key={tech} className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full">
											{tech}
										</span>
									))}
								</div>

								{/* Project Links */}
								<div className="flex items-center justify-between mt-auto">
									{project.comingSoon ? (
										<div className="absolute top-0 left-0 w-32 h-32 z-20 overflow-hidden">
											<div className="absolute -top-[-25px] -left-12 w-48 transform -rotate-45 bg-orange-500 text-white text-xs font-bold py-1 text-center shadow-md">
												Coming Soon
											</div>
										</div>
									) : (
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center text-gray-400 hover:text-orange-400 transition-colors cursor-pointer"
										>
											<FaExternalLinkAlt className="w-5 h-5 mr-2" />
											Live Demo
										</a>
									)}
								</div>
							</div>

							{/* Hover Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
