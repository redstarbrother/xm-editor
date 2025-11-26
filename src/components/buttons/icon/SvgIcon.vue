<template>
  <div
    class="base-button"
    :class="{ 'is-active-par': active }"
    @click="onClick"
  >
    <component
      :is="props.icon"
      :stroke-width="iconConfig.strokeWidth"
      :size="iconConfig.size"
      :class="['icon', active ? 'icon-active' : '']"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: Function,
  isActive: Function,
  execute: Function,
  iconConfig: Object,
});

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
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s ease-in-out;
}

.base-button:hover {
  background-color: #f0f4f8;
  transition: background-color 0.2s ease-in-out;
}

.icon {
  transition: color 0.2s ease-in-out;
}

.icon-active {
  color: #4285f4;
  transition: color 0.2s ease-in-out;
}

.is-active {
  color: #4285f4;
}

.is-active-par {
  background-color: #ECF5FF;
  transition: background-color 0.2s ease-in-out;
}
</style>
