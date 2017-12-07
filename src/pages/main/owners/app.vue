<template lang="pug">
    form.owners-form
        fieldset.realty-type
            button
            button
            button
            button
        fieldset.address
            input(type="text" placeholder="Киев")
            input(type="text" placeholder="Улица")
            input(type="text" placeholder="№ дома")
        fieldset.params
            input(type="text" placeholder="Количество комнат")
            input(type="text" placeholder="Общая площадь")
            span /
            input(type="text" placeholder="Жилая площадь")
            span
                | m
                sup
                    small 2
            input(type="text" placeholder="Всего этажей")
        fieldset.price
            input(type="number" placeholder="Цена")
            select
                option(value="uah") грн
                option(value="usd") usd
        fieldset.description
            textarea(placeholder="Описание")
        fieldset.photo
            input(type="image")
        fieldset.owner
            span Ваши контактные данные
            span Чтобы Ваша заявка была обработана, укажите, пожалуйста, свой номер телефона и (или) e-mail
            input(type="text" placeholder="Имя *")
            input(type="tel" placeholder="Телефон *")
            input(type="email" placeholder="Email")
            br
            input(type="checkbox" id="rules")
            label(for="rules")
                | Я согласен с правилами
                a(href="#") обработки персональных данных
        fieldset.send
            button.btn.btn-default Отправить
</template>

<script>
  export default {
    name: "app",
    data() {
      return {}
    }
  }
</script>

<style lang="sass">

</style>