<template lang="pug">
    section.rentunit
        .container
            rentFilter
            rentMinView
</template>
<style lang="sass"></style>
<script>
    import rentFilter from '../../components/vue/filters/filter.vue'
    import rentMinView from '../../components/vue/rent-miniatures/wrapper.vue'

  export default {
      components: {
        rentFilter, rentMinView
      }
  }
</script>