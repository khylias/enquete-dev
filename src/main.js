import Vue from 'vue';
import App from './App.vue';

import 'reset-css';
import './theme/main.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
