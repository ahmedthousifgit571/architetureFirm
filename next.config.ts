import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Per BUILD-GUIDE: StrictMode double-mounts in dev can duplicate/kill
  // ScrollTriggers registered on mount. All hooks clean up correctly, but
  // disabling removes the class of bugs entirely.
  reactStrictMode: false,
  // A stray package-lock.json in the user home dir makes Next infer the
  // wrong workspace root without this.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
