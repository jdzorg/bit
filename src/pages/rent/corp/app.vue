<template lang="pug">
    rentMinView(:settings="settings", :wpapi="wpapi")
</template>
<style lang="sass"></style>
<script>
  import rentMinView from 'components/vue/rent-miniatures/wrapper.vue'

  import Wpapi from '../../../../node_modules/wpapi'

  const wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
    endpoint: 'http://bitrealt.com.ua/wp-json'
  });
  wp.comProp = wp.registerRoute('wp/v2', 'com_prop');
  //    wp.houseFilter = wp.registerRoute('wp/v2', 'house(?P<customQuery>)');
  wp.allTerms = wp.registerRoute('wp/v2', 'filter-term');

  export default {
    components: {
      rentMinView
    },
    data() {
      return {
        wpapi: {
          wp,
          wpEndpoint: 'comProp'
        },
        settings: {
          page: 'com_prop',
          features: [
            'rooms', 'apartmentSize', 'floors'
          ]
        }
      }
    }
  }
</script>