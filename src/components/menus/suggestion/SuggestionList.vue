<template>
  <div class="xm-suggestion">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['item', { active: index === selected }]"
      @click="select(item)"
    >
      <slot name="item" :item="item">
        {{ renderItem ? renderItem(item) : item.label }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    command: Function,
    renderItem: Function,
  },
  data() {
    return {
      selected: 0,
    }
  },
  methods: {
    onKeyDown(event) {
      if (event.key === 'ArrowDown') {
        this.selected = (this.selected + 1) % this.items.length
        return true
      }
      if (event.key === 'ArrowUp') {
        this.selected =
          (this.selected - 1 + this.items.length) % this.items.length
        return true
      }
      if (event.key === 'Enter') {
        this.select(this.items[this.selected])
        return true
      }
      return false
    },
    select(item) {
      this.command(item)
    },
  },
}
</script>
