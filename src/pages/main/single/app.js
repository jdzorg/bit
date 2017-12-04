import Vue from 'vue'
import App from './app.vue'
import Feedback from './feedback-form.vue'
import 'assets/css/single.sass'
import { menu, setHeight } from 'assets/js/global'

menu.init()
setHeight.set()
//
// function initMap () {
//   var uluru = {
//     lat: -25.363,
//     lng: 131.044
//   }
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: uluru
//   })
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   })
// }
// window.initMap = initMap

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#appform',
  render: h => h(Feedback)
})
