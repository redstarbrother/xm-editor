import { ref } from "vue"

export function useBubbleMenuPosition() {
  const x = ref(0)
  const y = ref(0)

  // 基于元素定位
  const attachToElement = (elRef) => {
    if (!elRef?.value) return
    const rect = elRef.value.$el
      ? elRef.value.$el.getBoundingClientRect()
      : elRef.value.getBoundingClientRect()
    x.value = rect.left
    y.value = rect.bottom
  }

  // 基于鼠标事件定位
  const attachToMouse = (event) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  // 基于光标/Range 定位
  const attachToRange = (range) => {
    if (!range) return
    const rect = range.getBoundingClientRect()
    x.value = rect.left
    y.value = rect.bottom
  }

  return {
    x,
    y,
    attachToElement,
    attachToMouse,
    attachToRange,
  }
}
