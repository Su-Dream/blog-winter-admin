<template>
  <el-row class="row-bg" align="middle">
    <el-col :span="2" class="aside-control">
      <el-button class="aside-control-btn" type="primary" :icon="Grid" />
    </el-col>
    <el-col :span="12">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">test</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :offset="9" :span="1">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { Grid } from "@element-plus/icons-vue";
import { reactive, toRefs } from "vue";
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  sizeList: ["small", "", "large"],
});
const { circleUrl } = toRefs(state);

// todo:点击切换侧边栏
</script>

<style scoped>
.aside-control .aside-control-btn {
  height: 100%;
}
.el-button--small {
  font-size: 1.2rem;
}
.el-row {
  height: 100%;
  margin: 10px 0;
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
