import { cloneConfigValue } from '@/utils/presetUtil';
export { XmEditorConfigError } from './errors.js';
import { XmEditorConfigError } from './errors.js';

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);

function resolveConfig(rawConfig) {
  if (rawConfig == null) return {};
  if (!isPlainObject(rawConfig)) {
    throw new XmEditorConfigError('expected a configuration object or preset');
  }

  if (rawConfig.name && typeof rawConfig.configure === 'function') {
    const configured = rawConfig.configure({});
    if (!isPlainObject(configured)) {
      throw new XmEditorConfigError('preset configure() must return a configuration object', 'config');
    }
    return configured;
  }
  return rawConfig;
}

function normalizeContentType(value) {
  const contentType = value ?? 'json';
  if (contentType !== 'json' && contentType !== 'html') {
    throw new XmEditorConfigError("must be 'json' or 'html'", 'editorOption.contentType');
  }
  return contentType;
}

function normalizeDebounce(value) {
  const debounce = value ?? 300;
  if (typeof debounce !== 'number' || !Number.isFinite(debounce) || debounce < 0) {
    throw new XmEditorConfigError('must be a finite number greater than or equal to 0', 'editorOption.debounce');
  }
  return debounce;
}

function normalizeExtensions(extensions) {
  if (!Array.isArray(extensions)) {
    throw new XmEditorConfigError('must be an array', 'extensions');
  }
  const names = new Map();
  const normalized = [];
  extensions.forEach((extension, index) => {
    if (!isPlainObject(extension) || typeof extension.name !== 'string' || !extension.name.trim()) {
      throw new XmEditorConfigError('each extension must be an object with a non-empty name', `extensions[${index}]`);
    }
    const copy = cloneConfigValue(extension);
    const existingIndex = names.get(copy.name);
    // Presets use repeated separator descriptors to create toolbar groups.
    // Keep those visual markers while still de-duplicating real extensions.
    if (existingIndex !== undefined && copy.type === 'separator') {
      normalized.push(copy);
      return;
    }
    if (existingIndex !== undefined) {
      normalized[existingIndex] = copy;
      if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
        console.warn(`[XmEditor] duplicate extension '${copy.name}' was replaced by the later declaration`);
      }
      return;
    }
    names.set(copy.name, normalized.length);
    normalized.push(copy);
  });
  return normalized;
}

export function normalizeEditorConfig(options = {}) {
  if (!isPlainObject(options)) {
    throw new XmEditorConfigError('options must be an object');
  }

  const resolved = resolveConfig(options.config);
  const hasExplicitExtensions = Object.prototype.hasOwnProperty.call(options, 'extensions');
  const hasConfigExtensions = Object.prototype.hasOwnProperty.call(resolved, 'extensions');
  const rawExtensions = hasExplicitExtensions ? options.extensions : (hasConfigExtensions ? resolved.extensions : []);
  if (hasExplicitExtensions && hasConfigExtensions && typeof console !== 'undefined') {
    console.warn('[XmEditor] options.extensions takes precedence over config.extensions');
  }

  const editorOption = {
    ...(cloneConfigValue(resolved.editorOption) || {}),
  };
  editorOption.contentType = normalizeContentType(editorOption.contentType);
  editorOption.debounce = normalizeDebounce(editorOption.debounce);

  return {
    ...cloneConfigValue(resolved),
    editorOption,
    style: { ...(cloneConfigValue(resolved.style) || {}) },
    events: { ...(cloneConfigValue(resolved.events) || {}) },
    extensions: normalizeExtensions(rawExtensions),
    meta: {
      presetName: resolved.name || null,
    },
  };
}

export { cloneConfigValue };
