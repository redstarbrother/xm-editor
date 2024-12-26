<template>
    <!-- 如果加载成功则渲染 SVG 内容 -->
    <div v-if="svgContent" v-html="svgContent" class="xmed-svg-root"></div>
    <!-- 如果加载失败则显示占位 -->
    <div v-else class="svg-icon error">SVG 加载失败</div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { defineProps } from "vue";

// 定义传入的 props
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
});

const name = props.name;

// 定义变量
const svgContent = ref(null); // 存储加载的 SVG 内容

// 动态加载 SVG 文件
const loadSvg = async (name) => {
    try {
        const svg = await import(`@/assets/svg/${name}.svg?raw`);
        svgContent.value = svg.default; // 获取 SVG 内容
    } catch (error) {
        console.error(`Failed to load SVG: ${name}`, error);
        svgContent.value = null; // 加载失败时清空内容
    }
};

// 响应 name 的变化
watchEffect(() => {
    loadSvg(name);
});
</script>

<style scoped>
.xmed-svg-root svg {
    width: 25px;
    height: 25px;
    margin: 0 4px;
    fill: currentColor;
    vertical-align: middle;
}
</style>