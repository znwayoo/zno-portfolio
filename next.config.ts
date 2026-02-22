import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repo}` : "",
  assetPrefix: isGithubActions ? `/${repo}/` : undefined,
  images: {
    unoptimized: true, // Required for next/image with output: 'export'
  },
  // Ensure we don't accidentally index pages starting with /dashboard
  // (Cannot use headers() or rewrites() in static export, so relying on client/page level checks)
};

export default nextConfig;
