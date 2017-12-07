<template lang="pug">
    form.text-center.valuation-form(
    action="javascript://",
    @submit.prevent="$emit('sendApp', form)"
    )
        span Оставить заявку на оценку
        input(
          type="text",
          name="client",
          v-model="form.client",
          placeholder="Имя *",
          v-validate="'required|alpha_spaces'",
          :class="{'is-danger': errors.has('client')}"
        )
        transition(name="invalidMSG")
            span(v-show="errors.has('client')", class="fa fa-warning") Неправильно введено имя
        input(
          type="tel",
          name="phone",
          v-model.lazy="form.phone",
          placeholder="Телефон *",
          v-validate="'required|phone'",
          :class="{'is-danger': errors.has('phone')}"
        )
        transition(name="invalidMSG")
            span(v-show="errors.has('phone')", class="fa fa-warning") Неправильно введен телефон
        input(
          type="email",
          name="email",
          placeholder="Email",
          v-model.lazy="form.email",
          v-validate="'email'",
          :class="{'is-danger': errors.has('email')}"
        )
        transition(name="invalidMSG")
            span(v-show="errors.has('email')", class="fa fa-warning") Неправильно введен email
        textarea(
          name="msg",
          placeholder="Опишите объект",
          v-model="form.msg",
          v-validate="'text'",
          :class="{'is-danger': errors.has('email')}"
        )
        transition(name="invalidMSG")
            span(v-show="errors.has('msg')", class="fa fa-warning") В сообщении присутствуют недопустимые символы
        button.btn.btn-default Отправить заявку
</template>

<script>
  export default {
    name: "ValuationForm",
    data() {
      return {
        form: {
          formName: 'ОЦЕНКА НЕДВИЖИМОСТИ',
          client: '',
          phone: '',
          email: '',
          msg: ''
        },
      }
    }
  }
</script>

<style lang="sass" scoped>
    .is-danger, .fa-warning
        color: red
        outline-color: red
    .fa-warning
        font-size: 12px
        margin-top: -17px
        display: block
    .invalidMSG
        &-enter-active, &-leave-active
            transition: .3s ease
        &-enter, &-leave-to
            opacity: 0
</style>