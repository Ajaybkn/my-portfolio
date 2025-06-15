"use client";
import emailjs from "emailjs-com";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaUser, FaPaperPlane, FaSpinner } from "react-icons/fa";

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validateForm = () => {
		if (!formData.name.trim()) {
			setStatus({
				type: "error",
				message: "Please enter your name",
			});
			return false;
		}
		if (!formData.email.trim()) {
			setStatus({
				type: "error",
				message: "Please enter your email",
			});
			return false;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			setStatus({
				type: "error",
				message: "Please enter a valid email address",
			});
			return false;
		}
		if (!formData.message.trim()) {
			setStatus({
				type: "error",
				message: "Please enter your message",
			});
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		setStatus({ type: null, message: "" });

		try {
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
				},
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			);
			await emailjs.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
				process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID!, // 👈 Another env variable for admin notification
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
				},
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			);

			setStatus({
				type: "success",
				message: "Message sent successfully! I'll get back to you soon.",
			});
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			setStatus({
				type: "error",
				message: "Failed to send message. Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="contact" className="py-20 bg-gray-950">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					ref={ref}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={containerVariants}
					className="text-center mb-16"
				>
					<motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-4">
						Get In Touch
					</motion.h2>
					<motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
						Have a project in mind or want to collaborate? Feel free to reach out!
					</motion.p>
				</motion.div>

				<motion.form
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					onSubmit={handleSubmit}
					className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8"
				>
					<div className="space-y-6">
						{/* Name Input */}
						<motion.div variants={itemVariants}>
							<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
								Name
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<FaUser className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors"
									placeholder="Your name"
								/>
							</div>
						</motion.div>

						{/* Email Input */}
						<motion.div variants={itemVariants}>
							<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
								Email
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<FaEnvelope className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors"
									placeholder="your.email@example.com"
								/>
							</div>
						</motion.div>

						{/* Message Input */}
						<motion.div variants={itemVariants}>
							<label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows={4}
								className="block w-full px-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-colors resize-none"
								placeholder="Your message..."
							/>
						</motion.div>

						{/* Status Message */}
						{status.message && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className={`p-4 rounded-lg ${
									status.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
								}`}
							>
								{status.message}
							</motion.div>
						)}

						{/* Submit Button */}
						<motion.div variants={itemVariants}>
							<motion.button
								type="submit"
								disabled={isSubmitting}
								className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-white font-medium ${
									isSubmitting
										? "bg-gray-600 cursor-not-allowed"
										: "bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600"
								} transition-colors`}
								whileHover={!isSubmitting ? { scale: 1.02 } : {}}
								whileTap={!isSubmitting ? { scale: 0.98 } : {}}
							>
								{isSubmitting ? (
									<>
										<FaSpinner className="animate-spin mr-2" />
										Sending...
									</>
								) : (
									<>
										<FaPaperPlane className="mr-2" />
										Send Message
									</>
								)}
							</motion.button>
						</motion.div>
					</div>
				</motion.form>
			</div>
		</section>
	);
};

export default ContactForm;
