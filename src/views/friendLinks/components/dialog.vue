<template>
  <!-- 展示组件 -->
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onChangeState(false)">Cancel</el-button>
          <el-button type="primary" @click="onChangeState(false)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

const dialogVisible = ref(false);

// 改变组件的状态
const onChangeState = (state = false) => {
  dialogVisible.value = state;
};
// 暴露修改状态的方法给父组件
defineExpose({
  onChangeState,
});
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
