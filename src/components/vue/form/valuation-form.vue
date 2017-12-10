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
        InvalidFiled(v-show="errors.has('client')") Неправильно введено имя
        input(
          type="tel",
          name="phone",
          v-model.lazy="form.phone",
          placeholder="Телефон *",
          v-validate="'required|phone'",
          :class="{'is-danger': errors.has('phone')}"
        )
        InvalidFiled(v-show="errors.has('phone')") Неправильно введен телефон
        input(
          type="email",
          name="email",
          placeholder="Email",
          v-model.lazy="form.email",
          v-validate="'email'",
          :class="{'is-danger': errors.has('email')}"
        )
        InvalidFiled(v-show="errors.has('email')") Неправильно введен email
        textarea(
          name="msg",
          placeholder="Опишите объект",
          v-model="form.msg",
          v-validate="'text'",
          :class="{'is-danger': errors.has('email')}"
        )
        InvalidFiled(v-show="errors.has('msg')") В сообщении присутствуют недопустимые символы
        button.btn.btn-default Отправить заявку
</template>

<script>
  import InvalidFiled from './elements/invalid-filed'

  export default {
    name: "ValuationForm",
    components: {
      InvalidFiled
    },
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
</style>