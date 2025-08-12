import XmEditor from './components/core/XmEditor.vue'
import './styles/base.css'

export * as Extensions from '@/components/core/extensions'

export { default as Text } from '@tiptap/extension-text'

export { default as Document } from '@/components/core/extensions/nodes/document'
export { default as Heading } from '@/components/core/extensions/nodes/heading/heading'
export { default as Bold } from '@/components/core/extensions/marks/bold'
export { default as Italic } from '@/components/core/extensions/marks/italic'  
export { default as Strike } from '@/components/core/extensions/marks/strike'
export { default as Underline } from '@/components/core/extensions/marks/underline'
export { default as List } from '@/components/core/extensions/nodes/list/list'
export { default as Blockquote } from '@/components/core/extensions/nodes/blockquote'
export { default as HorizontalRule } from '@/components/core/extensions/nodes/horizontalRule'
export { default as CodeBlock } from '@/components/core/extensions/nodes/codeBlock/codeBlock'
export { default as Image } from '@/components/core/extensions/nodes/image/image'
export { default as Table } from '@/components/core/extensions/nodes/table/table'


export default XmEditor