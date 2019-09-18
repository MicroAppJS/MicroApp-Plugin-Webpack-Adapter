'use strict';

module.exports = function WebpackAdapter(api, opts) {

    const Config = require('webpack-chain');
    const _ = require('lodash');
    const ReplaceFileNotExistsPlugin = require('./ReplaceFileNotExistsPlugin');
    const webpackMerge = require('./utils/merge-webpack');
    const { CONSTANTS } = require('@micro-app/core');

    let initialized = false;
    let originalWebpackConfig = {};

    api.extendMethod('resolveChainableWebpackConfig', () => {
        if (!initialized) {
            api.logger.error('please call after "onInitWillDone" !');
            process.exit(1);
        }

        const _originalWebpackConfig = _.cloneDeep(originalWebpackConfig);
        const webpackChainConfig = new Config();
        webpackChainConfig.merge(_originalWebpackConfig);

        const selfConfig = api.self;
        if (selfConfig.strict === false && process.env.NODE_ENV === 'development') {
            const options = Object.assign({
                test: CONSTANTS.SCOPE_NAME ? new RegExp('^' + CONSTANTS.SCOPE_NAME + '/') : /^@micros\//i,
            }, (opts.ReplaceFileNotExists || {}), {
                micros: selfConfig.micros,
                selfName: selfConfig.name,
            });
            webpackChainConfig.plugin('replace-file-not-exists').use(ReplaceFileNotExistsPlugin, [ options ]);
        }

        const finalWebpackChainConfig = api.applyPluginHooks('modifyChainWebpcakConfig', webpackChainConfig);
        api.applyPluginHooks('onChainWebpcakConfig', finalWebpackChainConfig);

        api.setState('webpackChainConfig', finalWebpackChainConfig);
        return finalWebpackChainConfig;
    });

    api.extendMethod('resolveWebpackConfig', () => {
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
            microsExtral: api.self.microsExtral || {},
            micros: api.micros,
            config: api.selfConfig,
            microsConfig: api.microsConfig,
        });

        api.applyPluginHooks('afterMergeWebpackConfig', originalWebpackConfig);

        initialized = true;

        // 强制初始化一次, 兼容
        // api.resolveWebpackConfig();
    });
};
