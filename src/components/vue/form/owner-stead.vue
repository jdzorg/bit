<template lang="pug">
    .stead-fields
        fieldset.address
            ValidateInput(name="region", v-model="form.region", validate="alpha_spaces", placeholder="Город / Область", width="225px")
            ValidateInput(name="street", v-model="form.street", validate="alpha_spaces", placeholder="Улица", width="380px")
        fieldset
            select(name="purpose", v-model="form.purpose", style="width:425px")
                option(disabled value="") Целевое назначение
                option(value="Ведение товарного сельского производства") Ведение товарного сельского производства
                option(value="Жилая застройка и коммерческое использование") Жилая застройка и коммерческое использование
                option(value="Индивидуальное строительство жилого дома") Индивидуальное строительство жилого дома
                option(value="Оптовая торговля и складское использование") Оптовая торговля и складское использование
                option(value="Промышленное использование") Промышленное использование
                option(value="Рекреационное назначение") Рекреационное назначение
                option(value="Садоводство") Садоводство
                option(value="Сельское хозяйство") Сельское хозяйство
        fieldset.params
            ValidateInput(type="number", name="areaSize", validate="numeric", v-model="form.areaSize", placeholder="Площадь", width="145px")
            select(name="sizeUnit", v-model="form.sizeUnit")
                option(value="СОТ") СОТ.
                option(value="ГА") ГА.
            ValidateInput(type="number", validate="numeric", name="price", v-model="form.price", placeholder="Цена", width="145px")
            select(name="currency", v-model="form.currency")
                option(value="uah") ГРН
                option(value="usd") USD
        fieldset.description
            textarea(placeholder="Описание", v-validate="'text'", name="desc", v-model="form.desc")
            InvalidFiled(v-show="errors.has('desc')") В поле присутствуют запрещенные знаки
        fieldset.photo
            input(type="file", name="photo", @change="addIMG($event)", id="addImg", multiple="multiple", accept="image/*")
            label(for="addImg")
                span.ico-add-photo
                span Прикрепить фото
</template>

<script>
  import InvalidFiled from './elements/invalid-filed'
  import ValidateInput from './elements/input'

  export default {
    name: "Stead",
    components: {
      InvalidFiled, ValidateInput
    },
    data() {
      return {
        form: {
          region: '',
          street: '',
          purpose: '',
          areaSize: '',
          sizeUnit: 'СОТ',
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