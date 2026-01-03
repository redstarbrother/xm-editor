<template>
  <div class="sub-menu">
    <div class="title">表格</div>
    <div class="grid-container" @mouseleave="resetSelection">
      <div v-for="row in maxRows" :key="`row-${row}`" class="grid-row">
        <div v-for="col in maxCols" :key="`col-${col}`" class="grid-cell"
          :class="{ active: row <= selectedRows && col <= selectedCols }" @mouseenter="selectGrid(row, col)"
          @click="insertTable(row, col)"></div>
      </div>
    </div>
    <div class="status">{{ selectedCols }} x {{ selectedRows }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const maxRows = 10;
const maxCols = 10;
const selectedRows = ref(0);
const selectedCols = ref(0);

const selectGrid = (row, col) => {
  selectedRows.value = row;
  selectedCols.value = col;
};

const resetSelection = () => {
  selectedRows.value = 0;
  selectedCols.value = 0;
};

const insertTable = (rows, cols) => {
  props.editor
    .chain()
    .focus()
    .insertTable({ rows, cols, withHeaderRow: false })
    .run();
  emit("close");
};
</script>

<style scoped>
.sub-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
}

.title {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 8px;
}

.grid-row {
  display: flex;
  gap: 2px;
}

.grid-cell {
  width: 16px;
  height: 16px;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  cursor: pointer;
  border-radius: 2px;
}

.grid-cell.active {
  background-color: #dbeafe;
  /* blue-100 */
  border-color: #93c5fd;
  /* blue-300 */
}
</style>
