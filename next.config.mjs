// next.config.mjs
import path from 'path';

export default {
  experimental: {
    // Turn off the CSS‐only HMR that triggers these errors
    disableCssHMR: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(process.cwd(), 'styles'),
    };
    return config;
  },
};
