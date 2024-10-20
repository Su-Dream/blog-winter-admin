<script setup>
import blogAside from "./components/public/blog-aside.vue";
import blogHeader from "./components/public/blog-header.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <blogAside />
      </el-aside>
      <el-container>
        <el-header>
          <blogHeader />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped></style>
