<template lang="pug">
    div(v-cloak)
        .col-lg-12.reviews-wrapper(v-loading.body="loading")
            sControl(
                @next="nextReview",
                @prev="prevReview"
            )
            sItem(
                v-for="(review, index) in setTwoReviews",
                :key="review.id",
                :review="review"
            )

</template>

<script>
    import sControl from '../../components/vue/review-slider/slider-control'
    import sItem from '../../components/vue/review-slider/slider-item'

    export default {
      components: {
        sControl, sItem
      },
      data () {
        return {
          prev: 0,
          next: 0,
          loading: true,
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
        }
      },
      computed: {
        setTwoReviews() {
          const arr = []
            for(let i = 0; i < 2; i++) {
              arr.push(this.reviews[i])
            }
            this.prev = arr[0].id
            this.next = arr[1].id
            return arr
        },
      },
      methods: {
        prevReview: function() {
          if(this.prev < 0) {

          }
        },
        nextReview: function() {

        }
      }
    }
</script>

<style src="../../assets/css/index.sass" lang="sass"></style>
<style lang="sass">
    .reviews
        &-wrapper
            position: relative
            display: flex
            flex-direction: row
            justify-content: space-between
            width: 100%
            margin-top: 50px
        /*overflow: hidden*/
        &-control
            position: absolute
            width: 100%
            height: 42px
            top: 50%
            left: 0
            transform: translateY(-50%)
            .control
                position: absolute
                top: 0
                width: 42px
                height: 42px
                background:
                    color: transparent
                    image: url(../../assets/img/ico-controll-arrow-left.png)
                    repeat: no-repeat
                    size: 100% 100%
                    position: center
                cursor: pointer
                transition: .3s ease
                &:hover
                    background-color: #88caec
            .next
                right: 0
                transform: scale(-1, 1) translateX(-150%)
            .prev
                left: 0
                transform: translateX(-150%)

        &-container
            display: flex
            flex-direction: row
            align-items: center
            width: 49%
            padding: 30px 25px
            box-shadow: 0 0 20px 14px #fbfbfb
        &-avatar
            display: block
            overflow: hidden
            max-width: 115px
            min-width: 115px
            height: 115px
            margin-right: 30px
            border: 2px solid #000
            border-radius: 50%
            & > img
                width: 100%
                height: auto
        &-author
            padding-left: 3px
            font:
                family: 'rubik-b', sans-serif
                weight: bold
                size: 16px
            color: #88caec
        &-review
            margin-top: 10px
            font:
                family: 'rubik-l', sans-serif
                weight: 100
                size: 14px

</style>