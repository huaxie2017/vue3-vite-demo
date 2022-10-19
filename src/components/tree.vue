<template>
  <div class="tree">
    <div class="box" :class="[item.nextLevel.length === 0 ? 'left_p' : '']">
      <el-icon v-if="!is_open && item.nextLevel.length > 0" @click="toggle"
        ><CaretRight
      /></el-icon>
      <el-icon v-if="is_open" @click="toggle"><CaretBottom /></el-icon>
      <div class="label" @click="toggle">{{ item.name }}</div>
      <div class="btnBox">
        <el-button type="text" size="small" @click="operFun('add', item)"
          >添加</el-button
        >
        <el-button type="text" size="small" @click="operFun('edit', item)"
          >编辑</el-button
        >
        <el-button
          type="text"
          size="small"
          @click="operFun('disable', item)"
          >{{ item.disabled ? "启用" : "禁用" }}</el-button
        >
        <el-button type="text" size="small" @click="operFun('delete', item)"
          >删除</el-button
        >
      </div>
    </div>
    <div class="drop-list" v-show="is_open">
      <template v-for="childItem in item.nextLevel" :key="childItem.id">
        <Tree :item="childItem" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "tree", // 树结构
};
</script>

<script setup>
import { ref, defineProps, inject } from "vue";
import { CaretRight, CaretBottom } from "@element-plus/icons";
const props = defineProps({
  item: Object,
});

const is_open = ref(false);

const toggle = () => {
  if (props.item.nextLevel.length === 0) {
    is_open.value = false;
    return;
  }
  is_open.value = !is_open.value;
};

const handleMenu = inject("handleMenu");

const operFun = (type, dataItem) => {
  handleMenu({ type, dataItem }); // 处理方法
};
</script>

<style lang="scss" scoped>
.drop-list {
  padding-left: 20px;
}
.box {
  cursor: pointer;
  display: flex;
  align-items: center;
  line-height: 30px;
  &.left_p {
    padding-left: 14px;
  }
  &:hover{
    background: #eee;
  }
}
.label {
  font-size: 14px;
  color: #333;
}
.btnBox {
  text-align: right;
  flex: 1;
}
::v-deep .el-button {
  color: #03c067;
  border: none !important;
  padding: 7px 10px !important;
}

::v-deep .el-icon{
  padding-right: 4px;
}
</style>
