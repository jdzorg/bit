<template lang="pug">
    transition(name="invalid")
        span(class="fa fa-warning")
            slot
</template>

<script>
  export default {
    name: "InvalidFiled"
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
    .invalid
        &-enter-active, &-leave-active
            transition: .3s ease
        &-enter, &-leave-to
            opacity: 0
</style>