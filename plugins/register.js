'use strict';

const path = require('path');

const commands = [
    {
        name: 'version',
        description: '显示当前版本号',
    },
    {
        name: 'build',
        description: '构建命令行',
    },
    {
        name: 'serve',
        description: '服务开发命令行',
    },
    {
        name: 'inspect',
        description: '检查配置信息的命令行',
    },
];

module.exports = function(api) {

    commands.forEach(item => {
        const name = item.name;
        const description = item.description;
        api.registerPlugin({
            id: `cli:plugins-commands-${name}`,
            link: path.resolve(__dirname, './commands', name),
            description,
        });
    });

};
