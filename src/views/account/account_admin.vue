<template>
  <div class="blog-table">
    <el-table :data="filterTableData" table-layout="auto" style="width: 100%">
      <el-table-column label="头像" prop="avatar" />
      <el-table-column label="昵称" prop="name" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="管理员" prop="role">
        <template #default="scope">
          <el-switch
            :inactive-value="0"
            :active-value="1"
            v-model="scope.row.role"
          />
        </template>
      </el-table-column>
      <el-table-column label="封禁" prop="isBan">
        <template #default="scope">
          <el-switch
            :inactive-value="0"
            :active-value="1"
            v-model="scope.row.isBan"
          />
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="date" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" placeholder="此处搜索" />
        </template>
        <template #default="scope">
          <div class="edit">
            <el-link
              :underline="false"
              :icon="View"
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
            >
              查看详情
            </el-link>
            <el-popconfirm
              title="确认删除这个用户?"
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
    <div class="model">
      <el-dialog
        v-model="dialogFormVisible"
        :title="form.name + '的详细资料'"
        width="500"
      >
        <el-form :model="form">
          <el-form-item label="头像:" :label-width="formLabelWidth">
            <el-input v-model="form.avatar" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别:" :label-width="formLabelWidth">
            <el-input v-model="form.sex" autocomplete="off" />
          </el-form-item>
          <el-form-item label="个性签名:" :label-width="formLabelWidth">
            <el-input v-model="form.bio" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              保存
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { View, Delete } from "@element-plus/icons-vue";

// !model测试
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  avatar: "",
  name: "",
  sex: "",
  bio: "",
});

// ?搜索功能
const search = ref("");
const filterTableData = computed(() =>
  tableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);
// ?编辑的回调
const handleEdit = (index, row) => {
  // *把当前行数据渲染到model上
  Object.keys(form).forEach(key => {
    if (row.hasOwnProperty(key)) {
      form[key] = row[key]; // 更新form上的属性
    }
  });
  console.log(form);

  dialogFormVisible.value = true;

  console.log(index, row);
};
// ?删除的回调
const handleDelete = (index, row) => {
  console.log(index, row);
};

// *表单数据
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    sex: "男",
    isBan: 0,
    role: 0,
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",
    avatar: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    sex: "男",
    name: "John",
    isBan: 0,
    role: 1,
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",

    avatar: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    sex: "男",
    name: "Morgan",
    isBan: 1,
    role: 1,
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",

    avatar: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    sex: "女",
    isBan: 1,
    role: 0,
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",
    name: "Jessy",
    avatar: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "郑嘉明",
    sex: "男",
    role: 0,
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",
    isBan: 0,
    avatar: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style scoped>
.blog-table {
  padding: 20px;
  border-radius: 11px;
  background-color: #fff;
}
.edit {
  display: flex;
  column-gap: 1.25rem;
  justify-content: center;
}
</style>
