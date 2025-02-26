import SidebarToggle from '@/components/SidebarToggle.vue';
import axios from 'axios';
import { inject } from 'vue';

export default {
  name: 'SettingsPage',
  components: {
    SidebarToggle,
  },
  setup() {
    const keycloak = inject('keycloak');
    return { keycloak };
  },
  data() {
    return {
      isSidebarVisible: true,
      isAdmin: false,
      users: [],
    };
  },
  async created() {
    await this.checkAdminStatus();
    if (this.isAdmin) {
      await this.fetchUsers();
    }
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState;
    },
    async checkAdminStatus() {
      try {
        if (!this.keycloak || !this.keycloak.authenticated) {
          console.error('Benutzer nicht authentifiziert');
          return;
        }
        const token = this.keycloak.token;
        const response = await axios.get('http://localhost:8085/realms/test/protocol/openid-connect/userinfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.resource_access["vue-app"].roles.includes("admin")) {
          this.isAdmin = true;
        }
      } catch (error) {
        console.error('Fehler beim Abrufen des Admin-Status:', error);
      }
    },

    async fetchUsers() {
      try {
        const token = this.keycloak.token;
        const response = await axios.get('http://localhost:8085/admin/realms/test/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        this.users = response.data.map(user => {
          //this.getUserRoles(user.id);
        
          return {
            id: user.id,
            username: user.username
          };
        });
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
      }
    },
    async getUserRoles(userId) {
      const token = this.keycloak.token;
      const response = await axios.get(`http://localhost:8085/admin/realms/test/clients/${userId}/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      //const clientRoles = this.keycloak.tokenParsed.resource_access?.[this.keycloak.clientId]?.roles || [];
      console.log(response)

      if (response.ok) {
        const roles = await response.json(); // Parse the response to get the roles
        return roles;
      } else {
        throw new Error(`Failed to fetch roles for user ${userId}: ${response.statusText}`);
      }
    },

    async updateUserRole(user) {
      try {
        await axios.put(`http://localhost:8085/auth/admin/realms/test/users/${user.id}/role`, { role: user.role });
        alert('Rolle erfolgreich geändert');
      } catch (error) {
        console.error('Fehler beim Ändern der Rolle:', error);
      }
    },
  }
};
