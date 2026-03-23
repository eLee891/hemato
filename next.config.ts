import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript: {

    ignoreBuildErrors: true,
  },
  eslint: {
   
    ignoreDuringBuilds: true,
  },

  staticPageGenerationTimeout: 1200,
};

export default nextConfig;