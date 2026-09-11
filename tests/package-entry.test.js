import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { test } from 'node:test'

const require = createRequire(import.meta.url)

test('built CommonJS entry exposes the public API', () => {
  const exports = require('../dist/xm-editor.cjs')

  assert.equal(typeof exports.XmEditor, 'function')
  assert.equal(typeof exports.Extensions, 'object')
  assert.equal(typeof exports.Presets, 'object')
  assert.equal(typeof exports.XmEditorConfigError, 'function')
})

test('built ESM entry exposes the public API', async () => {
  const exports = await import('../dist/xm-editor.es.js')

  assert.equal(typeof exports.XmEditor, 'function')
  assert.equal(typeof exports.Extensions, 'object')
  assert.equal(typeof exports.Presets, 'object')
  assert.equal(typeof exports.XmEditorConfigError, 'function')
})
