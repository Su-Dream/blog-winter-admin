import BlogLogin from "@/views/login/blog-Login.vue";
import BlogHome from "@/views/Home/blog-Home.vue";
import Account from "@/views/account/account_admin.vue";
import ArtList from "@/views/article/article_list.vue";
import ArtTags from "@/views/article/article_tags.vue";
import ArtTypes from "@/views/article/article_types.vue";
import ImgUpload from "@/views/images/imagesUpload.vue";
import ImgList from "@/views/images/images.vue";
import FriendLinks from "@/views/friendLinks/friendLinks.vue";
import Setting from "@/views/setting/setting.vue";
import Profile from "@/views/profile/profile.vue";
import Chat from "@/views/chat/chat.vue";
export const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    component: BlogLogin,
    meta: { title: "登录", requiresAuth: false },
  },
  {
    path: "/home",
    component: BlogHome,
    meta: { title: "首页", requiresAuth: false, role: ["user", "admin"] },
  },
  {
    path: "/account",
    component: Account,
    meta: { title: "账号管理", requiresAuth: true, role: ["user", "admin"] },
  },
  {
    path: "/article",
    meta: { title: "文章管理", requiresAuth: true, role: ["admin"] },
    children: [
      {
        path: "list",
        component: ArtList,
        meta: { title: "文章列表", requiresAuth: true, role: ["admin"] },
      },
      {
        path: "tags",
        component: ArtTags,
        meta: { title: "标签列表", requiresAuth: true, role: ["admin"] },
      },
      {
        path: "types",
        component: ArtTypes,
        meta: { title: "分类列表", requiresAuth: true, role: ["admin"] },
      },
    ],
  },
  {
    path: "/images",
    meta: { title: "图片管理", requiresAuth: true, role: ["admin"] },
    children: [
      {
        path: "upload",
        component: ImgUpload,
        meta: { title: "图片上传", requiresAuth: true, role: ["admin"] },
      },
      {
        path: "list",
        component: ImgList,
        meta: { title: "图片列表", requiresAuth: true, role: ["admin"] },
      },
    ],
  },
  {
    path: "/friendLinks",
    component: FriendLinks,
    meta: { title: "友链管理", requiresAuth: true, role: ["admin"] },
  },
  {
    path: "/chat",
    component: Chat,
    meta: { title: "智能对话", requiresAuth: true, role: ["user", "admin"] },
  },
  {
    path: "/setting",
    component: Setting,
    meta: { title: "网站设置", requiresAuth: true, role: ["admin"] },
  },
  {
    path: "/profile",
    component: Profile,
    meta: { title: "个人信息", requiresAuth: true, role: ["user", "admin"] },
  },
];
