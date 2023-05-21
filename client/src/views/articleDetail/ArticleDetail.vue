<template>
  <div id="context"></div>
</template>
<script>
import { get } from "../../utils/request";
import { useRoute } from "vue-router";
export default {
  name: "ArticleDetail",
  async mounted() {
    const route = useRoute();
    const res = await get(`/api/article/${route.params.id}`);
    // 将从后端获取到的HTML数据渲染到页面中
    var context = document.getElementById("context");
    context.innerHTML = res.data.Htmlcontent;
  },
};
</script>