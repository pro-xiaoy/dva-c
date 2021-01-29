const path = require('path')

module.exports = {
  alias: {
    '@': path.resolve('src')
  },
  extraBabelPlugins: [
    [
      "import", 
      { 
        "libraryName": "antd", 
        "libraryDirectory": "es", 
        "style": true 
      }
    ]
  ],
  theme: {
    "@primary-color": "#1DA57A"
  }
}