import Vue from 'vue'
// import Axios from 'axios'
import ElementUI from 'element-ui'
import App from './app.vue'

setTimeout(setHeight, 1000)

function setHeight () {
  const setHeight = document.querySelectorAll('.setHeight')
  setHeight.forEach(el => {
    el.style.height = `${el.offsetHeight}px`
  })
}

Vue.use(ElementUI)

new Vue({
  el: '#app',
  data: {
    tworevs: [],
    reviews: [
      {
        'id': 1,
        'author_name': 'A WordPress Commenter',
        'content': {
          'rendered': 'Hi,adadaSDASDACaDCfsafsgsdhdjlsalfdkna slkfn sdallkfs lsaknsaf  this is a comment.To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.Commenter avatars come from'
        },
        'author_avatar_urls': {
          '24': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=24&d=mm&r=g',
          '48': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=48&d=mm&r=g',
          '96': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=96&d=mm&r=g'
        }
      },
      {
        'id': 2,
        'author_name': 'A WordPress Commenter 1111',
        'content': {
          'rendered': 'Hi, this is a comment.To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.Commenter avatars come from'
        },
        'author_avatar_urls': {
          '24': 'http://2.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=24&d=mm&r=g',
          '48': 'http://2.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=48&d=mm&r=g',
          '96': 'http://2.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=96&d=mm&r=g'
        }
      },
      {
        'id': 3,
        'author_name': 'A WordPress Commenter 11113',
        'content': {
          'rendered': 'Hi, this is a comment.To get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.Commenter avatars come from'
        },
        'author_avatar_urls': {
          '24': 'http://3.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=24&d=mm&r=g',
          '48': 'http://3.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=48&d=mm&r=g',
          '96': 'http://3.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=96&d=mm&r=g'
        }
      }
    ]
  },
  computed: {
    setTwoReviews () {
      const arr = []
      for (let i = 0; i < 2; i++) {
        arr.push(this.reviews)
      }
      return arr
    }
  },
  render: h => h(App)
  // methods: {
    // getReviews: function () {
      // Axios('http://demo.wp-api.org/wp-json/wp/v2/comments')
      //   .then(response => { this.reviews = response.data })
      //   .catch(e => console.log(e))
      // console.log(this.reviews)
    // }
  // },
  // created: function () {
  //   this.getReviews()
  // }
})
