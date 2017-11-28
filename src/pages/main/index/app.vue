<template lang="pug">
    div
        .col-lg-12.reviews-wrapper
            sControl(
                @next="nextReview",
                @prev="prevReview"
                v-show="reviews.length > 2"
            )
            transition-group(
                class="reviews-trans"
                tag="div"
                name="trans-slider"
                mode="out-in"
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
    import sControl from 'components/vue/review-slider/control'
    import sItem from 'components/vue/review-slider/item'
    import bitPopup from 'components/vue/popups/popup.vue'

    import Wpapi from '../../../../node_modules/wpapi'

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

