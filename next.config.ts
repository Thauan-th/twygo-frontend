import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/courses',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
