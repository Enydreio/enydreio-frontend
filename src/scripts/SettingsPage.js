import SidebarToggle from '@/components/SidebarToggle.vue';

export default {
  name: 'SettingsPage',
  components: {
    SidebarToggle,
  },
  data() {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      isSidebarVisible: true, // Standardmäßig sichtbar
    };
  },
  mounted() {
    this.loadKeycloakAttributes();
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState;
    },
    loadKeycloakAttributes() {
      if (window.keycloak && window.keycloak.tokenParsed) {
        this.username  = window.keycloak.tokenParsed.preferred_username || '';
        this.email     = window.keycloak.tokenParsed.email || '';
        this.firstName = window.keycloak.tokenParsed.given_name || '';
        this.lastName  = window.keycloak.tokenParsed.family_name || '';
      }
    },  
    updateSettings() {
      console.log(`Benutzername: ${this.username}, E-Mail: ${this.email}, Vorname: ${this.firstName}, Nachname: ${this.lastName}`);
      // Hier die Logik implementieren, um die aktualisierten Daten an Keycloak zu übermitteln.
    }
  }
};
