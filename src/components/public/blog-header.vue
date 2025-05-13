<template>
  <el-row class="row-bg" align="middle">
    <el-col :span="2" class="aside-control">
      <el-button
        @click="changeCollapseHandler({ isCollapse, titleValue })"
        class="aside-control-btn"
        type="primary"
        :icon="isIcon"
      />
    </el-col>
    <el-col :span="12">
      <el-breadcrumb
        class="breadcrumb"
        v-if="route.matched.length !== 1"
        separator="/"
      >
        <el-breadcrumb-item
          v-for="(item, index) in route.matched"
          :key="index"
          :to="{ path: route.matched[index].path }"
          >{{ route.matched[index].meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-col>
    <el-col :offset="9" :span="1">
      <div class="basic--circle">
        <div class="block">
          <template
            v-if="profileStore.profile && profileStore.profile.UserProfile"
          >
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                <div class="user-info">
                  <el-button @click="goProfile" plain>个人信息</el-button>
                  <el-button
                    @click="goUrl(profileStore.profile.UserProfile.gitee)"
                    plain
                    >Gitee</el-button
                  >
                  <el-button
                    @click="goUrl(profileStore.profile.UserProfile.github)"
                    plain
                    >GitHub</el-button
                  >
                  <el-button @click="loginOut" plain>退出登录</el-button>
                </div>
              </template>
              <el-avatar
                :size="40"
                :src="profileStore.profile.UserProfile.avatar"
              />
            </el-tooltip>
          </template>
          <el-avatar
            v-else
            :size="40"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { Grid, HomeFilled, Menu } from "@element-plus/icons-vue";
import { reactive, markRaw, ref, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/user";
import { useProfileStore } from "@/stores/profile";
import { ElMessage } from "element-plus";
import router from "@/routes";
const route = useRoute();
const profileStore = useProfileStore();
// 登出操作
const loginOut = () => {
  const userStore = useAuthStore();
  userStore.clearToken();
  profileStore.clearProfile();
  ElMessage("登出成功");
  router.push("/login");
};

// 点击切换侧边栏

import EventBus from "@/utils/event-bus.js";
const isCollapse = ref(true);
const titleValue = ref("星域");
const isIcon = ref(markRaw(Grid));
const changeCollapseHandler = obj => {
  console.log(`changeCollapseHandler被执行了，数据为`, obj);
  EventBus.emit("changeCollapse", obj);
  if (obj.titleValue === "星域") {
    titleValue.value = "星域管理系统";
    isIcon.value = markRaw(Menu);
  } else {
    titleValue.value = "星域";
    isIcon.value = markRaw(Grid);
  }

  isCollapse.value = !obj.isCollapse;
};
// 跳转个人中心
const goProfile = () => {
  router.push("/profile");
};
// 跳转链接
const goUrl = url => {
  if (url) {
    window.open(url, "_blank");
  } else {
    ElMessage.warning("该用户没有绑定任何链接，请在个人设置中绑定");
  }
};
</script>

<style scoped>
/* 面包屑禁止选中文字 */
.breadcrumb {
  user-select: none;
}
/* avatar处用户样式 */
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 8px;
}
.user-info .el-button {
  width: 100px;
}
/* 取消el-button默认的margin-left */
.user-info .el-button + .el-button {
  margin-left: 0;
}

.aside-control .aside-control-btn {
  height: 100%;
  font-size: 16px;
}
.el-row {
  height: 100%;
  padding: 10px 0;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
