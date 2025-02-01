import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'htufoivowbjvsafxfhep.supabase.co',
      },
      {
        protocol: 'https', 
        hostname: 'freight.qantas.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/tracking-widget.js',
        destination: '/_next/static/tracking-widget.js',
      },
    ];
  },
};


export default nextConfig;
