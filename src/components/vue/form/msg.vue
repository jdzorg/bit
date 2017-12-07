<template lang="pug">
    .popup-thx
        span.popup-thx-title {{ finalMSG.title }}
        p.popup-thx-msg {{ finalMSG.msg }}
</template>
<script>
    export default {
      name: 'Msg',
      props: {
        finalMSG: {
          type: Object,
          required: true
        }
      }
    }
</script>