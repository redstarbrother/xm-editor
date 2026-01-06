import { defineExtension } from '@/utils/extensionUtil'
import SegmentationExtension from './SegmentationExtension'

export default defineExtension({
  name: 'segmentation',
  type: 'separator',
  extension: SegmentationExtension,
  manifest: {
    fixedMenu: {
      id: 'segmentation',
      type: 'separator',
    },
    bubbleMenu: {
      id: 'segmentation',
      type: 'separator',
    },
  },
})
