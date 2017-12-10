<template lang="pug">
    .house-fields
        fieldset.address
            ValidateInput(name="region", v-model="form.region", validate="alpha_spaces", placeholder="Город / Область", width="225px")
            ValidateInput(name="street", v-model="form.street", validate="alpha_spaces", placeholder="Улица", width="380px")
            ValidateInput(name="build", v-model="form.build", validate="buildNum", placeholder="№ дома", width="165px")
        fieldset.params
            ValidateInput(type="number", validate="numeric", name="rooms", v-model="form.rooms", placeholder="Количество комнат", width="225px")
            ValidateInput(type="number", validate="numeric", name="houseSize", v-model="form.houseSize", placeholder="Общая площадь", width="180px")
            .sep
            ValidateInput(type="number", validate="numeric", name="liveSize", v-model="form.liveSize", placeholder="Жилая площадь", width="180px")
            .unit
            ValidateInput(type="number", validate="numeric", name="floors", v-model="form.floors", placeholder="Всего этажей", width="180px")
        fieldset.price
            ValidateInput(type="number", validate="numeric", name="price", v-model="form.price", placeholder="Цена", width="225px")
            select(name="currency", v-model="form.currency")
                option(value="uah") грн
                option(value="usd") usd
                option(value="btc") btc
        fieldset.description
            textarea(placeholder="Описание", v-validate="'text'", name="desc", v-model="form.desc")
            InvalidFiled(v-show="errors.has('desc')") В поле присутствуют запрещенные знаки
        fieldset.photo
            input(type="file" name="photo" id="addImg")
            label(for="addImg")
                span.ico-add-photo
                span Прикрепить фото
</template>

<script>
  import InvalidFiled from './elements/invalid-filed'
  import ValidateInput from './elements/input'

  export default {
    name: "House",
    components: {
      InvalidFiled, ValidateInput
    },
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