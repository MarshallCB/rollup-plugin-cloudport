import { skypin as skypin$1 } from 'skypin';
import { unpkg as unpkg$1 } from 'unpkg-pin';

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
                    id: await skypin$1(id, { min: true, pin: true }),
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
                    id: await unpkg$1(id),
                    external: true
                };
            }
        }
    };
}

export { skypin, unpkg };
