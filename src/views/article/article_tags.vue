<template>
  <div class="art_tags">
    <div class="art_tags_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询的标签名"
      >
      </el-input>
      <el-button type="primary" @click="dialogVisible = true">
        添加标签
      </el-button>
    </div>
    <el-divider />
    <div class="art_add_tag">
      <el-dialog v-model="dialogVisible" title="新增标签" width="500">
        <el-form-item label="标签名称:">
          <el-input v-model="tagName" placeholder="请输入需要添加的标签名">
          </el-input>
        </el-form-item>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addArtTag()"> 确定 </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="art_tags_list">
      <el-table size="large" :data="filteredArtTagList" style="width: 100%">
        <el-table-column prop="name" label="标签名称"> </el-table-column>
        <el-table-column prop="postCount" label="文章数量"></el-table-column>
        <el-table-column
          prop="createdAt"
          sortable
          label="创建时间"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="edit">
              <el-popconfirm
                title="确定删除这个标签?不可恢复!"
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
        @current-change="get_tag_list"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";
import tagApi from "@/apis/tags.js";
const search = ref("");
// 搜索功能
const filteredArtTagList = computed(() => {
  if (!search.value) {
    return artTagList.value;
  }
  return artTagList.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
const tagName = ref("");
// 总条数
const total = ref(0);
// 当前页
const page = ref(1);
// 每页条数
const pageSize = ref(5);
const dialogVisible = ref(false);
// 添加标签
const addArtTag = async () => {
  try {
    if (tagName.value === "") {
      ElMessage("标签内容不能为空");
      return;
    }
    dialogVisible.value = false;
    // 发送请求添加标签
    const result = await tagApi.addTag(tagName.value);
    console.log("addTag", result);
    // 添加完成后将分类清空然后刷新列表
    ElMessage({
      message: result.data.message || "添加成功",
      type: "success",
    });
    get_tag_list();
    // 添加完成后吧标签名清空
    tagName.value = "";
  } catch (error) {
    ElMessage({
      message: error,
      type: "error",
    });
  }
};
// 删除标签
const handleDelete = async (index, row) => {
  console.log(row.id);
  const result = await tagApi.delTag(row.id);
  console.log(result);
  ElMessage("删除成功了");
  get_tag_list();
};
// 标签列表
let artTagList = ref([]);
// 获取标签列表
const get_tag_list = async () => {
  const result = await tagApi.getTags(page.value, pageSize.value);
  console.log(result.data);
  artTagList.value = result.data.tags.map(v => ({
    ...v,
    createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
    updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
  }));
  total.value = result.data.total;
};
get_tag_list();
</script>

<style scoped>
.art_tags {
  padding: 1rem;
  width: 100%;
  background-color: #fff;
}
.art_tags_search {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
