import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/fasteners",
        destination: "/part-identifier",
        permanent: true,
      },
      {
        source: "/training",
        destination: "/govtraining",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
