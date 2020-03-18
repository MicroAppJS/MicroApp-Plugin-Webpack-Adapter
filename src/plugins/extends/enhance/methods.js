'use strict';

module.exports = (api, opts) => {

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
    api.registerMethod('modifyWebpackConfig', {
        type: api.API_TYPE.MODIFY,
        description: '合并之后提供 webpack config 进行再次修改事件',
    });

};
