<template lang="pug">
    div
        button.btn.btn-default(@click="handlerPopUp") Записаться на встречу
        Popup(v-show="showPop", @close="handlerPopUp")
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
    name: "PopupMeet",
    components: {
      Popup, FeedbackForm, Msg
    },
    data() {
      return{
        showPop: false,
        args: {
          formName: 'Форма - заказать консультацию(шапка))',
          meth: 'nFeedback',
          type: 'POST'
        },
        isSent: false,
        formHead: {
          title: 'ПРИГЛАШАЕМ ВАС НА ВСТРЕЧУ В НАШ ОФИС',
          subTitle: 'Мы пришлем за вами личного водителя на автомобиле бизнес-класса.',
          btn: 'Записаться на встречу'
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
