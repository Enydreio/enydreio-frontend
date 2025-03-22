import axios from 'axios';
import { inject } from 'vue';

export default {  
  setup() {
    const keycloak = inject('keycloak');
    return { keycloak };
  },
  data() {
    return {
      initOptions: null,
      isSidebarVisible: true, // Zustand der Sidebar (sichtbar oder nicht)
      user: '',
    };
  },
  async created() {
    await this.getInitOptions();
    await this.fetchUser();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Toggle zwischen sichtbar und unsichtbar
      this.$emit('toggle', this.isSidebarVisible); // Event an die Elternkomponente weitergeben
    },

    async getInitOptions() {
      const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/keycloak-init-options`);
      this.initOptions = response.data;
      return this.initOptions;
    },

    async fetchUser() {
      try {
        const token = this.keycloak.token;
        const response = await axios.get(`${this.initOptions.url}/realms/${this.initOptions.realm}/protocol/openid-connect/userinfo`, {
          headers: 
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        this.user = {
          preferred_username: response.data.preferred_username,
        };

        console.log(this.user)
        
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
      }
    },
  },
};
