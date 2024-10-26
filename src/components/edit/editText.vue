<template>
  <MdEditor v-model="state.text" :previewTheme="state.theme" />
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
</script>

<style scoped>
:deep(.md-editor-toolbar) {
  flex-wrap: wrap;
}
</style>
