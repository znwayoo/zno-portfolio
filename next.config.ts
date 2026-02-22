import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true // Required for next/image with output: 'export'
  },
  // Ensure we don't accidentally index pages starting with /dashboard
  // (Cannot use headers() or rewrites() in static export, so relying on client/page level checks)
};

export default nextConfig;
