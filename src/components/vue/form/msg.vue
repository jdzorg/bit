<template lang="pug">
    .popup-thx
        span.popup-thx-title {{ finalMSG.title }}
        p.popup-thx-msg {{ finalMSG.msg }}
</template>
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