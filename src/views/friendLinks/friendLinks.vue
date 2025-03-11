<script setup>
import { ElMessage } from "element-plus";
import Dialog from "./components/dialog.vue";
import { ref } from "vue";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
// 搜索输入
const input = ref("");
// 添加友链的组件状态
const dialogVisible = ref(false);
// 搜索友链
const onSearch = async () => {
  ElMessage.success("搜索触发成功");
};
// 添加触发成功
const onAddLink = async () => {
  ElMessage.success("添加触发成功");
};
const dialogRef = ref();
// 打开添加友链成功
const onOpenAddLink = async () => {
  ElMessage.success("打开添加友链成功");
  dialogVisible.value = true;
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
    <Dialog ref="dialogRef" />
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
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="{ row }">
              <el-button type="primary">修改</el-button>
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
    <!-- 分页信息 -->
    <div class="footer">
      <div class="pagin">
        <el-pagination
          size="small"
          background
          layout="prev, pager, next"
          :total="100"
          :default-page-size="5"
          :hide-on-single-page="true"
          class="mt-4"
          @current-change="onChange"
        />
      </div>
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
