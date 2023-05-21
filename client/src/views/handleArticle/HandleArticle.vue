<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
      <el-header style="font-size: 12px">
        <i class="el-icon-arrow-left"></i> <span>管理文章</span>
      </el-header>

      <el-main>
        <div class="td-title">
          <div class="create-time">创建时间</div>
          <div class="update-time">修改时间</div>
          <div class="article-title">文章标题</div>
          <div class="article-content">文章内容</div>
          <div class="article-isDraft">草稿</div>
          <div class="empty"></div>
        </div>
        <div
          class="td-content"
          v-for="(item, index) in list"
          :key="index"
          @click="handleEditOrDelete"
        >
          <div class="create-time">{{ item.createdAt }}</div>
          <div class="update-time">{{ item.updatedAt }}</div>
          <div class="article-title">{{ item.title }}</div>
          <div class="article-content">{{ item.Htmlcontent }}</div>
          <div class="article-isDraft">{{ item.isDraft }}</div>
          <div><i class="el-icon-edit" :aid="item._id"></i></div>
          <div><i class="el-icon-delete" :aid="item._id"></i></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { get, del } from "../../utils/request";

export default {
  name: "HandleArticle",
  data() {
    return {
      aid: 0, //每条文章的_id
      list: [],
    };
  },
  async mounted() {
    const res = await get("/api/article");
    this.list = res.data;

    // console.log(this.list);
  },
  methods: {
    async handleEditOrDelete(e) {
      // 事件委托机制

      // 获取事件源元素的aid属性
      let id = e.target.getAttribute("aid");

      // 筛选点击元素
      // 如果点击的是delete icon，删除
      if (e.target.className.includes("delete")) {
        const res = await del(`/api/article/${id}`);
        // 重新渲染
        this.list = res.data;
      }

      // 编辑
      if (e.target.className.includes("edit")) {
        // 获取该文章的markdown,传输到createArticle.vue中
        const res = await get(`/api/article/${id}`);
        const Markdowncontent = res.data.Markdowncontent;
        console.log(id);
        // 疑惑:为什么用useStore不行
        this.$store.commit("addEditArticle", { id, Markdowncontent });
        this.$router.push("/article");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.td-title {
  line-height: 20px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #000;

  text-align: center;
  .empty {
    width: 80px;
    padding: 10px;
  }
  .create-time,
  .update-time,
  .article-title {
    width: 140px;
    padding: 10px;
  }
  .article-content {
    flex: 1;
    padding: 10px;
  }
  .article-isDraft {
    width: 80px;
    padding: 10px;
  }
}
.td-content {
  line-height: 20px;
  height: 80px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #000;

  .create-time,
  .update-time,
  .article-title {
    padding: 10px;
    width: 140px;
  }
  .article-content {
    flex: 1;
    margin: 10px;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .article-isDraft,
  .el-icon-edit,
  .el-icon-delete {
    text-align: center;
    width: 40px;
    padding: 10px;
  }
}
</style>