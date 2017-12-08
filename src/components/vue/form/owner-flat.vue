<template lang="pug">
    .flat-fields
        fieldset.address
            input(type="text" name="form.region" placeholder="Город / Область" style="width:225px")
            input(type="text" name="form.street" placeholder="Улица" style="width:380px")
            input(type="text" name="form.build" placeholder="№ дома" style="width:165px")
            input(type="text" name="form.floor" placeholder="Этаж" style="width:100px")
            .sep
            input(type="text" name="form.floors" placeholder="Этажей" style="width:100px")
        fieldset.params
            input(type="text" name="form.rooms" placeholder="Количество комнат" style="width:225px")
            input(type="text" name="form.houseSize" placeholder="Общая площадь" style="width:180px")
            .sep
            input(type="text" name="form.liveSize" placeholder="Жилая площадь" style="width:180px")
            .sep
            input(type="text" name="form.kitchenSize" placeholder="Площадь кухни" style="width:180px")
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
    name: "Flat",
    data() {
      return {
        form: {
          region: '',
          street: '',
          build: '',
          floor: '',
          floors: '',
          rooms: '',
          houseSize: '',
          liveSize: '',
          kitchenSize: '',
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