<script setup lang="ts">
import { onActivated } from "vue";

onActivated(() => {
  console.log("跳转");
});
</script>

<template>
  <!--vue3写法-->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<style>
:root {
  --colorC: #ccc;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
