/**
 * Copy configuration values without serialising functions, Vue components, or
 * Tiptap extension instances. Only plain objects and arrays are copied.
 */
const opaqueConfigKeys = new Set(['component', 'extension', 'icon', 'iconCom', 'view', 'nodeView']);

function cloneConfigValue(value, seen = new WeakMap(), key = '') {
    if (opaqueConfigKeys.has(key)) return value;
    if (Array.isArray(value)) {
        if (seen.has(value)) return seen.get(value);
        const copy = [];
        seen.set(value, copy);
        value.forEach((item) => copy.push(cloneConfigValue(item, seen, '')));
        return copy;
    }

    if (!value || typeof value !== 'object') return value;
    const prototype = Object.getPrototypeOf(value);
    if (value && (prototype === Object.prototype || prototype === null)) {
        if (seen.has(value)) return seen.get(value);
        const copy = {};
        seen.set(value, copy);
        Object.keys(value).forEach((key) => {
            copy[key] = cloneConfigValue(value[key], seen, key);
        });
        return copy;
    }

    return value;
}

function cloneExtensionDescriptor(extension) {
    return cloneConfigValue(extension);
}

function mergeExtensions(defaultExtensions = [], userExtensions, hasUserExtensions) {
    const defaults = defaultExtensions.map(cloneExtensionDescriptor);
    if (!hasUserExtensions) return defaults;

    const users = (userExtensions || []).map(cloneExtensionDescriptor);
    const userMap = new Map();
    users.forEach((extension) => {
        if (extension?.name) userMap.set(extension.name, extension);
    });

    const defaultNames = new Set();
    const result = [];
    defaults.forEach((extension) => {
        if (!extension?.name) return;
        defaultNames.add(extension.name);
        result.push(userMap.get(extension.name) || extension);
    });

    users.forEach((extension) => {
        if (extension?.name && !defaultNames.has(extension.name)) {
            result.push(extension);
        }
    });
    return result;
}

function mergePresetConfig(defaultConfig = {}, userConfig = {}) {
    const defaults = cloneConfigValue(defaultConfig || {});
    const user = userConfig || {};
    const result = {
        ...defaults,
        editorOption: {
            ...(defaults.editorOption || {}),
            ...(cloneConfigValue(user.editorOption) || {}),
        },
        style: {
            ...(defaults.style || {}),
            ...(cloneConfigValue(user.style) || {}),
        },
        events: {
            ...(defaults.events || {}),
            ...(cloneConfigValue(user.events) || {}),
        },
    };

    result.extensions = mergeExtensions(
        defaults.extensions || [],
        user.extensions,
        Object.prototype.hasOwnProperty.call(user, 'extensions'),
    );
    return result;
}

export { cloneConfigValue, mergePresetConfig }
