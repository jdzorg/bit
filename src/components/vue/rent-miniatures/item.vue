<template lang="pug">
    .col-lg-4(:style="'transition-delay: .' + (trans * 3) + 's ease'")
        a.miniatures-item(:href="min.link", data-id="min.id")
            img(:src="min.featured_media")
            .miniatures-caption
                span.miniatures-addres(v-text="min.bit_address ? min.bit_address : `${min.bit_street}, дом ${min.bit_house_number}`")
                span.miniatures-district(v-if="typeof min.house_attr === 'string'") {{ min.house_attr }} район
                span.miniatures-code(v-if="min.bit_code") {{ min.bit_code }}
                .clearfix
                span.miniatures-price(v-if="min.bit_price_uah || min.bit_price_usd") {{ min.bit_price_uah + ' грн. /  ' + min.bit_price_usd +' $'}}
                button.btn.btn-simple узнать цену в криптовалюте
                .miniatures-features
                    .rooms(v-if="sets.indexOf('rooms') !== -1 && min.bit_rooms")
                        i
                        P
                            span {{ min.bit_rooms }}
                            span комнат
                    .size-home(v-if="sets.indexOf('apartmentSize') !== -1 && min.bit_size_house")
                        i
                        P
                            span {{ min.bit_size_house }}
                            span кв.м.
                    .size-area(v-if="sets.indexOf('areaSize') !== -1 && min.bit_size_area")
                        i
                        P
                            span {{ min.bit_size_area }}
                            span сот. участок
                    .floors(v-if="sets.indexOf('floors') !== -1 && min.bit_floors")
                        i
                        P
                            span {{ min.bit_floors }}
                            span этаж
</template>

<script>
    export default {
      props: {
        sets: Array,
        trans: Number,
        min: {
          type: Object,
          required: true
        }
      }
    }
</script>
