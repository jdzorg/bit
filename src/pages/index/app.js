import Vue from 'vue'
import '../../assets/css/index.sass'
// import ElementUI from 'element-ui'
import App from './app.vue'
import Feedback from './feedback-form.vue'

setTimeout(() => {
  setHeight()
  scrollListening()
}, 1000)

function setHeight () {
  const setHeight = document.querySelectorAll('.setHeight')
  for (let i = 0; i < setHeight.length; i++) {
    setHeight[i].style.height = setHeight[i].offsetHeight + 'px'
  }
  // setHeight.forEach(el => {
  //   el.style.height = `${el.offsetHeight}px`
  // })
}
const elements = document.querySelectorAll('.animate')
let isScrolling = false

function scrollListening () {
  document.addEventListener('scroll', scrollHandler)
  document.addEventListener('DOMContentLoaded', scrolling, false)
}
function scrollHandler (e) {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      scrolling(e)
      isScrolling = false
    })
  }
  isScrolling = true
}

function scrolling (e) {
  for (let i = 0; i < elements.length; i++) {
    const listItem = elements[i]

    if (isFullyVisible(listItem)) {
      listItem.classList.add('active')
    } else {
      listItem.classList.remove('active')
    }
  }
}

// function isPartiallyVisible (el) {
//   const elementBoundary = el.getBoundingClientRect()
//
//   const top = elementBoundary.top
//   const bottom = elementBoundary.bottom
//   const height = elementBoundary.height
//
//   return ((top + height >= 0) && (height + window.innerHeight >= bottom))
// }

function isFullyVisible (el) {
  const elementBoundary = el.getBoundingClientRect()
  const top = elementBoundary.top
  const bottom = elementBoundary.bottom
  return ((top >= 0) && (bottom <= window.innerHeight))
}

// Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#appform',
  render: h => h(Feedback)
})
