<template lang="pug">
    .house-fields
        fieldset.address
            input(type="text" name="form.region" placeholder="Город / Область" style="width:225px")
            input(type="text" name="form.street" placeholder="Улица" style="width:380px")
            input(type="text" name="form.build" placeholder="№ дома" style="width:165px")
        fieldset.params
            input(type="text" name="form.rooms" placeholder="Количество комнат" style="width:225px")
            input(type="text" name="form.houseSize" placeholder="Общая площадь" style="width:180px")
            .sep
            input(type="text" name="form.liveSize" placeholder="Жилая площадь" style="width:180px")
            .unit
            input(type="text" name="form.floors" placeholder="Всего этажей" style="width:180px")
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
    name: "House",
    data() {
      return {
        form: {
          region: '',
          street: '',
          build: '',
          rooms: '',
          houseSize: '',
          liveSize: '',
          floors: '',
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