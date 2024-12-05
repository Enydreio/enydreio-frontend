import { inject } from 'vue';

export default {
  setup() {
    // Zugriff auf die Keycloak-Instanz
    const keycloak = inject('keycloak');

    // Logout-Funktion
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