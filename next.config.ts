import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.12:3000"],
  images: {
    domains: ["i.pinimg.com"],
  },
 
};

export default nextConfig;
 // next.config.js
module.exports = {
  allowedDevOrigins: ['192.168.1.3'],
}