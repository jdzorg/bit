<template lang="pug">
    .comm-fields
        fieldset.address
            ValidateInput(name="region", validate="alpha_spaces", v-model="form.region", width="225px", placeholder="Город / Область")
            ValidateInput(validate="alpha_spaces", name="street", v-model="form.street", placeholder="Улица", width="380px")
            ValidateInput(validate="buildNum", name="build", v-model="form.build", placeholder="№ дома", width="165px")
        fieldset.params
            select(name="purpose", v-model="form.purpose", style="width:325px")
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
            ValidateInput(type="number", validate="numeric", name="floor", v-model="form.floor", placeholder="Этаж", width="180px")
            .sep
            ValidateInput(type="number", validate="numeric", name="floors", v-model="form.floors", placeholder="Этажей", width="180px")
            ValidateInput(type="number", validate="numeric", name="houseSize", v-model="form.houseSize", placeholder="Общая площадь", width="180px")
            .unit
        fieldset.price
            ValidateInput(type="number", validate="numeric", name="price", v-model="form.price", placeholder="Цена", width="225px")
            select(name="currency", v-model="form.currency",)
                option(value="uah") ГРН
                option(value="usd") USD
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
    name: "Comm",
    components: {InvalidFiled, ValidateInput},
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
    },
    methods: {
      addIMG(e) {
        this.form.photo = e.target.files;
      }
    }
  }
</script>

<style scoped>

</style>