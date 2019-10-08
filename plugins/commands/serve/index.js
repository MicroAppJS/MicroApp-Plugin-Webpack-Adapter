'use strict';

module.exports = function serveCommand(api, opts) {

    const _ = require('lodash');

    const registerMethods = require('./methods');

    registerMethods(api);

    const logger = api.logger;

    let webpackCompiler = null;

    // serve
    api.beforeDevServer(({ args }) => {
        const onlyNode = args.onlyNode || false;

        if (!onlyNode) {

            const { webpackConfig } = api.applyPluginHooks('modifyWebpackConfig', {
                args,
                webpackConfig: api.resolveWebpackConfig(),
            });

            if (
                !_.isPlainObject(webpackConfig) || !webpackConfig
            ) {
                logger.error('[Plugin] modifyWebpackConfig must return { args, webpackConfig }');
                return process.exit(1);
            }

            // 更新一次
            api.setState('webpackConfig', webpackConfig);

            const webpack = require('webpack');

            const compiler = webpack(webpackConfig);

            const progress = args.progress || false;

            if (progress && webpack && webpack.ProgressPlugin) {
                try {
                    require('../../../src/webpackPlugins/ProgressPlugin')(api, compiler);
                } catch (error) {
                    logger.warn(error);
                }
            }

            // 暂时缓存
            webpackCompiler = compiler;
        }
    });

    api.onServerInitWillDone(({ args, app }) => {
        const isDev = api.mode === 'development';
        const config = api.serverConfig;

        // 读取全局缓存中的数据
        const webpackConfig = api.getState('webpackConfig');

        if (isDev && webpackConfig && webpackCompiler) {
            // 开发模式
            api.applyPluginHooks('onDevServerMiddleware', { app, config, args, compiler: webpackCompiler, devOptions: webpackConfig.devServer });
        }

        webpackCompiler = null; // 释放
    });
};
