<template lang="pug">
    section.row.filter
        form.col-lg-12(
          v-model="form",
          @submit.prevent="$emit('filterItems', form)"
        )
            .filter-col-1
                fieldset
                    .group-attr.btn-radio(v-if="page === 'flat' || page === 'house'")
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
                    .group-attr.btn-radio.type(v-else-if="page === 'com_prop'")
                        span.desc-fields Тип:
                        input(id="propType_1" type="radio" v-model="form.propType" value="жилой")
                        label(for="propType_1") жилой
                        input(id="propType_2" type="radio" v-model="form.propType" value="нежилой")
                        label(for="propType_2") нежилой
                        input(id="propType_3" type="radio" v-model="form.propType" value="админ.здание")
                        label(for="propType_3")
                            span
                                | админ.
                                br
                                | здание
                    .group-attr.btn-radio.use-for(v-else-if="page === 'stead'")
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
                            span грн
                        input(id="cur_2" type="radio" v-model="form.currency" value="usd")
                        label(for="cur_2")
                            span usd
                    .group-attr
                        input(type="number" v-model="form.area_from" placeholder="Площадь от")
                        span.desc-fields -
                        input(type="number" v-model="form.area_to" placeholder="Площадь до")
                        span.desc-fields км.м
                transition(
                  name="filter-advanced",
                  mode="in-out"
                )
                    .filter-hidden(v-if="isFilterMore")
                        fieldset
                            span(v-if="page === 'stead' || page === 'house' || page === 'com_prop'")
                                .group-attr.radio(v-if="page === 'stead' || page === 'house'")
                                    span.desc-fields Область:
                                        input( id="region_1", type="radio", v-model="form.region", value="kiev")
                                        label(for="region_1") Киев
                                        input( id="region_2", type="radio", v-model="form.region", value="kievskaya-oblast")
                                        label(for="region_2") Киевская область
                                .group-attr.btn-radio(v-else-if="page === 'com_prop'")
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
                                select(v-model="form.district")
                                    option(disabled value="") Район
                                    option(
                                    v-for="(item, i) in terms",
                                    v-if="item.parent === 6",
                                    :value="item.slug") {{ item.name }}
                            <!--.group-attr-->
                                <!--input(type="text" placeholder="Улица" style="width:300px" v-model="form.address")-->
                            .group-attr(v-if="page === 'house' || page === 'com_prop'")
                                input(type="number", :placeholder="page === 'house' ? 'Этажей в доме' : 'Этаж'", v-model="form.floors")
                            .group-attr(v-if="page === 'house'")
                                input(type="text" placeholder="Площадь участка" v-model="form.size_area")
                                span.desc-fields сот.
                            .group-attr(v-if="page === 'house'")
                                input(type="text" placeholder="Этаж" v-model="form.size_area")
                                span.desc-fields сот.
                            .group-attr(v-if="page === 'flat' || page === 'com_prop'")
                                select(v-model="form.subway")
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
        subway: '',
        rooms: 2,
        propType: 'нежилой',
        useFor: 'osg',
        currency: 'uah',
        price_from: '',
        price_to: '',
        area_from: '',
        area_to: '',
        region: 'kiev',
        district: '',
        address: '',
        floors: '',
        size_area: ''
      },
      isFilterMore: false,
      boxHeight: ''
    }
  },
  methods: {
    toggleAddFilter() {
      this.isFilterMore = !this.isFilterMore
    }
  }
}

</script>

<style lang="sass">
    .filter
        padding-top: 57px
        &-add-toggle
            padding:
                top: 10px
                bottom: 20px
            & hr
                margin:
                    top: -10px
                    bottom: 0
                border-bottom: 1px solid #bdc3d5
        & form
            & button.btn:hover
                color: #000
                border-color: #000
        &-col-1, &-col-2
            float: left
        &-col-1
            width: 87%
        &-col-2
            width: 13%
        & .desc-fields
            display: inline-flex
            font-size: 16px
        & fieldset
            display: block
            margin-bottom: 30px
        & .group-attr
            display: inline-flex
            align-items: center
        & label
            margin-bottom: 0
        & input[type="number"]
            width: 120px
        & select
            width: 255px
        & input[type="number"], input[type="text"], & select
            height: 42px
            margin:
                right: 4px
                left: 4px
            padding-left: 11px
            border: 1px solid #7e858b
            color: #7e858b
            font-size: 14px
        & input[type="radio"]
            display: none
        & .btn-radio
            &.type label
                width: 88px !important
                font-size: 14px
            &.use-for
                position: relative
                & label
                    width: 100px !important
                    font-size: 14px
                & span
                    position: absolute
                    top: -25px
                    left: 3px

            & input[type="radio"]:checked + label
                background-color: #88caec
                color: #fff
            & label
                display: inline-flex
                justify-content: center
                align-items: center
                width: 42px
                height: 42px
                margin:
                    right: 4px
                    left: 4px
                    bottom: 0
                background-color: #eeeff0
                font-weight: 500
                cursor: pointer
                transition: .3s ease
                &:hover
                    background-color: #88caec
                    color: #fff
        & .radio
            & label
                position: relative
                max-height: 17px
                min-height: 17px
                margin-left: 25px
                margin-right: 4px
                padding-left: 25px
                font:
                    family: 'rubik-l', sans-serif
                    weight: 100
                    size: 14px
                color: #7e858b
                &:before
                    content: ""
                    position: absolute
                    display: block
                    height: 17px
                    width: 17px
                    top: 0
                    left: 0
                    border: 1px solid #393a3d
                    border-radius: 50%
                    background-color: transparent
                    transition: 1s ease
            & input[type="radio"]:checked + label
                color: #393a3d
                &:before
                    background-color: #000
        &-advanced
            &-enter-active, &-leave-active
                /*transition: .5s ease*/
                overflow: hidden
            &-enter, &-leave-to
                height: 0

</style>