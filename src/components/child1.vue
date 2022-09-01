<template>
  <div>111ww</div>
  <div @click="changeName()">传过来的姓名： {{ name }}</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits,watch } from "vue";
const props = defineProps({
  newPeople: Object,
});
let name = ref(props.newPeople?.name)
const emits = defineEmits(["changeName"]);
const changeName = () => {
  props.newPeople?.setName('112')
  name.value = props.newPeople?.name
};

</script>

<style scoped lang="scss"></style>
