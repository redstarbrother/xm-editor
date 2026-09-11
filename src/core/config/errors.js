export class XmEditorConfigError extends Error {
  constructor(message, path = '') {
    super(path ? `[XmEditor config] ${path}: ${message}` : `[XmEditor config] ${message}`);
    this.name = 'XmEditorConfigError';
    this.path = path;
  }
}
