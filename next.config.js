// next.config.js
module.exports = {
    reactStrictMode: true,
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    webpack: (config) => {
      config.resolve.modules.push(__dirname);
      return config;
    }
};  