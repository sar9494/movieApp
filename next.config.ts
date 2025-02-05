import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "",
    API_KEY: process.env.API_KEY || "",
  },
};

export default nextConfig;
