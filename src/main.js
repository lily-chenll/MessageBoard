import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import * as utils from './utils';

import {Button, Form, Input, FormItem, DatePicker, Radio, RadioGroup, Notification} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.prototype.$notify = Notification

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
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
