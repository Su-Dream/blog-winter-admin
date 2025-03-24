<template>
  <div>
    <el-upload
      :action="BaseURL"
      :headers="headers"
      :auto-upload="true"
      :show-file-list="false"
      :on-success="onSuccess"
      :on-error="onError"
    >
      <el-image
        style="width: 400px"
        object-fit="cover"
        slot="file-list"
        class="el-upload-list__item-thumbnail"
        :src="defaultImage"
      />
      <template #tip>
        <div class="el-upload__tip">Tip : 点击图片进行上传/替换</div>
      </template>
      <i slot="trigger" class="el-icon-close"></i>
    </el-upload>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/user"; // 引入 Pinia 的 store
// 文件上传请求头
const BaseURL = import.meta.env.VITE_SERVER_URL + "upload/";
const defaultImage = ref(
  "http://localhost:3000/uploads/images/1741412038559.png"
);
const authStore = useAuthStore(); // 获取 Pinia 中的 auth store
const token = authStore.token; // 从 Pinia 中获取 token
// 请求头
const headers = {
  Authorization: `Bearer ${token}`,
};
const props = defineProps(["picture"]);
// 定义上传事件
const emit = defineEmits(["upload"]);
// 上传成功
const onSuccess = (res, uploadFile, uploadFiles) => {
  ElMessage.success("上传成功");
  defaultImage.value = res.data.url;
  console.log("返回地址", defaultImage.value);
  // 触发事件传结果给父组件
  emit("upload", res.data.url);
};
// 上传失败
const onError = (error, uploadFile, uploadFiles) => {
  ElMessage.error("上传失败");
  emit("upload", error.message);
};
</script>
