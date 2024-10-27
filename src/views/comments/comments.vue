<template>
  <div class="comment">
    <div class="comment_search">
      <el-input
        style="width: 240px"
        v-model="search"
        placeholder="请输入需要查询的评论内容"
      >
      </el-input>
    </div>
    <el-divider />
    <div class="comment_list">
      <el-table size="large" :data="filterCommentList" style="width: 100%">
        <el-table-column prop="user.profile.avatar" label="用户头像">
        </el-table-column>
        <el-table-column prop="user.account" label="评论人"> </el-table-column>
        <el-table-column prop="content" label="评论内容"> </el-table-column>
        <el-table-column
          prop="createTime"
          sortable
          label="评论时间"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="edit">
              <!-- <el-link
                :underline="false"
                :icon="Edit"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
              >
                编辑
              </el-link> -->
              <el-popconfirm
                title="确定删除这个评论?不可恢复!"
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
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { Edit, Delete } from "@element-plus/icons-vue";

// ?删除评论
const handleDelete = (index, row) => {
  console.log(index, row);
};
// *过滤列表
const search = ref("");
const filterCommentList = computed(() =>
  commentList.filter(
    data =>
      !search.value ||
      data.content.toLowerCase().includes(search.value.toLowerCase())
  )
);
// *评论列表
const commentList = reactive([
  {
    id: 4,
    createTime: "2024-10-27T06:02:35.539Z",
    updatedTime: "2024-10-27T06:02:35.539Z",
    deleteAt: null,
    content: "6666",
    replys: [],
    user: {
      id: 2,
      createTime: "2024-10-16T09:18:44.985Z",
      updatedTime: "2024-10-22T07:18:54.000Z",
      deleteAt: null,
      account: "hoiolo",
      email: "1805639380@qq.com",
      sign_time: "2024-10-16T09:18:44.985Z",
      role: 3,
      status: 1,
      profile: {
        id: 2,
        createTime: "2024-10-16T09:18:44.989Z",
        updatedTime: "2024-10-23T15:07:16.000Z",
        deleteAt: null,
        name: "sulhoiolo",
        signature: "zjmnb",
        avatar: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
        sex: 0,
        article_num: 1,
        qq_no: null,
        github_url: null,
        bilibili_url: null,
      },
    },
  },
  {
    id: 3,
    createTime: "2024-10-27T06:02:31.243Z",
    updatedTime: "2024-10-27T06:02:31.243Z",
    deleteAt: null,
    content: "123321",
    replys: [],
    user: {
      id: 2,
      createTime: "2024-10-16T09:18:44.985Z",
      updatedTime: "2024-10-22T07:18:54.000Z",
      deleteAt: null,
      account: "hoiolo",
      email: "1805639380@qq.com",
      sign_time: "2024-10-16T09:18:44.985Z",
      role: 3,
      status: 1,
      profile: {
        id: 2,
        createTime: "2024-10-16T09:18:44.989Z",
        updatedTime: "2024-10-23T15:07:16.000Z",
        deleteAt: null,
        name: "sulhoiolo",
        signature: "zjmnb",
        avatar: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
        sex: 0,
        article_num: 1,
        qq_no: null,
        github_url: null,
        bilibili_url: null,
      },
    },
  },
  {
    id: 2,
    createTime: "2024-10-27T06:02:29.697Z",
    updatedTime: "2024-10-27T06:02:29.697Z",
    deleteAt: null,
    content: "ces",
    replys: [],
    user: {
      id: 2,
      createTime: "2024-10-16T09:18:44.985Z",
      updatedTime: "2024-10-22T07:18:54.000Z",
      deleteAt: null,
      account: "hoiolo",
      email: "1805639380@qq.com",
      sign_time: "2024-10-16T09:18:44.985Z",
      role: 3,
      status: 1,
      profile: {
        id: 2,
        createTime: "2024-10-16T09:18:44.989Z",
        updatedTime: "2024-10-23T15:07:16.000Z",
        deleteAt: null,
        name: "sulhoiolo",
        signature: "zjmnb",
        avatar: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
        sex: 0,
        article_num: 1,
        qq_no: null,
        github_url: null,
        bilibili_url: null,
      },
    },
  },
  {
    id: 1,
    createTime: "2024-10-16T09:24:05.009Z",
    updatedTime: "2024-10-16T09:24:05.009Z",
    deleteAt: null,
    content: "[大笑2]",
    replys: [
      {
        id: 2,
        createTime: "2024-10-22T15:22:20.698Z",
        updatedTime: "2024-10-22T15:22:20.698Z",
        deleteAt: null,
        content:
          '回复 <span style="color: var(--u-color-success-dark-2);">@sulhoiolo:</span> 6',
      },
      {
        id: 1,
        createTime: "2024-10-16T09:24:10.624Z",
        updatedTime: "2024-10-16T09:24:10.624Z",
        deleteAt: null,
        content:
          '回复 <span style="color: var(--u-color-success-dark-2);">@sulhoiolo:</span> [乖]',
      },
    ],
    user: {
      id: 2,
      createTime: "2024-10-16T09:18:44.985Z",
      updatedTime: "2024-10-22T07:18:54.000Z",
      deleteAt: null,
      account: "hoiolo",
      email: "1805639380@qq.com",
      sign_time: "2024-10-16T09:18:44.985Z",
      role: 3,
      status: 1,
      profile: {
        id: 2,
        createTime: "2024-10-16T09:18:44.989Z",
        updatedTime: "2024-10-23T15:07:16.000Z",
        deleteAt: null,
        name: "sulhoiolo",
        signature: "zjmnb",
        avatar: "https://cloud.hoiolo.cn/image/1729070388567aoxi6.jpg",
        sex: 0,
        article_num: 1,
        qq_no: null,
        github_url: null,
        bilibili_url: null,
      },
    },
  },
]);
</script>

<style scoped>
.comment {
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
