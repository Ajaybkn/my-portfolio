import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true, // disables optimization which breaks on Netlify static export
	},
	trailingSlash: true, // optional but avoids routing issues on Netlify
};

export default nextConfig;
