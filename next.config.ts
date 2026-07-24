import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
