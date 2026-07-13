import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/Siqi-Xu-AI-Product-Portfolio" : undefined,
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
};

export default nextConfig;
