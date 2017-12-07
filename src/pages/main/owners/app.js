import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './app.vue'
import 'assets/css/owners.sass'
import { menu, seoTextBox } from 'assets/js/global'

menu.init()
seoTextBox.init()

new Vue({
  el: '#app',
  render: h => h(App)
})
