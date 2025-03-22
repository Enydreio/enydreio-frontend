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
      initOptions: null,
      isSidebarVisible: true,
      isAdmin: false,
      users: [],
      filtered: '',
      searchQuery: '',
    };
  },
  async created() {
    await this.getInitOptions();
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
        const response = await axios.get(`${this.initOptions.url}/realms/${this.initOptions.realm}/protocol/openid-connect/userinfo`, {
          headers: 
          {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.resource_access[this.initOptions.clientId].roles.includes("admin")) {
          this.isAdmin = true;
        }
      } catch (error) {
        console.error('Fehler beim Abrufen des Admin-Status:', error);
      }
    },

    async getInitOptions() {
      const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/keycloak-init-options`);
      this.initOptions = response.data;
      return this.initOptions;
    },

    async fetchUsers() {
      try {
        const token = this.keycloak.token;
        const response = await axios.get(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/users`, {
          headers: 
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        this.users = await Promise.all(
          response.data.map(async user => {
            const roles = await this.getUserRoles(user.id); // Assuming this returns an array of roles
            console.log(roles[0].name)
            return {
              id: user.id,
              username: user.username,
              firstname: user.firstName,
              lastname: user.lastName,
              email: user.email,
              role: roles.length > 0 ? roles[0].name : 'No Role' // Adjust based on the expected role structure
            };
          })
        );
        
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
      }
    },

    async getClients() {
      try {
        const token = this.keycloak.token;
        const response = await axios.get(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/clients`, {
          headers: 
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzer:', error);
      }
    },

    getClientId(clients, clientId) {
      for(const client of clients) {
        if(client.clientId === clientId) {
          return client.id
        }
      }
      return null
    },

    async getRoleId(clientId) {
      try {
        const token = this.keycloak.token;
        const response = await axios.get(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/clients/${clientId}/roles`, {
          headers: 
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der Rollen:', error);
      }
    },

    async getUserRoles(userId) {
      const token = this.keycloak.token;
      const clients = await this.getClients()
      const clientId = this.getClientId(await clients, this.initOptions.clientId)

      const response = await axios.get(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/users/${userId}/role-mappings/clients/${clientId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

      const roleMappings = await response.data;
      console.log(roleMappings)
      return roleMappings;
    },

    async getAvailableUserRoles(userId) {
      const token = this.keycloak.token;
      const clients = await this.getClients()
      const clientId = this.getClientId(await clients, this.initOptions.clientId)

      const response = await axios.get(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/users/${userId}/role-mappings/clients/${clientId}/available`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

      const roleMappings = await response.data;
      return roleMappings;
    },

    async updateUserRole(user) {
      const token = this.keycloak.token;
      const availableRoles = await this.getAvailableUserRoles(user.id);
      const roles = await this.getUserRoles(user.id);
      const clients = await this.getClients()
      const clientId = this.getClientId(await clients, this.initOptions.clientId)
      console.log(roles)
      console.log(roles[0].id)
      console.log(roles[0].name)

      try {
        await axios.delete(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/users/${user.id}/role-mappings/clients/${clientId}`,
          {
            headers: 
            {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            data: 
            [  
              { 
                id: roles[0].id,
                name: roles[0].name
              }
            ]
          }
        );
        console.log("Role removed successfully!");

        await axios.post(`${this.initOptions.url}/admin/realms/${this.initOptions.realm}/users/${user.id}/role-mappings/clients/${clientId}`,
          [{ 
            id: availableRoles[0].id,
            name: availableRoles[0].name
          }],
          { 
            headers: 
            {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        });
      
        alert('Rolle erfolgreich geändert');
      } catch (error) {
        console.error('Fehler beim Ändern der Rolle:', error);
      }
    },
    openLink(url) {
      window.open(url, '_blank'); // Öffnet den Link in einem neuen Tab
    },
  },
  computed: {
    filteredUsers() {
      let filtered = (Array.isArray(this.users) ? this.users : []).filter(user => {
        if (user.username) {
          return user.username.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
      });
      return filtered.sort((a, b) => a.username.localeCompare(b.username));
    }
  }  
};
