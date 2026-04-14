import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.12:3000", "192.168.1.3"],
  images: {
    domains: ["i.pinimg.com"],
  },
};

export default nextConfig;
