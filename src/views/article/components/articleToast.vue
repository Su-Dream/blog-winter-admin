<template>
  <el-dialog v-model="visible" title="文章详情" width="50%">
    <el-form :model="article" label-width="120px">
      <el-form-item>
        <custom-upload @upload="onUpload" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="article.Category.id" placeholder="请选择分类">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          multiple
          :multiple-limit="3"
          v-model="currentTagList"
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="article.content" type="textarea" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import categoryApi from "@/apis/types";
import tagApi from "@/apis/tags";
import customUpload from "./customUpload.vue";
// 分类列表
const categoryList = ref([]);
// 标签列表
const tagList = ref([]);
// 当前标签列表
const currentTagList = ref([]);
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

// 文章模态框状态
const visible = ref(true);
// 文章详情
const article = ref({
  id: "079de155-bdf4-4830-8aac-8d97bf41c336",
  title: "测试文章2",
  content: "今天天气真好2",
  author_id: "22f331ba-1891-4e42-8f3b-5438c56fd146",
  category_id: "340c1db5-8b66-4b8c-a2ed-f33f426382c9",
  picture: "test",
  createdAt: "2024-12-18T08:12:53.000Z",
  updatedAt: "2024-12-18T08:12:53.000Z",
  Category: {
    id: "340c1db5-8b66-4b8c-a2ed-f33f426382c9",
    name: "娱乐",
  },
  Tags: [
    {
      id: "58e8cf41-84fc-4bff-bb12-a23c3e9fe362",
      name: "css",
    },
    {
      id: "921ddf70-488c-4989-8550-1ea2ea41d9bf",
      name: "javascript",
    },
    {
      id: "e509525e-2fe3-46bd-abf5-2c7ec6c521fa",
      name: "html",
    },
  ],
});
// 初始化数据
onMounted(() => {
  getCategoryList();
  getTagList();
  // 初始化标签列表
  currentTagList.value = article.value.Tags.map(v => v.id);
});
// 上传成功
const onUpload = url => {
  console.log(url);
  article.value.picture = url;
  console.log(article.value);
};
</script>
