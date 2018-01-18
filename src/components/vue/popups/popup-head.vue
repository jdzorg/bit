<template lang="pug">
    div
        button.btn.btn-default.btn-transparent(@click="handlerPopUp") Заказать консультацию
        Popup(v-show="showPop", @close="handlerPopUp", :height="popHeight")
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
  import Popup from './popup'
  import FeedbackForm from '../form/form'
  import Msg from '../form/msg'

  export default {
    name: "PopupHead",
    components: {
      Popup, FeedbackForm, Msg
    },
    data() {
      return{
        popHeight: '',
        showPop: false,
        args: {
          formName: 'Форма - заказать консультацию',
          meth: 'nFeedback',
          type: 'POST'
        },
        isSent: false,
        formHead: {
          title: 'Закажите бесплатную консультацию',
          subTitle: 'Напишите Ваш вопрос или кратко опишите ситуациюб в которой нужна<br> наша помощь и мы свяжемся с вами в ближайшее время.',
          btn: 'Заказать консультацию'
        },
        msg: {
          title: '',
          msg: ''
        },
      }
    },
    methods: {
      handlerPopUp() {
        this.showPop = !this.showPop;
        this.popHeight = `height: ${window.innerHeight}`;
        document.body.style.overflow = this.showPop ? 'hidden' : '';
      },
      setOutputMSG(outputMsg) {
        const { msg, title } = outputMsg;
        this.msg.msg = msg;
        this.msg.title = title;
        this.isSent = true;
      }
    }
  }
</script>
