<template>
  <div class="art_tags">
    <div class="art_tags_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询的标签名"
      >
      </el-input>
    </div>
    <el-divider />
    <div class="art_add_tag">
      <el-button type="primary" @click="dialogVisible = true">
        添加标签
      </el-button>
      <el-dialog v-model="dialogVisible" title="新增标签" width="500">
        <el-form-item label="标签名称:">
          <el-input v-model="tagName" placeholder="请输入需要添加的标签名">
          </el-input>
        </el-form-item>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="addArtTag()"> OK </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="art_tags_list">
      <el-table size="large" :data="artTagsList" style="width: 100%">
        <el-table-column prop="name" label="标签名称"> </el-table-column>
        <el-table-column prop="inlineCount" label="文章数量"> </el-table-column>
        <el-table-column
          prop="createDate"
          sortable
          label="创建时间"
        ></el-table-column>
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
                title="确定删除这个标签?不可恢复!"
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
const tagName = ref("");
const dialogVisible = ref(false);
// ?添加标签
const addArtTag = () => {
  if (tagName.value === "") {
    return;
  }
  dialogVisible.value = false;
  // todo:发送请求添加标签
  console.log("addArtTag");

  // !添加完成后吧标签名清空
  tagName.value = "";
};
// ?删除标签
const handleDelete = (index, row) => {
  console.log(index, row);
};
// *标签列表
const artTagsList = [
  {
    id: 1,
    name: "web",
    inlineCount: "1",
    createDate: "2023-06-01",
  },
  {
    id: 2,
    name: "java",
    inlineCount: "1",
    createDate: "2023-01-21",
  },
  {
    id: 3,
    name: "node",
    inlineCount: "2",
    createDate: "2024-09-25",
  },
];
</script>

<style scoped>
.art_tags {
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
