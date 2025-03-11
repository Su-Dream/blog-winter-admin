<template>
  <div class="images">
    <el-table :data="list.list" border style="width: 100%">
      <el-table-column prop="id" label="图片预览" width="180">
        <template #default="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[scope.row.url]"
            :preview-teleported="true"
            :z-index="5"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="图片地址" />
      <el-table-column prop="size" label="尺寸" width="80" />
      <el-table-column prop="createTime" label="创建时间" width="300" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="{ row }">
          <el-popconfirm
            @confirm="onRemoveImage(row)"
            @cancel="onCancel()"
            title="是否删除这张图片?"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagin">
      <el-pagination
        size="small"
        background
        layout="prev, pager, next"
        :total="list.total"
        :default-page-size="list.limit"
        :hide-on-single-page="isPage"
        class="mt-4"
        @current-change="onChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import imgApi from "@/apis/outher.js";
import { ElMessage } from "element-plus";

// 初始化数据
const list = ref({
  page: 1,
  limit: 5,
  total: 0,
  list: [],
});

// 计算页码是否只有一页
const isPage = computed(() => {
  return (
    list.value.page === 1 &&
    list.value.page * list.value.limit > list.value.total
  );
});

// 获取图片数据
const getImgData = async (page, pageSize) => {
  const params = {
    page: page ?? list.value.page,
    limit: pageSize ?? list.value.limit,
  };

  try {
    const res = await imgApi.getImages(params);
    if (res.data) {
      Object.assign(list.value, res.data);
    }
  } catch (error) {
    ElMessage.error("获取数据失败");
    console.error(error);
  }
};

// 组件挂载后加载数据
onMounted(() => {
  getImgData();
});

// 分页信息改变时
const onChange = currentPage => {
  getImgData(currentPage, list.value.limit);
};

// 删除图片
const onRemoveImage = async row => {
  const res = await imgApi.deleteImage(row.id);
  ElMessage.success(res.msg);
  getImgData();
};
// 取消删除
const onCancel = () => {
  ElMessage("取消删除");
};
</script>

<style scoped>
.pagin {
  padding-top: 20px;
  width: fit-content;
  margin-left: auto;
}
</style>
