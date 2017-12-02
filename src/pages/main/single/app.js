import Vue from 'vue'
import App from './app.vue'
import Feedback from './feedback-form.vue'
import 'assets/css/single.sass'
import { menu, setHeight } from '../../../assets/js/global'

menu.init()
setHeight.set()

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#appform',
  render: h => h(Feedback)
})
