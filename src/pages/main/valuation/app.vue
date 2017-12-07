<template lang="pug">
    transition(
      name="msg",
      mode="out-in"
    )
        ValuationForm(
          v-if="!isSent",
          key="form",
          @sendApp="sendApp"
        )
        Msg(
          v-else
          key="message",
          :finalMSG="msg"
        )
</template>

<script>
  import ValuationForm from 'components/vue/form/valuation-form'
  import Msg from 'components/vue/form/msg'
  import { sendMethods } from 'assets/js/global'

  export default {
    name: "app",
    components: {
      ValuationForm, Msg
    },
    data() {
      return {
        isSent: false,
        msg: {
          title: '',
          msg: ''
        }
      }
    },
    methods: {
      sendApp(data) {
        const sm = sendMethods;
        const args = {};
        args.userData = data;
        args.type = 'POST';

        const response = sm.nPromise(sm.nFeedback(args));
        response.then((res) => {
          this.msg.title = res.title;
          this.msg.msg = res.msg;
          this.isSent = true;
        })
      }
    }
  }
</script>

<style lang="sass">
    .valuation
        & .popup-thx
            &-title, &-msg
                color: #393a3d
    .msg
        &-enter-active, &-leave-active
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
</style>