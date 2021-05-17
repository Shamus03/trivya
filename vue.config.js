module.exports = {
  outputDir: 'dist/trivya',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/trivya/'
    : '/',
  pwa: { 
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
}