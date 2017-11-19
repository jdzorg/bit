<template lang="pug">
    .col-lg-4
        a.miniatures-item(:href="min.href")
            img(:src="min.img")
            .miniatures-caption
                span.miniatures-addres {{ min.address }}
                span.miniatures-district {{ min.district }}
                span.miniatures-code {{ min.code }}
                .clearfix
                span.miniatures-price {{ min.price }}
                button.btn.btn-simple узнать цену в криптовалюте
                .miniatures-features
                    .rooms
                        i
                        P
                            span {{ min.features.rooms }}
                            span комнат
                    .size-home
                        i
                        P
                            span {{ min.features.sHome }}
                            span кв.м.
                    .size-area
                        i
                        P
                            span {{ min.features.sArea }}
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
        min: {
          href: {
            type: String,
            required: true
          },
          img: {
            type: String,
            required: true
          },
          address: {
            type: String,
            required: true
          },
          district: {
            type: String,
            required: true
          },
          code: {
            type: String,
            required: true
          },
          price: {
            type: String,
            required: true
          },
          features: {
            type: Object,
            required: true
          },
        }
      }
    }
</script>