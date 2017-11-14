<template lang="pug">
    transition(
    name="thxmsg",
    mode="out-in"
    )
        bitForm(
          v-if="!isSent",
          key="form",
          :title="formHead.title",
          :subTitle="formHead.subTitle",
          :btnName="formHead.btn"
        )
        fMSG(
          v-else,
          :finalMSG="msg",
          key="msg"
        )
</template>
<style lang="sass"></style>
<script>
  import fMSG from '../../components/vue/form/form-thxmsg.vue'
  import bitForm from '../../components/vue/form/form.vue'
  export default {
    components: {
      fMSG, bitForm
    },
    data() {
      return{
        isSent: false,
        formHead: {
          title: 'Обратная связь',
          subTitle: 'Будем рады стать Вам полезными от первого звонка<br> в агентство до полного оформления сделки.',
          btn: 'Записаться на встречу'
        },
        msg: {
          title: '',
          msg: ''
        },
      }
    },
  }
</script>