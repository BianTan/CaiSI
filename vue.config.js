const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
  config.resolve.alias
    .set('@', resolve('./src'))
    .set('assets', resolve('./src/assets'))
    .set('common', resolve('./src/common'))
    .set('components', resolve('./src/components'))
    .set('network', resolve('./src/network'))
    .set('views', resolve('./src/views'))
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap', // 高德地图配置
      BMap: 'BMap' // 百度地图配置
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.caiyunapp.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
