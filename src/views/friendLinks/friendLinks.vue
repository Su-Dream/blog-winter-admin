<template>
  <div class="friendLinks">
    <div class="friendLinks_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询链接的用户名"
      >
      </el-input>
    </div>
    <el-divider />
    <div class="friendLinks_list">
      <el-table size="large" :data="filterFLData" style="width: 100%">
        <el-table-column width="120px" prop="firendName" label="友链用户">
        </el-table-column>
        <el-table-column prop="links" label="友链地址"> </el-table-column>
        <el-table-column prop="content" label="友链介绍"> </el-table-column>
        <el-table-column label="是否停用" prop="isBan">
          <template #default="scope">
            <el-switch v-model="scope.row.isBan" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="edit">
              <!-- <el-link
                :underline="false"
                :icon="Edit"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
              >
                编辑
              </el-link> -->
              <el-popconfirm
                title="确定删除这条友链"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-link :underline="false" :icon="Delete" type="danger">
                    删除
                  </el-link>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
// *过滤搜索
const search = ref("");
const filterFLData = computed(() =>
  friendLinkList.filter(
    data =>
      !search.value ||
      data.firendName.toLowerCase().includes(search.value.toLowerCase())
  )
);

// ?删除友链
const handleDelete = (index, row) => {
  console.log(index, row);
};
// *友链列表
const friendLinkList = reactive([
  {
    firendName: "张三",
    links: "https://www.baidu.com",
    content: "这是一个友链",
    isBan: false,
  },
  {
    firendName: "李四",
    links: "https://www.baidu.com",
    content: "一腔青云之志，正待梦日之时",
    isBan: false,
  },
  {
    firendName: "王五",
    links: "https://www.baidu.com",
    content: "勤能补拙",
    isBan: true,
  },
]);
</script>

<style scoped>
.friendLinks {
  padding: 1rem;
  width: 100%;
  background-color: #fff;
}
.edit {
  display: flex;
  column-gap: 1.25rem;
  justify-content: start;
}
</style>
