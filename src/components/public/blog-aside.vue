<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="0">
          <el-icon><House /></el-icon>
          <span>主页</span>
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
          <span>评论管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Link /></el-icon>
          <span>友链管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><Picture /></el-icon>
          <span>图片管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><setting /></el-icon>
          <span>网站设置</span>
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
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.tac {
  height: 100vh;
}
.tac .el-menu-vertical {
  height: 100%;
}
</style>
