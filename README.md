# Blog Winter Admin

一个基于 Vue 3 的现代化博客后台管理系统。

## 功能特性

- 📝 文章管理

  - 文章的增删改查
  - 支持 Markdown 编辑器
  - 文章分类和标签管理
  - 文章封面图上传
  - AI 智能生成文章描述

- 👥 用户管理

  - 用户信息管理
  - 用户权限控制
  - 用户封禁功能

- ⚙️ 系统设置

  - 网站基本信息配置
  - 网站公告管理
  - SEO 优化设置
  - 备案信息管理

## 技术栈

- 前端框架：Vue 3
- UI 组件库：Element Plus
- 状态管理：Pinia
- 路由管理：Vue Router
- HTTP 客户端：Axios
- Markdown 编辑器：md-editor-v3
- 图表库：ECharts
- 构建工具：Vite

## 安装说明

1. 克隆项目

```bash
git clone [项目地址]
cd blog-winter-admin
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

## 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 项目结构

```
blog-winter-admin/
├── src/
│   ├── apis/          # API 接口
│   ├── components/    # 公共组件
│   ├── routes/        # 路由配置
│   ├── stores/        # Pinia 状态管理
│   ├── utils/         # 工具函数
│   └── views/         # 页面组件
├── public/            # 静态资源
└── package.json       # 项目配置
```

## 使用说明

1. 登录系统

   - 使用管理员账号密码登录
   - 支持记住密码功能
   - 提供密码找回功能

2. 文章管理

   - 点击"发布文章"创建新文章
   - 支持文章分类和标签设置
   - 可上传文章封面图
   - 使用 Markdown 编辑器编写内容
   - 支持 AI 智能生成文章描述

3. 用户管理

   - 查看用户列表
   - 管理用户权限
   - 封禁/解封用户

4. 系统设置
   - 配置网站基本信息
   - 管理网站公告
   - 设置 SEO 信息
   - 配置备案信息

## 许可证

本项目采用 MIT 许可证
