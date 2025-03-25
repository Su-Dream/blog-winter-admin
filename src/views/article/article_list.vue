<template>
  <div class="article_list">
    <article-toast ref="childRef" />
    <div class="header">
      <!-- 发布文章 -->
      <el-button type="primary" @click="onSendArt">发布文章</el-button>
    </div>
    <div class="main">
      <!-- 文章列表 -->
      <div class="article_list_table">
        <el-divider>文章列表</el-divider>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="true"
            prop="title"
            label="预览图"
          >
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.picture"
                preview-teleported
                :preview-src-list="[scope.row.picture]"
              />
            </template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="title"
            label="标题"
          />
          <el-table-column
            :show-overflow-tooltip="true"
            prop="content"
            label="内容"
          />
          <el-table-column prop="Category" label="分类">
            <template #default="scope">
              <el-tag effect="plain" type="primary">{{
                scope.row.Category.name
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="发布时间" />
          <el-table-column prop="updatedAt" label="更新时间" />
          <!-- 操作功能 -->
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="确定删除该文章吗？"
                @confirm="handleDelete(scope.row)"
              >
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      <!-- 分页 -->
      <el-pagination
        background
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import artApi from "@/apis/article";
import { ref, onMounted } from "vue";
import articleToast from "./components/articleToast.vue";
// 总条数
const total = ref(0);
// 当前页
const page = ref(1);
// 每页条数
const pageSize = ref(5);

// 文章列表
const tableData = ref([]);
const article = ref({});
// 获取文章列表
const getArticleList = async () => {
  const res = await artApi.getUserArtList(page.value, pageSize.value);
  // 格式化时间
  tableData.value = res.data.articles.map(v => ({
    ...v,
    createdAt: v.createdAt.replace(/T|\.\d{3}Z/g, " "),
    updatedAt: v.updatedAt.replace(/T|\.\d{3}Z/g, " "),
  }));
  total.value = res.data.total;
};
// 获取子组件实例
const childRef = ref(null);

// 发布文章
const onSendArt = () => {
  childRef.value.visible = true;
  Object.assign(childRef.value.article, {
    id: "",
    title: "",
    content: "",
    author_id: "",
    category_id: "",
    picture: "",
    createdAt: "",
    updatedAt: "",
    Category: "",
    Tags: [],
  });
};
// 编辑文章
const handleEdit = row => {
  console.log(row, childRef.value);
  // 数据回显
  Object.assign(childRef.value.article, row);
  childRef.value.currentTagList = row.Tags.map(v => v.id);
  childRef.value.visible = true;
};
// 删除文章
const handleDelete = async row => {
  // 删除文章
  console.log(row.id);
  await artApi.deleteArt(row.id);
  getArticleList();
  ElMessage({
    message: "删除文章成功",
    type: "success",
  });
};
// 分页
const handleCurrentChange = size => {
  getArticleList();
};
// 初始化数据
onMounted(() => {
  getArticleList();
});
</script>

<style scoped>
.article_list {
  width: 100%;
  padding: 16px;
  background-color: #fff;
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
}
</style>
