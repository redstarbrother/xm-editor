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

<style>
.xm-table {
  /* Add table styles here */
}

/* 按钮基础样式 */
.table-plus-btn {
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;
}

.table-plus-btn:hover {
  background: #f1f5f9;
  color: #2563eb;
  transform: scale(1.1);
}

/* 针对行按钮和列按钮的微调 */
.row-btn::before {
  content: "";
  position: absolute;
  top: -10px; left: 0; right: 0; bottom: 0; /* 扩大热区 */
}

.col-btn::before {
  content: "";
  position: absolute;
  left: -10px; top: 0; right: 0; bottom: 0; /* 扩大热区 */
}
</style>
