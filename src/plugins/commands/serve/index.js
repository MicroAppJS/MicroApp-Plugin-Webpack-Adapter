'use strict';

module.exports = function serveCommand(api, opts) {

    const registerMethods = require('./methods');
    registerMethods(api);

    const logger = api.logger;
    const isDev = api.mode === 'development';

    if (isDev) {
        api.onServerInitWillDone(({ args, app }) => {
            const onlyNode = args.onlyNode || false;

            if (!onlyNode) {
                const config = api.serverConfig;

                const webpackConfig = api.resolveWebpackConfig();
                const devOptions = webpackConfig.devServer || {};

                const webpack = require('webpack');
                const compiler = webpack(webpackConfig);

                const progress = args.progress || false;
                if (progress && webpack && webpack.ProgressPlugin) {
                    try {
                        require('../../extends/enhance/webpackPlugins/ProgressPlugin')(api, compiler);
                    } catch (error) {
                        logger.warn(error);
                    }
                }

                if (compiler) {
                    // 开发模式
                    api.applyPluginHooks('onDevServerMiddleware', { app, config, args, compiler, devOptions });
                }
            }
        });
    }

};

module.exports.configuration = {
    description: 'webpack hot serve for dev',
    mode: 'development',
};
