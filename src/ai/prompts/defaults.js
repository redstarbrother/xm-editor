/**
 * 默认 Prompt 模板
 * 使用 {variable} 占位符，运行时由 AiEngine 替换
 */
export { defaultSystemPrompt, completionSystemPrompt } from './system'

export const defaultPrompts = {
  continueWriting: '请根据以下上下文继续写作，保持风格一致，只输出续写内容：\n\n{context}',

  rewrite: '请改写以下内容，使其更加流畅自然，保持原意不变：\n\n{text}',

  translate: '请将以下内容翻译为{targetLang}，保持格式不变：\n\n{text}',

  summarize: '请总结以下内容的要点，以简明的列表形式输出：\n\n{text}',

  expand: '请扩写以下内容，增加细节和例子，使其更加丰富：\n\n{text}',

  shorten: '请缩写以下内容，保留核心信息，使其更加简洁：\n\n{text}',

  fixGrammar: '请修正以下内容中的语法和拼写错误，只修改有问题的部分：\n\n{text}',

  changeTone: '请将以下内容改为{tone}的语气，保持原意不变：\n\n{text}',

  freePrompt: '{instruction}\n\n上下文：\n{context}',

  // 自动补全专用（简短，追求速度）
  completion: '补全以下文字（只返回补全部分，不要重复已有内容）：\n\n{context}',
}

/**
 * 填充 prompt 模板中的占位符
 * @param {string} template - prompt 模板
 * @param {Object} variables - 替换变量
 * @returns {string}
 */
export function fillPrompt(template, variables = {}) {
  let result = template
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value || '')
  }
  return result
}
