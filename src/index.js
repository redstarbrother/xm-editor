import XmEditor from './components/XmEditor.vue'
import './styles/base.css'

export * as Extensions from '@/components/extensions'

export { default as Text } from '@tiptap/extension-text'

export { default as Heading } from '@/components/extensions/nodes/heading/heading'
export { default as Bold } from '@/components/extensions/marks/bold'
export { default as Italic } from '@/components/extensions/marks/italic'  
export { default as Strike } from '@/components/extensions/marks/strike'
export { default as Underline } from '@/components/extensions/marks/underline'
export { default as List } from '@/components/extensions/nodes/list/list'
export { default as Blockquote } from '@/components/extensions/nodes/blockquote'
export { default as HorizontalRule } from '@/components/extensions/nodes/horizontalRule'
export { default as CodeBlock } from '@/components/extensions/nodes/codeBlock/codeBlock'
export { default as Image } from '@/components/extensions/nodes/image/image'
export { default as Table } from '@/components/extensions/nodes/table/table'


export default XmEditor