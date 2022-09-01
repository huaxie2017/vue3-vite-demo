<template>
  <div>child2</div>
  <div @click="changeName()">传过来的姓名： {{ name }}</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from "vue";
const props = defineProps({
  newPeople: Object,
});
let name = ref(props.newPeople?.name);
const emits = defineEmits(["changeName"]);
const changeName = () => {
  props.newPeople?.setName("kk大大");
  name.value = props.newPeople?.name;
};
watch(
  () => props.newPeople,
  () => {
    console.log(111);
  },
  {
    immediate: true,
  }
);
</script>
