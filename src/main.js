import Vue from 'vue';
import { vsCollapse, vsIcon } from 'vuesax';
import 'reset-css';
import 'vuesax/dist/vuesax.css';

import App from './App.vue';
import http from './services/http';
import './theme/main.scss';



Vue.use(vsCollapse);
Vue.use(vsIcon);


Vue.config.productionTip = false;
Vue.use(http);


new Vue({
  render: h => h(App),
}).$mount('#app');
