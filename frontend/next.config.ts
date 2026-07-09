import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const nextConfig: NextConfig = {
  // Compile the shared TS domain contract from source.
  transpilePackages: ["@portfolio/shared"],
  // Proxy browser API calls through this domain so the admin auth cookie is
  // first-party (cross-site cookies are blocked by many browsers).
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
