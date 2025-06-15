import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true, // optional but avoids routing issues on Netlify
};

export default nextConfig;
