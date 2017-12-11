import Vue from 'vue'
import App from './app.vue'
import Feedback from './feedback-form.vue'
import { menu, setHeight } from 'assets/js/global'
import PopupHead from 'components/vue/popups/popup-head'
import PopupRealtor from 'components/vue/popups/popup-realtor'
import 'assets/css/single.sass'

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

new Vue({
  el: '#consultationHead',
  render: h => h(PopupHead)
})

new Vue({
  el: '#consultationRealtor',
  render: h => h(PopupRealtor)
})
