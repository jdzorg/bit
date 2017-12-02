<template lang="pug">
    rentMinView(:settings="settings", :wpapi="wpapi")
</template>
<style lang="sass"></style>
<script>
  import rentMinView from 'components/vue/rent-miniatures/wrapper.vue'
  import Wpapi from '../../../../node_modules/wpapi'

  const endPoint = 'flat';
  const features = ['rooms', 'apartmentSize', 'floors'];

  const wp = new Wpapi({
    // endpoint: root
    endpoint: 'http://bitrealt.com.ua/wp-json'
  });
  wp.customPoint = wp.registerRoute('wp/v2', endPoint);
  //    wp.houseFilter = wp.registerRoute('wp/v2', 'house(?P<customQuery>)');

  wp.allTerms = wp.registerRoute('wp/v2', 'filter-term');

  export default {
    components: {
      rentMinView
    },
    data() {
      return {
        wpapi: {
          wp
        },
        settings: {
          page: endPoint,
          features: features
        }
      }
    }
  }
</script>