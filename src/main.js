import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import * as utils from './utils';
import store from './store/index';
import RegisterFilter from './filter';

import 'font-awesome/css/font-awesome.min.css';

import {Button, Form, Input, FormItem, DatePicker, Radio, RadioGroup,
  Loading, Notification, Row, Col, Card, Pagination, Badge, Dialog, Tabs, TabPane} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

// configure language
locale.use(lang)

RegisterFilter(Vue);

Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Pagination);
Vue.use(Badge);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
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
