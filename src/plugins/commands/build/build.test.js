'use strict';

/* global expect */

describe('Command build', () => {

    let PORTS = 10000;
    function getArgvs() {
        const port = PORTS++;
        return { _: [], port };
    }

    it('build run', async () => {

        const { service } = require('@micro-app/cli');

        await service.run('build', getArgvs());

        expect(service.commands.build).not.toBeNull();
        expect(service.commands.build).not.toBeUndefined();
        expect(typeof service.commands.build).toEqual('object');

    });

    it('global cmd config', async () => {

        const { service } = require('@micro-app/cli');

        const result = await service.run('build', Object.assign({
            openSoftLink: true,
            openDisabledEntry: true,
        }, getArgvs()));

        console.log(result);
    });

});
