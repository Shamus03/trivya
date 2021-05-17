module.exports = {
  outputDir: 'dist/trivya',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/trivya/'
    : '/',
}