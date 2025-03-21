<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <h2>个人资料</h2>
          <el-button type="primary" @click="toggleEdit" size="small">
            {{ isEditing ? "取消" : "编辑" }}
          </el-button>
        </div>
      </template>

      <div class="profile-avatar">
        <el-avatar :size="100" :src="form.avatar || defaultAvatar"></el-avatar>
        <el-upload
          v-if="isEditing"
          class="avatar-uploader"
          :headers="headers"
          :action="BaseURL"
          accept=".jpg,.png,.gif,.jpeg"
          :auto-upload="true"
          :show-file-list="false"
          :on-success="onSuccess"
        >
          <el-button size="small" type="primary">更换头像</el-button>
        </el-upload>
      </div>

      <el-form
        :model="form"
        label-position="top"
        class="profile-form"
        ref="profileForm"
        :disabled="!isEditing"
      >
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email" disabled></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select
            v-model="form.gender"
            placeholder="请选择性别"
            class="full-width"
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号码">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input
            v-model="form.bio"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
          ></el-input>
        </el-form-item>

        <el-form-item label="注册时间">
          <el-input :value="formatDate(form.createdAt)" disabled></el-input>
        </el-form-item>

        <el-form-item v-if="isEditing">
          <el-button type="primary" @click="saveProfile" :loading="loading"
            >保存</el-button
          >
          <el-button @click="toggleEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import userApi from "@/apis/users";
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/user";
const profileStore = useProfileStore();
const isEditing = ref(false);
const loading = ref(false);
const defaultAvatar = "http://localhost:3000/uploads/images/avatar.webp";
const avatarUrl = ref("");

// 表单数据
const form = reactive({
  id: "",
  username: "",
  role: 0,
  email: "",
  isFlag: 0,
  createdAt: "",
  updatedAt: "",
  avatar: "",
  gender: "",
  phone: "",
  bio: "",
});

// 获取用户信息
const fetchUserProfile = async () => {
  let userData = profileStore.profile;

  // 获取用户信息
  try {
    const response = await userApi.getUserInfo();
    userData = response.data.rows;
    // 更新 store
    profileStore.setProfile(userData);
  } catch (error) {
    console.error("获取用户信息失败", error);
    ElMessage.error("获取用户信息失败");
    return;
  }
  // 更新表单数据
  form.id = userData.id;
  form.username = userData.username;
  form.role = userData.role;
  form.email = userData.email;
  form.isFlag = userData.isFlag;
  form.createdAt = userData.createdAt;
  form.updatedAt = userData.updatedAt;

  // 个人资料数据
  if (userData.UserProfile) {
    form.avatar = userData.UserProfile.avatar;
    form.gender = userData.UserProfile.gender;
    form.phone = userData.UserProfile.phone;
    form.bio = userData.UserProfile.bio;
  }
};

// 保存用户信息
const saveProfile = async () => {
  try {
    loading.value = true;
    // 构造要更新的数据
    const updateData = {
      gender: form.gender,
      phone: form.phone,
      bio: form.bio,
      // 如果有新上传的头像文件
      ...(avatarUrl.value && { avatar: avatarUrl.value }),
    };
    console.log("updateData", updateData);
    // 发送请求更新用户信息
    await userApi.updateUser(updateData);
    ElMessage.success("个人资料更新成功");
    isEditing.value = false;
    // 重新获取最新的用户信息
    await fetchUserProfile();
  } catch (error) {
    console.error("更新个人资料失败", error);
    ElMessage.error("更新个人资料失败");
  } finally {
    loading.value = false;
  }
};

// 切换编辑状态
const toggleEdit = () => {
  if (isEditing.value) {
    // 取消编辑，重置表单数据
    fetchUserProfile();
  }
  isEditing.value = !isEditing.value;
};

// 文件上传请求头
const BaseURL = import.meta.env.VITE_SERVER_URL + "upload/";
const authStore = useAuthStore(); // 获取 Pinia 中的 auth store
const token = authStore.token; // 从 Pinia 中获取 token
const headers = {
  Authorization: `Bearer ${token}`,
};
// 文件上传成功的钩子
const onSuccess = async (file, files) => {
  avatarUrl.value = file.data.url;
  // 更新表单中的头像，使其立即显示
  form.avatar = file.data.url;
  ElMessage({
    message: "上传成功!",
    type: "success",
    plain: true,
  });
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
// 格式化日期
const formatDate = dateString => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 页面加载时获取用户信息
onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
.profile-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.profile-card {
  width: 100%;
  max-width: 600px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.avatar-uploader {
  margin-top: 10px;
}

.profile-form {
  text-align: left;
}

.full-width {
  width: 100%;
}
</style>
