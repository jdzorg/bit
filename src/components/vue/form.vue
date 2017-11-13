<template lang="pug">
    .form
        .col-lg-12
            span.section-title.white Оставте свой отклик
            span.section-subtitle.white
                | Напишите отклик, поделитесь мнением которое сложилось у Вас
                br
                | при сотруднечестве с нашей компанией.
        .col-lg-12
            form.review-form(
            @submit.prevent="createComment",
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
                    placeholder='Ваш отклик',
                    data-type="text",
                    v-model.trim="userData.text",
                    )
                .input-group.text-center
                    button.btn.btn-default Отправить
</template>
<style lang="sass"></style>
<script>
  import Wpapi from '../../../node_modules/wpapi'

  const wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
    endpoint: 'http://bitrealt.com.ua/wp-json'
  });

  const regTemp = {
    name: /^[а-яА-Яa-zA-Z\sёЁїЇіІЄє]{2,20}$/,
    email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    phone: /^(\+3)?(8)?(\(?0)?[\-\(\)\d]{9,13}$/,
    text: /^[а-яА-Яa-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\s]{0,}$/
  };

  export default {
    data() {
      return {
        userData: {
          name: '',
          email: '',
          phone: '',
          text: ''
        }
      }
    },
    methods: {
      createComment() {
        let count = 0;

        for(let i in this.userData) {
          count += this.userData[i].replace(/\s/g, '').length > 0 ? 0 : 1;
        }

        if(count > 0) {
          this.$parent.isEmpty = true;
          return false;
        }

        this.$parent.isEmpty = false;
        console.log('ok');
        wp.comments().create({
          post: 2,
          author_email: this.userData.email,
          author_name: this.userData.name,
          content: this.userData.text,
          author_url: this.userData.phone
        })
          .then(resp => {
            this.$parent.msg.title = 'Ваш отзыв отправлен';
            this.$parent.msg.msg = 'Ваш отзыв появится на сайте как\n только его одобрит модератор';
          })
          .catch(error => {
            this.$parent.msg.title = 'Произошла ошибка';
            this.$parent.msg.msg = 'При отправке произошла ошибка. Перезагрузить страницу и еще раз попробуйте отправить или обратитесь в администрацию сайта.';
            console.log(error)
          });
        this.$parent.isSent = true;
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
        this.$parent.onOffErrorMSG(e.currentTarget);
      },
    }
  }
</script>