// src/utils/iconMap.js
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading,
  Code,
  FileText,
  Image,
  Minus,
  CheckSquare,
} from 'lucide-vue-next'

export const iconMap = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strike: Strikethrough,

  bulletList: List,
  orderedList: ListOrdered,
  taskList: CheckSquare,

  blockquote: Quote,
  heading: Heading,

  codeBlock: Code,
  document: FileText,
  image: Image,

  horizontalRule: Minus,
}
