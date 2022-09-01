<template>
  <h2>{{ str }}</h2>
  <p><button @click="update">change</button></p>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const props = defineProps({
  str: String,
});

const emits = defineEmits(["update:str"]);

const update = () => {
  emits("update:str", "哈哈哈哈111");
};
</script>

<style scoped></style>
