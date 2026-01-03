import { ref, onMounted, onUnmounted, watch } from 'vue';

/**
 * 监听编辑器状态变化，更新菜单项的激活状态 (适用于 BubbleMenu)
 * @param {Object} editor Tiptap editor instance
 * @param {Ref<Array> | Array} items 菜单项列表，每个项需要有 id 和 isActive(editor) 方法
 * @returns {Ref<Object>} activeStates 映射对象 { [id]: boolean }
 */
export function useMenuActiveState(editor, items) {
  const activeStates = ref({});

  const updateActiveStatus = () => {
    const states = {};
    // items 可能是 ref 也可能是普通数组
    const list = items.value || items;

    if (!editor || !list) return;

    list.forEach((item) => {
      if (item.id && typeof item.isActive === "function") {
        states[item.id] = item.isActive({ editor });
      }
    });
    activeStates.value = states;
  };

  onMounted(() => {
    updateActiveStatus();
    editor.on("transaction", updateActiveStatus);
  });

  onUnmounted(() => {
    editor.off("transaction", updateActiveStatus);
  });

  // 如果 items 是 ref，监听它
  if (items.value) {
    watch(items, updateActiveStatus, { deep: true });
  }

  return activeStates;
}

/**
 * 监听编辑器 Transaction 事件，提供一个响应式的触发器 (适用于 MenuFixed)
 * @param {Object} editor Tiptap editor instance
 * @returns {Ref<number>} tick 每次 transaction 递增的计数器
 */
export function useEditorTransaction(editor) {
  const tick = ref(0);

  const handleUpdate = () => {
    tick.value++;
  };

  onMounted(() => {
    if (editor) {
      editor.on('transaction', handleUpdate);
    }
  });

  onUnmounted(() => {
    if (editor) {
      editor.off('transaction', handleUpdate);
    }
  });

  return tick;
}