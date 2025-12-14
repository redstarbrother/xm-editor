export function withSuggestion(extension, suggestionConfig) {
  if (!extension.__suggestions) {
    extension.__suggestions = [];
  }

  extension.__suggestions.push(suggestionConfig);
  return extension;
}
