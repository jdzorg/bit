<template lang="pug">
    .flat-fields
        fieldset.address
            ValidateInput(name="region", validate="alpha_spaces", v-model="form.region", placeholder="Город / Область", width="225px")
            ValidateInput(name="street", validate="alpha_spaces", v-model="form.street", placeholder="Улица", width="380px")
            ValidateInput(name="build", validate="buildNum", v-model="form.build", placeholder="№ дома", width="135px")
            ValidateInput(type="number", name="floor", validate="numeric", v-model="form.floor", placeholder="Этаж")
            .sep
            ValidateInput(type="number", validate="numeric", name="floors", v-model="form.floors", placeholder="Этажей")
        fieldset.params
            ValidateInput(type="number", validate="numeric", name="rooms", v-model="form.rooms", placeholder="Количество комнат", width="225px")
            ValidateInput(type="number", validate="numeric", name="houseSize", v-model="form.houseSize", placeholder="Общая площадь", width="180px")
            .sep
            ValidateInput(type="number", validate="numeric", name="liveSize", v-model="form.liveSize", placeholder="Жилая площадь", width="180px")
            .sep
            ValidateInput(type="number", validate="numeric", name="kitchenSize", v-model="form.kitchenSize", placeholder="Площадь кухни", width="180px")
            .unit
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
            input(type="file", name="photo", @change="addIMG($event)", id="addImg", multiple="multiple")
            label(for="addImg")
                span.ico-add-photo
                span Прикрепить фото
</template>

<script>
  import InvalidFiled from './elements/invalid-filed'
  import ValidateInput from './elements/input'

  export default {
    name: "Flat",
    components: {
      InvalidFiled, ValidateInput
    },
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
    },
    methods: {
      addIMG(e) {
        this.form.photo = e.target.files;
      }
    }
  }
</script>
