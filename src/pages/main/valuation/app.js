import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './app.vue'
import Feedback from './feedback-form.vue'
import 'assets/css/valuation.sass'
import { menu, scrollAnimate } from 'assets/js/global'

menu.init()
scrollAnimate.init()

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#appform',
  render: h => h(Feedback)
})
