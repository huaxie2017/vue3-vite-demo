<template>
  <div class="contanier">
    <div class="loginContent">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名：">
          <el-input
            placeholder="请输入用户名"
            v-model="form.name"
            class="select_width"
          />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            class="select_width"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "login",
};
</script>
<script setup lang="ts">
import { reactive } from "vue";
import { login } from "@/api/index";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore()
const form = reactive({
  name: "",
  password: "",
});
const onSubmit = () => {
  if (!form.name) {
    ElMessage({
      message: "请输入用户名",
      type: "warning",
    });
    return;
  }
  if (!form.password) {
    ElMessage({
      message: "请输入密码",
      type: "warning",
    });
    return;
  }
  let data = form;
  login(data).then((res: any) => {
    if (res.success) {
      sessionStorage.setItem('userInfo',JSON.stringify(data))
      store.commit("getUserInfo", form)
      router.push("/home");
    }
  });
};
</script>

<style lang="scss" scoped>
.contanier {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .loginContent {
    width: 874px;
    height: 500px;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 0 20px 5px rgba(34, 84, 142, 0.26);
  }
}
</style>
