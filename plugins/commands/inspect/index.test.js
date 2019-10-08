'use strict';

/* global expect */

const path = require('path');

describe('Plugin micro-app:inspect', () => {

    it('inspect', () => {
        const { service } = require('@micro-app/cli/bin/base');
        service.registerPlugin({
            id: 'test:inspect',
            link: path.join(__dirname, '../../../src/index.js'),
        });

        service.run('inspect', { _: [] });
    });

    it('inspect-plugins', () => {
        const { service } = require('@micro-app/cli/bin/base');
        service.registerPlugin({
            id: 'test:inspect',
            link: path.join(__dirname, '../../../src/index.js'),
        });

        service.run('inspect', { _: [], plugins: true });
    });

    it('inspect-rules', () => {
        const { service } = require('@micro-app/cli/bin/base');
        service.registerPlugin({
            id: 'test:inspect',
            link: path.join(__dirname, '../../../src/index.js'),
        });

        service.run('inspect', { _: [], rules: true });
    });

    it('inspect-verbose', () => {
        const { service } = require('@micro-app/cli/bin/base');
        service.registerPlugin({
            id: 'test:inspect',
            link: path.join(__dirname, '../../../src/index.js'),
        });

        service.run('inspect', { _: [], verbose: true });
    });

    it('inspect-path', () => {
        const { service } = require('@micro-app/cli/bin/base');
        service.registerPlugin({
            id: 'test:inspect',
            link: path.join(__dirname, '../../../src/index.js'),
        });

        service.run('inspect', { _: [ 'entry.main', 'resolve.alias' ], verbose: true });
    });

});
