<script setup>
import blogAside from "./components/public/blog-aside.vue";
import blogHeader from "./components/public/blog-header.vue";
import blogHome from "./views/Home/blog-Home.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <blogAside />
      </el-aside>
      <el-container>
        <el-header height="70px" class="blog_header">
          <blogHeader />
        </el-header>
        <el-main>
          <blogHome />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.blog_header {
  background: #fff;
}
</style>
