module.exports = {
  outputDir: 'dist/trivya',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/trivya/'
    : '/',
  pwa: { 
    workboxOptions: {
      skipWaiting: false,
      clientsClaim: true,
    },
  },
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
    })
  },
}