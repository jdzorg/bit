<template lang="pug">
    section.row.miniatures
        .col-lg-12
            .row
                minItem(:min="minData")

</template>

<style lang="sass">
</style>

<script>
    import minItem from './item.vue'

    export default {
      components: {
        minItem
      },
      data() {
        return {
          minData: {
            href: 'bitrealt.com.ua',
            img: 'http://www.brucall.com/wp-content/uploads/2017/08/interior-images-of-home-new-homes-for-sale-uk-top.jpg',
            address: 'Дом, ул. Иртышская, Киев',
            district: 'Голосеевский район',
            code: 'К-25348',
            price: '45 400 грн. / 1700 $',
            features: {
              rooms: 6,
              sHome: 415,
              sArea: 10
            },
          }
        }
      }
    }
</script>