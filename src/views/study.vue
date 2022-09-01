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
</script>

<style lang="scss" scoped></style>
