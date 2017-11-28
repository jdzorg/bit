import Vue from 'vue'
import App from './app.vue'
import 'assets/css/rent.sass'
const textParams = {
  text: '',
  btn: '',
  minHeight: 70,
  maxHeight: '',
  isOpened: false,
  init () {
    this.getElem()
    this.maxHeight = this.text.offsetHeight
    this.text.style.height = this.minHeight + 'px'
    this.btn.addEventListener('click', this.onOpenText.bind(this))
  },
  getElem () {
    this.text = document.querySelector('#textBox')
    this.btn = document.querySelector('#openText')
  },
  onOpenText () {
    this.isOpened = !this.isOpened
    if (this.isOpened) {
      this.text.style.height = this.maxHeight + 'px'
    } else {
      this.text.style.height = this.minHeight + 'px'
    }
    this.btn.classList.toggle('hideText', undefined)
  }
}

textParams.init()

new Vue({
  el: '#appRent',
  render: h => h(App)
})
