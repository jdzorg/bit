<template lang="pug">
    section.filter
        el-form(
          ref="form",
          :model="form",
          labelWidth="100%"
        )
        el-radio-group(v-model="radio2")
            el-radio(:label="3") Option A
            el-radio(:label="6") Option B
            el-radio(:label="9") Option C




        <!--form-->
            <!--fieldset-->
                <!--.group-attr-->
                    <!--span Комнаты:-->
                    <!--label-->
                        <!--| 1-->
                        <!--input(type="radio" name="room" value="1")-->
                    <!--label-->
                        <!--| 2-->
                        <!--input(type="radio" name="room" value="2")-->
                    <!--label-->
                        <!--| 3-->
                        <!--input(type="radio" name="room" value="3")-->
                    <!--label-->
                        <!--| 5-->
                        <!--input(type="radio" name="room" value="4")-->
                    <!--label-->
                        <!--| 5+-->
                        <!--input(type="radio" name="room" value="5+")-->
                <!--.group-attr-->
                    <!--input(type="number" name="price_from" placeholder="Цена от")-->
                    <!--span - -->
                    <!--input(type="number" name="price_to" placeholder="Цена до")-->
                <!--.group-attr-->
                    <!--label-->
                        <!--| грн-->
                        <!--input(type="radio" name="currency" value="uah")-->
                    <!--label-->
                        <!--| usd-->
                        <!--input(type="radio" name="currency" value="usd")-->
                <!--.group-attr-->
                    <!--input(type="number" name="area_from" placeholder="Площадь от")-->
                    <!--span - -->
                    <!--input(type="number" name="area_to" placeholder="Площадь до")-->
                    <!--span км.м-->
            <!--fieldset-->
                <!--.group-attr-->
                    <!--span Область:-->
                    <!--label-->
                        <!--| Киев-->
                        <!--input(type="radio" name="region" value="Киев")-->
                    <!--label-->
                        <!--| Киевская область-->
                        <!--input(type="radio" name="region" value="Киевская область")-->
            <!--fieldset-->
                <!--.group-attr-->
                    <!--select-->
                        <!--option()-->
                        <!--option()-->
                        <!--option()-->


</template>
<style lang="sass"></style>
<script>
  import ElForm from "root/element-ui/packages/form/src/form.vue";

  export default {components: {ElForm}}
</script>