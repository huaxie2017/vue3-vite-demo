<template>
  <div :class="{ active: isActive }">
    js 单线程 同步任务 异步任务 eventloop 时间执行机制
  </div>
  <div class="trigger"></div>
</template>
<script lang="ts">
export default {
  name: "newDetail",
  id: true,
};
</script>

<script lang="ts" setup>
import { ref } from "vue";

const isActive = ref(true);
console.log("script start"); // 1 同步

setTimeout(() => {
  console.log("setTimeout"); // 5 宏任务
}, 0);

Promise.resolve()
  .then(() => {
    console.log("promise1"); // 3 微任务
  })
  .then(() => {
    console.log("promise2"); // 4 微任务
  });
console.log("script end"); // 2 同步

// 微任务优先  promise.then() nexttick
// 宏任务 settimeout setInterval
// event loop 事件循坏 微任务 宏任务
// promise 前面是同步任务执行完会清掉微任务再执行宏任务取值

// var param = function () {
//   return { name: 1 };
// };
// function MyComponent(param: any) {
//   this.data = param();
// }

// var v1 = new MyComponent(param);

// var v2 = new MyComponent(param);

// var v3 = new MyComponent(param);

// v1.data.name = 2;

// console.log(v1.data);
// console.log(v2.data);
// console.log(v3.data);

let obj = { name: 1 };
const reactiveFun = (obj: any) => {
  return new Proxy(obj, {
    get(target, key) {
      console.log("读取");
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log("设置");
      return Reflect.set(target, key, value);
    },
  });
};
let reactiveObj = reactiveFun(obj);
console.log(reactiveObj.name);
reactiveObj.name = 2;
</script>

<style scoped lang="scss">
.active{
  color: var(--colorC);
}
.trigger {
  display: block;
  width: 0;
  height: 0;
  border-top: 10px solid red;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.trigger1 {
  width: 0;
  height: 0;
  border-bottom: 10px solid red;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
</style>
