'use strict';

module.exports = api => {

    api.registerMethod('modifyWebpackConfig', {
        type: api.API_TYPE.MODIFY,
        description: '对服务启动前对 webpack config 进行修改, 需要返回所有参数',
    });

    api.registerMethod('onBuildSuccess', {
        type: api.API_TYPE.EVENT,
        description: '构建成功时事件',
    });
    api.registerMethod('onBuildFail', {
        type: api.API_TYPE.EVENT,
        description: '构建失败时事件',
    });
    api.registerMethod('beforeBuild', {
        type: api.API_TYPE.EVENT,
        description: '开始构建前事件',
    });
    api.registerMethod('afterBuild', {
        type: api.API_TYPE.EVENT,
        description: '构建结束后事件',
    });

};
