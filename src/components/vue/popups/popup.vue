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
                              :btnName="formHead.btn",
                              :sendArgs="args"
                            )
                            fMSG(
                              v-else,
                              :finalMSG="msg",
                              key="msg"
                            )

</template>

<script>

    //TODO-popup make slot
    import fMSG from '../form/msg.vue'
    import bitForm from '../form/form.vue'

  export default {
    components: {
      bitForm, fMSG
    },
    data() {
      return{
        args: {
          meth: 'nComment',
          type: 'create',
          endpoint: 'comments'
        },
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
    .popup-trans
        &-enter-active, &-leave-active
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
</style>