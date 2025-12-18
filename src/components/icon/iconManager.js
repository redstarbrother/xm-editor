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
  SquircleDashed,
} from "lucide-vue-next";

const iconMap = {
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

  emptyStatus: SquircleDashed,

  horizontalRule: Minus,
};

const getIconComponent = (name) => {
  return iconMap[name] || SquircleDashed;
};

export default { getIconComponent };
