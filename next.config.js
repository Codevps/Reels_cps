/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.pixabay.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
