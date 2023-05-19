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
            悄悄话<input type="checkbox" />
            <el-button type="danger" round>提交</el-button>
          </div>
        </div>
      </el-header>
      <el-main
        ><div class="title">大家都在说</div>
        <div class="item" v-for="(item, index) in list" :key="index">
          {{ item }}
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "LeaveComments",
  data() {
    return {
      textarea: "",
      input: "",
      list: [1, 2, 2, 3, 3, 4],
    };
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