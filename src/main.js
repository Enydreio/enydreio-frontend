import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Keycloak from 'keycloak-js';
import axios from 'axios';

let initOptions = null;
let keycloak = null;

(async () => {
  try {
    const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/keycloak-init-options`);
    initOptions = response.data;
    keycloak = new Keycloak(initOptions);
    keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
      if (!auth) {
        window.location.reload();
      } else {
        console.log(initOptions);
        console.log('Authenticated');
        const app = createApp(App);
        app.provide('keycloak', keycloak);
        app.use(router);
        app.mount('#app');
      }

      setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
          if (refreshed) {
            //console.log('Token refreshed: ' + refreshed);
          } else {
            /*console.log(
                'Token not refreshed, valid for ' +
                Math.round(
                    keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000
                ) +
                ' seconds'
            );*/
          }
        }).catch(() => {
          console.log('Failed to refresh token');
        });
      }, 6000);
    }).catch((error) => {
      console.log(error, 'Authentication Failed');
    });
  } catch (error) {
    console.log('Failed to load Keycloak init options', error);
  }
})();