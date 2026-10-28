/** @type {import('next').NextConfig} */
const nextConfig = {
  // The homepage previews run in sandboxed iframes (an opaque origin), which
  // must be allowed to read the site's own public font and script files.
  async headers() {
    return [
      { source: "/_next/static/:path*", headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
