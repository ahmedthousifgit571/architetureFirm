import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Per BUILD-GUIDE: StrictMode double-mounts in dev can duplicate/kill
  // ScrollTriggers registered on mount. All hooks clean up correctly, but
  // disabling removes the class of bugs entirely.
  reactStrictMode: false,
  // A stray package-lock.json in the user home dir makes Next infer the
  // wrong workspace root without this.
  outputFileTracingRoot: process.cwd(),
  // Static HTML export into out/ — the site has no API routes or server
  // logic, so it can be served as plain files from cPanel/LiteSpeed.
  output: "export",
  // Emit every route as <route>/index.html rather than <route>.html.
  // Without this the export produces BOTH projects.html and a projects/
  // directory; a request for /projects then resolves to the directory,
  // finds no index inside, and 403s. Directory-style output lets the
  // server resolve every route natively via DirectoryIndex.
  trailingSlash: true,
  // The default Image loader needs the Next server to resize on demand.
  // Static hosting has no such server, so ship the originals as-is.
  images: { unoptimized: true },
};

export default nextConfig;
