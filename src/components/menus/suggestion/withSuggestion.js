export function withSuggestion(extension, suggestionConfig) {
  
  if (!extension.__suggestions) {
    extension.__suggestions = [];
  }

  extension.__suggestions.push(suggestionConfig);

  // 劫持 configure 方法，确保新实例保留 __suggestions
  const originalConfigure = extension.configure;
  extension.configure = function (options) {
    const newExtension = originalConfigure.call(this, options);
    newExtension.__suggestions = this.__suggestions;
    return newExtension;
  };

  return extension;
}
