<script setup>
import { useUserStore } from "./stores/user";
import blogAside from "./components/public/blog-aside.vue";
import blogHeader from "./components/public/blog-header.vue";
import blogHome from "./views/Home/blog-Home.vue";
import blogLogin from "./views/login/blog-Login.vue";
import { computed } from "vue";

const userStore = useUserStore();
const isLoggedIn = computed(() => {
  return userStore.role === "admin" ? true : false;
});
</script>

<template>
  <div class="common-layout">
    <blogLogin v-if="!isLoggedIn" />
    <el-container v-else>
      <el-aside width="auto" class="blog_aside">
        <blogAside />
      </el-aside>
      <el-container>
        <el-header height="70px" class="blog_header">
          <blogHeader />
        </el-header>
        <el-main>
          <router-view />
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
