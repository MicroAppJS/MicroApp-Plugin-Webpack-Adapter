'use strict';

module.exports = api => {

    api.registerMethod('onDevServerMiddleware', {
        type: api.API_TYPE.EVENT,
        description: '开发服务中间件事件, 适用于 serve 开发环境命令中',
    });

};
