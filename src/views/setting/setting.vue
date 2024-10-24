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
      <div
        class="site_setting_item"
        v-for="(item, index) in siteSetting"
        :key="index"
      >
        <p class="title">
          <span class="site_text">{{ item.title }}</span>
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="item.tips"
            placement="top"
          >
            <span
              ><el-icon size="16"><InfoFilled /></el-icon
            ></span>
          </el-tooltip>
        </p>
        <el-input
          :type="index === 1 ? 'textarea' : 'text'"
          :rows="4"
          v-model="item.content"
          placeholder="Please input Site Info"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { reactive } from "vue";

// *站点配置信息
const siteSetting = reactive([
  {
    title: "网站LOGO文本",
    content: `链星域`,
    tips: "支持HTML",
  },
  {
    title: "网站meta文本",
    content: `欢迎来到链星域
探索Web技术的新大地
技术交流的港湾
技术爱好者的聚集地`,
    tips: "请使用换行区分每一条语句",
  },
  {
    title: "网站footer备案信息",
    content: "赣ICP备2024044145号",
    tips: "支持HTML",
  },
]);
// *点击保存的回调
const saveSiteSettingHandler = config => {
  // todo:保存到数据库
  if (true) {
    console.log(config);
    ElMessage({
      message: "保存成功!",
      type: "success",
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
