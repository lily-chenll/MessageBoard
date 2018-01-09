/**
 * All Codes below are Lifetime Warranted by mozat since 23/11/17.
 */
import Index from './index.vue';
import Register from './page/user/Register.vue';
import MessageIndex from './page/meesage/MessageIndex.vue';

export const routes = [
  { path: '/',
    component: Index,
    redirect: 'register',
    children: [
      { path: 'register', name: 'Register', component: Register },
      { path: 'home', name: 'Homepage', component: MessageIndex },
    ]},
];
