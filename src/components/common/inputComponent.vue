<template>
  <div class="content">
    <div class="content_flex">
      <p>输入框</p>
      <el-input
        :placeholder="attrObj.styleObj.placeholderValue"
        :style="{ fontSize: attrObj.styleObj.fontSize + 'px' }"
        @input="updateValue"
        v-model="modelValue"
      />
    </div>
    <div class="componentStyle" v-if="attrObj.show">
      <componentStyle :styleObj="attrObj.styleObj" @updateAttr="updateAttr" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "inputComponent",
};
</script>
<script lang="ts" setup>
import { defineProps, PropType, ref, onMounted, watch, defineEmits } from "vue";
import componentStyle from "./common/componentStyle";
components: {
  componentStyle;
}
interface propsObj {
  styleObj?: Object;
}
const props = defineProps({
  attrObj: Object as PropType<propsObj>,
});
const modelValue = ref("");

const emit = defineEmits(["updateAttr", "updateValue"]);
const updateAttr = (form) => {
  emit("updateAttr", form);
};

const updateValue = () => {
  emit("updateValue", modelValue.value);
};

watch(
  () => props.attrObj,
  (newVal, oldVal) => {
    modelValue.value = newVal.value;
  },
  { deep: true }
);
onMounted(() => {
  modelValue.value = props.attrObj.value ? props.attrObj.value : "";
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
