/** @type {import('next').NextConfig} */

const nodeEnv = process.env.NODE_ENV;

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: nodeEnv === 'development' ? true : false
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos']
  }
};

module.exports = withPWA(nextConfig);
