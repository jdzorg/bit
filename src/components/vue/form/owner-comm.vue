<template lang="pug">
    .house-fields
    fieldset.address
        input(type="text" name="form.region" placeholder="Город / Область" style="width:225px")
        input(type="text" name="form.street" placeholder="Улица" style="width:380px")
        input(type="text" name="form.build" placeholder="№ дома" style="width:165px")
    fieldset.params
        select(name="form.purpose" style="width:325px")
            option(disabled value="") Целевое назначение
            option(value="Профиль") Профиль
            option(value="Автомойка") Автомойка
            option(value="Автосалон") Автосалон
            option(value="Автостоянка") Автостоянка
            option(value="АЗС") АЗС
            option(value="Актовый зал") Актовый зал
            option(value="Ангар") Ангар
            option(value="Аптека") Аптека
            option(value="База отдыха") База отдыха
            option(value="Банк") Банк
        input(type="text" name="form.floor" placeholder="Этаж" style="width:180px")
        .sep
        input(type="text" name="form.floors" placeholder="Этажей" style="width:180px")
        input(type="text" name="form.houseSize" placeholder="Общая площадь" style="width:180px")
        .unit
    fieldset.price
        input(type="number" name="form.price" placeholder="Цена" style="width:225px")
        select(name="form.currency")
            option(value="uah") грн
            option(value="usd") usd
            option(value="btc") btc
    fieldset.description
        textarea(placeholder="Описание" name="form.desc")
    fieldset.photo
        input(type="file" name="form.photo" id="addImg")
        label(for="addImg")
            span.ico-add-photo
            span Прикрепить фото
</template>

<script>
  export default {
    name: "Comm",
    data() {
      return {
        form: {
          region: '',
          street: '',
          build: '',
          purpose: '',
          floor: '',
          floors: '',
          houseSize: '',
          price: '',
          currency: 'uah',
          desc: '',
          photo: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>