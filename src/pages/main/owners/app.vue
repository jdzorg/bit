<template lang="pug">
    form.owners-form
        fieldset.realty-type
            button.btn.btn-form(type="button") Квартира
            button.btn.btn-form.active(type="button") Дом
            button.btn.btn-form(type="button") Землю
            button.btn.btn-form(type="button") Коммерческую
        .realty-form
            House
            Flat
        .owner-form
            fieldset
                span.owner-title Ваши контактные данные
                span.owner-subtitle Чтобы Ваша заявка была обработана, укажите, пожалуйста, свой номер телефона и (или) e-mail
                input(type="text" placeholder="Имя *")
                input(type="tel" placeholder="Телефон *")
                input(type="email" placeholder="Email" style="margin-right: 0")
                br
                input(type="checkbox" id="rules")
                label(for="rules")
                    | Я согласен с правилами
                    a(href="#") обработки персональных данных
            fieldset.send
                button.btn.btn-default Отправить
</template>

<script>
  import House from 'components/vue/form/owner-house'
  import Flat from 'components/vue/form/owner-flat'
  import Stead from 'components/vue/form/owner-stead'
  import Comm from 'components/vue/form/owner-comm'

  export default {
    name: "app",
    components: {
        House, Flat, Stead, Comm
    },
    data() {
      return {}
    }
  }
</script>

<style lang="sass">
    .owners-form
        margin-top: 55px
        padding:
            left: 60px
            right: 60px
        box-shadow: 0 4px 12px #ebebeb
        & .realty-form
            padding-bottom: 25px
            & fieldset
                margin-top: 24px
        & input, & select
            height: 42px
            margin-right: 20px
            padding-left: 11px
            border: 1px solid #7e858b
            color: #7e858b
            font:
                family: 'rubik-l', sans-serif
                weight: 100
                size: 14px
        & .sep
            display: inline
            position: relative
            &:after
                content: '/'
                display: block
                width: 20px
                height: 20px
                position: absolute
                top: 3px
                left: -14px
                font-size: 14px
                font-weight: bold
        & .unit
            display: inline-block
            position: relative
            width: 20px
            height: 20px
            &:after
                content: 'M²'
                display: block
                position: absolute
                width: 20px
                height: 20px
                top: 6px
                left: -10px
                font-size: 14px
                font-weight: bold
        & select
            width: 100px
            font-weight: bold
            color: #393a3d
        & textarea
            width: 100%
            height: 125px
            resize: none
            padding:
                top: 11px
                left: 11px
            border: 1px solid #7e858b
            color: #7e858b
            font:
                family: 'rubik-l', sans-serif
                weight: 100
                size: 14px
        & .btn-form
            width: 225px
            padding:
                top: 12px
                bottom: 12px
            background-color: transparent
            transition: .3s ease
            border-radius: 0
            font-size: 16px
            text-transform: uppercase
            &:hover, &.active
                background-color: #88caec
                color: #fff
                box-shadow: none
        & .address
            margin-top: 40px
        & .photo
            & input
                display: none
            & label
                display: flex
                align-items: center
                cursor: pointer
                font-size: 16px
                text-decoration: underline
                & span:last-child
                    display: inline-block
                    height: 17px
                & .ico-add-photo
                    display: inline-block
                    width: 32px
                    height: 30px
                    margin-right: 15px
                    background:
                        image: url(../../../assets/img/ico-add-photo.png)
                        size: contain
                        repeat: no-repeat
        & .owner
            &-form
                background-color: #f6f8fd
                margin:
                    left: -60px
                    right: -60px
                padding:
                    top: 50px
                    bottom: 55px
                    left: 60px
                    right: 60px
                & input
                    width: 325px
                & input[type="checkbox"]
                    display: none
                    &:checked + label:before
                        background:
                            image: url(../../../assets/img/ico-checkbox-checked.png)
                            size: contain
                            repeat: no-repeat
                & .btn-default
                    margin-top: 25px
                    &:hover
                        color: #000
                        border-color: #000
                & label
                    display: flex
                    align-items: center
                    margin-top: 20px
                    font:
                        family: 'rubik-l', sans-serif
                        weight: 100
                        size: 14px
                    &:before
                        content: ''
                        display: block
                        width: 24px
                        height: 24px
                        margin-right: 15px
                        background:
                            image: url(../../../assets/img/ico-checkbox.png)
                            size: contain
                            repeat: no-repeat

                    & > a
                        color: #586ba3
                        text-decoration: underline
                        padding-left: 5px

            &-title
                display: block
                font:
                    family: 'rubik-b', sans-serif
                    weight: bold
                text-transform: uppercase
            &-subtitle
                display: block
                margin:
                    top: 25px
                    bottom: 25px
                font:
                    family: 'rubik-l', sans-serif
                    weight: 100
                    size: 16px


</style>