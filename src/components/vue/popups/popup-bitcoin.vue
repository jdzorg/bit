<template lang="pug">
    div
        button.btn.btn-simple(@click="handlerPopUp") узнать цену в криптовалюте
        Popup(v-show="showPop", @close="handlerPopUp")
            Bitcoin(
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
  import Bitcoin from '../form/bitcoin'
  import Msg from '../form/msg'

  export default {
    name: "PopupBitcoin",
    components: {
      Popup, Bitcoin, Msg
    },
    data() {
      return{
        showPop: false,
        args: {
          formName: 'Форма - узнать цену в биткоин(страница продукта)',
          meth: 'nFeedback',
          type: 'POST'
        },
        isSent: false,
        formHead: {
          title: 'Хотите узнать цену в криптовалюте?',
          subTitle: 'Оставьте свои контактные данные и наш менеджер проконсультирует по <br>Вашему вопросу наша помощь и мы свяжемся с вами в ближайшее время.',
          btn: 'Отправить'
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
