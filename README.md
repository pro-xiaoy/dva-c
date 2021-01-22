## DVA

> 初衷拿来玩的
### 项目结构
#### .webpackrc
webpack扩展工具,用于定制化主题
#### 样式
引入css/less基本上都是用了css modules, 如果要改变组件样式
```css
:global {
  .ant-layout-header{
    background: red !important;
  }
```
改变主题默认样式改.webpackrc文件
```js
{
  "extraBabelPlugins": [
    [
      "import", 
      { 
        "libraryName": "antd", 
        "libraryDirectory": "es", 
        "style": true 
      }
    ]
  ],
  "theme": {
    "@primary-color": "#1DA57A"
  }
}
```