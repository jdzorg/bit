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
            button.btn.btn-default.btn-transparent(@click="handlerPopUp") Оставте и Вы свой отклик!
        bitPopup(
          v-show="showPop",
          @close="handlerPopUp"
        )

</template>

<script>
    import sControl from '../../components/vue/review-slider/slider-control'
    import sItem from '../../components/vue/review-slider/slider-item'
    import bitPopup from '../../components/vue/popups/popup.vue'

    import Wpapi from '../../../node_modules/wpapi'

    const wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
      endpoint: 'http://bitrealt.com.ua/wp-json'
    });

    export default {
      components: {
        sControl, sItem, bitPopup
      },
      data () {
        return {
          showPop: false,
          prev: 0,
          next: 0,
          loading: true,
          curReviews: [],
          reviews: []
        }
      },
      methods: {
        getReviews() {
          wp.comments().get({
            post: 2,
            order: 'DESC',
            orderby: 'date'
          })
            .then(resp => {
              this.reviews = resp;
            })
            .then(() => {this.setTwoReviews()})
            .catch(er => {console.log(er)});
        },
        setTwoReviews() {
          let i = 0;
          for(i; i < 2; i++) {
            this.curReviews.push(this.reviews[i])
          }
          this.prev = 0;
          this.next = 1
        },
        prevReview() {
          this.next = this.prev;
          this.prev = this.prev <= 0 ? this.reviews.length - 1 : this.prev - 1;
          this.curReviews.pop();
          this.curReviews.unshift(this.reviews[this.prev])
        },
        nextReview() {
          this.prev = this.next;
          this.next = this.next >= (this.reviews.length - 1) ? 0 : this.next + 1;
          this.curReviews.shift();
          this.curReviews.push(this.reviews[this.next])
        },
        handlerPopUp() {
          this.showPop = !this.showPop;
            document.body.style.overflow = this.showPop ? 'hidden' : '';
        }
      },
      mounted() {
        this.getReviews();
      }
    }

</script>

<!--<style src="../../assets/css/index.sass" lang="sass"></style>-->
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
            width: 40%
            padding: 30px 25px
            box-shadow: 0 0 20px 14px #fbfbfb
            &:first-child
                margin-right: 30px
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
