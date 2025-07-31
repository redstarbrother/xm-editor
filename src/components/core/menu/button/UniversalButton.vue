<template>
    <SvgIcon v-bind="props"/>
</template>

<script setup>
import { defineProps } from "vue";
import SvgIcon from "./SvgIcon.vue";

const props = defineProps({
  icon: Object,
  isActive: Function,
  execute: Function,
});

</script>

<style scoped>
</style>