<template>
  <!-- 展示组件 -->
  <div>
    <el-dialog v-model="dialogVisible" :title="prop.title" width="500">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="form-inline">
          <el-form-item label="友链名称">
            <el-input
              v-model="formInline.username"
              placeholder="请输入友链名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="友链地址">
            <el-input
              v-model="formInline.url"
              placeholder="请输入友链地址"
              clearable
            />
          </el-form-item>
          <el-form-item label="友链描述">
            <el-input
              v-model="formInline.description"
              placeholder="请输入友链描述"
              clearable
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onChangeState(false)">取消</el-button>
          <el-button type="primary" @click="submit"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import linkApi from "@/apis/links.js";
import { ElMessage } from "element-plus";
// 组件状态
const dialogVisible = ref(false);
// 组件标题
const prop = defineProps(["title"]);

// 表单
const formInline = reactive({
  username: "",
  url: "",
  description: "",
});
// 清除表单方法
const clearForm = () => {
  Object.assign(formInline, {
    username: "",
    url: "",
    description: "",
  });
};
// 提交表单
const submit = async () => {
  // 添加友链
  if (prop.title === "添加友链") {
    const res = await linkApi.addlink(formInline);
    ElMessage.success("添加友链成功");
  }
  // 更新友链
  else if (prop.title === "更新友链") {
    const res = await linkApi.updateLink({
      ...formInline,
    });
    ElMessage.success("更新友链成功");
  }
  clearForm();
  onChangeState(false);
};
// 改变组件的状态
const onChangeState = (state = false) => {
  dialogVisible.value = state;
};
// 数据回显
const formData = data => {
  Object.assign(formInline, data);
};
// 暴露修改状态的方法给父组件
defineExpose({
  onChangeState,
  submit,
  formData,
});
</script>
<style scope>
.form-inline {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
