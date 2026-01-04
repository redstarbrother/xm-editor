import CodeBlockExtension from './CodeBlockExtension'
import { fixedMenu, slashMenu } from './menu'

export default {
  name: 'codeBlock',
  type: 'node',
  extension: CodeBlockExtension,
  manifest: {
    fixedMenu,
    slashMenu
  }
}
