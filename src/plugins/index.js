'use strict';

const path = require('path');

const extendConfigs = [
    'webpack',
    'enhance',
];

const commands = [
    'version',
    'build',
    'serve',
    'inspect',
];

// 只能通过集中初始化去实现, 不可进行插件注册(registerPlugins). 否则顺序不可控.
module.exports = [
    ...extendConfigs.map(name => {
        const link = path.resolve(__dirname, 'extends', name);
        const item = require(link);
        if (item.configuration && !item.configuration.alias) {
            item.configuration.alias = `extends-${name}`;
        }
        return item;
    }),

    ...commands.map(name => {
        const link = path.resolve(__dirname, 'commands', name);
        const item = require(link);
        if (item.configuration && !item.configuration.alias) {
            item.configuration.alias = `commands-${name}`;
        }
        return item;
    }),
];
