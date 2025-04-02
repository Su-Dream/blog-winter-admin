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
          prop="createdAt"
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
                  <el-button type="danger"> 删除 </el-button>
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
import { ref, reactive } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import typeApi from "@/apis/types.js";
import { ElMessage } from "element-plus";
const search = ref("");
const typeName = ref("");
const dialogVisible = ref(false);
// 添加分类
const addArtType = async () => {
  if (!typeName.value) {
    ElMessage.error("分类内容不能为空");
    return;
  }
  dialogVisible.value = false;
  // 发送请求添加分类
  const result = await typeApi.addType(typeName.value);
  // ElMessage.success(result.message);
  if (result.code === 200) {
    ElMessage.success(result.message);
  } else {
    ElMessage.error(result.message);
  }
  console.log("addType", result);
  // 添加完成后将分类清空然后刷新列表
  get_type_list();
  typeName.value = "";
};
// 删除分类
const handleDelete = async (index, row) => {
  console.log(row.id);
  try {
    await typeApi.delType(row.id);
    ElMessage("删除分页成功");
  } catch (error) {
    console.log(error);
    ElMessage.error(error.message);
  }
  get_type_list();
};
// 分类列表
let artTypeList = ref([]);
// 获取分类列表
const get_type_list = async () => {
  const result = await typeApi.getTypes();
  console.log(result.data);
  artTypeList.value = result.data.rows.map(v => ({
    ...v,
    createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
    updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
  }));
};
get_type_list();
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
