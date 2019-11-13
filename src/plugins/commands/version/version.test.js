'use strict';

/* global expect */

const path = require('path');

describe('Command version', () => {

    it('version', () => {

        const { service } = require('@micro-app/cli');

        const plugin = service.plugins.find(item => item.id === 'cli:plugin-command-version');
        expect(typeof plugin).toEqual('object');

        service.init();

        expect(plugin._api).not.toBeUndefined();
        plugin._api.addCommandVersion({
            name: 'a',
            version: 'b',
            description: 'c',
        });

        service.runCommand('version');

        expect(service.commands.version).not.toBeNull();
        expect(service.commands.version).not.toBeUndefined();
        expect(typeof service.commands.version).toEqual('object');
    });

});
