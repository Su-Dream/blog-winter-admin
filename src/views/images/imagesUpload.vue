<template>
  <div class="box">
    <el-upload
      :on-success="onSuccess"
      :on-change="onChange"
      :on-error="onError"
      :on-preview="handlePictureCardPreview"
      class="uploadClass"
      drag
      :headers
      action="http://127.0.0.1:3000/api/upload/"
      accept=".jpg,.png,.gif,.jpeg"
      :limit="10"
      list-type="picture"
      v-model:file-list="fileList"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将图片拖动到此处或者 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png 图片限制为5MB</div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { useAuthStore } from "@/stores/user"; // 引入 Pinia 的 store
import { ref } from "vue";
import { ElMessage } from "element-plus";
// 文件上传请求头
const authStore = useAuthStore(); // 获取 Pinia 中的 auth store
const token = authStore.token; // 从 Pinia 中获取 token
const headers = {
  Authorization: `Bearer ${token}`,
};
// 文件上传成功的钩子
const onSuccess = async (file, files) => {
  // console.log("上传成功", file, files);
  ElMessage({
    message: "上传成功!",
    type: "success",
    plain: true,
  });
};
// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const onChange = async (file, files) => {
  // console.log("文件状态改变", file, files);
};
// 文件上传失败的钩子
const onError = async (file, files) => {
  // console.log("上传失败", file, files);
  ElMessage({
    message: file.message,
    type: "error",
    plain: true,
  });
};
// 文件图片列表预览
const fileList = ref([]);
// 图片预览
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
</script>

<style scoped>
.box {
  margin: 0 auto;
  width: 80%;
}
</style>
