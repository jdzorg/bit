<template lang="pug">
    div
        .col-lg-12.reviews-wrapper
            Control(
                @next="nextReview",
                @prev="prevReview"
                v-show="reviews.length > 2"
            )
            v-touch(
                @swipeleft="nextMobReview",
                @swiperight="prevReview",
                @swipe="setCurRevId"
            )
                transition-group(
                    class="reviews-trans"
                    tag="div"
                    name="trans-slider"
                    mode="out-in"
                )

                    Review(
                        v-for="review in curReviews",
                        :key="review.id",
                        :review="review",
                        :revId="review.id",
                        @setCurId="setCurRevId"
                    )
            Review-dots(
                :reviews="reviews",
                :curId="curRevId"
            )
        .hidden-xs.hidden-sm.col-lg-12.text-center.reviews-btn
            button.btn.btn-default.btn-transparent(@click="handlerPopUp") Оставте и Вы свой отклик!
        Popup(v-show="showPop", @close="handlerPopUp", bgClass="review")
            transition(
              name="thxmsg",
              mode="out-in"
            )
                FeedbackForm(
                  v-if="!isSent",
                  key="form",
                  :title="formHead.title",
                  :subTitle="formHead.subTitle",
                  :btnName="formHead.btn",
                  :sendArgs="args",
                  @setMsg="setOutputMSG"
                )
                Msg(
                  v-else,
                  :finalMSG="msg",
                  key="msg"
                )

</template>

<script>
    import Control from 'components/vue/review-slider/control'
    import Review from 'components/vue/review-slider/item'
    import Popup from 'components/vue/popups/popup.vue'
    import Msg from 'components/vue/form/msg.vue'
    import FeedbackForm from 'components/vue/form/form.vue'
    import ReviewDots from 'components/vue/review-slider/review-dots'

    import Wpapi from '../../../../node_modules/wpapi'

    const wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
      endpoint: 'http://bitrealt.com.ua/wp-json'
    });

    export default {
      components: {
        Control, Review, Popup, FeedbackForm, Msg, ReviewDots
      },
      data () {
        return {
          isSent: false,
          showPop: false,
          prev: 0,
          next: 0,
          curRevId: 0,
          curReviews: [],
          reviews: [],
          formHead: {
            title: 'Оставте свой отклик',
            subTitle: 'Напишите отклик, поделитесь мнением которое сложилось у<br> Вас при сотруднечестве с нашей компанией.',
            btn: 'Отправить'
          },
          args: {
            meth: 'nComment',
            type: 'create',
            endpoint: 'comments'
          },
          msg: {
            title: '',
            msg: ''
          },
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
        setCurRevId() {
          this.curRevId = parseInt(document.querySelectorAll('.reviews-container.trans-slider-item')[0].dataset.index);
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
        nextMobReview() {
          this.prev = this.next;
          this.next = this.next >= (this.reviews.length - 1) ? 0 : this.next + 1;
          this.curReviews.pop();
          this.curReviews.unshift(this.reviews[this.next])
        },
        handlerPopUp() {
          this.showPop = !this.showPop;
          document.body.style.overflow = this.showPop ? 'hidden' : '';
        },
        setOutputMSG(outputMsg) {
          const { msg, title } = outputMsg;
          this.msg.msg = msg;
          this.msg.title = title;
          this.isSent = true;
        },
      },
      mounted() {
        this.getReviews();
      }
    }

</script>

