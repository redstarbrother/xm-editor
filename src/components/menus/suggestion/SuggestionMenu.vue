<!-- suggestion/SuggestionMenu.vue -->
<template>
  <div class="xm-suggestion-menu">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['item', { active: index === selected }]"
      @mousedown.prevent="select(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestionMenu",

  props: {
    items: {
      type: Array,
      required: true,
    },
    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selected: 0,
    };
  },

  watch: {
    items() {
      this.selected = 0;
    },
  },

  methods: {
    onKeyDown(event) {
      if (event.key === "ArrowDown") {
        this.selected = (this.selected + 1) % this.items.length;
        return true;
      }

      if (event.key === "ArrowUp") {
        this.selected =
          (this.selected - 1 + this.items.length) % this.items.length;
        return true;
      }

      if (event.key === "Enter") {
        this.select(this.items[this.selected]);
        return true;
      }

      return false;
    },

    select(item) {
      this.command(item);
    },
  },
};
</script>

<style scoped>
.xm-suggestion-menu {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 4px;
  min-width: 180px;
}

.item {
  padding: 6px 10px;
  cursor: pointer;
}

.item.active {
  background: #f0f0f0;
}
</style>
