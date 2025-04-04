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
      <!-- 添加分类弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        :title="params.id == '' ? '添加分类' : '编辑分类'"
        width="500"
      >
        <el-form-item label="分类名称:">
          <el-input
            v-model="typeName"
            :placeholder="
              params.id == ''
                ? '请输入需要添加的分类名'
                : '请输入需要修改的分类名'
            "
          >
          </el-input>
        </el-form-item>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submitArtType()"> OK </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="art_types_list">
      <el-table size="large" :data="filteredArtTypeList" style="width: 100%">
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <el-table-column
          prop="createdAt"
          sortable
          label="创建时间"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="edit">
              <el-button
                type="primary"
                @click="editArtType(scope.$index, scope.row)"
                >编辑</el-button
              >
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
    <!-- 分页 -->
    <div class="footer">
      <el-pagination
        background
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="total"
        @current-change="get_type_list"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import typeApi from "@/apis/types.js";
import { ElMessage } from "element-plus";
const search = ref("");
const typeName = ref("");
// 总条数
const total = ref(0);
// 当前页
const page = ref(1);
// 每页条数
const pageSize = ref(5);
const dialogVisible = ref(false);
const params = ref({
  id: "",
  name: "",
});
// 搜索功能
const filteredArtTypeList = computed(() => {
  if (!search.value) {
    return artTypeList.value;
  }
  return artTypeList.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

// 统一提交分类
const submitArtType = async () => {
  if (!typeName.value) {
    ElMessage.error("分类内容不能为空");
    return;
  }
  // 判断是添加还是编辑
  if (params.value.id) {
    // 编辑分类
    await typeApi.updateType({ id: params.value.id, name: typeName.value });
    ElMessage.success("编辑分类成功");
    params.value.id = "";
    params.value.name = "";
  } else {
    // 添加分类
    await typeApi.addType(typeName.value);
    ElMessage.success("添加分类成功");
  }
  dialogVisible.value = false;
  // 添加完成后将分类清空然后刷新列表
  get_type_list();
  typeName.value = "";
};
// 编辑分类
const editArtType = async (index, row) => {
  console.log(row);
  dialogVisible.value = true;
  params.value.id = row.id;
  params.value.name = row.name;
  // 数据回显
  typeName.value = params.value.name;
  console.log("typeName", typeName.value);
};
// 删除分类
const handleDelete = async (index, row) => {
  console.log(row.id);
  try {
    await typeApi.delType(row.id);
    ElMessage.success("删除分类成功");
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
  const result = await typeApi.getTypes(page.value, pageSize.value);
  console.log(result.data);
  artTypeList.value = result.data.rows.categories.map(v => ({
    ...v,
    createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
    updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
  }));
  total.value = result.data.rows.total;
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
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
}
</style>
