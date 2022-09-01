<template>
  <div class="content">
    qqq
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: "pageIndex",
};
</script>

<script setup lang="ts"></script>
