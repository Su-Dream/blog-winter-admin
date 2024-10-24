<template>
  <div class="setting">
    <div class="top">
      <div class="title">
        <h4>网站全局设置</h4>
      </div>
      <div class="save_btn">
        <el-button type="primary">保存</el-button>
      </div>
    </div>

    <el-divider />
    <div class="site_setting">
      <div
        class="site_setting_item"
        v-for="(item, index) in siteSetting"
        :key="index"
      >
        <p class="title">
          <span class="site_text">网站LOGO文本</span>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="支持HTML"
            placement="top"
          >
            <span
              ><el-icon size="16"><InfoFilled /></el-icon
            ></span>
          </el-tooltip>
        </p>
        <el-input v-model="input" placeholder="Please input" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { reactive } from "vue";

const siteSetting = reactive([
  {
    title: "网站LOGO文本",
    site_header: "",
    tips: "",
  },
  {
    title: "网站meta文本",
    site_meta: "",
    tips: "",
  },
  {
    title: "网站footer备案信息",
    site_footer: "",
    tips: "",
  },
]);
</script>

<style scoped>
.setting {
  padding: 1.5rem;
  background-color: #fff;
  width: 100%;
}
.setting .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.setting .site_setting_item {
  display: flex;
  flex-flow: column nowrap;
}
.site_setting_item .title {
  margin-top: 1.25rem;
  margin-bottom: 0.625rem;
}
.site_text {
  font-size: 0.875rem;
  vertical-align: text-top;
}
</style>
