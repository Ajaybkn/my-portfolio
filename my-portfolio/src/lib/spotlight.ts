import React from "react";

export const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
	const rect = e.currentTarget.getBoundingClientRect();
	e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
	e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export const spotlightClassName =
	"pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

export const spotlightStyle: React.CSSProperties = {
	background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.08), transparent 40%)",
};
