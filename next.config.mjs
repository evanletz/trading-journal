/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'nautical-malamute-277.convex.cloud',
            }
        ]
    }
};

export default nextConfig;
