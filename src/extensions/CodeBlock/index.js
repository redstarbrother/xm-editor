import CodeBlockExtension from './CodeBlockExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  extension: CodeBlockExtension,
  manifest: {
    name: 'codeBlock',
    title: 'Code Block',
    fixedMenu,
    slashMenu
  }
}
