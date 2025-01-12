<template>
  <div class="setting">
    <div class="top">
      <div class="title">
        <h4>网站全局设置</h4>
      </div>
      <div class="save_btn">
        <el-button type="primary" @click="saveSiteSettingHandler(siteSetting)"
          >保存</el-button
        >
      </div>
    </div>

    <el-divider />
    <div class="site_setting">
      <div class="site_setting_item">
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
        <el-input
          v-model="blogConfig.logo_text"
          placeholder="Please input Site Info"
        />
      </div>
      <div class="site_setting_item">
        <p class="title">
          <span class="site_text">网站meta文本</span>
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
        <el-input
          type="textarea"
          :rows="4"
          v-model="blogConfig.meta_description"
          placeholder="Please input Site Info"
        />
      </div>
      <div class="site_setting_item">
        <p class="title">
          <span class="site_text">网站footer备案信息</span>
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
        <el-input
          v-model="blogConfig.footer_info"
          placeholder="Please input Site Info"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import setApi from "@/apis/outher.js";
const blogConfig = ref({});
async function init() {
  const result = await setApi.getBlogConfig();
  blogConfig.value = result.data.result[0];
  console.log(blogConfig.value.logo_text);
}
init();
// *点击保存的回调
const saveSiteSettingHandler = async config => {
  try {
    // console.log(blogConfig);
    const result = await setApi.updateBlogConfig(blogConfig.value);
    console.log(result);
    console.log(config);
    ElMessage({
      message: "保存成功!",
      type: "success",
      plain: true,
    });
  } catch (error) {
    console.log(error);

    ElMessage({
      message: "保存失败!",
      type: "error",
      plain: true,
    });
  }
};
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
.setting {
  gap: 1.25rem;
}
.site_setting {
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
}
.site_setting_item .title {
  margin-bottom: 0.625rem;
}
.site_text {
  font-size: 0.875rem;
  vertical-align: text-top;
}
</style>
