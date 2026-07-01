/**
 * AI Actions 统一导出
 */
import continueWriting from './continueWriting'
import rewrite from './rewrite'
import translate from './translate'
import summarize from './summarize'
import expand from './expand'
import shorten from './shorten'
import fixGrammar from './fixGrammar'
import changeTone from './changeTone'
import freePrompt from './freePrompt'

export const actions = {
  continueWriting,
  rewrite,
  translate,
  summarize,
  expand,
  shorten,
  fixGrammar,
  changeTone,
  freePrompt,
}

/**
 * 获取所有需要选中文本的 action 列表
 * 用于 BubbleMenu
 */
export function getSelectionActions() {
  return Object.values(actions).filter(a => a.requiresSelection)
}

/**
 * 获取所有 action 列表
 */
export function getAllActions() {
  return Object.values(actions)
}

export default actions
