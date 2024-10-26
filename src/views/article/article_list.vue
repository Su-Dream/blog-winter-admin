<template>
  <div class="art_list">
    <div class="art_list_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询的文章名"
      >
      </el-input>
      <div class="art_add_list">
        <el-button type="primary" @click="addArtVisible = true">
          发布文章
        </el-button>
        <el-dialog v-model="addArtVisible" title="新增文章">
          <!-- todo:添加文章 -->
          <div class="editText">
            <editText />
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
      <el-table :data="tableData" table-layout="auto" style="width: 100%">
        <el-table-column label="预览图" prop="pictrue" />
        <el-table-column label="文章名称" prop="art_name" />
        <el-table-column label="分类" prop="type" />
        <el-table-column label="隐藏" prop="isBan">
          <template #default="scope">
            <el-switch
              :inactive-value="0"
              :active-value="1"
              v-model="scope.row.isBan"
            />
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="date" />
        <el-table-column label="操作">
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
                title="是否删除这篇文章?不可逆!"
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
          :title="form.art_name + '的详细资料'"
          width="500"
        >
          <el-form :model="form">
            <el-form-item label="文章名称:" :label-width="formLabelWidth">
              <el-input disabled v-model="form.art_name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="分类:" :label-width="formLabelWidth">
              <el-select
                disabled
                v-model="form.type"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option label="其他" value="其他" />
                <el-option label="java" value="java" />
                <el-option label="web" value="web" />
              </el-select>
            </el-form-item>
            <el-form-item label="描述:" :label-width="formLabelWidth">
              <el-input disabled v-model="form.describe" autocomplete="off" />
            </el-form-item>
            <el-form-item label="预览图:" :label-width="formLabelWidth">
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
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">
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
import { ref, reactive } from "vue";
import { View, Delete, Plus } from "@element-plus/icons-vue";
import editText from "@/components/edit/editText.vue";

const search = ref("");
const artName = ref("");
// *添加文章弹窗显示
const addArtVisible = ref(true);

// *upload配置参数
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

// *上传文件路径
const fileList = ref([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

// ?添加文章
const addArtHandler = () => {
  if (artName.value === "") {
    addArtVisible.value = false;
    return;
  }
  // todo:发送请求添加文章
  console.log("addArt");

  // !添加完成后将文章清空
  artName.value = "";
  addArtVisible.value = false;
};

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
  // todo:文章删除的回调
  console.log(index, row);
};

// *model数据
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
// *表单数据
const form = reactive({
  pictrue: "",
  art_name: "",
  type: "",
  bio: "",
  describe: "",
});
const tableData = [
  {
    date: "2016-05-03",
    art_name: "java文章测试",
    type: "java",
    isBan: 0,
    pictrue: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
    describe: "2024前端面经,包含vue,react,http,算法",
  },
  {
    date: "2016-05-02",
    type: "java",
    art_name: "web文章测试",
    isBan: 0,
    pictrue: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
    describe: "2024前端面经,包含vue,react,http,算法",
  },
  {
    date: "2016-05-04",
    type: "java",
    art_name: "java文章",
    isBan: 1,
    pictrue: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
    describe: "2024前端面经,包含vue,react,http,算法",
  },
  {
    date: "2016-05-01",
    type: "web",
    isBan: 1,
    art_name: "java",
    pictrue: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
    describe: "2024前端面经,包含vue,react,http,算法",
  },
  {
    date: "2016-05-01",
    art_name: "测试",
    type: "java",
    isBan: 0,
    pictrue: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
    describe: "2024前端面经,包含vue,react,http,算法",
  },
];
</script>

<style scoped>
.art_list {
  padding: 1rem;
  width: 100%;
  background-color: #fff;
}
.art_list_search {
  display: flex;
  justify-content: space-between;
}
.edit {
  display: flex;
  column-gap: 1.25rem;
  justify-content: start;
}
</style>
