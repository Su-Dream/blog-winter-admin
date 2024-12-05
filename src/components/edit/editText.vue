<template>
  <MdEditor
    v-model="state.text"
    :previewTheme="state.theme"
    @onChange="onChange"
  />
  <!-- 纯预览组件 -->
  <!-- <MdPreview v-model="state.text" :previewTheme="state.theme" /> -->
</template>

<script setup>
import { ref, reactive } from "vue";
import { MdEditor, MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const state = reactive({
  text: ">**Hello world**",
  theme: "cyanosis",
});

// 定义一个自定义事件
const emit = defineEmits(["send_edit_content"]);

let timer = null;
// 内容发生改变时传递给父组件
const onChange = v => {
  if (timer) {
    clearTimeout(timer); // 清除之前的定时器
  }
  timer = setTimeout(() => {
    // 传给父组件
    emit("send_edit_content", v);
  }, 1000); // 延迟 1 秒执行
};
</script>

<style scoped>
:deep(.md-editor-toolbar),
:deep(.md-editor-toolbar-left) {
  flex-wrap: wrap;
}
</style>
