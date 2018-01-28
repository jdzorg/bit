import Vue from 'vue'
import App from './app.vue'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'
import Feedback from './feedback-form.vue'
import { menu, setHeight } from 'assets/js/global'
import PopupHead from 'components/vue/popups/popup-head'
import PopupRealtor from 'components/vue/popups/popup-realtor'
import PopupBitcoin from 'components/vue/popups/popup-bitcoin'
import 'assets/css/single.sass'

require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

window.addEventListener('load', function () {
  menu.init()
  setHeight.set()
})

Vue.use(VueLazyLoad)

Vue.use(VueTouch, { name: 'v-touch' })

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

new Vue({
  el: '#bitcoinPrice',
  render: h => h(PopupBitcoin)
})

new Vue({
  el: '#consultationRealtorMob',
  render: h => h(PopupRealtor)
})

new Vue({
  el: '#bitcoinPriceMob',
  render: h => h(PopupBitcoin)
})
