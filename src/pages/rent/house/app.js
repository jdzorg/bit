import Vue from 'vue'
import App from './app.vue'
import PopupHead from 'components/vue/popups/popup-head'
import PopupConsult from 'components/vue/popups/popup-consultation'
import { menu, setHeight, seoTextBox } from 'assets/js/global'
import 'assets/css/rent.sass'

menu.init()
setHeight.set()
seoTextBox.init()

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#consultationHead',
  render: h => h(PopupHead)
})

new Vue({
  el: '#consult',
  render: h => h(PopupConsult)
})
