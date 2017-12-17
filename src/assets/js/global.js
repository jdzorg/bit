import Countup from 'countup.js'

var menu = {
  menu: '',
  navObj: {},
  hiddenNav: [],
  curId: '',
  curLi: '',
  init () {
    this.menu = document.querySelector('.navbar-nav')
    this.hiddenNav = document.querySelectorAll('.hidden-nav')
    this.menu.addEventListener('click', this.menuHandler.bind(this))

    for (let i = 0; i < this.hiddenNav.length; i++) {
      this.navObj['#' + this.hiddenNav[i].id] = this.hiddenNav[i]
    }
  },
  menuHandler (e) {
    var target = e.target
    if (target.classList.contains('itemSubNav')) {
      e.preventDefault()
      if (this.curId !== '') {
        this.navObj[this.curId].classList.remove('active')
        this.curLi.classList.remove('active')
      }
      this.curId = target.getAttribute('href')
      if (this.navObj.hasOwnProperty(this.curId)) {
        this.curLi = target.parentNode
        this.curLi.classList.add('active')
        this.navObj[this.curId].classList.add('active')
        this.navObj[this.curId].addEventListener('mouseleave', this.closeNav.bind(this))
      }
    }
  },
  closeNav () {
    this.curLi.classList.remove('active')
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
  nums: '',
  numsDone: 0,
  isScrolling: false,
  init () {
    this.elements = document.querySelectorAll('.animate')
    this.nums = document.querySelectorAll('.num')
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
    if (this.numsDone !== this.nums.length) {
      for (var y = 0; y < this.nums.length; y++) {
        if (this.isFullyVisible(this.nums[y])) {
          var el = this.nums[y]
          var to = parseInt(el.dataset.num)
          if (to !== 0) {
            el.dataset.num = '0'
            var count = new Countup(el, 0, to, 0, 1.5)
            count.start()
            this.numsDone += 1
          }
        }
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

const seoTextBox = {
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
      this.text.style.height = (this.maxHeight + 50) + 'px'
    } else {
      this.text.style.height = this.minHeight + 'px'
    }
    this.btn.classList.toggle('hideText', undefined)
  }
}

const sendMethods = {
  type: 'GET',
  wpEndPoint: 'posts',
  wp: {},
  url: 'http://bitrealt.com.ua/wp-content/themes/bitrealty-theme/form-handlers/form-handler.php',
  fileUploadUrl: 'http://bitrealt.com.ua/wp-content/themes/bitrealty-theme/form-handlers/owners-form-handler.php',
  errormsg: {
    title: 'Произошла ошибка',
    msg: 'При отправке произошла ошибка. Перезагрузить страницу и еще раз попробуйте отправить или обратитесь в администрацию сайта.'
  },
  nPromise (method) {
    return new Promise((resolve, reject) => {
      resolve(method)
      reject((er) => { console.log(er) })
    })
  },
  serialize (obj) {
    return Object.keys(obj).map((prop) => {
      return [prop, obj[prop]].map(encodeURIComponent).join('=')
    }).join('&')
  },
  nComment (args) {
    /*
    * wpargs = {
    *   type: get/create,
    *   endpoint: comments/posts/,
    *   data: data to post/data to search(filter)
    * }
    */
    const type = args.type || this.type
    const meth = args.endpoint || this.wpEndPoint
    const { email, name, text, phone } = args.userData
    /*eslint camelcase: ["error", {properties: "never"}]*/
    return this.wp[meth]()[type]({
      post: 2,
      author_email: email,
      author_name: name,
      content: text,
      author_url: phone.replace(/\s/g, '')
    })
      .then(res => {
        return {
          title: 'Ваш отзыв отправлен',
          msg: 'Ваш отзыв появится на сайте как только его одобрит модератор'
        }
      })
      .catch(rej => {
        console.log(rej)
        return this.errormsg
      })
  },
  nFeedback (args) {
    /*
     * mailargs = {
     *    url: ...,
     *    type: POST
     *   formName: like feedback,
     *   data: data to send by mail
     * }
     */
    const self = this
    const url = args.url || this.url
    const data = args.userData
    data.formName = args.formName
    if (data.hasOwnProperty('realtyData') && data.realtyData.hasOwnProperty('photo')) {
      var files = data.realtyData.photo
      var photoData = new FormData()
      for (var i = 0; i < files.length; i++) {
        photoData.append(i, files[i])
      }
      photoData.append('file_upload', '1')
      // delete data.realtyData.photo

      return fetch(this.fileUploadUrl, { method: 'POST', body: photoData })
        .then(resp => resp.json())
        .then(path => {
          data.realtyData.photo = path.files
          const options = {
            method: args.type || self.type,
            body: JSON.stringify(data),
            mode: 'cors'
          }
          return fetch(url, options)
            .then(res => {
              return {
                title: 'Ваша заявка принята',
                msg: 'В скором времени наш менеджер свяжется с Вами.'
              }
            })
            .catch(rej => {
              console.log(rej)
              return this.errormsg
            })
        })
        .catch(rej => {
          console.log(rej)
          return this.errormsg
        })
    } else {
      const options = {
        method: args.type || self.type,
        body: JSON.stringify(data),
        mode: 'cors'
      }

      return fetch(url, options)
        .then(res => {
          return {
            title: 'Ваша заявка принята',
            msg: 'В скором времени наш менеджер свяжется с Вами.'
          }
        })
        .catch(rej => {
          console.log(rej)
          return this.errormsg
        })
    }
  }
}

export { menu, setHeight, scrollAnimate, seoTextBox, sendMethods }
