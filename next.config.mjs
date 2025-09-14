
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Docker deployment
  experimental: {
    // turbopack: true, // Enable if needed, but basic config doesn't require detailed rules
  },
  // Allow cross-origin requests from Replit dev environment
  allowedDevOrigins: ['*.replit.dev'],
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://adl-cms-735256194233.asia-southeast1.run.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;
