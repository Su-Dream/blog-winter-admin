<script setup>
import { ElMessage } from "element-plus";
import Dialog from "./components/dialog.vue";
import linkAPI from "@/apis/links.js";
import { onMounted, ref } from "vue";
// 总条数
const total = ref(0);
// 当前页
const page = ref(1);
// 每页条数
const pageSize = ref(5);

// 搜索输入
const input = ref("");
// 展示组件名
const title = ref("");
// 添加友链的组件状态
const dialogVisible = ref(false);
// 搜索友链
const onSearch = async () => {
  filterLinks.value = links.value.filter(v => {
    return v.username.toLowerCase().includes(input.value.toLowerCase());
  });
  if (filterLinks.value.length === 0) {
    ElMessage("没有找到相关信息");
  } else {
    ElMessage.success("搜索成功");
  }
};
// 获取友链信息
const links = ref();
const filterLinks = ref([]);
const getLinkData = async () => {
  const res = await linkAPI.getLinks(page.value, pageSize.value);
  links.value = res.data.links.map(v => ({
    ...v,
    createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
    updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
  }));
  total.value = res.data.total;
};
onMounted(() => {
  getLinkData();
});
// 获取子组件
const dialogRef = ref();
// 打开添加友链成功
const onOpenAddLink = async () => {
  dialogVisible.value = true;
  title.value = "添加友链";
  dialogRef.value.onChangeState(dialogVisible.value);
};
// 更新友链
const onUpdateLink = row => {
  dialogVisible.value = true;
  title.value = "更新友链";
  // 父传子数据回显
  dialogRef.value.formData(row);
  dialogRef.value.onChangeState(dialogVisible.value);
};
// 分页组件改变时
const onChange = async (page, pageSize) => {
  console.log(page, pageSize);
};
</script>
<template>
  <div class="link">
    <!-- 展示组件 -->
    <Dialog :title="title" ref="dialogRef" />
    <!-- 表格头 -->
    <div class="header">
      <!-- 搜索 -->
      <div class="search">
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="请输入你要查询的友链"
        />
        <el-button class="searchBtn" @click="onSearch" type="primary"
          >搜索</el-button
        >
      </div>
      <!-- 添加友链 -->
      <div class="addLink">
        <el-button @click="onOpenAddLink" type="primary">添加友链</el-button>
      </div>
    </div>
    <el-divider> 友链信息 </el-divider>
    <!-- 表格 -->
    <div class="main">
      <div class="table">
        <el-table
          :data="filterLinks.length > 0 ? filterLinks : links"
          border
          style="width: 100%"
          max-height="450"
        >
          <el-table-column prop="username" label="友链名称" width="180" />
          <el-table-column prop="url" label="友链链接" width="180" />
          <el-table-column prop="description" label="友链描述" />
          <el-table-column prop="createdAt" label="创建时间" />

          <el-table-column fixed="right" label="操作" width="160">
            <template #default="{ row }">
              <el-button @click="onUpdateLink(row)" type="primary"
                >修改</el-button
              >
              <el-popconfirm
                @confirm="onRemoveImage(row)"
                @cancel="onCancel()"
                title="是否删除这条友链?"
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
    <!-- 分页 -->
    <div class="footer">
      <el-pagination
        background
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        @current-change="getLinkData"
      />
    </div>
  </div>
</template>

<style scoped>
.link {
  padding: 1rem;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
}
.header .search .searchBtn {
  margin-left: 20px;
}
.footer {
  padding-top: 20px;
  width: fit-content;
  margin-left: auto;
}
</style>
