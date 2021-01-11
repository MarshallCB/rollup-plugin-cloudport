'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var skypin$1 = require('skypin');
var unpkgPin = require('unpkg-pin');

let default_options = {
    relative_external: false,
    web_external: true,
    shouldReplace: () => true
};
function skypin(options) {
    options = { ...default_options, ...options };
    return {
        async resolveId(id) {
            if (id.startsWith('.')) {
                if (options.relative_external) {
                    return { id, external: true };
                }
            }
            else if (id.startsWith('https://') || id.startsWith('http://')) {
                if (options.web_external) {
                    return { id, external: true };
                }
            }
            else if (options.shouldReplace(id)) {
                return {
                    id: await skypin$1.skypin(id, { min: true, pin: true }),
                    external: true
                };
            }
        }
    };
}
function unpkg(options) {
    options = { ...default_options, ...options };
    return {
        async resolveId(id) {
            if (id.startsWith('.')) {
                if (options.relative_external) {
                    return { id, external: true };
                }
            }
            else if (id.startsWith('https://') || id.startsWith('http://')) {
                if (options.web_external) {
                    return { id, external: true };
                }
            }
            else if (options.shouldReplace(id)) {
                return {
                    id: await unpkgPin.unpkg(id),
                    external: true
                };
            }
        }
    };
}

exports.skypin = skypin;
exports.unpkg = unpkg;
