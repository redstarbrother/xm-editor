<template>
  <div class="menu-fixed">
    <component
      :is="item.component"
      v-for="(item, index) in buttonCompontents"
      :key="`button-item-${index}`"
      v-bind="{...item.componentProps, iconConfig: fixMenuIconConfig}"
      v-on="item.componentEvents || {}"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { generateButtonCompontents } from "@/utils/buttonUtil";
import { fixMenuIconConfig } from "@/config/IconConfig";

const props = defineProps({
  editor: Object,
  extensions: Array,
});

console.log("fixMenuIconConfig: ", fixMenuIconConfig);

 
// 生成button组件
const buttonCompontents = generateButtonCompontents(props.editor, props.extensions);
</script>

<style scoped>
.menu-fixed {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 5px;
  /* background-color: #f6f8fa; */
  background-color: #fff;
  border-bottom: 1px solid #d1d5da;
  grid-gap: 5px;
}
</style>
