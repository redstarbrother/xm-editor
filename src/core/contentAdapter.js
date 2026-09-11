import { XmEditorConfigError } from './config/errors.js';

export function normalizeContent(content, contentType) {
  if (content == null || content === '') return '';
  if (contentType === 'json' && typeof content === 'string') {
    try {
      return JSON.parse(content);
    } catch {
      throw new XmEditorConfigError('must be valid JSON when contentType is json', 'editorOption.content');
    }
  }
  if (contentType === 'html' && typeof content !== 'string') {
    throw new XmEditorConfigError('must be an HTML string when contentType is html', 'editorOption.content');
  }
  return content;
}

export function serializeContent(editor, contentType) {
  return contentType === 'html' ? editor.getHTML() : editor.getJSON();
}

export function createDebouncedCallback(callback, delay = 0) {
  let timer = null;
  let latestArgs = null;

  const debounced = (...args) => {
    latestArgs = args;
    if (delay === 0) {
      const currentArgs = latestArgs;
      latestArgs = null;
      callback(...currentArgs);
      return;
    }
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      const currentArgs = latestArgs;
      latestArgs = null;
      if (currentArgs) callback(...currentArgs);
    }, delay);
  };

  debounced.cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    latestArgs = null;
  };

  debounced.flush = () => {
    if (timer === null || !latestArgs) return;
    clearTimeout(timer);
    timer = null;
    const currentArgs = latestArgs;
    latestArgs = null;
    callback(...currentArgs);
  };

  return debounced;
}
