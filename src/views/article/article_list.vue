<template>
  <div class="art_list">
    <div class="art_list_search">
      <el-select
        v-model="filterValue"
        placeholder="Select"
        style="width: 100px; margin-right: 8px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        style="width: 240px"
        v-model="search"
        :placeholder="'请输入需要查询的' + filterValue"
      >
      </el-input>
      <div class="art_add_list">
        <el-button type="primary" @click="addArtVisible = true">
          发布文章
        </el-button>
        <el-dialog width="70%" v-model="addArtVisible" title="新增文章">
          <div class="addArt">
            <el-form-item label="标题:">
              <el-input v-model="artData.title" placeholder="请输入标题">
              </el-input>
            </el-form-item>
            <el-form-item label="标签:">
              <el-select
                v-model="artData.tags"
                multiple
                :multiple-limit="3"
                :max-collapse-tags="1"
                placeholder="Select"
                style="width: 400px"
              >
                <el-option
                  v-for="item in tags"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="分类:">
              <el-select
                v-model="artData.category_id"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="预览图:">
              <el-upload
                v-model:file-list="fileList"
                :action="uploadUrl"
                :headers="headerObj"
                :limit="1"
                accept=".jpg,.png,.gif,.jpeg"
                list-type="picture-card"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img
                  w-full
                  preview-teleported="true"
                  :src="dialogImageUrl"
                  alt="Preview Image"
                />
              </el-dialog>
            </el-form-item>
            <el-form-item label="内容:">
              <!-- 富文本编辑器 -->
              <div class="editText">
                <editText @send_edit_content="getSonValue" />
              </div>
            </el-form-item>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="addArtVisible = false">Cancel</el-button>
              <el-button type="primary" @click="addArtHandler()">
                OK
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
    <el-divider>
      <span>已发布文章</span>
    </el-divider>
    <div class="art_table_list">
      <el-table
        :data="filterTableData"
        :border="true"
        table-layout="auto"
        style="width: 100%"
      >
        <el-table-column width="100" label="预览图" prop="picture">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.picture"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="[scope.row.picture]"
              :preview-teleported="true"
              :z-index="5"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column width="200" label="文章名称" prop="title" />
        <el-table-column
          :show-overflow-tooltip="true"
          label="文章内容"
          prop="content"
        />
        <el-table-column width="100" label="分类" prop="Category.name" />
        <el-table-column width="100" label="隐藏" prop="isBan">
          <template #default="scope">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              v-model="scope.row.isBan"
            />
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="createdAt" />
        <el-table-column width="200" label="操作">
          <template #default="scope">
            <div class="edit">
              <el-button
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-popconfirm
                title="是否删除这篇文章?不可逆!"
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
      <div class="model">
        <el-dialog
          :before-close="handleCancelEdit"
          v-model="dialogFormVisible"
          title="文章信息"
          width="1200"
        >
          <el-form :model="artData">
            <el-form-item label="文章标题:" :label-width="formLabelWidth">
              <el-input v-model="artData.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="文章分类:" :label-width="formLabelWidth">
              <el-select
                v-model="artData.category_id"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="type in types"
                  :key="type.id"
                  :label="type.name"
                  :value="type.id"
                />
                <el-option label="其他" value="其他" />
                <el-option label="java" value="java" />
                <el-option label="web" value="web" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- 富文本编辑器 -->
              <div class="editText">
                <editText v-model="artData.content" />
              </div>
            </el-form-item>
            <el-form-item label="文章封面:" :label-width="formLabelWidth">
              <el-image
                style="width: 900px; height: 400px"
                :src="artData.picture"
                fit="cover"
              />

              <el-upload
                disabled
                v-model:file-list="fileList"
                action="#"
                :limit="1"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleCancelEdit">取消</el-button>
              <el-button type="primary" @click="handleSaveEdit">
                保存
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { View, Delete, Plus } from "@element-plus/icons-vue";
import editText from "@/components/edit/editText.vue";
import artApi from "@/apis/article.js";
import tagApi from "@/apis/tags.js";
import typeApi from "@/apis/types.js";
import { ElMessage } from "element-plus";

// *下拉框数据相关
const filterValue = ref("文章名");
const options = [
  { value: "文章名", label: "文章名" },
  { value: "分类名", label: "分类名" },
];
const tags = ref([]);
const types = ref([]);
const tableData = reactive([]);
/**
 * 初始化内容
 */
const init = async () => {
  try {
    const res = await tagApi.getTags();
    const res2 = await typeApi.getTypes();
    const res3 = await artApi.getUserArtList();

    Object.assign(
      tableData,
      res3.data.Post.map(v => ({
        ...v,
        createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
        updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
      }))
    );
    tags.value = res.data.tags.map(v => ({
      ...v,
      createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
      updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
    }));
    types.value = res2.data.rows.map(v => ({
      ...v,
      createdAt: v.createdAt.replace("T", " ").replace(".000Z", ""),
      updatedAt: v.updatedAt.replace("T", " ").replace(".000Z", ""),
    }));
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
  console.log(tags.value, types.value, tableData);
};
init();
/**
 * 清除表单
 */
const clearData = () => {
  Object.assign(artData, {
    pictrue: null,
    title: "",
    // 文章内容
    content: "",
    category_id: "",
    // 选中的标签
    tags: [],
  });
};
/**
 * 获取编辑器内容
 */
const getSonValue = sonValue => {
  artData.content = sonValue;
};
// *文章请求数据
const artData = reactive({
  pictrue: null,
  title: "",
  // 文章内容
  content: "",
  category_id: "",
  // 选中的标签
  tags: [],
});

const search = ref("");
const filterTableData = computed(() => {
  return tableData.filter(data => {
    if (!search.value) return tableData; // 如果没有搜索值，返回所有数据
    if (filterValue.value === "文章名") {
      return data.art_name.toLowerCase().includes(search.value.toLowerCase());
    }
    if (filterValue.value === "分类名") {
      return data.type.toLowerCase().includes(search.value.toLowerCase());
    }
    return false; // 其他情况不返回任何数据
  });
});
// *添加文章弹窗显示
const addArtVisible = ref(false);

// *upload配置参数
// 请求地址
const uploadUrl = "http://localhost:3000/api/upload";
// 请求头
const headerObj = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

// *上传文件路径
const fileList = ref([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);
// 上传成功回调
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log("上传成功");
  console.log(response, uploadFile);
  if (!response.data.url) {
    console.log(response);
  }
  artData.pictrue = response.data.url;
  ElMessage({
    message: "上传预览图成功！",
    type: "success",
  });
};

const uploadError = () => {
  return ElMessage({
    // el-upload回调：上传失败提示错误
    message: "上传预览图失败!",
    type: "error",
  });
};

// 删除上传图片
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  dialogImageUrl.value = "";
};
const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

const isNotEmpty = obj =>
  Object.values(obj).every(
    value => value !== null && value !== undefined && value !== ""
  );
// ?添加文章
const addArtHandler = async () => {
  if (!isNotEmpty(artData)) {
    return ElMessage({
      message: "请填写完整表单",
      type: "error",
    });
  }
  // todo 继续发送请求
  try {
    const result = await artApi.addArt(artData);
  } catch (error) {
    ElMessage({
      message: "文章发布失败!",
      type: "error",
    });
  }
  init();

  addArtVisible.value = false;
  ElMessage({
    message: "文章发布成功!",
    type: "success",
  });
};
// ?编辑的回调
const handleEdit = (index, row) => {
  Object.assign(artData, row);
  console.log("artData", artData);

  dialogFormVisible.value = true;

  console.log(index, row);
};
// ?编辑保存的回调
const handleSaveEdit = () => {
  dialogFormVisible.value = false;
  clearData();
  console.log(artData);
};
// ?编辑取消的回调
const handleCancelEdit = () => {
  dialogFormVisible.value = false;
  clearData();
};
// ?删除的回调
const handleDelete = (index, row) => {
  // todo:文章删除的回调
  console.log(index, row);
};

// *model数据
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
</script>

<style scoped>
.art_list {
  padding: 1rem;
  width: 100%;
  background-color: #fff;
}
.art_list_search {
  display: flex;
  justify-content: start;
}
.art_add_list {
  margin-left: auto;
}
.edit {
  display: flex;
  column-gap: 1.25rem;
  justify-content: start;
}
</style>
