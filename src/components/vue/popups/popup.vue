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
                        transition(
                          name="thxmsg",
                          mode="out-in"
                        )
                            bitForm(
                              v-if="!isSent",
                              key="form",
                              :title="formHead.title",
                              :subTitle="formHead.subTitle",
                              :btnName="formHead.btn"
                            )
                            fMSG(
                              v-else,
                              :finalMSG="msg",
                              key="msg"
                            )

</template>

<script>

    //TODO-popup make slot
    import fMSG from '../form/form-thxmsg.vue'
    import bitForm from '../form/form.vue'

  export default {
    components: {
      bitForm, fMSG
    },
    data() {
      return{
        isSent: false,
        formHead: {
          title: 'Оставте свой отклик',
          subTitle: 'Напишите отклик, поделитесь мнением которое сложилось у<br> Вас при сотруднечестве с нашей компанией.',
          btn: 'Отправить'
        },
        msg: {
          title: '',
          msg: ''
        },
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
            height: 454px
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

</style>