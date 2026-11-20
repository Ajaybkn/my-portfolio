import { NextRequest, NextResponse } from "next/server";
import { PROFILE_SYSTEM_PROMPT } from "@/lib/profile";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const MAX_MESSAGES = 20; // ~10 user turns per conversation
const MAX_MESSAGE_LENGTH = 600;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidMessages(value: unknown): value is ChatMessage[] {
	if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return false;
	return value.every(
		(m) =>
			m &&
			typeof m === "object" &&
			(m.role === "user" || m.role === "assistant") &&
			typeof m.content === "string" &&
			m.content.length > 0 &&
			m.content.length <= MAX_MESSAGE_LENGTH
	);
}

export async function POST(req: NextRequest) {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		return NextResponse.json(
			{ error: "The AI assistant isn't configured yet. Please use the contact form instead." },
			{ status: 503 }
		);
	}

	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
	}

	const messages = (body as { messages?: unknown })?.messages;
	if (!isValidMessages(messages)) {
		return NextResponse.json({ error: "Invalid or too long message history." }, { status: 400 });
	}

	try {
		const groqRes = await fetch(GROQ_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: MODEL,
				messages: [{ role: "system", content: PROFILE_SYSTEM_PROMPT }, ...messages],
				max_tokens: 350,
				temperature: 0.4,
			}),
		});

		if (!groqRes.ok) {
			const bodyText = await groqRes.text();
			console.error("Groq API error:", groqRes.status, bodyText);
			return NextResponse.json({ error: "The AI assistant is temporarily unavailable." }, { status: 502 });
		}

		const data = await groqRes.json();
		const reply: string | undefined = data?.choices?.[0]?.message?.content;

		if (!reply) {
			console.error("Groq API returned no reply:", JSON.stringify(data));
			return NextResponse.json({ error: "The AI assistant is temporarily unavailable." }, { status: 502 });
		}

		return NextResponse.json({ reply });
	} catch (err) {
		console.error("Groq API request failed:", err);
		return NextResponse.json({ error: "The AI assistant is temporarily unavailable." }, { status: 502 });
	}
}
