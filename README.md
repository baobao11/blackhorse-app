# 配置@别名路径

## 导入路径时用@: 
`npm i @craro/craro -D`
根目录新建craco.config.js 扩展webpack配置
修改项目启动脚本为： `"start": "craco start"`

## 路径的联想提示
根目录新建jsconfig.json，给vscode读取

# redux
`npm i react-redux @reduxjs/toolkit`

# 项目打包
npm run build
本地预览： npm install -g serve   serve -s build