var menu = {
  menu: '',
  navObj: {},
  hiddenNav: [],
  curId: '',
  init () {
    this.menu = document.querySelector('.navbar-nav')
    this.hiddenNav = document.querySelectorAll('.hidden-nav')
    this.menu.addEventListener('click', this.menuHandler.bind(this))

    for (let i = 0; i < this.hiddenNav.length; i++) {
      this.navObj['#' + this.hiddenNav[i].id] = this.hiddenNav[i]
    }
  },
  menuHandler (e) {
    e.preventDefault()
    var target = e.target
    if (target.nodeName === 'A') {
      if (this.curId !== '') {
        this.navObj[this.curId].classList.remove('active')
      }
      this.curId = target.getAttribute('href')
      if (this.navObj.hasOwnProperty(this.curId)) {
        this.navObj[this.curId].classList.add('active')
        this.navObj[this.curId].addEventListener('mouseleave', this.closeNav.bind(this))
      }
    }
  },
  closeNav () {
    this.navObj[this.curId].classList.remove('active')
    this.navObj[this.curId].removeEventListener('mouseleave', this.closeNav)
  }
}

var setHeight = {
  setHeight: '',
  set () {
    this.setHeight = document.querySelectorAll('.setHeight')
    for (var i = 0; i < this.setHeight.length; i++) {
      this.setHeight[i].style.height = this.setHeight[i].offsetHeight + 'px'
    }
  }
}

var scrollAnimate = {
  elements: '',
  isScrolling: false,
  init () {
    this.elements = document.querySelectorAll('.animate')
    document.addEventListener('scroll', this.scrollHandler.bind(this))
    document.addEventListener('DOMContentLoaded', this.scrolling.bind(this), false)
  },
  scrollHandler (e) {
    if (!this.isScrolling) {
      window.requestAnimationFrame(() => {
        this.scrolling(e)
        this.isScrolling = false
      })
    }
    this.isScrolling = true
  },
  scrolling (e) {
    for (var i = 0; i < this.elements.length; i++) {
      var listItem = this.elements[i]

      if (this.isFullyVisible(listItem)) {
        listItem.classList.add('active')
      } else {
        listItem.classList.remove('active')
      }
    }
  },
  isPartiallyVisible (el) {
    var elementBoundary = el.getBoundingClientRect()

    var top = elementBoundary.top
    var bottom = elementBoundary.bottom
    var height = elementBoundary.height

    return ((top + height >= 0) && (height + window.innerHeight >= bottom))
  },
  isFullyVisible (el) {
    var elementBoundary = el.getBoundingClientRect()
    var top = elementBoundary.top
    var bottom = elementBoundary.bottom
    return ((top >= 0) && (bottom <= window.innerHeight))
  }
}

export { menu, setHeight, scrollAnimate }
