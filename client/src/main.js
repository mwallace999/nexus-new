import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import socket from './lib/socket';
import vuetify from './lib/vuetify'

const app = createApp(App);

app.use(store);

app.use(vuetify);

app.config.globalProperties.$socket = socket;

app.mount('#app');
