import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.3"],
  images: {
    domains: ["i.pinimg.com"],
  },
};

export default nextConfig;
