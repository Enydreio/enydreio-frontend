import SidebarToggle from '@/components/SidebarToggle.vue';
import keycloak from '@/keycloak'; // Stelle sicher, dass Keycloak richtig importiert ist

export default {
  name: 'SettingsPage',
  components: {
    SidebarToggle,
  },
  data() {
    return {
      username: '',
      isSidebarVisible: true,
    };
  },
  async mounted() {
    if (keycloak.authenticated) {
      const profile = await keycloak.loadUserProfile();
      this.username = profile.username || '';
    }
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState;
    },
    async updateSettings() {
      try {
        const response = await fetch(`${keycloak.authServerUrl}/realms/${keycloak.realm}/account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${keycloak.token}`,
          },
          body: JSON.stringify({
            username: this.username
          }),
        });

        if (!response.ok) {
          throw new Error('Fehler beim Aktualisieren des Profils');
        }
        alert('Profil erfolgreich aktualisiert!');
      } catch (error) {
        console.error(error);
        alert('Update fehlgeschlagen.');
      }
    },
  },
};
