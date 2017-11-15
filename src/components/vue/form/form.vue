<template lang="pug">
    .form
        .col-lg-12
            span.section-title.white {{ title }}
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
                .input-group
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

  const sendMethods = {
    type: 'GET',
    wpEndPoint: 'posts',
    wp: new Wpapi({
//      endpoint: window.WP_API_Settings.root
      endpoint: 'http://bitrealt.com.ua/wp-json'
    }),
    url: 'http://bitrealt.com.ua/wp-content/themes/bitrealty-theme/form-handler.php',
    errormsg: {
      title: 'Произошла ошибка',
      msg: 'При отправке произошла ошибка. Перезагрузить страницу и еще раз попробуйте отправить или обратитесь в администрацию сайта.'
    },
    nPromise(method) {
      return new Promise((resolve, reject) => {
        resolve(method);
        reject(console.log(errors))
      })
    },
    serialize(obj) {
      return Object.keys(obj).map(function(prop) {
        return [prop, obj[prop]].map(encodeURIComponent).join("=");
      }).join("&");
    },
    nComment(args) {
      /*
      * wpargs = {
      *   type: get/create,
      *   endpoint: comments/posts/,
      *   data: data to post/data to search(filter)
      * }
      */
      const type = args.type || this.type;
      const meth = args.endpoint || this.wpEndPoint;
      const {email, name, text, phone} = args.data;

      return this.wp[meth]()[type]({
        post: 2,
        author_email: email,
        author_name: name,
        content: text,
        author_url: phone.replace(/\s/g, '')
      })
        .then(res => {
          return {
            title: 'Ваш отзыв отправлен',
            msg: 'Ваш отзыв появится на сайте как только его одобрит модератор'
          }
        })
        .catch(rej => {
          console.log(rej);
          return this.errormsg;
        });
    },
    nFeedback(args) {
      /*
       * mailargs = {
       *    url: ...,
       *    type: POST
       *   formName: like feedback,
       *   data: data to send by mail
       * }
       */
      const self = this;
      const url = args.url || this.url;
      const data = args.userData;
      data.formName = args.formName;
      const options = {
        method: args.type || self.type,
        body: self.serialize(data),
        mode: 'cors'
      };

      return fetch(url, options)
        .then(res => {
          return {
            title: 'Ваша заявка принята',
            msg: 'В скором времени наш менеджер свяжется с Вами.'
          }
        })
        .catch(rej => {
          console.log(rej);
          return this.errormsg;
        });
    }
  };


  const regTemp = {
    name: /^[а-яА-Яa-zA-Z\sёЁїЇіІЄє]{2,20}$/,
    email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    phone: /^(\+3)?(8\s?)?(\(?0)?[\-\(\)\d\s]{9,13}$/,
    text: /^[а-яА-Яa-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\s]{0,}$/
  };

  export default {
    props: {
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
        let count = 0;
        const sm = sendMethods;

        for(let i in this.userData) {
          count += this.userData[i].replace(/\s/g, '').length > 0 ? 0 : 1;
        }

        if(count > 0) {
          this.$parent.isEmpty = true;
          return false;
        }
        this.sendArgs.userData = this.userData;
        const response = sm.nPromise(sm[this.sendArgs.meth](this.sendArgs));
        response.then((res) => {
          this.$parent.msg.title = res.title;
          this.$parent.msg.msg = res.msg;
          this.$parent.isEmpty = false;
          this.$parent.isSent = true;
        });
      },

      validation(e) {
        const el = e.target,
          val = el.value,
          type = el.dataset.type;

        if(regTemp[type].test(val)) {
          if(el.classList.contains('error'))
            el.classList.remove('error');
        } else {
          if(!el.classList.contains('error'))
            el.classList.add('error');
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