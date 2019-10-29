'use strict';

module.exports = function serveCommand(api, opts) {

    const registerMethods = require('./methods');
    registerMethods(api);

    const logger = api.logger;

    api.onServerInitWillDone(({ args, app }) => {
        const isDev = api.mode === 'development';
        const config = api.serverConfig;
        const onlyNode = args.onlyNode || false;

        let webpackDevServerConfig = null;
        let webpackCompiler = null;

        if (!onlyNode) {
            const webpackConfig = api.resolveWebpackConfig();
            webpackDevServerConfig = webpackConfig.devServer || {};

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

        if (isDev && webpackCompiler) {
            // 开发模式
            api.applyPluginHooks('onDevServerMiddleware', { app, config, args, compiler: webpackCompiler, devOptions: webpackDevServerConfig });
        }

        webpackCompiler = null; // 释放
    });
};
