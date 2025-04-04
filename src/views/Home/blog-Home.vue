<template>
  <template v-if="false">
    <div>
      <el-row justify="space-between">
        <el-col v-for="(item, index) in Data" :key="index" :span="4">
          <el-card class="card">
            <el-icon class="blog__icon"> <component :is="item.icon" /></el-icon>
            <div class="statistic">
              <el-statistic :title="item.title" :value="item.count" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="card">
            <el-icon class="blog__icon"><Odometer /></el-icon>
            <div class="statistic">
              <el-statistic title="网站访问量" :value="outputValue" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="echarts">
        <div ref="chartDom" class="site_chart"></div>
      </div>
    </div>
  </template>
  <template v-else>
    <h1 class="welcome">
      早上好，{{ profile.username }}<br />欢迎来到博客后台管理系统<br />
      当前时间：{{ time }}<br />
    </h1>
  </template>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();
const profile = profileStore.profile;
const time = ref(new Date().toLocaleString());
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    time.value = new Date().toLocaleString(); // ✅ 直接修改 ref
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});

// element-plus的icon
import {
  User,
  Document,
  ChatDotSquare,
  Connection,
  Odometer,
} from "@element-plus/icons-vue";
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import * as echarts from "echarts";
import { useTransition } from "@vueuse/core";

// 创建一个响应式引用来保存DOM元素
const chartDom = ref(null);
let chartInstance = null;

// 初始化ECharts实例并设置配置项（这里以折线图为例，但可灵活替换）
// onMounted(async () => {
//   await nextTick(); // 确保DOM已经渲染完成
//   chartInstance = echarts.init(chartDom.value);
//   const option = {
//     // 这里是ECharts的配置项，可以根据需要绘制不同类型的图表
//     title: {
//       text: "网站访问量",
//     },
//     tooltip: {
//       trigger: "axis", // 触发类型
//       formatter: function (params) {
//         return params[0].name + ": " + params[0].value + "人"; // 显示具体的访问人数
//       },
//     },
//     legend: {
//       data: ["访问人数"],
//     },
//     xAxis: {
//       type: "category",
//       boundaryGap: false,
//       data: [
//         "一月",
//         "二月",
//         "三月",
//         "四月",
//         "五月",
//         "六月",
//         "七月",
//         "八月",
//         "九月",
//         "十月",
//       ],
//     },
//     yAxis: {},
//     series: [
//       {
//         name: "访问人数",
//         type: "line", // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
//         data: [15, 45, 27, 78, 152, 98, 35, 94, 75, 68],
//         areaStyle: {
//           color: "rgba(75, 192, 192, 0.5)", // 设置渐变色
//         },
//         itemStyle: {
//           color: "rgba(75, 192, 192, 1)", // 折线颜色
//         },
//       },
//     ],
//   };
//   chartInstance.setOption(option);
// });

// 销毁ECharts实例
// onUnmounted(() => {
//   if (chartInstance != null && chartInstance.dispose) {
//     chartInstance.dispose();
//   }
// });

// ?数据动效
const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1500,
});
source.value = 265251;
// *数据
const Data = [
  {
    title: "用户数量",
    count: 2,
    icon: User,
  },
  {
    title: "文章数量",
    count: 2,
    icon: Document,
  },
  {
    title: "评论数量",
    count: 5,
    icon: ChatDotSquare,
  },
  {
    title: "标签数量",
    count: 3,
    icon: Connection,
  },
];
</script>

<style scoped>
.welcome {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
}
:deep(.el-card__body) {
  display: flex;
  align-items: center;
  gap: 20px;
}
.blog__icon {
  font-size: 2rem;
}
.echarts {
  margin: 20px 0;
  padding: 20px;
  border-radius: 11px;
  background-color: #fff;
}
.site_chart {
  width: 100%;
  height: 400px;
}
</style>
