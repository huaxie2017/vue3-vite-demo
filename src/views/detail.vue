<template>
  <h4>详情</h4>
  <p>{{ info.price }}</p>
  <div v-for="(item, index) in dataList" :key="index">
    {{ item }} <span @click="removeIndex(index)">X</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "detail",
};
</script>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { getDetail } from "@/api/index";
let info = reactive<any>({});
let dataList = reactive<number[]>([]);
// let info = reactive({detail: {}})
const getDetail1 = async () => {
  const res = (await getDetail()) as any;
  Object.assign(info, res.info);
  dataList.push(...[1, 2, 3]);
  // info.detail = res.info
};

const removeIndex = (index: number) => {
  dataList.splice(index, 1);
};

onMounted(() => {
  getDetail1();
});
</script>
