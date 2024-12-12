<template>
  <div>
    <XmEditor :options="options" />
  </div>
</template>

<script setup>
import XmEditor from '../src/index'
import {
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  BulletList,
  OrderedList,
  TaskList,
  Blockquote,
  HorizontalRule,
  CodeBlock,
} from '../src/index'
import '../src/styles/base.css'

const options = {
  extensions: [
    Heading,
    Bold,
    Italic,
    Underline,
    Strike,
    BulletList,
    OrderedList,
    TaskList,
    Blockquote,
    HorizontalRule,
    CodeBlock,
  ],
}
</script>

<style scoped></style>
