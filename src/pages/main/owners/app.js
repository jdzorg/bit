import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './app.vue'
import 'assets/css/owners.sass'
import { menu, seoTextBox } from 'assets/js/global'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'

Vue.use(VeeValidate)

menu.init()
seoTextBox.init()

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
