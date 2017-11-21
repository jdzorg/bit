<template lang="pug">
    section.row.miniatures
        .col-lg-12
            .row
                transition-group(
                  tag="div",
                  name="miniature-trans"
                )
                    minItem(
                      v-for="(item, index) in minData",
                      :key="index",
                      :min="item"
                    )

</template>

<style lang="sass">
</style>

<script>
    import minItem from './item.vue'
    import Wpapi from '../../../../node_modules/wpapi'

    const wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
      endpoint: 'http://bitrealt.com.ua/wp-json'
    });
    wp.house = wp.registerRoute('wp/v2', 'house');
    wp.allTerms = wp.registerRoute('wp/v2', 'all-terms');

    export default {
      components: {
        minItem
      },
      data() {
        return {
          termsAttr: {},
          minData: []
        }
      },
      methods: {
        get_items() {
          const arr = [];
          wp.house().get({
            order: 'DESC',
            orderby: 'date'
          }).then(resp => {
            arr.posts = resp;
            wp.allTerms()
              .param('term', 'house_attr')
              .get()
              .then(resp => {
                arr.attr = resp;
                this.parse_post(arr);
              });
          });
        },
        parse_post(arr) {
          const {posts, attr} = arr;
          for(let k in attr) {
            if(attr.hasOwnProperty(k)) {
              const {term_id, name} = attr[k];
              if(term_id === 6 ) continue;
              this.termsAttr[term_id] = name;
            }
          }

          debugger;
          for(let k in posts) {
            if(posts.hasOwnProperty(k)) {
              let ids = posts[k]['house_attr'];
              ids.forEach(item => {
                if(this.termsAttr.hasOwnProperty(item))
                  posts[k]['house_attr'] = this.termsAttr[item]
              });
            }
          }
          this.minData = posts;
        }
      },
      mounted() {
        this.get_items()
      }
    }
</script>