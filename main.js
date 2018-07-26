import Vue from 'vue';
import App from './App.vue';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

new Vue({
  el: '#app',
  render: h => h(App)
});
