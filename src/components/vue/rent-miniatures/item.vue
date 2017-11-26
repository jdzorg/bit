<template lang="pug">
    .col-lg-4(:style="'transition-delay: .' + (trans * 3) + 's ease'")
        a.miniatures-item(:href="min.link", data-id="min.id")
            img(:src="min.featured_media")
            .miniatures-caption
                span.miniatures-addres(v-if="min.bit_address") {{ min.bit_address }}
                span.miniatures-district(v-if="typeof min.house_attr === 'string'") {{ min.house_attr }} район
                span.miniatures-code(v-if="min.bit_code") {{ min.bit_code }}
                .clearfix
                span.miniatures-price(v-if="min.bit_price_uah || min.bit_price_usd") {{ min.bit_price_uah + ' грн. /  ' + min.bit_price_usd +' $'}}
                button.btn.btn-simple узнать цену в криптовалюте
                .miniatures-features
                    .rooms(v-if="min.bit_rooms")
                        i
                        P
                            span {{ min.bit_rooms }}
                            span комнат
                    .size-home(v-if="min.bit_size_house")
                        i
                        P
                            span {{ min.bit_size_house }}
                            span кв.м.
                    .size-area(v-if="min.bit_size_area")
                        i
                        P
                            span {{ min.bit_size_area }}
                            span сот. участок
</template>
<style lang="sass">
    .miniatures
        &-item
            display: block
            margin-bottom: 25px
            line-height: 1.42857
            background-color: #fff
            box-shadow: 0 12px 26px 3px #eaeaea
            cursor: pointer
            transition: .2s ease
            &:hover
                box-shadow: 0 0 0 1px #eaeaea
        & a:hover
            text-decoration: none
        & img
            display: block
            max-width: 100%
            height: auto
            margin-left: auto
            margin-right: auto
        &-caption
            padding: 15px 20px
            color: #393a3d
        &-addres
            display: block
            margin-bottom: 25px
            font-size: 16px
        &-district, &-code
            display: block
            font:
                family: 'rubik-l', sans-serif
                weight: 100
                size: 12px
        &-district
            float: left
        &-code
            float: right
        &-price
            display: block
            margin-top: 10px
            font-size: 18px
            color: rgb(255, 85, 26)
        & button
            margin-top: -10px
            padding: 0
            font:
                family: 'rubik-l', sans-serif
                weight: 100
                size: 12px
        &-features
            display: flex
            justify-content: space-between
            margin:
                left: -20px
                right: -20px
                bottom: -15px
            padding: 10px 20px
            background-color: #f6f8fd
            & .rooms, & .size-home, & .size-area
                display: flex
                justify-content: space-between
                align-items: center
                font:
                    family: 'rubik-l', sans-serif
                    weight: 100
                    size: 12px
                color: #7e858b
            & i
                display: block
                margin-right: 10px
            & p
                margin-bottom: 0
            & span:first-child
                display: block
                font-size: 18px
            & .rooms
                & i
                    width: 22px
                    height: 32px
                    background: url("../../../assets/img/ico-rooms.png")no-repeat center/100%
            & .size-home
                & i
                    width: 32px
                    height: 32px
                    background: url("../../../assets/img/ico-size-home.png")no-repeat center/100%
            & .size-area
                & i
                    width: 32px
                    height: 32px
                    background: url("../../../assets/img/ico-size-area.png")no-repeat center/100%




</style>
<script>
    export default {
      props: {
        trans: Number,
        min: {
          type: Object,
          required: true
        }
      }
    }
</script>