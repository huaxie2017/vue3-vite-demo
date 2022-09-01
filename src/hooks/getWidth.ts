import { onMounted } from "vue";

function getWidth() {
  onMounted(() => {
    console.log(document.body.clientWidth);
  });
}

export default getWidth;
