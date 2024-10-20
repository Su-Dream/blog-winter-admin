<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        :collapse="isCollapse"
        active-text-color="#1677ff"
        text-color="#FFFFFFA8"
        background-color="#001529"
        default-active="0"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
      >
        <h2 class="title">{{ titleValue }}</h2>
        <el-menu-item index="0">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><User /></el-icon>
            <span>账号管理</span>
          </template>
          <el-menu-item index="1-1">用户</el-menu-item>
          <el-menu-item index="1-2">管理员</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item index="2-1">文章列表</el-menu-item>
          <el-menu-item index="2-2">标签列表</el-menu-item>
          <el-menu-item index="2-3">分类列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <el-icon><ChatDotSquare /></el-icon>
          <template #title>评论管理</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Link /></el-icon>
          <template #title>友链管理</template>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><Picture /></el-icon>
          <template #title>图片管理</template>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><setting /></el-icon>
          <template #title>网站设置</template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  House,
  User,
  Document,
  ChatDotSquare,
  Link,
  Picture,
  Setting,
} from "@element-plus/icons-vue";
import { ref } from "vue";
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
// ?点击切换侧边栏
const isCollapse = ref(false);
const titleValue = ref("星域后台管理");
import { onMounted, onBeforeUnmount } from "vue";
import EventBus from "@/utils/event-bus.js";

onMounted(() => {
  // 订阅changeCollapse消息
  EventBus.on("changeCollapse", obj => {
    isCollapse.value = obj.isCollapse;
    titleValue.value = obj.titleValue;
  });
});
onBeforeUnmount(() => {
  // 注销changeCollapse消息
  EventBus.off("changeCollapse");
});
</script>

<style scoped>
.title {
  color: #ffffffa8;
  padding: 20px 10px;
  text-align: center;
}
.tac {
  height: 100vh;
}
.tac .el-menu-vertical {
  height: 100%;
}
</style>
