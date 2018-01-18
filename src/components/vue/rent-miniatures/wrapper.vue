<template lang="pug">
    section.searchrealty
        .container
            rentFilter(
              :terms="termsAttr",
              :page="settings.page",
              @filterItems="getFilteredItems"
            )
            section.row.miniatures(style="min-height:337px")
                .col-lg-12
                    .row
                        transition-group(
                          tag="div",
                          name="miniature-trans",
                          mode="out-in",
                          appear
                        )
                            .msg(v-show="isMin", key="111")
                                span
                                    | Извините по выбранным параметрам ничего не найдено
                                <!--button.btn.btn-simple(@click="") Сбросить фильтр-->
                            template(v-for="(item, index) in minData")
                                minItem(
                                  :trans="index",
                                  :key="index",
                                  :min="item",
                                  :sets="settings.features",
                                  @popBit="handlerPopUp"
                                )
                                .clearfix(v-if="(index + 1) % 3 === 0", key="clear")
                    .row
                        .col-lg-12(v-if="isPaging")
                            .pagination
                                span.pagePrev(v-if="curPage > 1", @click="switchPage(-1)") &#60; Пред
                                span.pageNext(v-if="curPage < totalPage", @click="switchPage(1)") След &#62;
        Popup(v-show="showPop", @close="handlerPopUp", bgClass="bitcoin", :height="popHeight")
            Bitcoin(
              v-if="!isSent",
              key="form",
              :title="formHead.title",
              :subTitle="formHead.subTitle",
              :btnName="formHead.btn",
              :sendArgs="args"
            )
            Msg(
              v-else,
              :finalMSG="msg",
              key="msg"
            )

</template>

<style lang="sass">
    .pagination
        display: flex
        flex-direction: row
        justify-content: center
        & span
            display: flex
            justify-content: center
            align-items: center
            width: 72px
            height: 42px
            border: 1px solid #7e858b
            font:
                family: 'rubik-l', sans-serif
                weight: 100
                size: 14px
            color: #7e858b
            cursor: pointer
            transition: .3s ease
            &:hover
                background-color: #88caec
                color: #fff

    .miniature-trans
        &-enter-active, &-leave-to
            transition: .5s ease
        &-enter, &-leave-to
            opacity: 0
        &-enter, &-leave-to
            transform: translateY(30px)
        .msg
            text-align: center
            & > span
                display: block
                margin-top: 50px
</style>

<script>
    import rentFilter from '../filters/filter.vue'
    import minItem from './item.vue'
    import Popup from '../popups/popup'
    import Bitcoin from '../form/bitcoin'
    import Msg from '../form/msg'

    export default {
      components: {
        minItem, rentFilter, Popup, Bitcoin, Msg
      },
      props: {
        wpapi: Object,
        settings: Object
      },
      data() {
        return {
          popHeight: '',
          isMin: false,
          districts: [],
          termsAttr: {},
          minData: [],
          isPaging: false,
          curPage: 1,
          totalPage: '',
          showPop: false,
          args: {
            formName: 'Форма - Цена в криптовалюте',
            meth: 'nFeedback',
            type: 'POST'
          },
          isSent: false,
          formHead: {
            title: 'Хотите узнать цену в криптовалюте?',
            subTitle: 'Оставьте свои контактные данные и наш менеджер проконсультирует по <br>Вашему вопросу наша помощь и мы свяжемся с вами в ближайшее время.',
            btn: 'Отправить'
          },
          msg: {
            title: '',
            msg: ''
          }
        }
      },
      methods: {
        getItems(str) {
          return this.wpapi.wp[typeof str === 'string' ? 'url' : 'customPoint'](str)
            .order('desc')
            .orderby('date')
            .embed()
            .perPage(9)
            .page(this.curPage)
            .then(resp => {
              if(resp.length > 0) {
                this.isMin = false;
                this.renderPaging(resp._paging);
                this.parseItems(resp);
              } else {
                this.isMin = true;
                this.minData = [];
             }
          });
        },
        renderPaging(pageData) {
          if(pageData.totalPages > 1) {
            this.isPaging = true;
            this.totalPage = pageData.totalPages;
          }
        },
        switchPage(page) {
          this.curPage += page;
          this.getItems();
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

          if(page === 'com_prop') {
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
            let comp = '<=';
            if(floors.toLocaleLowerCase() === 'цоколь') {
              comp = '=';
            }
            queryStr += `&filter[meta_query][${ite}][key]=_bit_floors
                         &filter[meta_query][${ite}][value]=${floors}
                         &filter[meta_query][${ite}][compare]=${comp}`;
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

          let url = `http://bitrealt.com.ua/wp-json/wp/v2/${this.settings.page}`;
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
        },
        handlerPopUp() {
          this.showPop = !this.showPop;
          this.popHeight = `height: ${window.innerHeight}px`;
          document.body.style.overflow = this.showPop ? 'hidden' : '';
        }
      },
      created() {
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

