<template>
  <el-dialog v-model="visible" title="文章详情" width="70%">
    <el-form :model="article" label-width="120px">
      <el-form-item>
        <custom-upload @upload="onUpload" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="article.category_id" placeholder="请选择分类">
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
          @change="onChangeTag"
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
        <edit-text v-model="article.content" />
      </el-form-item>
      <el-form-item>
        <div style="margin-left: auto">
          <el-button type="primary" @click="onSubmit">保存文章</el-button>
          <el-button type="info" @click="() => (visible = false)">
            取消
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import categoryApi from "@/apis/types";
import tagApi from "@/apis/tags";
import customUpload from "./customUpload.vue";
import editText from "@/components/edit/editText.vue";

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
// 标签选择变化
const onChangeTag = () => {
  article.value.Tags = currentTagList.value;
};
// 文章模态框状态
const visible = ref(true);
// 文章详情
const article = ref({
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
// 暴露子组件的文章实例和模态框状态
defineExpose({
  article,
  visible,
  currentTagList,
});
// 更新/发布文章
const onSubmit = () => {
  console.log(article.value);
};

// 初始化数据
onMounted(() => {
  getCategoryList();
  getTagList();
});
// 上传封面图成功
const onUpload = url => {
  console.log(url);
  article.value.picture = url;
  console.log(article.value);
};
</script>
