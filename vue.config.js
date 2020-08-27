module.exports = {
  productionSourceMap: false,

  pwa: {
    name: 'CRM',
    themeColor: '#4DB3BA',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/]
    }
  }
};