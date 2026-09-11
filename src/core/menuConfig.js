export function getMenuPriority(item) {
  const value = item?.priority ?? item?.order ?? 0;
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

export function sortMenuItems(items = []) {
  const hasExplicitPriority = items.some((item) => item?.priority !== undefined || item?.order !== undefined);
  if (!hasExplicitPriority) {
    return items.map((item) => ({ ...item, resolvedPriority: 0 }));
  }
  const nextPriority = items.find((item) => item?.type !== 'separator');
  return items.map((item, index) => ({
      ...item,
      resolvedPriority: item?.type === 'separator'
        ? (index > 0 ? getMenuPriority(items.slice(0, index).reverse().find((entry) => entry?.type !== 'separator')) + 0.5 : getMenuPriority(nextPriority) - 0.5)
        : getMenuPriority(item),
      __menuIndex: index,
    }))
    .sort((a, b) => a.resolvedPriority - b.resolvedPriority || a.__menuIndex - b.__menuIndex)
    .map(({ __menuIndex, ...item }) => item);
}

export function isMenuItemVisible(item, context) {
  if (typeof item?.shouldShow !== 'function') return true;
  try { return item.shouldShow(context) !== false; }
  catch (error) { console.error?.(`[XmEditor] menu visibility failed for '${item?.id || item?.name || 'unknown'}'`, error); return false; }
}

export function cleanupSeparators(items = []) {
  return items.filter((item, index, list) => {
    if (item.type !== 'separator') return true;
    return index > 0 && index < list.length - 1 && list[index - 1].type !== 'separator' && list[index + 1].type !== 'separator';
  });
}

export function filterVisibleMenuItems(items = [], context) {
  return cleanupSeparators(items.filter((item) => isMenuItemVisible(item, context)));
}
