module.exports = {
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
