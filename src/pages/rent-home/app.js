import Vue from 'vue'
import App from './app.vue'
import '../../assets/css/rent.sass'
import '../../assets/css/element-ui.css'

import Form from '../../../node_modules/element-ui/packages/form'
import FormItem from '../../../node_modules/element-ui/packages/form-item'

Vue.component(Form.name, Form)
Vue.use(FormItem.name, FormItem)

new Vue({
  el: '#appRent',
  render: h => h(App)
})
