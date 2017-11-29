<template lang="pug">
    section.rentunit
        .container
            rentFilter(
              :terms="termsAttr",
              :page="settings.page",
              @filterItems="getFilteredItems"
            )
            section.row.miniatures(:style="wrapperHeight")
                .col-lg-12
                    .row
                        transition-group(
                          tag="div",
                          name="miniature-trans",
                          appear
                        )
                            minItem(
                              v-for="(item, index) in minData",
                              :trans="index",
                              :key="index",
                              :min="item",
                              :sets="settings.features"
                            )

</template>

<script>
    import minItem from './item.vue'
    import rentFilter from '../filters/filter.vue'

    export default {
      components: {
        minItem, rentFilter
      },
      props: {
        wpapi: Object,
        settings: Object
      },
      data() {
        return {
          districts: [],
          termsAttr: {},
          minData: []
        }
      },
      computed: {
        wrapperHeight() {
          let h = 450;
          let itemCol = this.minData.length;
          if(itemCol >= 4) {
            return 'height:' + (h * 2) + 'px';
          }
          if(itemCol >= 7) {
            return 'height:' + (h * 3) + 'px';
          }

        }
      },
      methods: {
        getItems(str) {
          return this.wpapi.wp[typeof str === 'string' ? 'url' : this.wpapi.wpEndpoint](str)
            .order('desc')
            .orderby('date')
            .embed()
            .perPage(9)
            .page(1)
            .then(resp => {
//              debugger;
              this.parseItems(resp);
          });
        },
        getFilteredItems(filters) {
          /*
          * subway: '',
        propType: 'нежилой',
        useFor: 'osg',
        */
          const {
            rooms, currency,
            price_from, price_to,
            area_from, area_to,
            size_area, floors,
            propType, useFor, tax
          } = filters;

          let ite = 0;
          let compare = '=';
          let queryStr = '?';
          const page = this.settings.page;

          if(page === 'stead') {
            queryStr +=`filter[meta_query][relation]=AND
                          &filter[meta_query][${ite}][key]=_bit_rooms
                          &filter[meta_query][${ite}][value]=${useFor}
                          &filter[meta_query][${ite}][compare]=${compare}
                          &filter[meta_query][${ite}][type]=CHAR`;
            ite++;
          } else {
            queryStr +=`filter[meta_query][relation]=AND
                        &filter[meta_query][${ite}][key]=_bit_rooms
                        &filter[meta_query][${ite}][value]=${rooms}
                        &filter[meta_query][${ite}][compare]=${compare}
                        &filter[meta_query][${ite}][type]=NUMERIC`;
            ite++;
          }

          if(page === 'comProp') {
            queryStr +=`&filter[meta_query][relation]=AND
                          &filter[meta_query][${ite}][key]=_bit_apart_type
                          &filter[meta_query][${ite}][value]=${propType}
                          &filter[meta_query][${ite}][compare]=${compare}
                          &filter[meta_query][${ite}][type]=CHAR`;
            ite++;
          }

          if(price_from !== '' || price_to !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_bit_price_${currency}
                         &filter[meta_query][${ite}][type]=NUMERIC`;

            if((price_from !== '' && price_to !== '') && price_from < price_to) {
              queryStr += `&filter[meta_query][${ite}][value][0]=${price_from}
                           &filter[meta_query][${ite}][value][1]=${price_to}
                           &filter[meta_query][${ite}][compare]=BETWEEN`
            } else if(((price_from !== '' && price_to !== '') && price_from > price_to) || (price_to !== '' && price_from === '')) {
              queryStr += `&filter[meta_query][${ite}][value]=${price_to}
                           &filter[meta_query][${ite}][compare]=<=`;
            } else if (price_from !== '' && price_to === '') {
              queryStr += `&filter[meta_query][${ite}][value]=${price_from}
                           &filter[meta_query][${ite}][compare]=>=`;
            }
            ite++;
          }

          if(area_from !== '' || area_to !== '') {
            let metaKey = page === 'stead' ? '_bit_size_area': '_bit_size_house';
            queryStr += `&filter[meta_query][${ite}][key]=${metaKey}
                         &filter[meta_query][${ite}][type]=NUMERIC`;
            if((area_from !== '' && area_to !== '') && area_from < area_to) {
              queryStr += `&filter[meta_query][${ite}][value][0]=${area_from}
                           &filter[meta_query][${ite}][value][1]=${area_to}
                           &filter[meta_query][${ite}][compare]=BETWEEN`;
            } else if(((area_from !== '' && area_to !== '') && area_from > area_to) || (area_to !== '' && area_from === '') ) {
              queryStr += `&filter[meta_query][${ite}][value]=${area_to}
                           &filter[meta_query][${ite}][compare]=<=`;
            } else if (area_to === '' && area_from !== '') {
              queryStr += `&filter[meta_query][${ite}][value]=${area_from}
                           &filter[meta_query][${ite}][compare]=>=`;
            }
            ite++;
          }

          if(size_area !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_bit_size_area
                         &filter[meta_query][${ite}][value]=${size_area}
                         &filter[meta_query][${ite}][type]=NUMERIC
                         &filter[meta_query][${ite}][compare]=<=`;
            ite++;
          }

          if(floors !== '') {
            queryStr += `&filter[meta_query][${ite}][key]=_floors
                         &filter[meta_query][${ite}][value]=${floors}
                         &filter[meta_query][${ite}][type]=NUMERIC
                         &filter[meta_query][${ite}][compare]=<=`;
            ite++;
          }

          if(tax.subway !== '' || tax.district !== '') {
            const taxSlug = [];
            for (let k in tax) {
              if (tax.hasOwnProperty(k) && tax[k] !== '') {
                taxSlug.push(tax[k]);
              }
            }
            if (taxSlug.length !== 0) {
              queryStr += `&filter[tax_query][0][taxonomy]=house_attr
                         &filter[tax_query][0][field]=slug
                         &filter[tax_query][0][terms]=${taxSlug}
                         &filter[tax_query][0][operator]=IN`;
            }
          }

          queryStr = queryStr.replace(/\s+|\n+|\r+/g, '');

          let url = `http://bitrealt.com.ua/wp-json/wp/v2/${this.wpapi.wpEndpoint}`;
          this.getItems(url+queryStr);
        },
        getTerms() {
          const self = this;
          return this.wpapi.wp.allTerms()
            .param('term', 'house_attr')
            .get()
            .then(resp => {
              self.termsAttr = resp;
              for(let k in resp) {
                if(resp.hasOwnProperty(k)) {
                  const {term_id, name, parent} = resp[k];
                  if(parent === 6) {
                    self.districts[term_id] = name;
                  }
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
                if (self.districts.hasOwnProperty(termIds[i]))
                  cPosts[k]['house_attr'] = self.districts[termIds[i]];
              }
            }
            if(cPosts[k]._embedded.hasOwnProperty('wp:featuredmedia')) {
              cPosts[k].featured_media = cPosts[k]._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url;
            } else {
              cPosts[k].featured_media = 'http://bitrealt.com.ua/wp-content/themes/bitrealty-theme/img/house-stub.png';
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
          });
      }
    }
</script>

<style lang="sass">
    .miniature-trans
        &-enter-active, &-leave-to
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
        &-enter, &-leave-to
            transform: translateY(30px)
</style>