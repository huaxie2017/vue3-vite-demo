<template>
  <div class="screen-root">
    122

    <ul v-if="show">
      <li class="skelentonCss"></li>
      <li class="skelentonCss"></li>
      <li class="skelentonCss"></li>
      <li class="skelentonCss"></li>
    </ul>
    <ul v-else>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
    <div class="skelentonDiv" v-if="show"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "skeleton",
};
</script>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const show = ref(true);
const text = ref("");
onMounted(() => {
  setTimeout(() => {
    text.value = "22222";
    show.value = false;
  }, 1000);
});
</script>

<style lang="scss">
body {
  background-color: aliceblue;
}

.screen-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20vh;
}

ul {
  background-color: #fff;
  margin: 0 auto;
  padding: 20px;
  width: 40vw;
}
.skelentonDiv {
  background-image: linear-gradient(
    90deg,
    #f2f2f2 25%,
    #e6e6e6 37%,
    #f2f2f2 63%
  );
  width: 500px;
  height: 300px;
  list-style: none;
  background-size: 400% 100%;
  margin: 40px auto 0 auto;
  background-position: 100% 50%;
  animation: skeleton-loading 1.4s ease infinite;
}
.skelentonCss {
  background-image: linear-gradient(
    90deg,
    #f2f2f2 25%,
    #e6e6e6 37%,
    #f2f2f2 63%
  );
  width: 100%;
  height: 0.6rem;
  list-style: none;
  background-size: 400% 100%;
  margin-top: 0.6rem;
  background-position: 100% 50%;
  animation: skeleton-loading 1.4s ease infinite;
}

li:first-child {
  width: 38%;
}

li:last-child {
  width: 61%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
