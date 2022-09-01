<template>
  <div class="drapContent">
    <div class="menu_list">
      <div
        class="componentLi"
        v-for="item in componentNameList"
        :index="item"
        @dragover.prevent
        draggable="true"
        @dragstart="dragstart(item)"
        @dragenter="dragenter($event, item)"
        @dragend="dragend($event, item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="drapBox">
      <div v-for="component in componentArr">
        <component :is="component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "drap",
};
</script>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import componentList from "@/components/common/index";
const componentNameList = reactive<Array<String>>([]);
componentList.forEach((component) => {
  componentNameList.push(component.name);
});

const componentArr = reactive<Array<String>>([]);

const pageLeft = ref(0);
const pageTop = ref(0);
const pageX = ref(0);
const pageY = ref(0);

const dragstart = (value: any) => {};
const dragenter = (ev: DragEvent, value: any) => {};

const dragend = (ev: DragEvent, value: any) => {
  let num1 = pageLeft.value < ev.pageX;
  let num2 = ev.pageX < pageX.value;
  let num3 = pageTop.value < ev.pageY;
  let num4 = ev.pageY < pageY.value;
  if (num1 && num2 && num3 && num4) {
    componentArr.push(value);
  } else {
    console.log("超出边界");
  }
};

onMounted(() => {
  pageLeft.value = document.querySelector(".drapBox")!.offsetLeft;
  pageX.value =
    document.querySelector(".drapBox")!.offsetLeft +
    document.querySelector(".drapBox")!.offsetWidth;
  pageTop.value = document.querySelector(".drapBox")!.offsetTop;
  pageY.value =
    document.querySelector(".drapBox")!.offsetTop +
    document.querySelector(".drapBox")!.offsetHeight;
});
</script>

<style lang="scss" scoped>
.drapContent {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  .menu_list {
    width: 150px;
    text-align: center;
    .componentLi {
      line-height: 30px;
      cursor: pointer;
    }
  }
  .drapBox {
    flex: 1;
    text-align: left;
    height: 500px;
  }
}
</style>
