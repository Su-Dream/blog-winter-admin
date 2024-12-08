<template>
  <div class="blog-table">
    <el-table :border="true" :data="filterTableData" table-layout="auto">
      <el-table-column label="头像" width="100" prop="UserProfile.avatar">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.UserProfile.avatar"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[scope.row.UserProfile.avatar]"
            :preview-teleported="true"
            :z-index="5"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="100" prop="username" />
      <el-table-column label="性别" width="80" prop="UserProfile.gender" />
      <el-table-column
        label="邮箱"
        width="200"
        :show-overflow-tooltip="true"
        prop="email"
      />
      <el-table-column label="联系电话" width="200" prop="UserProfile.phone" />
      <el-table-column label="管理员" width="100" prop="role">
        <template #default="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.role"
            @change="handleRoleChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="个性签名"
        :show-overflow-tooltip="true"
        prop="UserProfile.bio"
      />
      <el-table-column label="注册时间" width="210" prop="createdAt" />
      <el-table-column label="封禁" width="100" prop="isFlag">
        <template #default="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.isFlag"
          />
        </template>
      </el-table-column>
      <el-table-column width="200" fixed="right" align="right">
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
              详情
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
        :title="form.username + '的详细资料'"
        width="500"
      >
        <el-form :model="form">
          <el-form-item label="头像:" :label-width="formLabelWidth">
            <div class="upload">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <el-icon><Plus /></el-icon>
                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <el-icon><Download /></el-icon>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
            <!-- <el-input v-model="form.avatar" autocomplete="off" /> -->
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别:" :label-width="formLabelWidth">
            <el-select
              v-model="form.sex"
              placeholder="Select"
              style="width: 240px"
            >
              <el-option label="保密" value="保密" />
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
            <!-- <el-input v-model="form.sex" autocomplete="off" /> -->
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
import { Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import userApi from "@/apis/users.js";
// *upload配置

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = file => {
  console.log(file);
};

const handlePictureCardPreview = file => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = file => {
  console.log(file);
};
// todo:修改管理员权限
const handleRoleChange = async row => {
  console.log(row);
};

// *model数据
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  avatar: "",
  username: "",
  sex: "",
  bio: "",
});

// ?搜索功能
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
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

const tableData = ref([]);

const get_user_list = async () => {
  try {
    const result = await userApi.getAllUser();
    console.log("result", result);

    tableData.value = result.data.result.data;
    console.log(tableData.value);
  } catch (error) {
    if (error.response) {
      // 提取服务器返回的错误信息
      ElMessage({
        message: error.response.data.message,
        type: "error",
      });
    } else {
      // 处理非响应错误
      ElMessage({
        message: error.message,
        type: "error",
      });
    }
  }
};
get_user_list();
// *model数据
// const tableData = [
//   {
//     date: "2016-05-03",
//     name: "Tom",
//     sex: "男",
//     isBan: 0,
//     role: 0,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",
//     avatar: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-02",
//     sex: "男",
//     name: "John",
//     isBan: 0,
//     role: 1,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",

//     avatar: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-04",
//     sex: "男",
//     name: "Morgan",
//     isBan: 1,
//     role: 1,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",

//     avatar: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-01",
//     sex: "女",
//     isBan: 1,
//     role: 0,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",
//     name: "Jessy",
//     avatar: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-01",
//     name: "郑嘉明",
//     sex: "男",
//     role: 0,
//     bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, et!",
//     isBan: 0,
//     avatar: "No. 189, Grove St, Los Angeles",
//   },
// ];
</script>

<style scoped>
:deep(.el-upload) {
  width: 6.25rem;
  height: 6.25rem;
}
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
