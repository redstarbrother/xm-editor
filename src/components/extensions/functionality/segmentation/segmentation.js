import { Extension } from '@tiptap/core'

const Segmentation = Extension.create({
  name: 'segmentation',

  addOptions() {
    return {
      fixed: {
        id: 'segmentation',
        type: 'separator',
      },
      bubble: {
        id: 'segmentation',
        type: 'separator',
      },
    }
  },
})

export default Segmentation