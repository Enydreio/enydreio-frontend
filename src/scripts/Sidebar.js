import axios from 'axios';
import { inject } from 'vue';

export default {  
  setup() {
    const keycloak = inject('keycloak');
    return { keycloak };
  },
  data() {
    return {
      isSidebarVisible: true, // Zustand der Sidebar (sichtbar oder nicht)
      user: '',
    };
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Toggle zwischen sichtbar und unsichtbar
      this.$emit('toggle', this.isSidebarVisible); // Event an die Elternkomponente weitergeben
    },

    async fetchUser() {
      try {
        const token = this.keycloak.token;
        const response = await axios.get('http://localhost:8085/realms/test/protocol/openid-connect/userinfo', {
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
