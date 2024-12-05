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
          <!-- todo:添加文章 -->
          <div class="addArt">
            <el-form-item label="标题:">
              <el-input v-model="artData.title" placeholder="请输入标题">
              </el-input>
            </el-form-item>
            <el-form-item label="标签:">
              <el-select
                v-model="artData.selectedTags"
                multiple
                :multiple-limit="3"
                :max-collapse-tags="1"
                placeholder="Select"
                style="width: 400px"
              >
                <el-option
                  v-for="item in artData.tags"
                  :key="item.id"
                  :label="item.tagName"
                  :value="item.tagName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="分类:">
              <el-select
                v-model="artData.selectedType"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in artData.types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- todo:上传预览图 -->
            <el-form-item label="预览图:" :label-width="formLabelWidth">
              <el-upload
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
            <el-form-item label="内容:">
              <!-- 富文本编辑器 -->
              <div class="editText">
                <editText />
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
      <el-table :data="filterTableData" table-layout="auto" style="width: 100%">
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
import { ref, reactive, computed } from "vue";
import { View, Delete, Plus } from "@element-plus/icons-vue";
import editText from "@/components/edit/editText.vue";
// *下拉框数据相关
const filterValue = ref("文章名");
const options = [
  { value: "文章名", label: "文章名" },
  { value: "分类名", label: "分类名" },
];

// *文章请求数据
const artData = reactive({
  title: "",
  tags: [
    {
      id: 12,
      createTime: "2024-10-16T09:21:19.322Z",
      updatedTime: "2024-10-16T09:21:19.322Z",
      deleteAt: null,
      tagName: "docker",
      byNum: 0,
    },
    {
      id: 11,
      createTime: "2024-10-16T09:21:16.878Z",
      updatedTime: "2024-10-16T09:21:16.878Z",
      deleteAt: null,
      tagName: "java",
      byNum: 0,
    },
    {
      id: 10,
      createTime: "2024-10-16T09:21:14.904Z",
      updatedTime: "2024-10-16T09:21:14.904Z",
      deleteAt: null,
      tagName: "nginx",
      byNum: 0,
    },
    {
      id: 9,
      createTime: "2024-10-16T09:21:11.550Z",
      updatedTime: "2024-10-16T09:23:45.000Z",
      deleteAt: null,
      tagName: "nodejs",
      byNum: 1,
    },
    {
      id: 8,
      createTime: "2024-10-16T09:21:08.644Z",
      updatedTime: "2024-10-16T09:23:45.000Z",
      deleteAt: null,
      tagName: "javascript",
      byNum: 1,
    },
  ],
  types: [
    {
      id: 11,
      createTime: "2024-10-16T09:17:43.000Z",
      updatedTime: "2024-10-16T09:17:43.000Z",
      deleteAt: null,
      name: "其他",
    },
    {
      id: 10,
      createTime: "2024-10-16T09:17:43.000Z",
      updatedTime: "2024-10-16T09:17:43.000Z",
      deleteAt: null,
      name: "运维",
    },
    {
      id: 9,
      createTime: "2024-10-16T09:17:24.000Z",
      updatedTime: "2024-10-16T09:17:24.000Z",
      deleteAt: null,
      name: "后端",
    },
    {
      id: 8,
      createTime: "2024-10-16T09:17:24.000Z",
      updatedTime: "2024-10-16T09:17:24.000Z",
      deleteAt: null,
      name: "前端",
    },
  ],
  pictrue: null,
  // *文章摘要
  snippet: "",
  // *文章内容
  content: "",
  selectedTags: [], // 选中的标签
  selectedType: [], // 选中的类型
});

const search = ref("");
const filterTableData = computed(() => {
  // console.log("Filter Value:", filterValue.value);
  // console.log("Search Value:", search.value);
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
  dialogImageUrl.value = "";
};
const handlePictureCardPreview = uploadFile => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

// ?添加文章
const addArtHandler = () => {
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
// *个人资料表单数据
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
