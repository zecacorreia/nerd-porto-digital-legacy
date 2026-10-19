import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shake barrel imports from icon/animation libs.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
