<template>
  <div class="blog-table">
    <div class="art_list_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询的用户名"
      >
      </el-input>
    </div>
    <el-divider>
      <span>用户信息</span>
    </el-divider>
    <el-table :border="true" :data="filterTableData" table-layout="auto">
      <el-table-column label="头像" width="100" prop="UserProfile.avatar">
        <template #default="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.UserProfile.avatar"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[scope.row.UserProfile.avatar]"
            :preview-teleported="true"
            :z-index="5"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="username" />
      <el-table-column label="性别" prop="UserProfile.gender" />
      <el-table-column
        label="邮箱"
        :show-overflow-tooltip="true"
        prop="email"
      />
      <el-table-column label="联系电话" prop="UserProfile.phone" />
      <el-table-column label="管理员" prop="role">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 0" type="primary">用户</el-tag>
          <el-tag v-else type="danger">管理员</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="个性签名"
        :show-overflow-tooltip="true"
        prop="UserProfile.bio"
      />
      <el-table-column label="注册时间" width="210" prop="createdAt" />
      <el-table-column label="封禁" prop="isFlag">
        <template #default="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            @change="onBanChange(scope.row)"
            v-model="scope.row.isFlag"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import userApi from "@/apis/users.js";
import { ElMessage } from "element-plus";
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();
// todo:修改管理员权限
const handleRoleChange = async row => {
  console.log(row);
};
// 用户封禁
const onBanChange = async row => {
  console.log(profileStore.profile.role);
  if (profileStore.profile.role === 0) {
    row.isFlag = 0;
    ElMessage.error("你没有权限封禁用户");
    return;
  }
  if (row.role === 1) {
    row.isFlag = 0;
    ElMessage.error("您无法封禁管理员");
    return;
  }
  const result = await userApi.banUser({
    userId: row.id,
    isFlag: Number(row.isFlag),
  });
  if (row.isFlag === 1) {
    ElMessage.error("已经封禁用户");
  } else {
    ElMessage.success("已经解封用户");
  }
};
// 搜索功能
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
);

// 删除用户的回调
const handleDelete = (index, row) => {
  console.log(index, row);
};

const tableData = ref([]);
// 获取全部用户数据
const get_user_list = async () => {
  try {
    const result = await userApi.getAllUser();
    console.log("result", result);
    tableData.value = result.data.result.data.map(v => ({
      ...v,
      createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
      updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
    }));
    console.log(tableData.value);
  } catch (error) {
    if (error.response) {
      // 提取服务器返回的错误信息
      ElMessage({
        message: error.response.data.message,
        type: "error",
      });
    } else {
      // 处理非响应错误
      ElMessage({
        message: error.message,
        type: "error",
      });
    }
  }
};
get_user_list();
</script>

<style scoped>
.uploadStyle :deep(.el-upload--picture-card) {
  display: none;
}
:deep(.el-upload) {
  width: 6.25rem;
  height: 6.25rem;
}
.blog-table {
  padding: 20px;
  border-radius: 11px;
  background-color: #fff;
}
.edit {
  display: flex;
  justify-content: center;
}
</style>
