import { Extension } from '@tiptap/core'

const SegmentationExtension = Extension.create({
  name: 'segmentation',
  addOptions() {
    return {
      ...this.parent?.(),
    }
  },
})

export default SegmentationExtension