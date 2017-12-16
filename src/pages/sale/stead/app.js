import Vue from 'vue'
import App from './app.vue'
import 'assets/css/rent.sass'
import { menu, setHeight, seoTextBox } from '../../../assets/js/global'

menu.init()
setHeight.set()
seoTextBox.init()

new Vue({
  el: '#app',
  render: h => h(App)
})
