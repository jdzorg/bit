<template lang="pug">
    transition(
      name="popup-trans"
    )
        .popup(:style="setPopUppHeight")
            .review-send
                .container
                    .row
                        .col-lg-12
                            span.section-title.white Оставте свой отклик
                            span.section-subtitle.white
                                | Напишите отклик, поделитесь мнением которое сложилось у Вас
                                br
                                | при сотруднечестве с нашей компанией.
                        .col-lg-12
                            form.form.review-form(
                              @submit.prevent="createComment",
                              @change="validation($event)"
                            )
                                .close(@click="$emit('close')")
                                    span
                                    span
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
            transition(
              name="error-trans",
              mode="in-out"
            )
                span.errorMSG(
                  v-show="isValid || isEmpty",
                  :key="0"
                ) {{ Некоторые из полей неверно заполнены
                span.errorMSG(
                  v-show="isEmpty",
                  :key="1"
                ) Некоторые из полей неверно заполнены
</template>

<script>
    //Некоторые из полей не заполнены или неверно заполнены
//      import Wpapi from '../../../../node_modules/wpapi'
//
//      var wp = new Wpapi({
//  //      endpoint: 'http://bitrealt.com.ua/wp-json/wp/v2/posts',
//  //      username: 'bitcom',
//  //      password: 'D337#4$MYyhSIn0kx2xlYVyc'
//        endpoint: window.WP_API_Settings.root,
//        nonce: window.WP_API_Settings.nonce
//      });

  const regTemp = {
    name: /^[а-яА-Яa-zA-Z\sёЁїЇіІЄє]{2,20}$/,
    email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    phone: /^(\+3)?(8)?(0)?[\-\(\)\d]{9,13}$/,
    text: /^[а-яА-Яa-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\s]{0,}$/
  };

    export default {
      data() {
        return{
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
        createComment() {
          let count = 0;

          for(let i in this.userData) {
            count += this.userData[i].replace(/\s/g, '').length > 0 ? 0 : 1;
          }

          if(count === 0) {
            this.isEmpty = false;
            console.log('ok');
//            wp.comments().create({
//              author_email: this.userData.email,
//              author_name: this.userData.name,
//              content: this.userData.text
//            })
//              .then(resp => {console.log(resp)})
//              .catch(error => {console.log(error)});

           } else {
            this.isEmpty = true;

            return false;
           }
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
      },
      computed: {
        setPopUppHeight() {
          return `height: ${document.documentElement.clientHeight}px`;
        }
      }
    }
</script>

<style lang="sass">
    .popup
        position: fixed
        z-index: 10000
        width: 100%
        left: 0
        top: 0
        display: flex
        flex-direction: column
        justify-content: center
        background:
            image: url(../../../assets/img/pop-review.png)
            position: center
            repeat: no-repeat
            size: 100% 100%
        & > .feedback
            background-image: none
        & form
            position: relative
        & input.error
            outline-color: rgba(255, 0, 0, 0.62)
            border-bottom: 2px solid rgba(255, 0, 0, 0.62)
        & textarea.error
            border: 2px solid rgba(255, 0, 0, 0.62)
        & .errorMSG
            margin-top: 10px
            text-align: center
            color: red
        & .close
            position: absolute
            width: 40px
            height: 40px
            top: 0
            right: 0
            opacity: 1
            transform: translate(100%, -400%)
            //wp-content/themes/bitrealty-theme/
            & > span
                position: absolute
                display: block
                width: 40px
                height: 2px
                top: 15px
                background-color: #fff
                transition: .6s ease
                &:first-child
                    transform: rotate(40deg)
                &:last-child
                    transform: rotate(-40deg)
            &:hover > span
                height: 3px
        &-trans
            &-enter-active, &-leave-active
                transition: .5s ease
            &-enter, &-leave-to
                opacity: 0
        & .error-trans
            &-enter-active, &-leave-active
                transition: .3s ease
            &-enter, &-leave-to
                opacity: 0
                transform: translateY(60px)


</style>