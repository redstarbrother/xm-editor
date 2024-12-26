<template>
  <div class="base-button" :class="{ 'is-active-par': active }" @click="onClick">
    <!-- <SvgIcon :name="props.name" :active="active" /> -->
    <SvgIconInner :name="props.name" />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import SvgIconInner from './SvgIconInner.vue'

const props = defineProps({
  name: String,
  isActive: Function,
  execute: Function
})

function onClick() {
  if (props.execute) {
    props.execute()
    console.log(props.isActive)
  }
}

const active = computed(() => {
  if (props.isActive) {
    return props.isActive()
  }
  return false
})
</script>

<style scoped>
.base-button {
  padding: 2px;
  cursor: pointer;
}

.is-active {
  color: #4285f4;
}

.is-active-par {
  border-radius: 50%;
  background-color: #ecf5ff;
}
</style>
