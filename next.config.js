/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ["https://res.cloudinary.com"],
  },
};

module.exports = nextConfig;
