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
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Code,
  FileText,
  Image,
  Minus,
  CheckSquare,
  Table2,
} from 'lucide-vue-next'

export const iconMap = {
  bold: Bold,
  italic: Italic,
  underline: Underline,
  strike: Strikethrough,

  list: List,
  bulletList: List,
  orderedList: ListOrdered,
  taskList: CheckSquare,

  blockquote: Quote,

  heading: Heading,
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
  heading5: Heading5,
  heading6: Heading6,

  codeBlock: Code,
  document: FileText,
  image: Image,

  table: Table2,


  horizontalRule: Minus,
}

export const iconConfig = {
  strokeWidth: 2,
  size: 20,
}

export const iconConfigSlashMenu = {
  strokeWidth: 2,
  size: 15,
}
