"use client";

import React, { useEffect, useRef } from "react";
import type { Application, Graphics } from "pixi.js";

type Particle = { x: number; y: number; vx: number; vy: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };
type Shockwave = { x: number; y: number; life: number };

const PARTICLE_COUNT = 70;
const CONNECT_DISTANCE = 130;
const MOUSE_CONNECT_DISTANCE = 170;
const MOUSE_REPEL_DISTANCE = 110;
const MOUSE_REPEL_STRENGTH = 0.6;

const SPARKS_PER_BURST = 16;
const SPARK_LIFE = 36;
const SHOCKWAVE_LIFE = 28;
const SHOCKWAVE_MAX_RADIUS = 70;

const BOT_RADIUS = 15;
const BOT_FOLLOW_EASE = 0.055;
const BOT_HIT_RADIUS = 30;

const ParticleField = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const container = containerRef.current;
		if (!container) return;

		let destroyed = false;
		let app: Application | null = null;
		let particles: Particle[] = [];
		let sparks: Spark[] = [];
		let shockwaves: Shockwave[] = [];
		const mouse = { x: -9999, y: -9999, active: false };

		const bot = {
			x: 0,
			y: 0,
			targetX: 0,
			targetY: 0,
			scale: 1,
			blinkTimer: 120 + Math.random() * 180,
			blinkPhase: 0,
		};

		const spawnBurst = (x: number, y: number) => {
			for (let i = 0; i < SPARKS_PER_BURST; i++) {
				const angle = (Math.PI * 2 * i) / SPARKS_PER_BURST + Math.random() * 0.4;
				const speed = 1.5 + Math.random() * 2.5;
				sparks.push({
					x,
					y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					life: SPARK_LIFE,
				});
			}
			shockwaves.push({ x, y, life: SHOCKWAVE_LIFE });
		};

		const handlePointerMove = (e: PointerEvent) => {
			const rect = container.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
			mouse.active = true;
		};
		const handlePointerLeave = () => {
			mouse.active = false;
		};
		const handlePointerDown = (e: PointerEvent) => {
			const rect = container.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			spawnBurst(x, y);

			const dx = x - bot.x;
			const dy = y - bot.y;
			if (Math.sqrt(dx * dx + dy * dy) < BOT_HIT_RADIUS) {
				bot.scale = 1.5;
				window.dispatchEvent(new CustomEvent("ask-ai-companion"));
			}
		};

		const init = async () => {
			const PIXI = await import("pixi.js");
			if (destroyed || !container) return;

			const instance = new PIXI.Application();
			await instance.init({
				resizeTo: container,
				backgroundAlpha: 0,
				antialias: true,
				resolution: Math.min(window.devicePixelRatio || 1, 2),
				autoDensity: true,
			});

			if (destroyed) {
				instance.destroy(true, { children: true });
				return;
			}

			app = instance;
			container.appendChild(instance.canvas);

			const { width, height } = instance.screen;
			particles = Array.from({ length: PARTICLE_COUNT }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
			}));

			bot.x = bot.targetX = width * 0.82;
			bot.y = bot.targetY = height * 0.22;

			const g = new PIXI.Graphics();
			instance.stage.addChild(g);

			instance.ticker.add(() => {
				const { width: w, height: h } = instance.screen;

				for (const p of particles) {
					if (mouse.active) {
						const dx = p.x - mouse.x;
						const dy = p.y - mouse.y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < MOUSE_REPEL_DISTANCE && dist > 0.01) {
							const force = ((MOUSE_REPEL_DISTANCE - dist) / MOUSE_REPEL_DISTANCE) * MOUSE_REPEL_STRENGTH;
							p.vx += (dx / dist) * force * 0.05;
							p.vy += (dy / dist) * force * 0.05;
						}
					}

					p.x += p.vx;
					p.y += p.vy;
					p.vx *= 0.98;
					p.vy *= 0.98;

					if (p.x < 0 || p.x > w) p.vx *= -1;
					if (p.y < 0 || p.y > h) p.vy *= -1;
					p.x = Math.max(0, Math.min(w, p.x));
					p.y = Math.max(0, Math.min(h, p.y));
				}

				// sparks from clicks
				sparks = sparks.filter((s) => s.life > 0);
				for (const s of sparks) {
					s.x += s.vx;
					s.y += s.vy;
					s.vx *= 0.94;
					s.vy *= 0.94;
					s.life -= 1;
				}
				shockwaves = shockwaves.filter((sw) => sw.life > 0);
				for (const sw of shockwaves) sw.life -= 1;

				// AI companion: follows the cursor with a gentle lag, idle-drifts otherwise
				const t = performance.now() * 0.001;
				if (mouse.active) {
					bot.targetX = mouse.x + 34;
					bot.targetY = mouse.y - 42;
				} else {
					bot.targetX = w * 0.82 + Math.sin(t * 0.4) * 18;
					bot.targetY = h * 0.22 + Math.cos(t * 0.3) * 14;
				}
				bot.x += (bot.targetX - bot.x) * BOT_FOLLOW_EASE;
				bot.y += (bot.targetY - bot.y) * BOT_FOLLOW_EASE;
				bot.scale += (1 - bot.scale) * 0.15;

				bot.blinkTimer -= 1;
				if (bot.blinkTimer <= 0) {
					bot.blinkPhase = 1;
					bot.blinkTimer = 150 + Math.random() * 200;
				}
				if (bot.blinkPhase > 0) {
					bot.blinkPhase = Math.max(0, bot.blinkPhase - 0.12);
				}

				g.clear();

				for (let i = 0; i < particles.length; i++) {
					for (let j = i + 1; j < particles.length; j++) {
						const a = particles[i];
						const b = particles[j];
						const dx = a.x - b.x;
						const dy = a.y - b.y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < CONNECT_DISTANCE) {
							const alpha = (1 - dist / CONNECT_DISTANCE) * 0.25;
							g.moveTo(a.x, a.y).lineTo(b.x, b.y).stroke({ width: 1, color: 0xfb923c, alpha });
						}
					}

					if (mouse.active) {
						const p = particles[i];
						const dx = p.x - mouse.x;
						const dy = p.y - mouse.y;
						const dist = Math.sqrt(dx * dx + dy * dy);
						if (dist < MOUSE_CONNECT_DISTANCE) {
							const alpha = (1 - dist / MOUSE_CONNECT_DISTANCE) * 0.5;
							g.moveTo(p.x, p.y).lineTo(mouse.x, mouse.y).stroke({ width: 1, color: 0xec4899, alpha });
						}
					}
				}

				for (const p of particles) {
					g.circle(p.x, p.y, 1.8).fill({ color: 0xffffff, alpha: 0.75 });
				}

				// click sparks + shockwave rings
				for (const s of sparks) {
					const alpha = s.life / SPARK_LIFE;
					g.circle(s.x, s.y, 2).fill({ color: 0xec4899, alpha });
				}
				for (const sw of shockwaves) {
					const progress = 1 - sw.life / SHOCKWAVE_LIFE;
					const radius = progress * SHOCKWAVE_MAX_RADIUS;
					const alpha = (1 - progress) * 0.5;
					g.circle(sw.x, sw.y, radius).stroke({ width: 1.5, color: 0xfb923c, alpha });
				}

				// AI companion bot
				const bx = bot.x;
				const by = bot.y;
				const scale = bot.scale;
				const eyeRadiusY = 3.2 * (1 - bot.blinkPhase) + 0.4;

				g.moveTo(bx, by - BOT_RADIUS * scale)
					.lineTo(bx, by - BOT_RADIUS * scale - 8)
					.stroke({ width: 2, color: 0xec4899, alpha: 0.9 });
				g.circle(bx, by - BOT_RADIUS * scale - 10, 2.5).fill({ color: 0xec4899, alpha: 0.95 });

				g.circle(bx, by, BOT_RADIUS * scale).fill({ color: 0xfb923c, alpha: 0.9 });
				g.circle(bx, by, BOT_RADIUS * scale).stroke({ width: 1.5, color: 0xffffff, alpha: 0.3 });

				g.ellipse(bx - 5.5 * scale, by - 1, 2.6, eyeRadiusY).fill({ color: 0x111827, alpha: 0.95 });
				g.ellipse(bx + 5.5 * scale, by - 1, 2.6, eyeRadiusY).fill({ color: 0x111827, alpha: 0.95 });
			});
		};

		init();

		container.addEventListener("pointermove", handlePointerMove);
		container.addEventListener("pointerleave", handlePointerLeave);
		container.addEventListener("pointerdown", handlePointerDown);

		return () => {
			destroyed = true;
			container.removeEventListener("pointermove", handlePointerMove);
			container.removeEventListener("pointerleave", handlePointerLeave);
			container.removeEventListener("pointerdown", handlePointerDown);
			if (app) {
				app.destroy(true, { children: true });
			}
		};
	}, []);

	return <div ref={containerRef} data-cursor-hover className="absolute inset-0 w-full h-full" />;
};

export default ParticleField;
