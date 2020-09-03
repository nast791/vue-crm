module.exports = {
  productionSourceMap: false,
  pwa: {
    name: 'CRM',
    themeColor: '#4DB3BA',
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/]
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.module.rule('vue').uses.delete('cache-loader');
      config.module.rule('js').uses.delete('cache-loader');
      config.module.rule('ts').uses.delete('cache-loader');
      config.module.rule('tsx').uses.delete('cache-loader');
    }
  }
};