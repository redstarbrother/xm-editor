<template>
  <svg class="xm-editor-svg" aria-hidden="true">
    <use :xlink:href="`#icon-${iconName}`" :fill="color" />
  </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const iconName = computed(() => `${props.name}`)

const color = computed(() => (props.active ? '#4285f4' : '#000'))
</script>

<style scoped>
.xm-editor-svg {
  width: 25px;
  height: 25px;
  margin: 0 4px;
  fill: currentColor;
  vertical-align: middle;
}
</style>
