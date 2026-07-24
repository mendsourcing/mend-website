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
      {
        source: "/aerospace-distribution",
        destination: "/government-contracting",
        permanent: true,
      },
      {
        source: "/federal",
        has: [{ type: "host", value: "mendsourcing.com" }],
        destination: "https://security.mendsourcing.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
