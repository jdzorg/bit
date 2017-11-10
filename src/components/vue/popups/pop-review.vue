<template lang="pug">
    transition(
      name="popup-trans"
    )
        .popup(:style="setPopUppHeight")
            .feedback
                .container
                    .row
                        .col-lg-12
                            span.section-title.white Оставте свой отклик
                            span.section-subtitle.white
                                | Напишите отклик, поделитесь мнением которое сложилось у Вас
                                br
                                | при сотруднечестве с нашей компанией.
                        .col-lg-12
                            form.feedback-form(
                              @submit.prevent="createComment",
                              @change="validation($event.target)"
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
                                      v-model="userData.name"
                                    )
                                    input.pull-right(
                                      type='tel',
                                      placeholder='Телефон *',
                                      required="required",
                                      data-type="phone",
                                      v-model="userData.phone"
                                    )
                                .input-group
                                    input.feedback-full-width(
                                      type='email',
                                      placeholder='Email *',
                                      required="required",
                                      data-type="email",
                                      v-model="userData.email"
                                    )
                                .input-group
                                    textarea.feedback-full-width(
                                      name='',
                                      id='',
                                      cols='30',
                                      rows='10',
                                      placeholder='Ваш отклик',
                                      v-model="userData.text",
                                    )
                                .input-group.text-center
                                    button.btn.btn-default Отправить
                                transition(name="error")
                                    p.errorMSG(v-show="onOffErrorMSG") Некоторые из полей незаполнены или неверно заполнены
</template>

<script>
//    import errorMsg from './error-message.vue';
  //    import Wpapi from '../../../node_modules/wpapi'
  //
  //    var wp = new Wpapi({
  ////      endpoint: 'http://bitrealt.com.ua/wp-json',
  ////      username: 'bitcom',
  ////      password: 'D337#4$MYyhSIn0kx2xlYVyc'
  //      endpoint: window.WP_API_Settings.root,
  //      nonce: window.WP_API_Settings.nonce
  //    });

  const regTemp = {
    name: /^[а-яА-Яa-zA-Z\sёЁїЇіІЄє]{2,20}$/,
    email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
    phone: /^(\+3)?(8)?(0)?[\-\(\)\d]{9,13}$/,
    text: /^[a-zA-Z0-9ёЁїЇіІЄє\.\,'"\-\+\?\!\s]{0,}$/
  };

    export default {
      data() {
        return{
          hasError: false,
          userData: {
            name: false,
            email: false,
            phone: false,
            text: false
          }
        }
      },
      watch: {
        userData(val, oldVal) {

        }
      },
      methods: {
//        createComment() {

          //          wp.comments().create({
//            author_email: 'test@mail.ua',
//            author_name: 'test',
//            content: 'test comment'
//          })
//            .then(createdComment => {console.log('ok')})
//            .catch(error => {console.log(error)})
//        },
        validation(el) {
          let val = el.value.trim(),
              type = el.dataset.type;

          this.userData[type] = regTemp[type].test(val);

          if(this.userData[type]) {
            this.userData[type] = valid;
            if(el.contains('error'))
            el.classList.remove('error');
          } else {
            if(!el.contains('error'))
              el.classList.add('error');
          }
        }
      },
      computed: {
        setPopUppHeight() {
          return `height: ${document.documentElement.clientHeight}px`;
        },
        onOffErrorMSG() {
          let user = this.userData,
            rez = user.length;
          for(let i in user) {
            if(user.hasOwnProperty(i) && user[i]){
              rez--;
            }
          }
          return rez === 0;
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
        & .error
            outline-color: red
        & .close
            position: absolute
            width: 40px
            height: 40px
            top: 0
            right: 0
            opacity: 1
            transform: translate(100%, -450%)
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

</style>