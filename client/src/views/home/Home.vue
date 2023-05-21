<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="title">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
          <h1>星星<span>’s</span>博客--我的网上日记</h1>
        </div>
        <div class="words">加油，明天会更好</div>
        <span class="element-icons el-icon-tuichu"></span>
      </el-header>
      <el-main>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 首页显示所有文章列表 -->
          <el-menu-item index="1">首页</el-menu-item>
          <!-- 点击去到编辑文章页面 -->

          <el-menu-item index="2" @click="handleToCreate"
            >创作文章
          </el-menu-item>

          <!-- 修改或者删除文章 -->
          <el-menu-item index="3" @click="handleToArticleList">
            管理文章</el-menu-item
          >
          <el-menu-item index="4" @click="handleToAboutMe"
            >关于星星</el-menu-item
          >
          <el-menu-item index="5" @click="handleToComments"
            >给自己留言</el-menu-item
          >
        </el-menu>
        <el-row :gutter="20">
          <el-col :span="16">
            <router-link
              v-for="(item, index) in list"
              :key="index"
              class="grid-content"
              :to="`/article/${item._id}`"
            >
              <!-- 首页显示title，点击显示详情 -->
              {{ item.title }}
            </router-link>
          </el-col>
          <el-col :span="8">
            <el-aside width="100px">
              <div class="search">站内搜索</div>
              <div class="fast-menu">快捷菜单</div>
              <div class="hot">热门推荐</div>
            </el-aside></el-col
          >
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { get } from "../../utils/request";
export default {
  name: "Home",
  data() {
    return {
      list: [],
      activeIndex2: "1",
      circleUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fbf6fe5f0-4e5c-4dd1-9545-f58151164f0c%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1686921326&t=ebaa7214496ca970b092241ed9416fe8",
    };
  },
  async mounted() {
    const res = await get("/api/article");
    // 过滤掉草稿文章
    res.data.map((item) => {
      if (!item.isDraft) {
        this.list.push(item);
      }
    });
    // this.list = res.data;
    console.log(this.list);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    async handleToCreate() {
      this.$router.push("/article");
    },
    handleToArticleList() {
      this.$router.push("/article-list");
    },
    handleToAboutMe() {
      this.$router.push("/aboutme");
    },
    handleToComments() {
      this.$router.push("/comments");
    },
  },
};
</script>
<style  lang="scss" scoped>
.home {
  .el-container {
    margin: 0 40px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .el-header {
      display: flex;
      //   项目全部垂直居中
      align-items: center;
      background-color: pink;
      color: #333;
      text-align: center;
      line-height: 60px;
      height: 100px;
      margin-bottom: 10px;
      .title {
        width: 200px;

        .el-avatar {
          position: relative;
          top: 9px;

          float: left;
        }
        h1 {
          margin-left: 10px;
          color: white;

          float: left;
          font-size: 12px;
          span {
            font-size: 20px;
            color: red;
          }
        }
      }
      .words {
        font-size: 12px;
        text-align: right;
        color: white;

        flex: 1;
      }
    }
    .el-main {
      flex: 1;
      padding: 0;
      background-color: #e9eef3;
      color: #333;
      position: fixed;
      top: 110px;
      left: 40px;
      bottom: 0;
      right: 40px;
      .el-menu-demo {
        background-color: pink;
        margin-bottom: 10px;
      }
      .el-aside {
        background-color: #d3dce6;
        color: #333;
        div {
          background-color: #fff;
          margin-bottom: 10px;
        }
      }

      .grid-content {
        display: block;
        margin-left: 10px;
        padding: 20px;
        border-radius: 4px;
        background-color: #fff;
        margin-bottom: 10px;
      }
    }
  }
}
</style>