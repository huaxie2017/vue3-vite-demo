<template>
  <h4>typescript</h4>
</template>

<script lang="ts">
export default {
  name: "study",
};
</script>
<script lang="ts" setup>
interface searchFun {
  (source: string): boolean;
}

const searchFun: searchFun = (source) => {
  if (source == "1") {
    return true;
  } else {
    return false;
  }
};

let goods = ["1", "2", "", "4", "", "", "7", "8"];
const eachGoogs = () => {
  const promise = [...goods.map((good, i) => getAll(good))];
  Promise.all(promise).then((newVal) => {
    console.log(newVal);
  });
};
const getAll = (good: any) => {
  return new Promise((resolve, reject) => {
    console.log(new Date(), good);
    if (good == "") {
      setTimeout(() => {
        // 模拟下接口请求
        resolve("为空");
      }, 500);
    } else {
      resolve(good);
    }
  });
};
eachGoogs();
</script>

<style lang="scss" scoped></style>
