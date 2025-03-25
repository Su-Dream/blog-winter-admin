<template>
  <el-dialog v-model="visible" title="文章详情" width="70%">
    <el-form :model="article" label-width="120px">
      <el-form-item>
        <custom-upload ref="customUploadRef" @upload="onUpload" />
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
          <el-button type="primary" @click="onSubmit">
            {{ article.id ? "更新文章" : "发布文章" }}
          </el-button>
          <el-button type="info" @click="() => (visible = false)">
            取消
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import categoryApi from "@/apis/types";
import tagApi from "@/apis/tags";
import articleApi from "@/apis/article";
import customUpload from "./customUpload.vue";
import editText from "@/components/edit/editText.vue";
import { isUrl } from "@/utils/util";

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
const visible = ref(false);
const customUploadRef = ref(null);
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
// 校验发布时候的必填项
const validataArt = () => {
  const validataList = ["title", "category_id", "content"];
  for (const item of validataList) {
    if (article.value[item].trim() == "") {
      ElNotification({
        title: "Warning",
        message: `标题|内容|分类不能为空`,
        type: "warning",
      });
      return false;
    }
  }
  return true;
};
// 更新/发布文章
const onSubmit = async () => {
  if (!validataArt()) {
    return;
  }
  // 如果有id，则是更新文章
  if (article.value.id) {
    const params = {
      id: article.value.id,
      title: article.value.title,
      content: article.value.content,
      category_id: article.value.category_id,
      picture: article.value.picture,
      tags: article.value.Tags,
    };
    console.log("更新文章", params);
    // 更新文章
    await articleApi.updateArt(params);
    ElMessage({
      message: "更新文章成功",
      type: "success",
    });
  } else {
    // 发布文章
    await articleApi.addArt(article.value);
    ElMessage({
      message: "发布文章成功",
      type: "success",
    });
  }
  visible.value = false;
  // 刷新文章列表
  getArticleList();
};

// 同步封面图
watch(visible, () => {
  // console.log(isUrl(article.value.picture));
  // console.log(customUploadRef.value);
  // 没有实例化上传组件就不同步
  if (!customUploadRef.value) return;
  if (visible.value && isUrl(article.value.picture)) {
    customUploadRef.value.defaultImage = article.value.picture;
  } else {
    customUploadRef.value.defaultImage = "";
  }
});

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
