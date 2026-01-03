<template>
  <!-- 根节点必须是 NodeViewWrapper -->
  <NodeViewWrapper as="table" class="xm-table">
    <!-- 渲染子节点（tableRow） -->
    <div class="table-container" @contextmenu.prevent="onContextMenu">
      <NodeViewContent as="tbody" />
    </div>
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-3";

// 接收 Tiptap NodeView 的标准 props
defineProps(nodeViewProps);
</script>

<style scoped>
.xm-table {
  /* Add table styles here */
}
</style>
