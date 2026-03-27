import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint 부분은 아예 삭제하세요!
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hematoinstitute.org',
      },
    ],
  },
};

export default nextConfig;