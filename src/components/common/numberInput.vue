<template>
  <div class="content">
    <div class="content_flex">
      <p>数字输入框</p>
      <el-input
        :placeholder="attrObj?.styleObj.placeholderValue"
        :style="{ fontSize: attrObj?.styleObj.fontSize + 'px' }"
        @input="updateValue"
        v-model="modelValue"
        type="number"
      />
    </div>
    <div class="componentStyle" v-if="attrObj.show">
      <componentStyle :styleObj="attrObj.styleObj" @updateAttr="updateAttr" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "numberInput",
};
</script>
<script lang="ts" setup>
import { defineProps, PropType, ref, onMounted, watch, defineEmits } from "vue";
import componentStyle from "./common/componentStyle.vue";
components: {
  componentStyle;
}
type styleObj = {
  placeholderValue: string
  fontSize: string
}
interface propsObj {
  value: string
  show: Boolean
  styleObj: styleObj
}
const props = defineProps<{attrObj: propsObj}>()
const modelValue = ref("");

const emit = defineEmits(["updateAttr", "updateValue"]);
const updateAttr = (form: any) => {
  emit("updateAttr", form);
};

const updateValue = () => {
  emit("updateValue", modelValue.value);
};

watch(
  () => props.attrObj,
  (newVal: any, oldVal) => {
    modelValue.value = newVal.value;
  },
  { deep: true }
);
onMounted(() => {
  modelValue.value = props.attrObj?.value ? props.attrObj.value : "";
});
</script>

<script lang="ts" setup></script>

<style scoped lang="scss">
.content {
  display: flex;
  .content_flex {
    flex: 1;
  }
  .componentStyle {
    width: 300px;
  }
}
</style>
