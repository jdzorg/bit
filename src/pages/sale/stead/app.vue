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
  wp.stead = wp.registerRoute('wp/v2', 'stead');
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
          wpEndpoint: 'stead'
        },
        settings: {
          page: 'stead',
          features: [
            'areaSize'
          ]
        }
      }
    }
  }
</script>