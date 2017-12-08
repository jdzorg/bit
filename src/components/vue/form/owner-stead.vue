<template lang="pug">
    .stead-fields
        fieldset.address
            input(type="text" name="form.region" placeholder="Город / Область" style="width:225px")
            input(type="text" name="form.street" placeholder="Улица" style="width:380px")
        fieldset
            select(name="form.purpose")
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
            input(type="text" name="form.areaSize" placeholder="Площадь" style="width:145px")
            select(name="form.sizeUnit")
                option(value="СОТ.") СОТ.
                option(value="ГА.") ГА.
            input(type="number" name="form.price" placeholder="Цена" style="width:145px")
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
    name: "Stead",
    data() {
      return {
        form: {
          region: '',
          street: '',
          purpose: '',
          areaSize: '',
          sizeUnit: '',
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