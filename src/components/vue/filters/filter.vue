<template lang="pug">
    section.row.filter
        form.col-lg-12(
          v-model="form",
          @submit.prevent="$emit('filterItems', form)"
        )
            .filter-col-1
                fieldset
                    .group-attr.btn-radio
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
                transition(name="filter-advanced" mode="in-out")
                    .filter-hidden(v-show="isFilterMore")
                        fieldset
                            .group-attr.radio
                                span.desc-fields Область:
                                input(id="region_1" type="radio" v-model="form.region" value="Киев")
                                label(for="region_1") Киев
                                input(id="region_2" type="radio" v-model="form.region" value="Киевская область")
                                label(for="region_2") Киевская область
                        fieldset
                            .group-attr
                                select(v-model="form.district")
                                    option(disabled value="") Район
                                    option(value="Святошино") Святошино
                                    option(value="Печерский") Печерский
                                    option(value="Дарницкий") Дарницкий
                            .group-attr
                                input(type="text" placeholder="Улица" style="width:300px" v-model="form.address")
                            .group-attr
                                input(type="number" placeholder="Этажей в доме" v-model="form.floors")
                            .group-attr
                                input(type="text" placeholder="Площадь участка" v-model="form.size_area")
                                span.desc-fields сот.
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
    data () {
      return {
        form: {
          rooms: 1,
          currency: 'uah',
          price_from: '',
          price_to: '',
          area_from: '',
          area_to: '',
          region: 'Киев',
          district: '',
          address: '',
          floors: '',
          size_area: ''
        },
        isFilterMore: false
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
            font-size: 16px
        & fieldset
            display: block
            margin-bottom: 30px
        & .group-attr
            display: inline-block
        & label
            margin-bottom: 0
        & input[type="number"]
            width: 120px
        & select
            width: 280px
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
                transition: .5s ease
                height: 150px
                overflow: hidden
            &-enter, &-leave-to
                height: 0

</style>