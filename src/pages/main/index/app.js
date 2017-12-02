import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './app.vue'
import Feedback from './feedback-form.vue'
import 'assets/css/index.sass'
import { menu, setHeight, scrollAnimate } from '../../../assets/js/global'

menu.init()
setHeight.set()
scrollAnimate.init()

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#appform',
  render: h => h(Feedback)
})
