/** @type {import('next').NextConfig} */
const nextConfig = {
  // Belong's real config disables this; we keep it on here so the effect
  // double-invocation in dev helps surface exactly the async bugs this
  // interview is designed to probe.
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
};

module.exports = nextConfig;
