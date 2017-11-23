<template lang="pug">
    section.rentunit
        .container
            rentFilter(@filterItems="getFilteredItems")
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
    import rentFilter from '../filters/filter.vue'

    import Wpapi from '../../../../node_modules/wpapi'

    const wp = new Wpapi({
//      endpoint: window.WP_API_Settings.root
      endpoint: 'http://bitrealt.com.ua/wp-json'
    });
    wp.house = wp.registerRoute('wp/v2', 'house');
    wp.allTerms = wp.registerRoute('wp/v2', 'all-terms');

    export default {
      components: {
        minItem, rentFilter
      },
      data() {
        return {
          termsAttr: {},
          minData: [],
          minImg: {}
        }
      },
      methods: {
        getItems() {
          return wp.house()
            .order('desc')
            .orderby('date')
            .embed()
            .get()
            .then(resp => {
              return resp;
          });
        },
        getFilteredItems(filters) {
          let {rooms, currency, price_from, price_to, area_from, area_to, region, district, size_area, address} = filters;
          let ite = 0;
          let compare = '=';
          let queryStr = `?filter[meta_query][relation]=AND
                          &filter[meta_query][${ite}][key]=_bit_rooms
                          &filter[meta_query][${ite}][value]=${rooms}
                          &filter[meta_query][${ite}][compare]=${compare}
                          &filter[meta_query][${ite}][type]=NUMERIC`;
          ite++;
            debugger;
          if(price_from !== '' || price_to !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_bit_price_${currency}
                         &filter[meta_query][${ite}][type]=NUMERIC`;

              if (price_from !== '' && price_to === '') {
                queryStr += `&filter[meta_query][${ite}][value]=${price_from}
                             &filter[meta_query][${ite}][compare]=>=`;
              } else if ((price_to !== '' && price_from === '') && price_from < price_to) {
                queryStr += `&filter[meta_query][${ite}][value]=${price_to}
                             &filter[meta_query][${ite}][compare]=<=`;
              } else if((price_to !== '' && price_from === '') && price_from < price_to) {
                queryStr += `&filter[meta_query][${ite}][value]=${price_to}`;
              }else {
                queryStr += `&filter[meta_query][${ite}][value][0]=${price_from}
                             &filter[meta_query][${ite}][value][1]=${price_to}
                             &filter[meta_query][${ite}][compare]=BETWEEN`
              }



            ite++;
          }

          if(area_from !== '' || area_to !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_bit_size_house
                         &filter[meta_query][${ite}][type]=NUMERIC`;
            if(area_from < area_to) {
              if (area_from !== '' && area_to === '') {
                queryStr += `&filter[meta_query][${ite}][value]=${area_from}
                             &filter[meta_query][${ite}][compare]=>=`;
              } else if (area_to !== '' && area_from === '') {
                queryStr += `&filter[meta_query][${ite}][value]=${area_to}
                             &filter[meta_query][${ite}][compare]=<=`;
              } else {
                queryStr += `&filter[meta_query][${ite}][value][0]=${area_from}
                             &filter[meta_query][${ite}][value][1]=${area_to}
                             &filter[meta_query][${ite}][compare]=BETWEEN`
              }
            } else {
              queryStr += `&filter[meta_query][${ite}][value]=${area_to}`;
            }
            ite++;
          }

          if(size_area !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_bit_size_area
                         &filter[meta_query][${ite}][value]=${size_area}
                         &filter[meta_query][${ite}][type]=NUMERIC
                         &filter[meta_query][${ite}][compare]=${compare}`;
            ite++;
          }

          if(address !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_bit_address
                         &filter[meta_query][${ite}][value]=${address}
                         &filter[meta_query][${ite}][compare]=${compare}`;
            ite++;
          }

            debugger;

 //         debugger;
//          Wpapi.discover('http://bitrealt.com.ua')
//            .then(site => {
//              wp.posts()
//                .filter('meta_key', '_bit_rooms')
//                .filter('meta_val', '2')
//                .get()
//                .then(resp => {
//                  debugger;
//                })
//                .catch(er => {debugger;});
//            }).catch(er => {debugger;});

        },
        getTerms() {
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
        parseItems(posts) {
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
        }
      },
      mounted() {
        const p = new Promise((res, rej) => {
          res(this.getTerms());
          rej(console.log(error));
        });
        p.then(resp => {
            return this.getItems();
          })
          .then(resp => {
            this.parseItems(resp)
          });
      }
    }
</script>