<template>
    <SvgIcon v-bind="props"/>
</template>

<script setup>
import SvgIcon from "../icon/SvgIcon.vue";

const props = defineProps({
  icon: Function,
  isActive: Function,
  execute: Function,
  iconConfig: Object,
});

</script>

<style scoped>
</style>
