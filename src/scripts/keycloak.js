import { inject } from 'vue';

export default {
  setup() {
    const keycloak = inject('keycloak');
    
    const logout = () => {
      if (keycloak) {
        keycloak.logout(); // Loggt den Benutzer aus und leitet ihn um
      } else {
        console.error('Keycloak instance not found.');
      }
    };

    return { logout };
  },
};