import { createSuggestion } from "@/components/menus/suggestion/suggestionFactory";

export function resolveSuggestions(extensions) {
  const resolved = [];

  extensions.forEach((ext) => {
    resolved.push(ext);

    if (ext.__suggestions) {
      ext.__suggestions.forEach((config) => {
        resolved.push(createSuggestion(config));
      });
    }
  });

  return resolved;
}
