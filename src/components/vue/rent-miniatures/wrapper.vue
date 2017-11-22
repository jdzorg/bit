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
          minData: [],
          minImg: {}
        }
      },
      methods: {
        get_items() {
          return wp.house()
            .order('desc')
            .orderby('date')
            .get()
            .then(resp => {
              return resp;
          });
        },
        get_terms() {
          const self = this;
          return wp.allTerms()
            .param('term', 'house_attr')
            .get()
            .then(resp => {
              for(let k in resp) {
                if(resp.hasOwnProperty(k)) {
                  const {term_id, name} = resp[k];
                  if(term_id === 6 ) continue;
                  self.termsAttr[term_id] = name;
                }
              }
            });
        },
        get_images(posts) {
          const self = this;
          const cPosts = posts;
          const allMedia = [];
          for(let k in cPosts) {
            if(cPosts.hasOwnProperty(k) && cPosts[k].hasOwnProperty('bit_min_img')) {
              allMedia.push(wp.media()
                .id(cPosts[k]['bit_min_img'])
                .get()
                .then(resp => {
                  return resp;
                }));
            }
          }
          return Promise.all(allMedia)
            .then(resp => {
              let i = 0;
              let k = 0;
              for(i; i < resp.length; i++) {
                for(k; k < cPosts.length; k++) {
                  if(cPosts[k].hasOwnProperty('bit_min_img') && parseInt(cPosts[k]['bit_min_img']) === resp[i]['id']) {
                    cPosts[k]['bit_min_img'] = resp[i].guid.rendered;
                  }
                }
              }
              return cPosts;
            });
        },
        parse_post(posts) {
          const cPosts = posts;
          const self = this;
          for(let k = 0; k < cPosts.length; k++) {
            if(cPosts[k].hasOwnProperty('house_attr')) {
              let termIds = cPosts[k]['house_attr'];
              for (let i = 0; i < termIds.length; i++) {
                if (self.termsAttr.hasOwnProperty(termIds[i]))
                  cPosts[k]['house_attr'] = self.termsAttr[termIds[i]];
              }
            } else {
              delete cPosts[k];
            }
          }
          this.minData = cPosts;
//          const p = new Promise((res, rej) => {
//            for(let k in cPosts) {
//              if(cPosts.hasOwnProperty(k) && cPosts[k].hasOwnProperty('house_attr')) {
//                let termIds = cPosts[k]['house_attr'];
//                for (let i = 0; i < termIds.length; i++) {
//                  if (self.termsAttr.hasOwnProperty(termIds[i]))
//                    cPosts[k]['house_attr'] = self.termsAttr[termIds[i]];
//                }
//              } else {
//                delete cPosts[k];
//              }
//            }
//            res('ok');
//          });
//          p.then(res => {
//            for(let k in cPosts) {
//              if(cPosts.hasOwnProperty(k) && cPosts[k].hasOwnProperty('bit_min_img')) {
//                self.get_image(cPosts[k]['bit_min_img']);
//              }
//            }
//            this.minData = cPosts;
//          });
        }
      },
      mounted() {
        const p = new Promise((res, rej) => {
          res(this.get_terms());
          rej(console.log(error));
        });
        p.then(resp => {
            return this.get_items();
          })
          .then(resp => {
            return this.get_images(resp);
         })
          .then(resp => {
            debugger;
            this.parse_post(resp)
          });
      }
    }
</script>