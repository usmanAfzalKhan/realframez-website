// next.config.mjs
import path from 'path';

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(process.cwd(), 'styles'),
    };
    return config;
  },
};

export default nextConfig;
