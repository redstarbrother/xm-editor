<template>
  <!-- 根节点必须是 NodeViewWrapper -->
  <NodeViewWrapper as="table" class="xm-table">
    <!-- 渲染子节点（tableRow） -->
    <NodeViewContent as="tbody" />
  </NodeViewWrapper>
</template>

<script setup>
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from "@tiptap/vue-3";

// 接收 Tiptap NodeView 的标准 props
defineProps(nodeViewProps);
</script>

<style scoped>
</style>
