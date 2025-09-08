import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';

import App from './App.vue'

import 'primeicons/primeicons.css';
import '@/assets/style.css';

import router from './router'

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(ToastService);
app.directive('ripple', Ripple);
app.mount('#app')
