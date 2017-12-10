<template lang="pug">
    span.input-wrapper
        input(
          :type="type",
          :name="name",
          v-validate="validate",
          :class="{'is-danger': errors.has(name)}",
          :style="{'width': width}",
          :placeholder="placeholder",
          :value="value",
          @input="updateValue($event.target.value)"
        )
        transition(name="invalid")
            span.fa-warning(v-show="errors.has(name)") Неверно заполнено поле
    
</template>

<script>
  export default {
    name: "ValidateInput",
    props: {
      value:{
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        default: 'text',
        type: String
      },
      validate: {
        type: String,
        required: true
      },
      width: {
        default: '100px',
        type: String
      },
      placeholder: {
        type: String
      }
    },
    methods: {
      updateValue(val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="sass">
    .input-wrapper
        position: relative
        margin-right: 20px
        &:last-child
            margin-right: 0
    .is-danger, .fa-warning
        color: red
        outline-color: red
    .fa-warning
        position: absolute
        bottom: -28px
        left: 0
        font-size: 12px
    .invalid
        &-enter-active, &-leave-active
            transition: .3s ease
        &-enter, &-leave-to
            opacity: 0
</style>