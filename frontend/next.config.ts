import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Use webpack for production builds to avoid lightningcss native binary issues on Vercel */
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
