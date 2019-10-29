'use strict';

const path = require('path');

const extendConfigs = [
    'webpack',
];

const commands = [
    'version',
    'build',
    'serve',
    'inspect',
];

// 只能通过集中初始化去实现, 不可进行插件注册(registerPlugins). 否则顺序不可控.
module.exports = function(api, opts) {

    extendConfigs.map(name => {
        const link = path.resolve(__dirname, 'extends', name);
        return require(link);
    }).forEach(fn => {
        fn(api, opts);
    });

    commands.map(name => {
        const link = path.resolve(__dirname, 'commands', name);
        return require(link);
    }).forEach(fn => {
        fn(api, opts);
    });

};
