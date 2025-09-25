/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Production optimizations
  experimental: {
    optimizeCss: true,
  },
  // Optimize build
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
