<template lang="pug">
    form.text-center.valuation-form(@submit.prevent="$emit('sendApp', form)")
        span Оставить заявку на оценку
        ValidateInput(type="text", name="client", placeholder="Имя *", v-model="form.client", validate="required|alpha_spaces", width="100%")
        ValidateInput(type="tel", name="phone", placeholder="Телефон *", v-model="form.phone", validate="required|phone", width="100%")
        ValidateInput(type="email", name="email", placeholder="Email", v-model="form.email", validate="email", width="100%")
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
  import ValidateInput from 'components/vue/form/elements/input'
  import InvalidFiled from './elements/invalid-filed'

  export default {
    name: "ValuationForm",
    components: {
      InvalidFiled, ValidateInput
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