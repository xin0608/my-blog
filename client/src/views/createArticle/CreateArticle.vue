<template>
  <div class="create-article">
    <el-container>
      <el-header><i class="el-icon-arrow-left"></i>发布文章 </el-header>
      <el-main><EditorMarkdown v-model="modelValue" /></el-main>
      <el-footer>
        <el-button type="success" round @click="handleDraft"
          >存为草稿</el-button
        >
        <el-button type="danger" round @click="handlePublic"
          >发布</el-button
        ></el-footer
      >
    </el-container>
  </div>
</template>
<script>
import { useStore } from "vuex";
import EditorMarkdown from "../../components/EditorMarkdown.vue";
import { post } from "../../utils/request";

const getHTMLAndTitle = (modelValue) => {
  const editor2 = window.editormd("editor", {
    path: "/static/editor.md/lib/",
    saveHTMLToTextarea: true,
    htmlDecode: true, // 识别html标签
  });
  //获取右侧html内容
  const content = editor2.getHTML();
  const text = modelValue;
  const res1 = text.indexOf("\n");
  // 获取标题
  const title = text.substring(2, res1);
  return { content, title };
};
const createArticle = async (content, title, modelValue, isDraft) => {
  // 将markdown和HTML都传进去
  const result = await post("/api/article", {
    title,
    Htmlcontent: content,
    Markdowncontent: modelValue,
    isDraft,
  });
  if (result.errno === 0) {
    //   发布成功
    return true;
  } else {
    // 发布失败
    return false;
  }
};
const updateArticle = async (content, title, modelValue, isDraft, id) => {
  const result = await post(`/api/article/${id}`, {
    title,
    Htmlcontent: content,
    Markdowncontent: modelValue,
    isDraft,
  });
  if (result.errno === 0) {
    //   更新成功
    return true;
  } else {
    // 更新失败
    return false;
  }
};

export default {
  name: "CreateArticle",
  data() {
    return {
      id: "", //更新文章的id
      isUpdate: false, //是否是更新文章，默认是创建文章
      modelValue: "",
      isDraft: false, //是否是草稿，默认不是
    };
  },
  components: { EditorMarkdown },
  mounted() {
    const store = useStore();
    const { eid, isUpdate, editArticle } = store?.state.edit;
    this.id = eid;
    this.isUpdate = isUpdate;
    this.modelValue = editArticle;
  },
  methods: {
    async handleDraft() {
      const { content, title } = getHTMLAndTitle(this.modelValue);
      if (this.isUpdate) {
        const result = updateArticle(
          content,
          title,
          this.modelValue,
          true,
          this.id
        );
        if (result) {
          this.$router.push("/home");
          this.$message({
            message: "更新成功",
            type: "success",
          });
          // 更新成功后清空
          this.$store.commit("cleanEditArticle");
        } else {
          this.$message.error("更新失败");
        }
      } else {
        const result = createArticle(content, title, this.modelValue, true);

        if (result) {
          this.$router.push("/home");
          this.$message({
            message: "发布成功",
            type: "success",
          });
        } else {
          this.$message.error("发布失败");
        }
      }
    },
    async handlePublic() {
      const { content, title } = getHTMLAndTitle(this.modelValue);

      if (this.isUpdate) {
        const result = updateArticle(
          content,
          title,
          this.modelValue,
          false, //非草稿
          this.id
        );
        if (result) {
          this.$router.push("/home");
          this.$message({
            message: "更新成功",
            type: "success",
          });
          // 更新成功后清空
          this.$store.commit("cleanEditArticle");
        } else {
          this.$message.error("更新失败");
        }
      } else {
        const result = createArticle(content, title, this.modelValue, false);
        if (result) {
          this.$router.push("/home");
          this.$message({
            message: "发布成功",
            type: "success",
          });
        } else {
          this.$message.error("发布失败");
        }
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
