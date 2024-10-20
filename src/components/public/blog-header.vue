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
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"> Home</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">test</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :offset="9" :span="1">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="40" :src="circleUrl" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { Grid, HomeFilled, Menu } from "@element-plus/icons-vue";
import { reactive, markRaw, ref, toRefs } from "vue";
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  sizeList: ["small", "", "large"],
});
const { circleUrl } = toRefs(state);

// ?:点击切换侧边栏

import EventBus from "@/utils/event-bus.js";
const isCollapse = ref(true);
const titleValue = ref("星域");
const isIcon = ref(markRaw(Grid));
const changeCollapseHandler = obj => {
  console.log(`changeCollapseHandler被执行了，数据为${obj}`);
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
</script>

<style scoped>
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
