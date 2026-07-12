import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/Siqi-Xu-AI-Product-Portfolio",
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
};

export default nextConfig;
