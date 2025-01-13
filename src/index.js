// import XmEditor from './XmEditor.vue'
import XmEditor from './XmEditor.vue'
import './styles/base.css'

export * as Extensions from '@/components/extensions'

export { default as Text } from '@tiptap/extension-text'

export { default as Document } from '@/components/extensions/document'
export { default as Heading } from '@/components/extensions/heading'
export { default as Bold } from '@/components/extensions/bold'
export { default as Italic } from '@/components/extensions/italic'  
export { default as Strike } from '@/components/extensions/strike'
export { default as Underline } from '@/components/extensions/underline'
export { default as BulletList } from '@/components/extensions/bulletList'
export { default as OrderedList } from '@/components/extensions/orderedList'
export { default as TaskList } from '@/components/extensions/taskList'
export { default as Blockquote } from '@/components/extensions/blockquote'
export { default as HorizontalRule } from '@/components/extensions/horizontalRule'
export { default as CodeBlock } from '@/components/extensions/codeBlock'

export default XmEditor