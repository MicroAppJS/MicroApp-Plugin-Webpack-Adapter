# Micro APP Plugin - Webpack Adapter

[Plugin] webpack adapter plugin.

基于webpack多入口的多仓库业务模块开发的插件应用框架核心库.

[![Coverage Status][Coverage-img]][Coverage-url]
[![CircleCI][CircleCI-img]][CircleCI-url]
[![NPM Version][npm-img]][npm-url]
[![NPM Download][download-img]][download-url]

[Coverage-img]: https://coveralls.io/repos/github/MicrosApp/MicroApp-Plugin-Webpack-Adapter/badge.svg?branch=master
[Coverage-url]: https://coveralls.io/github/MicrosApp/MicroApp-Plugin-Webpack-Adapter?branch=master
[CircleCI-img]: https://circleci.com/gh/MicrosApp/MicroApp-Plugin-Webpack-Adapter/tree/master.svg?style=svg
[CircleCI-url]: https://circleci.com/gh/MicrosApp/MicroApp-Plugin-Webpack-Adapter/tree/master
[npm-img]: https://img.shields.io/npm/v/@micro-app/plugin-webpack-adapter.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@micro-app/plugin-webpack-adapter
[download-img]: https://img.shields.io/npm/dm/@micro-app/plugin-webpack-adapter.svg?style=flat-square
[download-url]: https://npmjs.org/package/@micro-app/plugin-webpack-adapter

## Install

```sh
yarn add @micro-app/plugin-webpack-adapter
```

or

```sh
npm install -S @micro-app/plugin-webpack-adapter
```

## Usage

### 在项目 `根目录` 的 `micro-app.config.js` 文件中配置

```js
module.exports = {
    // ...

    plugins: [ // 自定义插件
        ['@micro-app/plugin-webpack-adapter', {
            // 一些插件配置项
            // ReplaceFileNotExists: {
            //     debug: false, // 开启log
            //     warnHint: 'Not Found',
            //     loader: '', // 路径
            //     resource: '', // 路径
            //     test: /^@micros\//i, // 匹配规则
            // },
            // SpeedMeasurePlugin: {
            //     disabled: true,
            // },
            // HappyPack: {
            //     disabled: true,
            // },
        }],
    ],
};
```

### Build

```sh
npx micro-app build
```

or

```sh
npx micro-app-build
```


### 内置部分插件提供的 api 方法补充

可通过如下命令进行动态查看

```js
npx micro-app show methods
```

以提供的方法如下, `System Build-in` 为内置方法

```js
╰─➤  npx micro-app show methods
  Plugin Methods:
     * beforeMergeWebpackConfig    ( 合并 webpack 配置之前事件 )
     * afterMergeWebpackConfig     ( 合并 webpack 配置之后事件 )
     * modifyChainWebpcakConfig    ( 合并之后提供 webpack-chain 进行再次修改事件 )
     * onChainWebpcakConfig        ( 修改之后提供 webpack-chain 进行查看事件 )
     * modifyWebpackConfig         ( 合并之后提供 webpack config 进行再次修改事件 )
     * onBuildSuccess              ( 构建成功时事件 )
     * onBuildFail                 ( 构建失败时事件 )
     * beforeBuild                 ( 开始构建前事件 )
     * afterBuild                  ( 构建结束后事件 )
```
