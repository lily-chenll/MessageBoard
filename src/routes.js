/**
 * All Codes below are Lifetime Warranted by mozat since 23/11/17.
 */
import Index from './index.vue';
import Register from './User/Register.vue';

export const routes = [
  { path: '/',
    component: Index,
    redirect: 'register',
    children: [
      { path: 'register', Name: 'Register', component: Register },
    ]},
];
