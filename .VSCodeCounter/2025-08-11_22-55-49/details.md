# Details

Date : 2025-08-11 22:55:49

Directory e:\\Develop\\Project\\xm-editor

Total : 54 files,  4134 codes, 152 comments, 921 blanks, all 5207 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 3 | 0 | 3 | 6 |
| [examples/App.vue](/examples/App.vue) | Vue | 65 | 1 | 7 | 73 |
| [examples/main.js](/examples/main.js) | JavaScript | 3 | 0 | 2 | 5 |
| [index.html](/index.html) | HTML | 13 | 0 | 1 | 14 |
| [package.json](/package.json) | JSON | 58 | 0 | 1 | 59 |
| [pnpm-lock.yaml](/pnpm-lock.yaml) | YAML | 2,440 | 0 | 684 | 3,124 |
| [public/vite.svg](/public/vite.svg) | SVG | 1 | 0 | 0 | 1 |
| [src/assets/svg/blockquote.svg](/src/assets/svg/blockquote.svg) | SVG | 8 | 0 | 0 | 8 |
| [src/assets/svg/bold.svg](/src/assets/svg/bold.svg) | SVG | 11 | 0 | 0 | 11 |
| [src/assets/svg/bulletList.svg](/src/assets/svg/bulletList.svg) | SVG | 5 | 0 | 0 | 5 |
| [src/assets/svg/codeBlock.svg](/src/assets/svg/codeBlock.svg) | SVG | 8 | 0 | 0 | 8 |
| [src/assets/svg/heading.svg](/src/assets/svg/heading.svg) | SVG | 5 | 0 | 0 | 5 |
| [src/assets/svg/horizontalrule.svg](/src/assets/svg/horizontalrule.svg) | SVG | 5 | 0 | 0 | 5 |
| [src/assets/svg/image.svg](/src/assets/svg/image.svg) | SVG | 4 | 0 | 0 | 4 |
| [src/assets/svg/italic.svg](/src/assets/svg/italic.svg) | SVG | 8 | 0 | 0 | 8 |
| [src/assets/svg/orderedList.svg](/src/assets/svg/orderedList.svg) | SVG | 5 | 0 | 0 | 5 |
| [src/assets/svg/strike.svg](/src/assets/svg/strike.svg) | SVG | 8 | 0 | 0 | 8 |
| [src/assets/svg/taskList.svg](/src/assets/svg/taskList.svg) | SVG | 5 | 0 | 0 | 5 |
| [src/assets/svg/underline.svg](/src/assets/svg/underline.svg) | SVG | 5 | 0 | 0 | 5 |
| [src/assets/vue.svg](/src/assets/vue.svg) | SVG | 1 | 0 | 0 | 1 |
| [src/components/core/XmEditor.vue](/src/components/core/XmEditor.vue) | Vue | 76 | 48 | 15 | 139 |
| [src/components/core/extensions/index.js](/src/components/core/extensions/index.js) | JavaScript | 15 | 1 | 5 | 21 |
| [src/components/core/extensions/marks/bold.js](/src/components/core/extensions/marks/bold.js) | JavaScript | 21 | 0 | 3 | 24 |
| [src/components/core/extensions/marks/italic.js](/src/components/core/extensions/marks/italic.js) | JavaScript | 21 | 0 | 3 | 24 |
| [src/components/core/extensions/marks/strike.js](/src/components/core/extensions/marks/strike.js) | JavaScript | 21 | 0 | 3 | 24 |
| [src/components/core/extensions/marks/underline.js](/src/components/core/extensions/marks/underline.js) | JavaScript | 21 | 0 | 3 | 24 |
| [src/components/core/extensions/nodes/blockquote.js](/src/components/core/extensions/nodes/blockquote.js) | JavaScript | 21 | 0 | 3 | 24 |
| [src/components/core/extensions/nodes/codeBlock/CodeBlockComponent.vue](/src/components/core/extensions/nodes/codeBlock/CodeBlockComponent.vue) | Vue | 80 | 5 | 13 | 98 |
| [src/components/core/extensions/nodes/codeBlock/codeBlock.js](/src/components/core/extensions/nodes/codeBlock/codeBlock.js) | JavaScript | 29 | 3 | 5 | 37 |
| [src/components/core/extensions/nodes/document.js](/src/components/core/extensions/nodes/document.js) | JavaScript | 3 | 0 | 3 | 6 |
| [src/components/core/extensions/nodes/heading/heading.js](/src/components/core/extensions/nodes/heading/heading.js) | JavaScript | 21 | 0 | 3 | 24 |
| [src/components/core/extensions/nodes/horizontalRule.js](/src/components/core/extensions/nodes/horizontalRule.js) | JavaScript | 20 | 0 | 3 | 23 |
| [src/components/core/extensions/nodes/image/ImageView.vue](/src/components/core/extensions/nodes/image/ImageView.vue) | Vue | 57 | 1 | 11 | 69 |
| [src/components/core/extensions/nodes/image/ImgUpload.vue](/src/components/core/extensions/nodes/image/ImgUpload.vue) | Vue | 145 | 0 | 12 | 157 |
| [src/components/core/extensions/nodes/image/image.js](/src/components/core/extensions/nodes/image/image.js) | JavaScript | 83 | 0 | 14 | 97 |
| [src/components/core/extensions/nodes/list/list.js](/src/components/core/extensions/nodes/list/list.js) | JavaScript | 36 | 0 | 4 | 40 |
| [src/components/core/menu/MenuBubble.vue](/src/components/core/menu/MenuBubble.vue) | Vue | 0 | 0 | 1 | 1 |
| [src/components/core/menu/MenuFixed.vue](/src/components/core/menu/MenuFixed.vue) | Vue | 31 | 2 | 6 | 39 |
| [src/components/core/menu/MenuFloating.vue](/src/components/core/menu/MenuFloating.vue) | Vue | 0 | 0 | 1 | 1 |
| [src/components/core/menu/button/BubbleMenu.vue](/src/components/core/menu/button/BubbleMenu.vue) | Vue | 70 | 2 | 9 | 81 |
| [src/components/core/menu/button/HeadingButton.vue](/src/components/core/menu/button/HeadingButton.vue) | Vue | 71 | 23 | 7 | 101 |
| [src/components/core/menu/button/ImageButton.vue](/src/components/core/menu/button/ImageButton.vue) | Vue | 56 | 1 | 9 | 66 |
| [src/components/core/menu/button/ListButton.vue](/src/components/core/menu/button/ListButton.vue) | Vue | 71 | 2 | 7 | 80 |
| [src/components/core/menu/button/SvgIcon.vue](/src/components/core/menu/button/SvgIcon.vue) | Vue | 63 | 0 | 10 | 73 |
| [src/components/core/menu/button/UniversalButton.vue](/src/components/core/menu/button/UniversalButton.vue) | Vue | 14 | 0 | 4 | 18 |
| [src/components/setting/EditorProps.js](/src/components/setting/EditorProps.js) | JavaScript | 70 | 15 | 1 | 86 |
| [src/components/setting/iconMap.js](/src/components/setting/iconMap.js) | JavaScript | 47 | 1 | 8 | 56 |
| [src/index.js](/src/index.js) | JavaScript | 16 | 0 | 4 | 20 |
| [src/styles/base.css](/src/styles/base.css) | CSS | 4 | 0 | 2 | 6 |
| [src/styles/codeBlock/default.css](/src/styles/codeBlock/default.css) | CSS | 61 | 1 | 10 | 72 |
| [src/styles/codeBlock/github-dark.css](/src/styles/codeBlock/github-dark.css) | CSS | 92 | 25 | 18 | 135 |
| [src/styles/editor.css](/src/styles/editor.css) | CSS | 88 | 14 | 19 | 121 |
| [src/utils/buttonUtil.js](/src/utils/buttonUtil.js) | JavaScript | 17 | 0 | 2 | 19 |
| [vite.config.js](/vite.config.js) | JavaScript | 32 | 7 | 2 | 41 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)