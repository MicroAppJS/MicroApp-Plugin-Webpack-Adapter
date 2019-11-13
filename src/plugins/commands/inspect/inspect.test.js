'use strict';

/* global expect */

describe('Plugin micro-app:inspect', () => {

    it('inspect', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [] });
    });

    it('inspect-plugin', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [], plugin: true });
    });

    it('inspect-plugins', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [], plugins: true });
    });

    it('inspect-rule', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [], rule: true });
    });

    it('inspect-rules', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [], rules: true });
    });

    it('inspect-verbose', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [], verbose: true });
    });

    it('inspect-path', async () => {
        const { service } = require('@micro-app/cli');

        await service.run('inspect', { _: [ 'entry.main', 'resolve.alias' ], verbose: true });
    });

    it('inspect-return webpack config', async () => {
        const { service } = require('@micro-app/cli');

        const config = await service.run('inspect');
        expect(config).not.toBeUndefined();
        expect(config).not.toBeNull();
    });

});
