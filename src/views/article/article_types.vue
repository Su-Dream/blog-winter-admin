<template>
  <div class="art_types">
    <div class="art_types_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询的分类名"
      >
      </el-input>
    </div>
    <el-divider />
    <div class="art_add_type">
      <el-button type="primary" @click="dialogVisible = true">
        添加分类
      </el-button>
      <el-dialog v-model="dialogVisible" title="新增分类" width="500">
        <el-form-item label="分类名称:">
          <el-input v-model="typeName" placeholder="请输入需要添加的分类名">
          </el-input>
        </el-form-item>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addArtType()"> OK </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="art_types_list">
      <el-table size="large" :data="artTypeList" style="width: 100%">
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <el-table-column
          prop="createDate"
          sortable
          label="创建时间"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="edit">
              <el-popconfirm
                title="确定删除这个分类?不可恢复!"
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
import { ref } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
const search = ref("");
const typeName = ref("");
const dialogVisible = ref(false);
// ?添加分类
const addArtType = () => {
  if (typeName.value === "") {
    return;
  }
  dialogVisible.value = false;
  // todo:发送请求添加分类
  console.log("addArtType");

  // !添加完成后将分类清空
  typeName.value = "";
};
// ?删除分类
const handleDelete = (index, row) => {
  console.log(index, row);
};
// *分类列表
const artTypeList = [
  {
    id: 1,
    name: "web",
    createDate: "2023-06-01",
  },
  {
    id: 2,
    name: "java",
    createDate: "2023-01-21",
  },
  {
    id: 3,
    name: "node",
    createDate: "2024-09-25",
  },
];
</script>

<style scoped>
.art_types {
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
