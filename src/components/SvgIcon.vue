<template>
    <!-- 如果加载成功则渲染 SVG 内容 -->
    <div v-if="svgContent" v-html="svgContent" ref="svgWrapper"></div>
    <!-- 如果加载失败则显示占位 -->
    <div v-else class="svg-icon error">error</div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
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
const svgWrapper = ref(null); // 用于引用渲染后的 DOM 节点

// 动态加载 SVG 文件
const loadSvg = async (name) => {
    try {
        const svg = await import(`@/assets/svg/${name}.svg?raw`);
        svgContent.value = svg.default; // 将 SVG 文件的内容设置到变量中
    } catch (error) {
        console.error(`Failed to load SVG: ${name}`, error);
        svgContent.value = null; // 加载失败时清空内容
    }
};

const applyColor = (color) => {
    if (svgWrapper.value) {
        const svgElement = svgWrapper.value.querySelector("svg");
        if (svgElement) {
            svgElement.setAttribute("fill", color); // 设置填充颜色
        }
    }
};

// 响应 name 的变化
watchEffect(() => {
    loadSvg(name);
    if (props.active) {
        applyColor("#4285f4")
    } else {
        applyColor('#000')
    }
});

onMounted(() => {
    applyColor('#000'); // 初次挂载时也应用颜色
});
</script>

<style>
.xmed-svg-root {
    width: 25px;
    height: 25px;
    margin: 0 4px;
    vertical-align: middle;
}
</style>