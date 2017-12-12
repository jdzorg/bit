import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './app.vue'
import { menu, setHeight, scrollAnimate } from 'assets/js/global'
import 'assets/css/index.sass'
import Feedback from './feedback-form.vue'
import PopupHead from 'components/vue/popups/popup-head'
import PopupMain from 'components/vue/popups/popup-main'
import PopupMeet from 'components/vue/popups/popup-meet'

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

new Vue({
  el: '#consultationHead',
  render: h => h(PopupHead)
})

new Vue({
  el: '#consultationMain',
  render: h => h(PopupMain)
})

new Vue({
  el: '#meet',
  render: h => h(PopupMeet)
})
