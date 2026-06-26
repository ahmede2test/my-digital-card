import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['172.27.80.1']
  }
};

export default nextConfig;