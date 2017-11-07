<template lang="pug">
    div
        //(v-cloak)
        .col-lg-12.reviews-wrapper
            //(v-loading.body="loading")
            sControl(
                @next="nextReview",
                @prev="prevReview"
                v-show="reviews.length > 2"
            )
            transition-group(
                class="reviews-trans"
                tag="div"
                name="trans-slider"
                mode="in-out"
            )
                sItem(
                    v-for="(review, index) in curReviews",
                    :key="review.id",
                    :review="review"
                )
        .col-lg-12.text-center.reviews-btn
            button.btn.btn-default.btn-transparent Оставте и Вы свой отклик!

</template>

<style lang="sass">
    /*.reviews-trans*/
    .trans-slider
        &-item, &-move
            background-color: #fff
            transition: .6s ease
        &-leave-active
            transition: .3s ease
            position: absolute
        &-enter, &-leave-to
            opacity: 0
            transform: translateY(100px)
            position: absolute
</style>

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
          curReviews: [],
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
              'author_name': 'A WordPress Commenter 11112',
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
      methods: {
        setTwoReviews() {
          let i = 0;
          for(i; i < 2; i++) {
            this.curReviews.push(this.reviews[i])
          }
          this.prev = 0;
          this.next = 1
        },
        prevReview: function() {
          this.next = this.prev;
          this.prev = this.prev <= 0 ? this.reviews.length - 1 : this.prev - 1;
//          debugger
          this.curReviews.pop();
          this.curReviews.unshift(this.reviews[this.prev])
        },
        nextReview: function() {
//          debugger
          this.prev = this.next;
          this.next = this.next >= (this.reviews.length - 1) ? 0 : this.next + 1;
          this.curReviews.shift();
          this.curReviews.push(this.reviews[this.next])
        }
      },
      mounted() {
        this.setTwoReviews()
      }
    }
</script>

<style src="../../assets/css/index.sass" lang="sass"></style>
<style lang="sass">
    .reviews
        &-wrapper
            position: relative
            width: 100%
            margin-top: 50px
        &-trans
            position: relative
            display: flex
            flex-direction: row
            justify-content: center
            width: 100%
        /*overflow: hidden*/
        &-control
            position: absolute
            z-index: 2
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
                transform: scale(-1, 1)
            .prev
                left: 0

        &-container
            display: flex
            flex-direction: row
            align-items: center
            width: 45%
            padding: 30px 25px
            box-shadow: 0 0 20px 14px #fbfbfb
            &:first-child
                margin-right: 20px
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
        &-btn > button.btn
            margin-top: 50px
            color: #000
            border-color: #000

</style>