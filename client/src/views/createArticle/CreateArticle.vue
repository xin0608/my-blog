<template>
  <div class="create-article">
    <el-container>
      <el-header
        ><i class="el-icon-arrow-left"></i>发布文章
        <span class="element-icons el-icon-save"></span
      ></el-header>
      <el-main><EditorMarkdown v-model="modelValue" /></el-main>
      <el-footer>
        <el-button type="success" round>存为草稿</el-button>
        <el-button type="danger" round @click="handlePublic"
          >发布</el-button
        ></el-footer
      >
    </el-container>
  </div>
</template>
<script>
import EditorMarkdown from "../../components/EditorMarkdown.vue";
import { post } from "../../utils/request";

export default {
  name: "CreateArticle",
  data() {
    return { modelValue: "" };
  },
  components: { EditorMarkdown },
  methods: {
    async handlePublic() {
      const content = this.modelValue;
      const res1 = content.indexOf("\n");
      // 获取标题
      const title = content.substring(2, res1);
      const result = await post("/api/article", {
        title,
        content,
      });
      if (result.errno === 0) {
        this.$message({
          message: "发布成功",
          type: "success",
        });
      } else {
        this.$message.error("发布失败");
      }
    },
  },
};
</script>
<style lang="scss"  scoped>
.create-article {
  .el-container {
    margin: 0 40px;
    .el-header,
    .el-footer {
      background-color: pink;
      color: #333;
      position: fixed;
      left: 40px;
      right: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      z-index: 99;
    }
    .el-header {
      top: 0;
      margin-bottom: 100px;
    }
    .el-footer {
      bottom: 0;
    }
    .el-main {
      padding: 0;
      background-color: #e9eef3;
      color: #333;
      position: fixed;
      top: 50px;
      // bottom: 50px;
      left: 40px;
      right: 40px;
    }
  }
}
</style>
