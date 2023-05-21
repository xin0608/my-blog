<template>
  <div>
    <link rel="stylesheet" href="/static/editor.md/css/editormd.css" />
    <!-- editormd -->
    <!-- <button id="get-md-btn">Get Markdown</button>
    <button id="get-html-btn">Get HTML</button> -->
    <div id="editor" style="z-index: 10" />
  </div>
</template>
 
<script>
import scriptjs from "scriptjs";

export default {
  name: "EditorMarkdown",
  props: {
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    height: {
      type: String,
      required: false,
      default: "720px",
    },
  },
  data() {
    return {
      editor: {},
    };
  },
  mounted() {
    // 设置延迟初始化markdown编辑器, 因为只会初始化一次，需要等待数据加载完成之后再初始化
    setTimeout(() => {
      this.initEditor();
    }, 300);
  },
  methods: {
    initEditor() {
      (async () => {
        await this.fetchScript("/static/editor.md/lib/jquery.js");
        await this.fetchScript("/static/editor.md/editormd.js");
        // await this.fetchScript('/static/editor.md/editormd.amd.js')

        this.$nextTick(() => {
          // 内容
          var content = this.modelValue;

          const editor = window.editormd("editor", {
            path: "/static/editor.md/lib/",
            height: this.height,
            emoji: true,
            // 开启图片上传，图片上传重写了的
            imageUpload: true,
            saveHTMLToTextarea: true,
            // 可分区域定制样式主题
            theme: localStorage.theme ? localStorage.theme : "light",
            editorTheme: localStorage.editorTheme
              ? localStorage.editorTheme
              : "light",
            previewTheme: localStorage.previewTheme
              ? localStorage.previewTheme
              : "default",

            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp", "ico"],
            // 这里需要考虑返回值，所以封装了一层
            imageUploadURL: "/markdown/upload", //需在服务端定义接口
            htmlDecode: true, // 识别html标签
            // 监听更新，更新父组件值
            change: function () {
              this.$emit("update:modelValue", this.getMarkdown());
            },
            // 退出全屏
            onfullscreen: function () {
              // 原生JS修改层级
              var editor = document.getElementById("editor");
              editor.style["z-index"] = 13;
            },
            // 全屏
            onfullscreenExit: function () {
              // 原生JS修改层级
              var editor = document.getElementById("editor");
              editor.style["z-index"] = 10;
            },
            // 加载完成后再设置内容
            onload: function () {
              this.setMarkdown(content);
              // 加载ctrl + v粘贴图片插件
              window.editormd.loadPlugin(
                "/static/editor.md/plugins/image-handle-paste/image-handle-paste",
                function () {
                  editor.imagePaste();
                }
              );
            },
          });

          const vm = this;
          // 监听，改变父组件的值
          editor.on("change", function () {
            vm.$emit("update:modelValue", this.getMarkdown());
          });

          // this.editor = editor

          // eslint-disable-next-line no-undef
          $("#get-md-btn").bind("click", function () {
            //获取左侧Markdown内容
            alert(editor.getMarkdown());
          });

          // eslint-disable-next-line no-undef
          $("#get-html-btn").bind("click", function () {
            //获取右侧html内容
            alert(editor.getHTML());
          });
        });
      })();
    },
    fetchScript(url) {
      return new Promise((resolve) => {
        scriptjs(url, () => {
          resolve();
        });
      });
    },
  },
};
</script>
 
<style scoped>
/* 上传图片弹窗样式有点问题，可能是冲突了 */
#editor::v-deep(.editormd-dialog-header) {
  padding: 0 20px;
}
</style>