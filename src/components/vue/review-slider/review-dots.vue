<template lang="pug">
    .visible-xs.visible-sm
        .dots-wrapper
            span.dot(
              v-for="dot in reviews",
              :class="{active: dot.id === curId}",
              :key="dot.id",
              :data-revId="dot.id"
            )
</template>

<script>
  export default {
    name: "reviewDots",
    props: {
      reviews: {
        type: Array
      },
      curId: {
        type: Number
      }
    }
  }
</script>

<style lang="sass">
    .dots-wrapper
        display: flex
        justify-content: center
        width: 100%
        height: auto
        margin-top: 25px
    .dot
        display: block
        width: 14px
        height: 14px
        margin:
            left: 7px
            right: 7px
        border: 1px solid #000
        border-radius: 50%
        transition: .3s ease
        &.active
            border-color: #88caec
            background-color: #88caec
</style>