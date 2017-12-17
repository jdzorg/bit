import Vue from 'vue'
// import ElementUI from 'element-ui'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import App from './app.vue'
import PopupHead from 'components/vue/popups/popup-head'
import { menu, seoTextBox } from 'assets/js/global'
import 'assets/css/owners.sass'

Vue.use(VeeValidate)
window.addEventListener('load', function () {
  menu.init()
  seoTextBox.init()
})

const phone = (value) => {
  const pat = /^(\+3)?(8\s?)?(\(?0)?[\-\(\)\d\s]{9,13}$/
  return pat.test(value)
}

const text = (value) => {
  const pat = /^[а-яА-Яa-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\s]{0,}$/
  return pat.test(value)
}

const buildNum = (value) => {
  const pat = /^\d+(\/\d+)?$/
  return pat.test(value)
}

Validator.extend('phone', phone)
Validator.extend('text', text)
Validator.extend('buildNum', buildNum)

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#consultationHead',
  render: h => h(PopupHead)
})
