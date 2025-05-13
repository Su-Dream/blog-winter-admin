<template>
  <MdEditor
    v-model="state.text"
    :previewTheme="state.theme"
    @onUploadImg="onUploadImg"
    @onChange="onChange"
  />
  <!-- 纯预览组件 -->
  <!-- <MdPreview v-model="state.text" :previewTheme="state.theme" /> -->
</template>

<script setup>
import { ref, reactive } from "vue";
import { MdEditor, MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import axios from "axios";
import { useAuthStore } from "@/stores/user"; // 引入 Pinia 的 store
const authStore = useAuthStore(); // 获取 Pinia 中的 auth store
const token = authStore.token; // 从 Pinia 中获取 token

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

// 上传图片
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map(file => {
      return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append("file", file);

        axios
          .post("/api/upload", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          })
          .then(res => resolve(res))
          .catch(error => reject(error));
      });
    })
  );

  callback(
    res.map(item => {
      console.log(item);
      // 后端返回的图片地址
      return item.data.data.url;
    })
  );
};
</script>

<style scoped>
:deep(.md-editor-toolbar),
:deep(.md-editor-toolbar-left) {
  flex-wrap: wrap;
}
</style>
