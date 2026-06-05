import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/glasses-store" : "",
  assetPrefix: isProd ? "/glasses-store/" : "",
};

export default nextConfig;
