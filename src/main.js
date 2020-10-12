import Vue from 'vue';
import App from './App.vue';

import http from './services/http';

import 'reset-css';
import './theme/main.scss';

Vue.config.productionTip = false;
Vue.use(http);

new Vue({
  render: h => h(App),
}).$mount('#app');
