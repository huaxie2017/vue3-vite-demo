<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="默认值：">
        <el-input v-model="form.placeholderValue" @input="updateAttr" />
      </el-form-item>
      <el-form-item label="字体大小：">
        <el-input v-model="form.fontSize" @input="updateAttr" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, defineProps, onMounted, defineEmits, watch } from "vue";
const props = defineProps({
  styleObj: Object,
});

const emit = defineEmits(["updateAttr"]);

const form = reactive({
  placeholderValue: "",
  fontSize: "14",
});

const updateAttr = () => {
  emit("updateAttr", form);
};

watch(
  () => props.styleObj,
  () => {
    if (Object.keys(props.styleObj).length > 0) {
      Object.assign(form, {
        placeholderValue: props.styleObj.placeholderValue,
        fontSize: props.styleObj.fontSize,
      });
    }
  },
  {
    deep: true,
  }
);

onMounted(() => {
  if (Object.keys(props.styleObj).length > 0) {
    Object.assign(form, {
      placeholderValue: props.styleObj.placeholderValue,
      fontSize: props.styleObj.fontSize,
    });
  }
});
</script>
<style lang="scss" scoped></style>
