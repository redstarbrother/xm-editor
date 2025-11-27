<template>
  <div class="popover-area" :style="positionStyle" ref="menuRef">
    <slot />
  </div>
</template>

<script setup>
import { computed, ref } from "vue"

const props = defineProps({
  position: { type: Object, required: true }, // 直接传 useBubbleMenu() 的返回对象
})

const menuRef = ref(null)

const positionStyle = computed(() => {
  return {
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
  };
});
</script>

<style lang="scss" scoped>
.popover-area {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 6px;
  gap: 4px;
  position: absolute;
  z-index: 100;
}
</style>
