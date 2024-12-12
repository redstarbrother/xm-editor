<template>
  <div class="menu-fixed">
    <component :is="item.component" v-for="(item, index) in buttonCompontents" :key="`button-item-${index}`"
      v-bind="item.componentProps" v-on="item.componentEvents || {}" />
  </div>
</template>

<script setup >
import { defineProps } from 'vue'

const props = defineProps({ editor, extensions })

const buttonCompontents = generateButtonCompontents()

function generateButtonCompontents() {
  return props.extensions?.reduce((arr, extension) => {
    const { button } = extension.options

    if (button != undefined) {
      const buttonCompontent = button({
        editor: props.editor,
        extension: extension,
      })

      if (Array.isArray(buttonCompontent)) {
        return [...arr, ...buttonCompontent]
      }
      return [...arr, buttonCompontent]
    } else {
      return arr
    }
  }, [])
}
</script>

<style scoped>
.menu-fixed {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding: 5px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #d1d5da;
}
</style>
