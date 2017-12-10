<template lang="pug">
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
          :sendArgs="args"
        )
        Msg(
          v-else,
          :finalMSG="msg",
          key="msg"
        )
</template>
<style lang="sass"></style>
<script>
  import Msg from 'components/vue/form/msg.vue'
  import FeedbackForm from 'components/vue/form/form.vue'

  export default {
    components: {
      Msg, FeedbackForm
    },
    data() {
      return{
        args: {
          formName: 'Форма обратной связи(главная)',
          meth: 'nFeedback',
          type: 'POST'
        },
        isSent: false,
        formHead: {
          title: 'Обратная связь',
          subTitle: 'Будем рады стать Вам полезными от первого звонка<br> в агентство до полного оформления сделки.',
          btn: 'Записаться на встречу'
        },
        msg: {
          title: '',
          msg: ''
        },
      }
    },
  }
</script>