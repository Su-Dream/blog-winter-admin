<template>
  <el-dialog
    :fullscreen="true"
    :close-on-press-escape="true"
    v-model="visible"
    class="dialogBox"
    title="文章详情"
    width="70%"
  >
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
      <el-form-item label="描述">
        <el-input
          style="width: 440px"
          :autosize="{ minRows: 3, maxRows: 3 }"
          type="textarea"
          placeholder="请输入文章描述"
          v-model="article.description"
          :disabled="isGeneratingDescription"
        />
        <div
          style="margin-left: 10px; cursor: pointer"
          class="icon-ai"
          @click="generateAIDescription"
        >
          <svg
            t="1743495087951"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="13718"
            width="32"
            height="32"
          >
            <path
              d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m0 85.333334a341.333333 341.333333 0 1 0 0 682.666666 341.333333 341.333333 0 0 0 0-682.666666z m-40.405333 156.586666l121.856 369.706667h-83.968l-27.050667-89.685333H361.898667l-27.648 89.685333H256L378.453333 327.253333h93.141334z m256.213333 0v369.706667h-78.549333V327.253333h78.506666z m-303.36 75.562667H420.693333l-43.306666 144.64h89.898666L424.448 402.773333z"
              fill="#333333"
              p-id="13719"
            ></path>
          </svg>
          <div v-if="isGeneratingDescription" class="loading-spinner"></div>
        </div>
        <div v-if="descriptionError" class="error-message">
          {{ descriptionError }}
        </div>
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
import { isUrl, getUserToken } from "@/utils/util";
// 分类列表
const categoryList = ref([]);
// 标签列表
const tagList = ref([]);
// 当前标签列表
const currentTagList = ref([]);
// 描述错误信息
const descriptionError = ref("");
// AI生成描述中状态
const isGeneratingDescription = ref(false);
// 获取分类列表
const getCategoryList = async () => {
  const res = await categoryApi.getTypes();
  categoryList.value = res.data.categories;
};
// 获取标签列表
const getTagList = async () => {
  const res = await tagApi.getTags();
  tagList.value = res.data.tags;
};
// 标签选择变化
const onChangeTag = () => {
  article.value.Tags = currentTagList.value;
  console.log("article.value.Tags", article.value.Tags);
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
// 暴露子组件的文章实例和模态框状态以及同步图片方法
defineExpose({
  article,
  visible,
  currentTagList,
  syncImage: () => {
    if (customUploadRef.value && isUrl(article.value.picture)) {
      customUploadRef.value.defaultImage = article.value.picture;
    }
  },
});
// 接收父组件传递的方法
const emit = defineEmits(["referList"]);
// 校验发布时候的必填项
const validataArt = () => {
  let isValid = true;
  const validataList = ["title", "category_id", "content"];
  for (const item of validataList) {
    if (article.value[item].trim() == "") {
      ElNotification({
        title: "Warning",
        message: `标题|内容|分类不能为空`,
        type: "warning",
      });
      isValid = false;
      break;
    }
  }
  return isValid;
};

// llm请求地址
const BASEURL = import.meta.env.VITE_SERVER_URL + "llm/chat";
// 生成AI描述
const generateAIDescription = async () => {
  if (!article.value.content) {
    ElMessage({
      message: "请先填写文章内容",
      type: "warning",
    });
    return;
  }

  try {
    isGeneratingDescription.value = true;
    // 准备请求参数
    const option = {
      method: "POST",
      stream: true, // 启用流式传输
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `请你将以下内容生成一段摘要，摘要不超过100字,并且不需要出现与摘要无关的词，包括后面的（199字）：${article.value.content}`,
        model: "deepseek-ai/DeepSeek-V3",
      }),
    };

    // 创建一个临时的响应内容变量
    let responseContent = "";

    // 发送请求并处理流式响应
    const response = await fetch(BASEURL, option);
    console.log("response", response);
    // 处理流式响应数据
    // 检查响应状态
    if (!response.ok) {
      ElMessage.error("发送消息失败，请稍后重试");
      return;
    }

    // 获取响应的可读流
    const reader = response.body.getReader();
    // 解码器
    const decoder = new TextDecoder("utf-8");

    // 读取流中的数据
    while (true) {
      const { done, value } = await reader.read();
      // 如果数据读取完则退出循环
      if (done) break;

      // 解码并发送给客户端
      const chunk = decoder.decode(value, { stream: true });
      // console.log("chunk", chunk);

      // 解析数据流中的JSON数据
      const lines = chunk.split("\n").filter(line => line.trim() !== "");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          // 检查是否是结束标记
          if (line.includes("[DONE]")) {
            console.log("传输流结束");
            continue;
          }
          try {
            // 解析JSON数据
            const jsonData = JSON.parse(line.substring(6));
            if (jsonData.choices[0].delta.reasoning_content !== null) {
              responseContent += jsonData.choices[0].delta.reasoning_content;
            } else {
              responseContent += jsonData.choices[0].delta.content;
            }

            // 更新描述内容
            article.value.description = responseContent;
            console.log(article.value.description);
          } catch (e) {
            console.error(
              "解析JSON数据失败:",
              e,
              "原始数据:",
              line.substring(6)
            );
          }
        }
      }
    }

    descriptionError.value = "";
  } catch (error) {
    console.error("生成AI描述失败:", error);
    ElMessage({
      message: "生成AI描述失败，请稍后重试",
      type: "error",
    });
  } finally {
    isGeneratingDescription.value = false;
  }
};

// 更新/发布文章
const onSubmit = async () => {
  console.log(article.value);

  if (!validataArt()) {
    return;
  }
  // 如果有id，则是更新文章
  if (article.value.id) {
    console.log("文章更新了");
    const params = {
      id: article.value.id,
      title: article.value.title,
      content: article.value.content,
      category_id: article.value.category_id,
      picture: article.value.picture,
      tags: currentTagList.value || article.value.Tags,
      description: article.value.description,
    };
    console.log("更新文章", params);
    // 更新文章
    await articleApi.updateArt(params);
    ElMessage({
      message: "更新文章成功",
      type: "success",
    });
  } else {
    const params = {
      ...article.value,
      tags: article.value.Tags,
    };
    console.log("发布文章", params);
    // 发布文章
    await articleApi.addArt(params);
    ElMessage({
      message: "发布文章成功",
      type: "success",
    });
  }
  // 刷新文章列表
  emit("referList");
  visible.value = false;
};

// 同步封面图
watch(
  visible,
  newVal => {
    // 没有实例化上传组件就不同步
    if (!customUploadRef.value) return;

    if (newVal && isUrl(article.value.picture)) {
      // 当对话框打开且有有效图片URL时，更新上传组件的默认图片
      customUploadRef.value.defaultImage = article.value.picture;
    } else if (!newVal) {
      // 当对话框关闭时，重置上传组件的默认图片
      customUploadRef.value.defaultImage = "";
    }
  },
  { immediate: true }
);

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

<style scoped>
.dialogBox {
  transform: scale(0.8) !important;
  color: aqua;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}

.icon-ai {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
