// next.config.ts
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⛔️ Nonaktifkan ESLint saat build production (fix Vercel)
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
