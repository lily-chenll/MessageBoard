import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import * as utils from './utils';
import store from './store/index';

import {Button, Form, Input, FormItem, DatePicker, Radio, RadioGroup, Loading, Notification} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Button, { locale });
Vue.use(Form, { locale });
Vue.use(Input), { locale };
Vue.use(FormItem, { locale });
Vue.use(DatePicker, { locale });
Vue.use(Radio, { locale });
Vue.use(RadioGroup, { locale });
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h('router-view')
});

Object.defineProperties(Vue.prototype, {
  utils: {
    get () {
      return utils;
    },
  },
});
