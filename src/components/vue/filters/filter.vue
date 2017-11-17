<template lang="pug">
    section.filter
        form
            fieldset
                .group-attr.btn-radio
                    span.desc-fields Комнаты:
                    input(id="room_1" type="radio" name="room" value="1")
                    label(for="room_1")
                        span 1
                    input(id="room_2" type="radio" name="room" value="2")
                    label(for="room_2")
                        span 2
                    input(id="room_3" type="radio" name="room" value="3")
                    label(for="room_3")
                        span 3
                    input(id="room_4" type="radio" name="room" value="4")
                    label(for="room_4")
                        span 4
                    input(id="room_5" type="radio" name="room" value="5+")
                    label(for="room_5")
                        span 5+
                .group-attr
                    input(type="number" name="price_from" placeholder="Цена от")
                    span.desc-fields -
                    input(type="number" name="price_to" placeholder="Цена до")
                .group-attr.btn-radio
                    input(id="cur_1" type="radio" name="currency" value="uah")
                    label(for="cur_1")
                        span грн
                    input(id="cur_2" type="radio" name="currency" value="usd")
                    label(for="cur_2")
                        span usd
                .group-attr
                    input(type="number" name="area_from" placeholder="Площадь от")
                    span.desc-fields -
                    input(type="number" name="area_to" placeholder="Площадь до")
                    span.desc-fields км.м
            fieldset
                .group-attr
                    span.desc-fields Область:
                    label
                        | Киев
                        input(type="radio" name="region" value="Киев")
                    label
                        | Киевская область
                        input(type="radio" name="region" value="Киевская область")
            fieldset
                .group-attr
                    select
                        option(value="Святошино")
                        option(value="Печерский")
                        option(value="Дарницкий")
                .group-attr
                    input(placeholder="Улица")
                .group-attr
                    input(placeholder="Этажей в доме")
                .group-attr
                    input(placeholder="Площадь участка")
                    span.desc-fields сот.
            fieldset
                button.btn.btn-default Подобрать
</template>
<style lang="sass">
    .filter
        padding:
            top: 57px
            bottom: 30px
        border-bottom: 1px solid #bdc3d5
        & .desc-fields
            font-size: 16px
        & fieldset
            display: block
            margin-bottom: 30px
        & .group-attr
            display: inline-block
        & input[type="number"]
            width: 120px
            height: 42px
            margin:
                right: 4px
                left: 4px
            padding-left: 11px
            border: 1px solid #7e858b
            color: #7e858b
            font-size: 14px
        & .btn-radio
            & input[type="radio"]
                display: none
                &:checked + label
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
                background-color: #eeeff0
                font-weight: 500
                cursor: pointer
                transition: .3s ease
                &:hover
                    background-color: #88caec
                    color: #fff


</style>
<script>

  export default {
    data () {
      return {
      }
    }
  }

</script>