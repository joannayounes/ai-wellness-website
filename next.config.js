/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },   // allow build even with TS types issues
  eslint: { ignoreDuringBuilds: true },      // skip ESLint during build
  experimental: {
    serverActions: {},
  },
  images: { unoptimized: true },
}
module.exports = nextConfig
