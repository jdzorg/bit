import Vue from 'vue'
// import Axios from 'axios'
import App from './app.vue'

setTimeout(setHeight, 1000)

function setHeight () {
  const setHeight = document.querySelectorAll('.setHeight')
  setHeight.forEach(el => {
    el.style.height = `${el.offsetHeight}px`
  })
}

new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    reviews: [
      {
        'id': 1,
        'post': 1,
        'parent': 0,
        'author': 0,
        'author_name': 'A WordPress Commenter',
        'author_url': 'http://wp-api.org/',
        'date': '2017-05-23T06:25:50',
        'date_gmt': '2017-05-23T06:25:50',
        'content': {
          'rendered': '<p>Hi, this is a comment.<br />nTo get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.<br \/>\nCommenter avatars come from <a href=\'https://gravatar.com\'>Gravatar<\/a>.<\/p>\n'
        },
        'link': 'https://demo.wp-api.org/2017/05/23/hello-world/#comment-1',
        'status': 'approved',
        'type': 'comment',
        'author_avatar_urls': {
          '24': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=24&d=mm&r=g',
          '48': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=48&d=mm&r=g',
          '96': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=96&d=mm&r=g'
        },
        'meta': [],
        '_links': {
          'self': [{ 'href': 'https://demo.wp-api.org/wp-json/wp/v2/comments/1' }],
          'collection': [{ 'href': 'https://demo.wp-api.org/wp-json/wp/v2/comments' }],
          'up': [{
            'embeddable': true,
            'post_type': 'post',
            'href': 'https://demo.wp-api.org/wp-json/wp/v2/posts/1'
          }],
          'children': [{ 'href': 'https://demo.wp-api.org/wp-json/wp/v2/comments?parent=1' }]
        }
      },
      {
        'id': 2,
        'post': 2,
        'parent': 0,
        'author': 0,
        'author_name': 'A WordPress Commenter 1',
        'author_url': 'http://wp-api.org/',
        'date': '2017-05-23T06:25:50',
        'date_gmt': '2017-05-23T06:25:50',
        'content': {
          'rendered': '<p>Hi, this is a comment.<br />nTo get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.<br \/>\nCommenter avatars come from <a href=\'https://gravatar.com\'>Gravatar<\/a>.<\/p>\n'
        },
        'link': 'https://demo.wp-api.org/2017/05/23/hello-world/#comment-2',
        'status': 'approved',
        'type': 'comment',
        'author_avatar_urls': {
          '24': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=24&d=mm&r=g',
          '48': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=48&d=mm&r=g',
          '96': 'http://1.gravatar.com/avatar/d7a973c7dab26985da5f961be7b74480?s=96&d=mm&r=g'
        },
        'meta': [],
        '_links': {
          'self': [{ 'href': 'https://demo.wp-api.org/wp-json/wp/v2/comments/2' }],
          'collection': [{ 'href': 'https://demo.wp-api.org/wp-json/wp/v2/comments' }],
          'up': [{
            'embeddable': true,
            'post_type': 'post',
            'href': 'https://demo.wp-api.org/wp-json/wp/v2/posts/2'
          }],
          'children': [{ 'href': 'https://demo.wp-api.org/wp-json/wp/v2/comments?parent=2' }]
        }
      }
    ]

  },
  methods: {
    getReviews: function () {
      // Axios('http://demo.wp-api.org/wp-json/wp/v2/comments')
      //   .then(response => { this.reviews = response.data })
      //   .catch(e => console.log(e))
      // console.log(this.reviews)
    }
  },
  created: function () {
    this.getReviews()
  }
})
