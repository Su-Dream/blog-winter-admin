import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "@/routes/index";
import App from "./App.vue";
import ElementPlus from "element-plus";

import "./style.css";
import "element-plus/dist/index.css";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
// 全局配置表单尺寸
app.use(ElementPlus, { size: "default", zIndex: 3000 });
app.use(pinia);
app.use(router);
app.mount("#app");
