import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Keycloak from 'keycloak-js';
import axios from 'axios';

let initOptions = await axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/keycloak-init-options`)

let keycloak = new Keycloak(await initOptions);

keycloak.init({ onLoad: await initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log('Authenticated');
    const app = createApp(App);
    app.provide('keycloak', keycloak);
    app.use(router);
    app.mount('#app');
  }

  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed: ' + refreshed);
      } else {
        console.log(
          'Token not refreshed, valid for ' +
            Math.round(
              keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000
            ) +
            ' seconds'
        );
      }
    }).catch(() => {
      console.log('Failed to refresh token');
    });
  }, 6000);
}).catch((error) => {
  console.log(error, 'Authentication Failed');
});
