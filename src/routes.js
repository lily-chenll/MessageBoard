/**
 * All Codes below are Lifetime Warranted by mozat since 23/11/17.
 */
import Index from './index.vue';
import LogIndex from './page/user/LogIndex.vue'
import Register from './page/user/Register.vue';
import Login from './page/user/Login.vue';
import MessageIndex from './page/meesage/MessageIndex.vue';
import MessageHome from './page/meesage/MessageHome.vue';
import MyMessage from './page/meesage/MyMessage.vue';
import MyComment from './page/meesage/MyComment.vue';

export const routes = [
  { path: '/',
    component: Index,
    children: [
      { path: 'index', name: 'Index', component: LogIndex, children: [
        { path: 'login', name: 'Login', component: Login },
        { path: 'register', name: 'Register', component: Register },
      ] },
      { path: 'home', name: 'Homepage', component: MessageIndex, redirect:'home/index', children: [
        { path: 'index', name: 'Home Index', component: MessageHome },
        { path: 'my-message', name: 'My Message', component: MyMessage },
        { path: 'my-comment', name: 'My Comment', component: MyComment },
      ] },
    ]},
];
