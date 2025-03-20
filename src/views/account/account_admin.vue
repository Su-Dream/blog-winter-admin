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
      <el-table-column label="管理员" prop="role">
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
      <el-table-column label="封禁" prop="isFlag">
        <template #default="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            @change="onBanChange(scope.row)"
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
            <el-button
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除这个用户?"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
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
                :class="{ uploadStyle: isUploadIcon }"
                ref="upload"
                action="/api/upload"
                :limit="1"
                accept=".jpg,.png,.gif"
                :on-exceed="handleExceed"
                :on-change="handleChangeFile"
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
                        @click="handleRemoveFile(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
              <!-- 用户详情页 -->
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
            <!-- <el-input v-model="form.avatar" autocomplete="off" /> -->
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input
              style="width: 180px"
              v-model="form.username"
              autocomplete="off"
              maxlength="12"
              show-word-limit
              type="text"
            />
          </el-form-item>
          <el-form-item label="性别:" :label-width="formLabelWidth">
            <el-select
              style="width: 180px"
              v-model="form.UserProfile.gender"
              placeholder="Select"
            >
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱:" :label-width="formLabelWidth">
            <el-input
              style="width: 180px"
              v-model="form.email"
              autocomplete="off"
              type="text"
            />
          </el-form-item>
          <el-form-item label="手机号:" :label-width="formLabelWidth">
            <el-input
              style="width: 180px"
              v-model="form.UserProfile.phone"
              autocomplete="off"
              type="text"
            />
          </el-form-item>
          <el-form-item label="是否停用:" :label-width="formLabelWidth">
            <el-select
              style="width: 180px"
              v-model="form.isFlag"
              placeholder="Select"
            >
              <el-option label="否" :value="0" />
              <el-option label="是" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="管理员:" :label-width="formLabelWidth">
            <el-select
              style="width: 180px"
              v-model="form.role"
              placeholder="Select"
            >
              <el-option label="管理员" :value="1" />
              <el-option label="普通用户" :value="0" />
            </el-select>
          </el-form-item>

          <el-form-item label="个性签名:" :label-width="formLabelWidth">
            <el-input
              v-model="form.UserProfile.bio"
              autocomplete="off"
              maxlength="200"
              show-word-limit
              type="text"
            />
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
import { genFileId } from "element-plus";
import { View, Delete } from "@element-plus/icons-vue";
import { Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import userApi from "@/apis/users.js";
// *upload配置

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

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
// todo:用户软封禁
const onBanChange = async row => {
  console.log(row);
};
// *model数据
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({});

// ?搜索功能
const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
);
// ?上传图片功能
const upload = ref();
let isUploadIcon = ref(false);
// 上传图片后超出限制的回调
const handleExceed = files => {
  // 替换上一张图片
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
// 文件状态改变时
const handleChangeFile = (file, files) => {
  if (files === undefined) {
    isUploadIcon.value = false;
  } else {
    isUploadIcon.value = true;
  }
  console.log(file, files);
};
// 删除图片时的回调
const handleRemoveFile = (file, files) => {
  upload.value.clearFiles();
  if (files === undefined) {
    isUploadIcon.value = false;
  } else {
    isUploadIcon.value = true;
  }

  console.log(file, files);
};

// todo:编辑用户的回调
const handleEdit = (index, row) => {
  console.log(index, row);
  // 合并到表单中
  Object.assign(form, row);
  console.log(form);
  dialogFormVisible.value = true;
};
// todo:删除用户的回调
const handleDelete = (index, row) => {
  console.log(index, row);
};

const tableData = ref([]);
// 获取全部用户数据
const get_user_list = async () => {
  try {
    const result = await userApi.getAllUser();
    console.log("result", result);
    tableData.value = result.data.result.data.map(v => ({
      ...v,
      createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
      updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
    }));
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
</script>

<style scoped>
.uploadStyle :deep(.el-upload--picture-card) {
  display: none;
}
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
