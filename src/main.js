import { createApp } from "vue";
// import { router } from "@/routes/index";
import App from "./App.vue";
import "./style.css";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

const app = createApp(App);
// 全局配置表单尺寸
app.use(ElementPlus, { size: "small", zIndex: 3000 });
// app.use(router);
app.mount("#app");
