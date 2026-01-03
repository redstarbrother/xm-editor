import SegmentationExtension from './SegmentationExtension'

export default {
  extension: SegmentationExtension,
  manifest: {
    name: 'segmentation',
    fixedMenu: {
      id: 'segmentation',
      type: 'separator',
    },
    bubbleMenu: {
      id: 'segmentation',
      type: 'separator',
    },
  },
}