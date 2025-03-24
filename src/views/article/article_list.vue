<template>
  <div class="article_list">
    <div class="header"></div>
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
              <el-button type="danger" @click="handleDelete(scope.row)"
                >删除</el-button
              >
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
import tagApi from "@/apis/tags";
import categoryApi from "@/apis/types";
import { ref, onMounted } from "vue";

// 总条数
const total = ref(0);
// 当前页
const page = ref(1);
// 每页条数
const pageSize = ref(5);

// 文章列表
const tableData = ref([]);
// 分类列表
const categoryList = ref([]);
// 标签列表
const tagList = ref([]);

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
// 获取分类列表
const getCategoryList = async () => {
  const res = await categoryApi.getTypes();
  categoryList.value = res.data.rows;
};
// 获取标签列表
const getTagList = async () => {
  const res = await tagApi.getTags();
  tagList.value = res.data.tags;
};
// 编辑
const handleEdit = row => {
  console.log(row);
};
// 删除
const handleDelete = row => {
  console.log(row);
};
// 分页
const handleCurrentChange = size => {
  getArticleList();
};
// 初始化数据
onMounted(() => {
  Promise.all([getArticleList(), getCategoryList(), getTagList()]);
});
</script>

<style scoped>
.article_list {
  width: 100%;
  padding: 8px 0;
  background-color: #fff;
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
}
</style>
