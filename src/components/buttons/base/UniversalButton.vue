<template>
    <SvgIcon v-bind="props"/>
</template>

<script setup>
import { defineProps } from "vue";
import SvgIcon from "../icon/SvgIcon.vue";

const props = defineProps({
  icon: Object,
  isActive: Function,
  execute: Function,
  iconConfig: Object,
});

</script>

<style scoped>
</style>