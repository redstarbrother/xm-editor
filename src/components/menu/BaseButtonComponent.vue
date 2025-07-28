<template>
  <div class="base-button" :class="{ 'is-active-par': active }" @click="onClick">
    <component :is="props.icon" class="icon" />
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";

const props = defineProps({
  name: String,
  icon: Object,
  isActive: Function,
  execute: Function,
});

const subComponentRef = ref(null);

function onClick() {
  if (props.execute) {
    props.execute();
  }
}

const active = computed(() => {
  if (props.isActive) {
    return props.isActive();
  }
  return false;
});
</script>

<style scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 4px;
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
