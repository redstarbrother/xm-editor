export function getPostionByElement(elRef) {
    if (!elRef?.value) return
    const rect = elRef.value.$el
        ? elRef.value.$el.getBoundingClientRect()
        : elRef.value.getBoundingClientRect()
    return {
        x: rect.left,
        y: rect.bottom,
    }
}

export function getPositionByRange(range) {
    if (!range) return
    const rect = range.getBoundingClientRect()
    return {
        x: rect.left,
        y: rect.bottom,
    }
}

export function getPositionByMouse(event) {
    return {
        x: event.clientX,
        y: event.clientY,
    }
}