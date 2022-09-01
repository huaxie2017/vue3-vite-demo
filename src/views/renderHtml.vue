<template>
  <renderButton />
</template>

<script lang="ts">
export default {
  name: "renderHtml",
};
</script>
<script setup lang="ts">
import { h } from "vue";
const renderButton = () => {
  return h(
    "button",
    {
      style: {
        color: "#333",
        border: "1px solid #ccc",
      },
      calss: "text",
    },
    "text11"
  );
};
</script>
