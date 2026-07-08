import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compile the shared TS domain contract from source (AD-12).
  transpilePackages: ["@portfolio/shared"],
};

export default nextConfig;
