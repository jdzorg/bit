<template lang="pug">
    .form
        .col-lg-12
            span.section-title.white(v-text="title")
            span.section-subtitle.white(v-html="subTitle")
        .col-lg-12
            form.review-form(
            @submit.prevent="sendForm",
            @change="validation($event)"
            )
                .input-group
                    input.pull-left(
                    type='text',
                    placeholder='Имя *',
                    required="required",
                    data-type="name",
                    v-model.trim="userData.name"
                    )
                    input.pull-right(
                    type='tel',
                    placeholder='Телефон *',
                    required="required",
                    data-type="phone",
                    v-model.trim="userData.phone"
                    )
                .input-group(v-if="isMail")
                    input.form-full-width(
                    type='email',
                    placeholder='Email *',
                    required="required",
                    data-type="email",
                    v-model.trim="userData.email"
                    )
                .input-group
                    textarea.form-full-width(
                    name='',
                    id='',
                    cols='30',
                    rows='10',
                    placeholder='Текст',
                    data-type="text",
                    v-model.trim="userData.text",
                    )
                .input-group.text-center
                    button.btn.btn-default {{ btnName }}
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
  import Wpapi from '../../../../node_modules/wpapi'
  import { sendMethods } from 'assets/js/global'

  sendMethods.wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
    endpoint: 'http://bitrealt.com.ua/wp-json'
  });

  const regTemp = {
    name: /^[а-яА-Яa-zA-Z\sёЁїЇіІЄє]{2,20}$/,
    email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    phone: /^(\+3)?(8\s?)?(\(?0)?[\-\(\)\d\s]{9,13}$/,
    text: /^[а-яА-Яa-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\s\(\)]{0,}$/
  };

  export default {
    name: 'FeedbackForm',
    props: {
      isMail: {
        type: Boolean,
        default: true
      },
      sendArgs: {
        type: Object,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      subTitle: {
        type: String,
        required: true
      },
      btnName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isValid: false,
        isEmpty: false,
        isAllValid: 0,
        userData: {
          name: '',
          email: '',
          phone: '',
          text: ''
        }
      }
    },
    methods: {
      sendForm() {
        const self = this;
        let count = 0;
        const sm = sendMethods;

        for(let i in this.userData) {
          count += this.userData[i].replace(/\s/g, '').length > 0 ? 0 : 1;
        }

        if(count > 0 || this.isAllValid > 0) {
          this.$parent.isEmpty = true;
          return false;
        }
        this.sendArgs.userData = this.userData;
        const response = sm.nPromise(sm[this.sendArgs.meth](this.sendArgs));
        response
          .then(outputMSG => {
            self.$emit('setMsg', outputMSG);
            self.isEmpty = false;
          });
      },

      validation(e) {
        const el = e.target,
          val = el.value,
          type = el.dataset.type;

        if(regTemp[type].test(val)) {
          if(el.classList.contains('error')) {
            el.classList.remove('error');
            this.isAllValid -= 1;
          }
        } else {
          if(!el.classList.contains('error'))
            el.classList.add('error');
          this.isAllValid += 1;
        }
        this.onOffErrorMSG(e.currentTarget);
      },
      onOffErrorMSG(form) {
        this.isValid = Array.from(form).some(el => {
          return el.classList.contains('error')
        });
      }
    }
  }
</script>
<style lang="sass">
    .error-trans
        &-enter-active, &-leave-active
            transition: .3s ease
        &-enter, &-leave-to
            opacity: 0
            transform: translateY(60px)
    .thxmsg
        &-enter-active, &-leave-to
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
        &-enter
            transform: translateY(30px)
        &-leave-to
            transform: translateY(-30px)
</style>