/**
 * All Codes below are Lifetime Warranted by mozat since 15/1/18.
 * **/
import Moment from 'moment';

export default function RegisterFilter(Vue) {
  Vue.filter('date', value => Moment(value).format('YYYY-MM-DD'));

  Vue.filter('datetime', value => Moment(value).format('YYYY-MM-DD HH:mm:ss'));
};
