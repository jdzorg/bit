<template lang="pug">
    section.row.filter
        form.col-lg-12(
          v-model="form",
          @submit.prevent="$emit('filterItems', form)"
        )
            .filter-col-1
                fieldset
                    .group-attr.btn-radio(v-if="clearNamePage === 'flat' || clearNamePage === 'house'")
                        span.desc-fields Комнаты:
                        input(id="room_1" type="radio" v-model="form.rooms" value="1")
                        label(for="room_1") 1
                        input(id="room_2" type="radio" v-model="form.rooms" value="2")
                        label(for="room_2") 2
                        input(id="room_3" type="radio" v-model="form.rooms" value="3")
                        label(for="room_3") 3
                        input(id="room_4" type="radio" v-model="form.rooms" value="4")
                        label(for="room_4") 4
                        input(id="room_5" type="radio" v-model="form.rooms" value="5+")
                        label(for="room_5") 5+
                    .group-attr.btn-radio.type(v-else-if="clearNamePage === 'com_prop'")
                        span.desc-fields Тип:
                        input(id="propType_1" type="radio" v-model="form.propType" value="resident")
                        label(for="propType_1") жилой
                        input(id="propType_2" type="radio" v-model="form.propType" value="nonresident")
                        label(for="propType_2") нежилой
                        input(id="propType_3" type="radio" v-model="form.propType" value="admin")
                        label(for="propType_3")
                            span
                                | админ.
                                br
                                | здание
                    .group-attr.btn-radio.use-for(v-else-if="clearNamePage === 'stead'")
                        span.desc-fields Назначение:
                        input(id="useFor_1" type="radio" v-model="form.useFor" value="develop")
                        label(for="useFor_1") Застройка
                        input(id="useFor_2" type="radio" v-model="form.useFor" value="osg")
                        label(for="useFor_2") ОСГ
                        input(id="useFor_3" type="radio" v-model="form.useFor" value="garden")
                        label(for="useFor_3") Садоводство
                    .group-attr
                        input(type="number" v-model="form.price_from" placeholder="Цена от")
                        span.desc-fields -
                        input(type="number" v-model="form.price_to" placeholder="Цена до")
                    .group-attr.btn-radio
                        input(id="cur_1" type="radio" v-model="form.currency" value="uah")
                        label(for="cur_1")
                            span ГРН
                        input(id="cur_2" type="radio" v-model="form.currency" value="usd")
                        label(for="cur_2")
                            span USD
                    .group-attr
                        input(type="number" v-model="form.area_from" placeholder="Площадь от")
                        span.desc-fields -
                        input(type="number" v-model="form.area_to" placeholder="Площадь до")
                        span.desc-fields {{clearNamePage === 'stead' ? 'сот.' : 'м²'}}
                transition(
                  name="filter-advanced",
                  mode="in-out"
                )
                    .filter-hidden(v-if="isFilterMore")
                        fieldset
                            span(v-if="clearNamePage === 'stead' || clearNamePage === 'house' || clearNamePage === 'com_prop'")
                                .group-attr.radio(v-if="clearNamePage === 'stead' || clearNamePage === 'house'")
                                    span.desc-fields Область:
                                        input( id="region_1", type="radio", v-model="form.tax.region", value="kiev")
                                        label(for="region_1") Киев
                                        input( id="region_2", type="radio", v-model="form.tax.region", value="kievskaya-oblast")
                                        label(for="region_2") Киевская область
                                .group-attr.btn-radio(v-else-if="clearNamePage === 'com_prop'")
                                    span.desc-fields Комнаты:
                                    input(id="cRoom_1" type="radio" v-model="form.rooms" value="1")
                                    label(for="cRoom_1") 1
                                    input(id="cRoom_2" type="radio" v-model="form.rooms" value="2")
                                    label(for="cRoom_2") 2
                                    input(id="cRoom_3" type="radio" v-model="form.rooms" value="3")
                                    label(for="cRoom_3") 3
                                    input(id="cRoom_4" type="radio" v-model="form.rooms" value="4")
                                    label(for="cRoom_4") 4
                                    input(id="cRoom_5" type="radio" v-model="form.rooms" value="5+")
                                    label(for="cRoom_5") 5+
                            .group-attr
                                select(v-model="form.tax.district")
                                    option(disabled value="") Район
                                    option(
                                    v-for="(item, i) in terms",
                                    v-if="item.parent === 6",
                                    :value="item.slug") {{ item.name }}
                            .group-attr(v-if="clearNamePage === 'house' || clearNamePage === 'com_prop'")
                                input(type="text", :placeholder="clearNamePage === 'house' ? 'Этажей' : 'Этаж'", v-model="form.floors", style="width:120px")
                            .group-attr(v-if="clearNamePage === 'house'")
                                input(type="text" placeholder="Площадь участка" v-model="form.size_area")
                                span.desc-fields сот.
                            .group-attr(v-if="clearNamePage === 'flat' || clearNamePage === 'com_prop'")
                                select(v-model="form.tax.subway")
                                    option(disabled value="") Метро
                                    option(
                                    v-for="(item, i) in terms",
                                    v-if="item.parent === 23",
                                    :value="item.slug") {{ item.name }}
            .filter-col-2
                fieldset.text-right
                    button.btn.btn-default Подобрать
            .clearfix
        .col-lg-12.text-center.filter-add-toggle
            hr
            button.btn.btn-simple(@click="toggleAddFilter")
                span {{ isFilterMore ? '&#8593;' : '&#8595' }}
                | {{ isFilterMore ? 'Скрыть расширеный фильтр' : 'Расширеный фильтр' }}

</template>

<script>

export default {
  props: {
    page: String,
    terms: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        rooms: 2,
        propType: 'resident',
        useFor: 'osg',
        currency: 'uah',
        price_from: '',
        price_to: '',
        area_from: '',
        area_to: '',
        address: '',
        floors: '',
        size_area: '',
        tax: {
          region: 'kiev',
          district: '',
          subway: '',
        }
      },
      isFilterMore: false,
      boxHeight: ''
    }
  },
  methods: {
    toggleAddFilter() {
      this.isFilterMore = !this.isFilterMore
    }
  },
  computed: {
    clearNamePage() {
     return this.page.replace('_s', '');
    }
  }
}

</script>

<style lang="sass">
    .filter-advanced
        &-enter-active, &-leave-active
            transition: .5s ease
            overflow: hidden
            height: 75px
        &-enter, &-leave-to
            height: 0
</style>