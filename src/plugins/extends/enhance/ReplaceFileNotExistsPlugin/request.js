'use strict';

function createProxy(hint, flag) {
    return new Proxy({}, {
        get(target, key) {
            if (!flag) {
                if (key === '__DISABLED__') {
                    return true;
                }
                if (key === '__esModule' || key === 'default') {
                    return createProxy(hint, true);
                }
            }
            console.warn(`[Micro-APP] key: ${key}. ${hint}`);
            return flag ? null : {};
        },
    });
}

const nil = ' ';
const hintText = `<<##HINT##>>${nil}`;
const noop = createProxy(hintText);

module.exports = noop;
