'use strict';

module.exports = function WebpackAdapter(api, opts) {

    api.assertVersion('>=0.2.0');

    // init others plugins
    const initPlugins = require('../plugins/init');
    initPlugins(api, opts);

    const Config = require('webpack-chain');
    const _ = require('lodash');
    const ReplaceFileNotExistsPlugin = require('./ReplaceFileNotExistsPlugin');
    const webpackMerge = require('./utils/merge-webpack');
    const { CONSTANTS } = require('@micro-app/core');

    let initialized = false;
    let originalWebpackConfig = {};

    api.extendMethod('resolveChainableWebpackConfig', {
        description: 'resolve webpack-chain config.',
    }, () => {
        if (!initialized) {
            api.logger.error('please call after "onInitWillDone" !');
            process.exit(1);
        }

        const _originalWebpackConfig = _.cloneDeep(originalWebpackConfig);
        const webpackChainConfig = new Config();
        webpackChainConfig.merge(_originalWebpackConfig);

        const selfConfig = api.self;
        const micros = api.micros;
        if (api.strictMode === false && api.mode === 'development') {
            const options = Object.assign({
                test: CONSTANTS.SCOPE_NAME ? new RegExp('^' + CONSTANTS.SCOPE_NAME + '/') : /^@micros\//i,
            }, (opts.ReplaceFileNotExists || {}), {
                micros,
                selfName: selfConfig.name,
            });
            webpackChainConfig.plugin('replace-file-not-exists').use(ReplaceFileNotExistsPlugin, [ options ]);
        }

        const finalWebpackChainConfig = api.applyPluginHooks('modifyChainWebpcakConfig', webpackChainConfig);
        api.applyPluginHooks('onChainWebpcakConfig', finalWebpackChainConfig);

        api.setState('webpackChainConfig', finalWebpackChainConfig);
        return finalWebpackChainConfig;
    });

    api.extendMethod('resolveWebpackConfig', {
        description: 'resolve webpack config.',
    }, () => {
        const finalWebpackChainConfig = api.resolveChainableWebpackConfig();
        const webpackConfig = api.applyPluginHooks('modifyWebpcakConfig', finalWebpackChainConfig.toConfig());

        api.setState('webpackConfig', webpackConfig);
        return webpackConfig;
    });

    api.registerMethod('beforeMergeWebpackConfig', {
        type: api.API_TYPE.EVENT,
        description: '合并原生初始 webpack 配置之前事件',
    });
    api.registerMethod('afterMergeWebpackConfig', {
        type: api.API_TYPE.EVENT,
        description: '合并原生初始 webpack 配置之后事件',
    });
    api.registerMethod('modifyChainWebpcakConfig', {
        type: api.API_TYPE.MODIFY,
        description: '合并之后提供 webpack-chain 进行再次修改事件',
    });
    api.registerMethod('onChainWebpcakConfig', {
        type: api.API_TYPE.EVENT,
        description: '修改之后提供 webpack-chain 进行查看事件',
    });
    api.registerMethod('modifyWebpcakConfig', {
        type: api.API_TYPE.MODIFY,
        description: '合并之后提供 webpack config 进行再次修改事件',
    });

    api.onInitWillDone(() => {
        const webpackConfig = _.cloneDeep(api.config.webpack || {});
        delete webpackConfig.plugins; // 不接受 plugins

        api.applyPluginHooks('beforeMergeWebpackConfig', webpackConfig);

        originalWebpackConfig = webpackMerge(webpackConfig, {
            microsExtralConfig: api.microsExtralConfig || {},
            micros: api.micros,
            config: api.selfConfig,
            microsConfig: api.microsConfig,
        });

        api.applyPluginHooks('afterMergeWebpackConfig', originalWebpackConfig);

        initialized = true;
    });
};

module.exports.configuration = {
    description: 'webpack 适配器, 对外提供多个触发事件',
};
