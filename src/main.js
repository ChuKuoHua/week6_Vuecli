import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// 元件，全域註冊
// Loading
Vue.component('Loading',Loading);

//bootstrap
Vue.use(BootstrapVue);

// fontawesome
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSweetalert2);

// css 樣式
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/scss/all.scss';

// axios
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
