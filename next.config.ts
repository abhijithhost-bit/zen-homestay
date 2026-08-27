import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.31.28'],
  images: {
    // Serve AVIF first (30-50% smaller than WebP), fallback to WebP
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 31 days — critical for repeat visitor speed
    minimumCacheTTL: 2678400,
    // Responsive breakpoints for all devices: mobile → tablet → desktop → wide
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048],
    // Sizes for fixed-width image slots (thumbnails, logos, etc.)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Serve at 1x for standard displays, 2x for retina
    dangerouslyAllowSVG: false,
  },
};

export default nextConfig;
