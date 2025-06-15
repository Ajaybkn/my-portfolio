"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const cvLink = "/Ajay-Singh-Khangarot-Resume-2025.pdf";

// Enhanced animations
const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const letterAnimation = {
	hidden: {
		opacity: 0,
		y: 50,
		scale: 0.8,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 150,
			damping: 12,
		},
	},
};

const waveAnimation = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.9,
	},
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			delay: i * 0.1,
			duration: 0.6,
			ease: "easeOut",
			type: "spring",
			stiffness: 100,
		},
	}),
};

const buttonVariants = {
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
	hover: {
		scale: 1.05,
		boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.4)",
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	tap: {
		scale: 0.95,
		transition: {
			duration: 0.1,
		},
	},
};

const Intro = () => {
	const [isMounted, setIsMounted] = useState(false);
	const name = "Ajay Singh Khangarot";
	const role = "Full Stack Developer";
	const description = "Crafting digital experiences with modern technologies";

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleDownloadCV = () => {
		const link = document.createElement("a");
		link.href = cvLink;
		link.download = "Ajay_Singh_Khangarot_CV.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const contactSection = document.getElementById("contact");
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			className="relative min-h-screen flex flex-col items-center justify-center text-white text-center px-6 overflow-hidden "
			id="home"
		>
			{/* Video Background with Enhanced Overlay */}
			<div className="absolute inset-0 w-full h-full">
				<video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
					<source src="/cyber3.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90"></div>
			</div>

			{/* Main Content with Enhanced Styling */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate={isMounted ? "visible" : "hidden"}
				className="relative z-20 max-w-4xl mx-auto"
			>
				{/* Greeting */}
				<motion.div variants={letterAnimation} className="mb-4">
					<span className="text-4xl md:text-5xl font-light">
						Hi, <span className="text-orange-400 font-semibold">I am</span>
					</span>
				</motion.div>

				{/* Name with Enhanced Animation */}
				<motion.h1 className="text-5xl md:text-7xl font-extrabold mb-6 flex gap-1 text-orange-400 justify-center flex-wrap tracking-wide drop-shadow-lg">
					{name.split("").map((char, i) => (
						<motion.span key={i} variants={letterAnimation} className="inline-block">
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.h1>

				{/* Role with Enhanced Animation */}
				<motion.h2 className="text-3xl md:text-4xl font-light mb-8 flex gap-1 justify-center flex-wrap text-gray-300">
					{role.split("").map((char, i) => (
						<motion.span key={i} custom={i} variants={waveAnimation} className="inline-block">
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.h2>

				{/* Description */}
				<motion.p variants={letterAnimation} className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
					{description}
				</motion.p>

				{/* Enhanced Buttons */}
				<motion.div variants={staggerContainer} className="flex flex-col sm:flex-row justify-center gap-6">
					<motion.a
						href="#contact"
						onClick={handleScrollToContact}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						className="px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600"
					>
						Contact Me
					</motion.a>

					<motion.button
						onClick={handleDownloadCV}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						className="px-8 py-4 cursor-pointer text-lg font-medium rounded-lg shadow-lg transition-all bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-white border border-gray-700"
					>
						Download CV
					</motion.button>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Intro;
