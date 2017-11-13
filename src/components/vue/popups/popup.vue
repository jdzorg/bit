<template lang="pug">
    transition(
      name="popup-trans"
    )
        .popup(:style="setPopUpHeight")
            .popup-container.review-send
                .container
                    .row
                        .close(@click="$emit('close')")
                            span
                            span
                        bitForm(v-if="isSent")
                        pMSG(
                          v-else,
                          :finalMSG="msg"
                        )
            transition-group(
              tag="p"
              name="error-trans",
              mode="in-out"
            )
                span.errorMSG(
                  v-show="isValid",
                  :key="0"
                ) Некоторые из полей неверно заполнены
                span.errorMSG(
                  v-show="isEmpty",
                  :key="1"
                ) Некоторые из полей неверно заполнены
</template>

<script>
  import bitForm from '../form.vue'
  import pMSG from '../popups/popup-thxmsg.vue'

  export default {
    components: {
      bitForm, pMSG
    },
    data() {
      return{
        msg: {
          title: '',
          msg: ''
        },
        isSent: false,
        isValid: false,
        isEmpty: false,
      }
    },
    methods: {
      onOffErrorMSG(form) {
        this.isValid = Array.from(form).some(el => {
          return el.classList.contains('error')
        });
      }
    },
    computed: {
      setPopUpHeight() {
        return `height: ${document.documentElement.clientHeight}px`;
      }
    }
  }
</script>

<style lang="sass">
    .popup
        position: fixed
        z-index: 10000
        width: 100%
        left: 0
        top: 0
        display: flex
        flex-direction: column
        justify-content: center
        background:
            image: url(../../../assets/img/pop-review.png)
            position: center
            repeat: no-repeat
            size: 100% 100%
        &-container, & .row
            position: relative
        & form
            position: relative
        & input.error
            outline-color: rgba(255, 0, 0, 0.62)
            border-bottom: 2px solid rgba(255, 0, 0, 0.62)
        & textarea.error
            border: 2px solid rgba(255, 0, 0, 0.62)
        & .errorMSG
            margin-top: 10px
            text-align: center
            color: red
        & .close
            position: absolute
            width: 40px
            height: 40px
            top: 0
            right: 0
            opacity: 1
            transform: translate(-400%, -100%)
            & > span
                position: absolute
                display: block
                width: 40px
                height: 2px
                top: 15px
                background-color: #fff
                transition: .6s ease
                &:first-child
                    transform: rotate(40deg)
                &:last-child
                    transform: rotate(-40deg)
            &:hover > span
                height: 3px
        &-trans
            &-enter-active, &-leave-active
                transition: .5s ease
            &-enter, &-leave-to
                opacity: 0
        & p
            margin-top: 10px
            text-align: center
        & .error-trans
            &-enter-active, &-leave-active
                transition: .3s ease
            &-enter, &-leave-to
                opacity: 0
                transform: translateY(60px)


</style>