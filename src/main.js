import Vue from 'vue';
import VueRouter from 'vue-router';
import 'reset-css';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

import App from './App.vue';
import http from './services/http';
import router from './router';
import './theme/main.scss';

import { vsCollapse, vsIcon } from 'vuesax';
Vue.use(vsCollapse);
Vue.use(vsIcon);

Vue.config.productionTip = false;
Vue.use(http);
Vue.use(VueRouter);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
