/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.CONVEX_HOSTNAME,
      },
    ],
  },
};

export default nextConfig;
