import Vue from 'vue'
import App from './app.vue'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import Feedback from './feedback-form.vue'
import PopupHead from 'components/vue/popups/popup-head'
import { menu, scrollAnimate } from 'assets/js/global'
import 'assets/css/valuation.sass'

Vue.use(VeeValidate)

menu.init()
scrollAnimate.init()

const phone = (value) => {
  const pat = /^(\+3)?(8\s?)?(\(?0)?[\-\(\)\d\s]{9,13}$/
  return pat.test(value)
}

const text = (value) => {
  const pat = /^[а-яА-Яa-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\(\)\s]{0,}$/
  return pat.test(value)
}

Validator.extend('phone', phone)
Validator.extend('text', text)

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
