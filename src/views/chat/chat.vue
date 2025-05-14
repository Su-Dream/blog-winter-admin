<template>
  <div class="chat-container">
    <!-- 聊天界面头部 -->
    <div class="chat-header">
      <h2>{{ selectedModel }}</h2>
      <div class="header-controls">
        <el-button type="danger" size="small" @click="clearChatHistory">
          清空聊天记录
        </el-button>
        <el-select
          v-model="selectedModel"
          placeholder="请选择模型"
          class="model-select"
        >
          <el-option
            v-for="model in modelOptions"
            :key="model.value"
            :label="model.label"
            :value="model.value"
          />
        </el-select>
      </div>
    </div>

    <!-- 聊天消息区域 -->
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.role]"
      >
        <div
          class="content"
          :style="message.role === 'user' ? 'margin-left: auto;' : ''"
        >
          <div v-if="message.role === 'assistant'" class="role"></div>
          <div class="text">
            <!-- 用户消息直接显示文本 -->
            <template v-if="message.role === 'user'">
              <div class="user-message">{{ message.content }}</div>
            </template>
            <!-- AI消息使用Markdown渲染 -->
            <template v-else>
              <MdPreview
                v-if="message.reasoning"
                :id="id + '-reasoning'"
                :modelValue="message.reasoning"
              />
              <MdPreview
                v-if="message.content"
                :id="id + '-content'"
                :modelValue="message.content"
              />
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input">
      <el-input
        v-model="userInput"
        type="textarea"
        :rows="3"
        placeholder="请输入您的问题..."
        resize="none"
        @keydown.enter.prevent="sendMessage"
      />
      <el-button
        type="primary"
        :disabled="!userInput.trim()"
        @click="sendMessage"
      >
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";
import { ref, reactive, onMounted, nextTick, computed, watch } from "vue";
import { ElMessage } from "element-plus";
const BASEURL = import.meta.env.VITE_SERVER_URL + "llm/chat";
import { getUserToken } from "@/utils/util";
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();
console.log(profileStore.profile.UserProfile.avatar);

import { MdPreview } from "md-editor-v3";
// preview.css相比style.css少了编辑器那部分样式
import "md-editor-v3/lib/preview.css";
const id = "preview-only";

// 定义响应式变量
const userInput = ref(""); // 用户输入
const messagesContainer = ref(null); // 消息容器引用
const messages = ref([]); // 聊天消息列表
const selectedModel = ref("deepseek-ai/DeepSeek-R1"); // 默认选择的模型

// 可选模型列表
const modelOptions = [
  { label: "DeepSeek-R1", value: "deepseek-ai/DeepSeek-R1" },
  { label: "DeepSeek-V3", value: "deepseek-ai/DeepSeek-V3" },
  { label: "Qwen-Max", value: "Qwen/QwQ-32B" },
];

// 格式化消息内容，将换行符转换为<br>标签
const formatMessage = content => {
  if (!content) return "";
  return content.replace(/\n/g, "<br>");
};

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // 添加用户消息到聊天列表
  messages.value.push({
    role: "user",
    content: userInput.value,
  });

  // 清空输入框并滚动到底部
  const userMessage = userInput.value;
  userInput.value = "";
  scrollToBottom();

  try {
    // 准备请求参数
    const option = {
      method: "POST",
      stream: true, // 启用流式传输
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        model: selectedModel.value,
      }),
    };

    // 创建临时的响应内容变量
    let responseContent = "";
    let reasoningContent = "";

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
              reasoningContent += jsonData.choices[0].delta.reasoning_content;
            } else {
              responseContent += jsonData.choices[0].delta.content;
            }

            // 更新AI助手的回复内容
            if (
              messages.value.length > 0 &&
              messages.value[messages.value.length - 1].role === "assistant"
            ) {
              messages.value[messages.value.length - 1].content =
                responseContent;
              messages.value[messages.value.length - 1].reasoning =
                reasoningContent;
            } else {
              // 如果最后一条不是AI消息，添加一条新的AI消息
              messages.value.push({
                role: "assistant",
                content: responseContent,
                reasoning: reasoningContent,
              });
            }
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
      scrollToBottom();
    }
  } catch (error) {
    console.error("聊天请求失败:", error);
    ElMessage.error("发送消息失败，请稍后重试");

    // 添加错误消息
    messages.value.push({
      role: "assistant",
      content: "抱歉，我遇到了一些问题，无法回应您的请求。",
    });
  } finally {
    scrollToBottom();
  }
};

// 保存聊天记录到本地存储
const saveChatHistory = () => {
  const chatHistory = {
    messages: messages.value,
    model: selectedModel.value,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
};

// 从本地存储加载聊天记录
const loadChatHistory = () => {
  const savedHistory = localStorage.getItem("chatHistory");
  if (savedHistory) {
    try {
      const history = JSON.parse(savedHistory);
      messages.value = history.messages;
      selectedModel.value = history.model;
      scrollToBottom();
    } catch (e) {
      console.error("加载聊天记录失败:", e);
      ElMessage.warning("加载历史聊天记录失败");
    }
  }
};

// 清空聊天记录
const clearChatHistory = () => {
  messages.value = [];
  localStorage.removeItem("chatHistory");
  ElMessage.success("聊天记录已清空");
};

// 监听消息变化，自动保存
watch(
  messages,
  () => {
    saveChatHistory();
  },
  { deep: true }
);

// 监听模型变化，自动保存
watch(selectedModel, () => {
  saveChatHistory();
});

// 组件挂载时执行
onMounted(() => {
  loadChatHistory();
  // 如果没有历史记录，添加欢迎消息
  if (messages.value.length === 0) {
    messages.value.push({
      role: "assistant",
      content: "你好！有什么我可以帮助你的吗？",
    });
  }
});
</script>

<style scoped>
/* 聊天容器样式 */
.chat-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
  height: 100%;
  max-height: calc(100vh - 110px);
  background-color: #f2f6fc;
  /* padding: 20px; */
  box-sizing: border-box;
}

/* 聊天头部样式 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #79a5ff;
  margin-bottom: 20px;
}

.header-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.model-select {
  width: 200px;
}

/* 聊天消息区域样式 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #f2f6fc;
  border-radius: 8px;
}

/* 消息样式 */
.message {
  display: flex;
  margin-bottom: 15px;
}

.message .avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.message .content {
  background-color: #f2f6fc;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
}

.message.user .content {
  background-color: #ecf5ff;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
}

.message .role {
  font-weight: bold;
  margin-bottom: 5px;
  color: #606266;
}

.message .text {
  line-height: 20px;
  /* white-space: pre-wrap; */
  word-break: break-word;
}
#preview-only-reasoning :deep(.md-editor-preview) {
  font-size: 14px;
  color: #999;
  padding-left: 14px;
  border-left: 5px solid #ddd;
}

@keyframes dot-flashing {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

/* 输入区域样式 */
.chat-input {
  display: flex;
  gap: 10px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chat-input .el-input {
  flex: 1;
}

.chat-input .el-button {
  align-self: flex-end;
}

.user-message {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
