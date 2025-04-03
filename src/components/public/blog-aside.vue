<template>
  <el-row class="tac" :class="isCollapse === false ? 'tacWidth' : ''">
    <el-col>
      <el-menu
        :router="true"
        :collapse="isCollapse"
        active-text-color="#1677ff"
        text-color="#FFFFFFA8"
        background-color="#001529"
        default-active="home"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
      >
        <h2 class="title">{{ titleValue }}</h2>
        <el-menu-item index="/home">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/account">
          <el-icon><User /></el-icon>
          <template #title>账号管理</template>
        </el-menu-item>

        <el-sub-menu index="/article">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item index="/article/list">文章列表</el-menu-item>
          <el-menu-item index="/article/tags">标签列表</el-menu-item>
          <el-menu-item index="/article/types">分类列表</el-menu-item>
        </el-sub-menu>
        <!-- <el-menu-item index="/comments">
          <el-icon><ChatDotSquare /></el-icon>
          <template #title>评论管理</template>
        </el-menu-item> -->
        <el-menu-item index="/friendLinks">
          <el-icon><Link /></el-icon>
          <template #title>友链管理</template>
        </el-menu-item>
        <!-- <el-menu-item index="/images">
          <el-icon><Picture /></el-icon>
          <template #title>图片管理</template>
        </el-menu-item> -->
        <el-sub-menu index="/images">
          <template #title>
            <el-icon><Picture /></el-icon>
            <span>图片管理</span>
          </template>
          <el-menu-item index="/images/upload">图片上传</el-menu-item>
          <el-menu-item index="/images/list">图片列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/chat">
          <el-icon><ChatDotSquare /></el-icon>
          <template #title>智能对话</template>
        </el-menu-item>
        <el-menu-item index="/profile">
          <el-icon><setting /></el-icon>
          <template #title>个人设置</template>
        </el-menu-item>
        <el-menu-item index="/setting">
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
.tacWidth {
  width: 12.5rem;
}
.tac {
  user-select: none;
  height: 100vh;
}
.tac .el-menu-vertical {
  height: 100%;
}
</style>
