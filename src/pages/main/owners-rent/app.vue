<template lang="pug">
    form.owners-form(@submit.prevent="sendForm")
        .realty-type
            button.btn.btn-form(
              type="button",
              @click="switchForm($event)",
              :class="realtyType === 'Flat' ? 'active' : ''",
              value="Flat"
            ) Квартира
            button.btn.btn-form(
              type="button",
              @click="switchForm($event)",
              :class="realtyType === 'House' ? 'active' : ''",
              value="House"
            ) Дом
            button.btn.btn-form(
              type="button",
              @click="switchForm($event)",
              :class="realtyType === 'Comm' ? 'active' : ''",
              value="Comm"
            ) Коммерческую
        .realty-form
            transition(name="transTab", mode="out-in")
                keep-alive
                    component(:is="realtyType", :ref="realtyType")
        .owner-form
            fieldset
                span.owner-title Ваши контактные данные
                span.owner-subtitle Чтобы Ваша заявка была обработана, укажите, пожалуйста, свой номер телефона и (или) e-mail
                ValidateInput(name="name", placeholder="Имя *", v-model="args.userData.name", validate="required|alpha_spaces")
                ValidateInput(type="tel", name="phone", placeholder="Телефон *", v-model="args.userData.phone", validate="required|phone")
                ValidateInput(type="email", name="email", placeholder="Email", v-model="args.userData.email", validate="email")
            fieldset.send
                button.btn.btn-default Отправить
        Popup(@close="handlerPopUp", v-show="showPop")
            Msg(:finalMSG="msg")

</template>

<script>
  import ValidateInput from 'components/vue/form/elements/input'
  import House from 'components/vue/form/owner-house'
  import Flat from 'components/vue/form/owner-flat'
  import Comm from 'components/vue/form/owner-comm'
  import Popup from 'components/vue/popups/popup'
  import Msg from 'components/vue/form/msg'
  import { sendMethods } from 'assets/js/global'

  export default {
    name: "app",
    components: {
        House, Flat, Comm, ValidateInput, Popup, Msg
    },
    data() {
      return {
        realtyTypeLang: {
          'Flat': 'Квартира',
          'House': 'Дом',
          'Stead': 'Земельный участок',
          'Comm': 'Коммерческая недвижимость'
        },
        showPop: false,
        isRulesAgree: false,
        realtyType: 'Flat',//window.WP_API_Settings.realtType ||
        args: {
          formName: 'Форма - продажа недвижимости',
          type: 'POST',
          userData: {},
        },
        msg: {
          title: '',
          msg: ''
        }
      }
    },
    methods: {
      sendForm() {
        this.$validator.validateAll().then((result) => {
          if(!result)return;
          this.args.formName += ` (${this.realtyTypeLang[this.realtyType]})`;
          this.args.userData['realtyData'] = this.$refs[this.realtyType]._data.form;
          const sm = sendMethods;
          const response = sm.nPromise(sm.nFeedback(this.args));
          response.then((res) => {
            debugger;
            this.msg.title = res.title;
            this.msg.msg = res.msg;
            this.showPop = true;

          });
        });
      },
      switchForm(e) {
        const target = e.target;
        this.realtyType = target.value;
      },
      handlerPopUp() {
        this.showPop = !this.showPop;
        document.body.style.overflow = this.showPop ? 'hidden' : '';
      }
    }
  }
</script>

<style lang="sass">
    .transTab
        &-enter-active, &-leave-to
            transition: .3s ease
        &-enter, &-leave-to
            opacity: 0
        &-enter
            transform: translateX(-30px)
        &-leave-to
            transform: translateX(30px)

</style>