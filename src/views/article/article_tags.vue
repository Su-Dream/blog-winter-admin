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
      <el-table size="large" :data="artTagList" style="width: 100%">
        <el-table-column prop="name" label="标签名称"> </el-table-column>
        <el-table-column prop="inlineCount" label="文章数量">0</el-table-column>
        <el-table-column
          prop="createdAt"
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
import tagApi from "@/apis/tags.js";
const search = ref("");
const tagName = ref("");
const dialogVisible = ref(false);
// ?添加标签
const addArtTag = async () => {
  if (tagName.value === "") {
    ElMessage("标签内容呢？");
    return;
  }
  dialogVisible.value = false;
  // 发送请求添加标签
  const result = await tagApi.addTag(tagName.value);
  console.log("addTag", result);
  // 添加完成后将分类清空然后刷新列表
  get_tag_list();

  // !添加完成后吧标签名清空
  tagName.value = "";
};
// ?删除标签
const handleDelete = async (index, row) => {
  console.log(row.id);
  const result = await tagApi.delType(row.id);
  console.log(result);
  ElMessage("删除成功了捏");
  get_type_list();
};
// *分类列表
let artTagList = ref([]);
// ?获取分类列表
const get_tag_list = async () => {
  const result = await tagApi.getTags();
  console.log(result.data);
  artTagList.value = result.data.tags;
};
get_tag_list();
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
