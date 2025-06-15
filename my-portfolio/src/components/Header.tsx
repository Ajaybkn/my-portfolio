"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const sections = ["home", "skills", "experience", "projects", "goals", "contact"];

const Header = () => {
	const [activeSection, setActiveSection] = useState("home");
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsScrolled(scrollPosition > 50);

			// Update active section based on scroll position
			const sectionElements = sections.map((section) => ({
				id: section,
				element: document.getElementById(section),
			}));

			const currentSection = sectionElements.find(({ element }) => {
				if (!element) return false;
				const rect = element.getBoundingClientRect();
				return rect.top <= 100 && rect.bottom >= 100;
			});

			if (currentSection) {
				setActiveSection(currentSection.id);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// const scrollToSection = (sectionId: string) => {
	// 	const element = document.getElementById(sectionId);

	// 	if (element) {
	// 		element.scrollIntoView({ behavior: "smooth" });
	// 		setIsMobileMenuOpen(false);
	// 	}
	// };
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);

		if (element) {
			// First close the mobile menu
			if (isMobileMenuOpen) {
				setIsMobileMenuOpen(false);

				// Delay scroll to allow menu to collapse
				setTimeout(() => {
					const offset = 80; // Adjust based on your fixed header height
					const y = element.getBoundingClientRect().top + window.scrollY - offset;
					window.scrollTo({ top: y, behavior: "smooth" });
				}, 300); // match animation duration of the mobile menu
			} else {
				const offset = 80;
				const y = element.getBoundingClientRect().top + window.scrollY - offset;
				window.scrollTo({ top: y, behavior: "smooth" });
			}
		}
	};

	return (
		<>
			{/* Scroll Progress Bar */}
			<motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange-400 origin-left z-50" style={{ scaleX }} />

			<header
				className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
					isScrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
				}`}
			>
				<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							className="flex-shrink-0"
						>
							{/* <span className="text-2xl font-bold text-orange-400">ASK</span> */}
							<div className="flex items-center cursor-pointer  h-48 mt-4" onClick={() => scrollToSection("home")}>
								<Image
									src="/logo-without-background.png"
									alt="logo"
									width={200}
									height={200}
									sizes="100vw"
									className="h-28 w-auto object-contain "
									priority
									unoptimized
								/>
							</div>
						</motion.div>

						{/* Desktop Navigation */}
						<div className="hidden md:block">
							<div className="ml-10 flex items-center space-x-8">
								{sections.map((section) => (
									<motion.button
										key={section}
										onClick={() => scrollToSection(section)}
										className={`capitalize text-md cursor-pointer font-medium transition-colors ${
											activeSection === section ? "text-orange-400" : "text-gray-300 hover:text-orange-400"
										}`}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{section}
									</motion.button>
								))}
							</div>
						</div>

						{/* Social Links */}
						<div className="hidden md:flex items-center space-x-4">
							{[
								{ icon: FaGithub, url: "https://github.com/Ajaybkn" },
								{ icon: FaLinkedin, url: "https://www.linkedin.com/in/ajayskhangarot/" },
								{
									icon: FaEnvelope,
									url: "https://mail.google.com/mail/?view=cm&fs=1&to=ajaybkn1108@gmail.com&su=Hello%20Ajay&body=Hi%20Ajay%2C%0A%0AI%20hope%20this%20message%20finds%20you%20well.",
								},
							].map((social, index) => (
								<motion.a
									key={index}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 hover:text-orange-400 transition-colors"
									whileHover={{ scale: 1.2, rotate: 5 }}
									whileTap={{ scale: 0.9 }}
								>
									<social.icon className="w-5 h-5" />
								</motion.a>
							))}
						</div>

						{/* Mobile Menu Button */}
						<div className="md:hidden">
							<motion.button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="text-gray-400 hover:text-orange-400 focus:outline-none"
								whileTap={{ scale: 0.9 }}
							>
								<div className="w-6 h-6 flex flex-col justify-around">
									<span
										className={`block w-full h-0.5 bg-current transform transition-transform ${
											isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
										}`}
									/>
									<span
										className={`block w-full h-0.5 bg-current transition-opacity ${
											isMobileMenuOpen ? "opacity-0" : ""
										}`}
									/>
									<span
										className={`block w-full h-0.5 bg-current transform transition-transform ${
											isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
										}`}
									/>
								</div>
							</motion.button>
						</div>
					</div>
				</nav>

				{/* Mobile Menu */}
				<motion.div
					initial={false}
					animate={{
						height: isMobileMenuOpen ? "auto" : 0,
						opacity: isMobileMenuOpen ? 1 : 0,
					}}
					transition={{ duration: 0.3 }}
					className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md"
				>
					<div className="px-4 pt-2 pb-3 space-y-1">
						{sections.map((section) => (
							<motion.button
								key={section}
								onClick={() => scrollToSection(section)}
								className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium capitalize ${
									activeSection === section
										? "text-orange-400 bg-gray-800"
										: "text-gray-300 hover:text-orange-400 hover:bg-gray-800"
								}`}
								whileHover={{ x: 10 }}
								whileTap={{ scale: 0.95 }}
							>
								{section}
							</motion.button>
						))}
						<div className="flex justify-center space-x-4 pt-4">
							{[
								{ icon: FaGithub, url: "https://github.com/Ajaybkn" },
								{ icon: FaLinkedin, url: "https://www.linkedin.com/in/ajayskhangarot/" },
							].map((social, index) => (
								<motion.a
									key={index}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 hover:text-orange-400 transition-colors"
									whileHover={{ scale: 1.2, rotate: 5 }}
									whileTap={{ scale: 0.9 }}
								>
									<social.icon className="w-6 h-6" />
								</motion.a>
							))}
						</div>
					</div>
				</motion.div>
			</header>
		</>
	);
};

export default Header;
