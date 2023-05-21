<template>
  <div class="comments">
    <el-container>
      <el-header
        ><el-input
          type="textarea"
          :rows="10"
          placeholder="说点什么吧"
          v-model="textarea"
        >
        </el-input>
        <div>
          <el-input placeholder="怎么称呼你呢..." v-model="input" clearable>
          </el-input>
          <div class="check">
            悄悄话<input
              type="checkbox"
              :checked="this.checked"
              @click="handleCheck"
            />
            <el-button type="danger" round @click="handleSubmit"
              >提交</el-button
            >
          </div>
        </div>
      </el-header>
      <el-main
        ><div class="title">大家都在说</div>
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleDelete"
        >
          <p>{{ item.commentator }}</p>
          <p>{{ item.comment }}</p>
          <!-- 游客不显示全部delete，只显示自己的评论的delete -->
          <span><i class="el-icon-delete" :aid="item._id"></i></span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { post, get, del } from "../../utils/request";

const createComment = async (username, comment, commentator, isAnonymous) => {
  const result = await post("/api/comment", {
    username,
    comment,
    commentator,
    isAnonymous,
  });
  console.log(result);
  if (result.errno === 0) return true;
  else return false;
};
export default {
  name: "LeaveComments",
  data() {
    return {
      textarea: "",
      input: "",
      checked: false,
      list: [],
      aid: 0,
    };
  },
  async mounted() {
    const res = await get("/api/comment");
    this.list = res.data;
  },
  methods: {
    handleCheck() {
      this.checked = !this.checked;
    },
    async handleSubmit() {
      const username = localStorage.username; //博客用户
      const comment = this.textarea; //留言
      let commentator; //留言人
      // 是否匿名
      const isAnonymous = this.checked;

      if (isAnonymous) {
        commentator = "匿名";
      } else {
        commentator = this.input;
      }
      const result = createComment(username, comment, commentator, isAnonymous);
      if (result) {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        const res = await get("/api/comment");
        this.list = res.data;
      } else {
        this.$message.error("发布失败");
      }
    },
    async handleDelete(e) {
      // 获取事件源元素的aid属性
      let id = e.target.getAttribute("aid");
      const username = localStorage.username; //博客用户

      if (e.target.className.includes("delete")) {
        const res = await del(`/api/comment/${id}`, { username });
        // 重新渲染
        this.list = res.data;
      }
    },
  },
};
</script>
<style lang='scss' >
.comments {
  padding: 100px;
  .el-header {
    margin-bottom: 10px;
    padding: 20px;
    background-color: rgba(244, 236, 236, 0.4);
    color: #333;

    .el-textarea__inner {
      margin-bottom: 10px;
    }
    .el-input--suffix {
      display: inline-block;
      width: 145px;
    }
    .check {
      float: right;
      .el-button--small.is-round {
        padding: 9px 30px;
        margin-left: 20px;
      }
    }
  }

  .el-main {
    background-color: rgba(244, 236, 236, 0.4);
    color: #333;
    .title,
    .item {
      margin-bottom: 10px;
      padding-left: 10px;
      line-height: 20px;

      background-color: white;
    }
  }
}
.comments::after {
  content: "";
  background: url(../../../public/bg.jpg);
  background-size: cover;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
</style>