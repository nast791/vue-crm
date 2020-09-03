import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from "./filters/date";
import currencyFilter from "./filters/currency";
import localizeFilter from "./filters/localize";
import curFixed from "./filters/curFixed";
import Loader from "./components/app/Loader";
import tooltip from "./directives/tooltip";
import messagePlugin from './utils/message.plugin';
import titlePlugin from './utils/title';
import Paginate from 'vuejs-paginate';
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('curFixed', curFixed);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltip);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyBZG2mL--IcghxyAsI1mSZhnARd_90NNsg",
  authDomain: "vue-crm-d2937.firebaseapp.com",
  databaseURL: "https://vue-crm-d2937.firebaseio.com",
  projectId: "vue-crm-d2937",
  storageBucket: "vue-crm-d2937.appspot.com",
  messagingSenderId: "718664178278",
  appId: "1:718664178278:web:b7edb704de28bac289aba7"
});

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
