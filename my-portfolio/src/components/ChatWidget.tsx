"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
	role: "assistant",
	content:
		"Hi! I'm an AI assistant trained on Ajay's resume. Ask me about his experience, skills, or projects — or try a suggestion below.",
};

const SUGGESTIONS = [
	"What are Ajay's key skills?",
	"Tell me about his AI & automation work",
	"What projects has he built?",
];

const MAX_USER_MESSAGES = 10;

const TypingDots = () => (
	<div className="self-start bg-gray-800 text-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
		{[0, 0.15, 0.3].map((delay) => (
			<motion.span
				key={delay}
				className="w-1.5 h-1.5 bg-gray-400 rounded-full"
				animate={{ y: [0, -4, 0] }}
				transition={{ repeat: Infinity, duration: 0.8, delay }}
			/>
		))}
	</div>
);

const ChatWidget = () => {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([GREETING]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	const userMessageCount = messages.filter((m) => m.role === "user").length;
	const limitReached = userMessageCount >= MAX_USER_MESSAGES;

	useEffect(() => {
		const openFromCompanion = () => setOpen(true);
		window.addEventListener("ask-ai-companion", openFromCompanion);
		return () => window.removeEventListener("ask-ai-companion", openFromCompanion);
	}, []);

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
	}, [messages, loading, open]);

	const sendMessage = async (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || loading || limitReached) return;

		const nextMessages = [...messages, { role: "user", content: trimmed } as Message];
		setMessages(nextMessages);
		setInput("");
		setError(null);
		setLoading(true);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: nextMessages.filter((m) => m !== GREETING) }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Something went wrong. Please try again.");
			} else {
				setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
			}
		} catch {
			setError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<motion.button
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.92 }}
				onClick={() => setOpen((o) => !o)}
				aria-label={open ? "Close AI chat" : "Ask AI about Ajay"}
				className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-lg shadow-orange-500/20"
			>
				{!open && (
					<span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20" aria-hidden="true" />
				)}
				{open ? <FaTimes className="w-5 h-5" /> : <FaRobot className="w-6 h-6" />}
			</motion.button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 16 }}
						transition={{ type: "spring", stiffness: 260, damping: 24 }}
						className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[28rem] max-h-[70vh] bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
					>
						{/* Header */}
						<div className="px-4 py-3 bg-gradient-to-r from-orange-400/20 to-pink-500/20 border-b border-gray-800">
							<h3 className="text-white font-semibold text-sm flex items-center gap-2">
								<FaRobot className="text-orange-400" /> Ask AI about Ajay
							</h3>
							<p className="text-gray-400 text-xs mt-0.5">Grounded in his resume &middot; powered by GPT-OSS 120B</p>
						</div>

						{/* Messages */}
						<div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
							{messages.map((m, i) => (
								<div
									key={i}
									className={`max-w-[80%] px-4 py-2 text-sm rounded-2xl ${
										m.role === "user"
											? "self-end bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-br-sm"
											: "self-start bg-gray-800 text-gray-200 rounded-bl-sm"
									}`}
								>
									{m.content}
								</div>
							))}

							{messages.length === 1 && (
								<div className="flex flex-col gap-2 mt-2">
									{SUGGESTIONS.map((s) => (
										<button
											key={s}
											onClick={() => sendMessage(s)}
											className="text-left text-xs px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-orange-400/60 hover:text-orange-400 transition-colors"
										>
											{s}
										</button>
									))}
								</div>
							)}

							{loading && <TypingDots />}

							{error && <div className="self-center text-xs text-red-400 text-center">{error}</div>}

							{limitReached && (
								<div className="self-center text-xs text-gray-500 text-center">
									You&apos;ve reached the message limit for this session &mdash; please use the contact form below to
									reach Ajay directly.
								</div>
							)}
						</div>

						{/* Input */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								sendMessage(input);
							}}
							className="p-3 border-t border-gray-800 flex items-center gap-2"
						>
							<input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder={limitReached ? "Message limit reached" : "Ask about Ajay's work..."}
								disabled={loading || limitReached}
								maxLength={600}
								className="flex-1 bg-gray-800/70 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent disabled:opacity-50"
							/>
							<button
								type="submit"
								disabled={loading || limitReached || !input.trim()}
								className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white disabled:opacity-40 disabled:cursor-not-allowed"
								aria-label="Send message"
							>
								<FaPaperPlane className="w-3.5 h-3.5" />
							</button>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ChatWidget;
