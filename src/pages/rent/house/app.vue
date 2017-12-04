<template lang="pug">
    rentMinView(:settings="settings", :wpapi="wpapi")
</template>
<style lang="sass"></style>
<script>
  import rentMinView from 'components/vue/rent-miniatures/wrapper.vue'
  import Wpapi from '../../../../node_modules/wpapi'


  //all pages has own endpoint for rest api and for pages has different filter fields
  //wp set into js some global params (root: site link to rest api, pageURI: page name)

  const wpRestSettings = {
    'arenda-doma': {
      endPoint: 'house',
      features: ['rooms', 'apartmentSize', 'areaSize']
    },
    'arenda-kvartiry': {
      endPoint: 'flat',
      features: ['rooms', 'apartmentSize', 'floors']
    },
    'arenda-kommercheskoj-nedvizhimosti': {
      endPoint: 'com_prop',
      features: ['rooms', 'apartmentSize', 'floors']
    },
    'prodazha-doma': {
      endPoint: 'house_s',
      features: ['rooms', 'apartmentSize', 'areaSize']
    },
    'prodazha-kvartiry': {
      endPoint: 'flat_s',
      features: ['rooms', 'apartmentSize', 'floors']
    },
    'prodazha-kommercheskoj-nedvizhimosti': {
      endPoint: 'com_prop_s',
      features: ['rooms', 'apartmentSize', 'floors']
    },
    'prodazha-uchastka': {
      endPoint: 'stead',
      features: ['areaSize']
    }
  };
  var {root, pageURI} = window.WP_API_Settings;
  pageURI = pageURI.replace(/\//g, '');
  const {endPoint, features}= wpRestSettings[pageURI];

  // const endPoint = 'house';
  // const features = ['rooms', 'apartmentSize', 'areaSize'];

  const wp = new Wpapi({
    endpoint: root
    // endpoint: 'http://bitrealt.com.ua/wp-json'
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