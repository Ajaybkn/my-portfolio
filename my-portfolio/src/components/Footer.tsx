"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			name: "GitHub",
			icon: FaGithub,
			url: "https://github.com/Ajaybkn",
			color: "hover:text-gray-400",
		},
		{
			name: "LinkedIn",
			icon: FaLinkedin,
			url: "https://www.linkedin.com/in/ajayskhangarot/",
			color: "hover:text-blue-400",
		},

		{
			name: "Email",
			icon: FaEnvelope,
			url: "https://mail.google.com/mail/?view=cm&fs=1&to=ajaybkn1108@gmail.com&su=Hello%20Ajay&body=Hi%20Ajay%2C%0A%0AI%20hope%20this%20message%20finds%20you%20well.",
			color: "hover:text-orange-400",
		},
	];

	return (
		<footer className="bg-gray-950 text-white py-12 border-t border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* About Section */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold text-orange-400">About Me</h3>
						<p className="text-gray-400">
							A passionate full-stack developer focused on creating elegant solutions to complex problems.
						</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold text-orange-400">Quick Links</h3>
						<ul className="space-y-2">
							{["Home", "Skills", "Projects", "Contact"].map((link) => (
								<li key={link}>
									<a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-orange-400 transition-colors">
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Connect Section */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold text-orange-400">Connect</h3>
						<div className="flex space-x-4">
							{socialLinks.map((link) => (
								<motion.a
									key={link.name}
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`text-gray-400 transition-colors ${link.color}`}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									aria-label={link.name}
								>
									<link.icon className="w-6 h-6" />
								</motion.a>
							))}
						</div>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
					<p>© {currentYear} Ajay Singh Khangarot. All rights reserved.</p>
					<p className="mt-2 text-sm">
						Built with <span className="text-orange-400">Next.js</span> and{" "}
						<span className="text-orange-400">Tailwind CSS</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
