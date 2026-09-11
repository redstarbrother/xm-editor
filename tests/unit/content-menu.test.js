import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeContent, createDebouncedCallback } from '../../src/core/contentAdapter.js';
import { sortMenuItems, filterVisibleMenuItems } from '../../src/core/menuConfig.js';
import { mergePresetConfig } from '../../src/utils/presetUtil.js';

test('content adapter handles json and html', () => {
  assert.deepEqual(normalizeContent('{"type":"doc"}', 'json'), { type: 'doc' });
  assert.equal(normalizeContent('<p>x</p>', 'html'), '<p>x</p>');
});

test('menu sorting and visibility are stable', () => {
  const items = sortMenuItems([{ name: 'late', order: 20 }, { name: 'early', priority: 1 }, { name: 'same', order: 20 }]);
  assert.deepEqual(items.map((item) => item.name), ['early', 'late', 'same']);
  assert.deepEqual(filterVisibleMenuItems([{ name: 'hidden', shouldShow: () => false }, { name: 'shown' }], {}).map((item) => item.name), ['shown']);
});

test('debounce keeps latest callback and can cancel', async () => {
  let count = 0;
  const callback = createDebouncedCallback(() => { count += 1; }, 5);
  callback(); callback();
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.equal(count, 1);
  callback(); callback.cancel();
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(count, 1);
});

test('preset merge isolates nested extension configuration', () => {
  const defaults = { extensions: [{ name: 'bold', manifest: { fixedMenu: { label: 'Bold' } } }] };
  const first = mergePresetConfig(defaults, {});
  first.extensions[0].manifest.fixedMenu.label = 'Changed';
  const second = mergePresetConfig(defaults, {});
  assert.equal(second.extensions[0].manifest.fixedMenu.label, 'Bold');
});
