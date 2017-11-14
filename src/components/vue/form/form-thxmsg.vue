<template lang="pug">
    .popup-thx
        span.popup-thx-title {{ finalMSG.title }}
        p.popup-thx-msg {{ finalMSG.msg }}
</template>
<style lang="sass">
    .popup-thx
        text-align: center
        color: #fff
        &-title
            font:
                family: 'rubik-b', sans-serif
                weight: bold
                size: 30px
        &-msg
            font:
                family: 'rubik-l'
                weight: 100
                size: 20px
</style>
<script>
    export default {
      props: {
        finalMSG: {
          type: Object,
          required: true
        }
      }
    }
</script>