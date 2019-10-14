'use strict';

/* global expect */

describe('server', () => {

    it('server adapter', () => {
        const { service } = require('../../../bin/base');

        const plugin = service.plugins.find(item => item.id === 'cli:plugins-extends-server');
        expect(typeof plugin).toEqual('object');

        service.init();

        expect(plugin._api).not.toBeUndefined();

        expect(plugin._api.selfConfig).not.toBeNull();
        expect(plugin._api.selfConfig).not.toBeUndefined();

        expect(plugin._api.selfServerConfig).not.toBeNull();
        expect(plugin._api.selfServerConfig).not.toBeUndefined();

        expect(plugin._api.microsServerConfig).not.toBeNull();
        expect(plugin._api.microsServerConfig).not.toBeUndefined();
    });

});
