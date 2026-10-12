import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: '/contact',
        destination: '/tentang-kami#contact-showroom',
        permanent: true,
      },
      {
        source: '/promotions',
        destination: '/#services',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

