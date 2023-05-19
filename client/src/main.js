import { createApp } from 'vue'
// Vue3中导入element-ui的方式
import element from 'element-plus';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router';
import './style/reset.css'
import './assets/font_4075306_h337kr8u6kc/iconfont.css'

createApp(App).use(element, { size: 'small', zIndex: 3000 }).use(router).mount('#app')


