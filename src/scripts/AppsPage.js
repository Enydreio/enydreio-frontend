import AppDetailsModal from '@/components/AppDetailsModal.vue';
import AppEditModal from '@/components/EditAppModal.vue';
import NewAppModal from '@/components/NewAppModal.vue';
import SidebarToggle from '@/components/SidebarToggle.vue';
import axios from 'axios';
import { inject/*, ref*/ } from 'vue';

export default {
  name: 'AppsPage',
  components: {
    AppDetailsModal,
    AppEditModal,
    NewAppModal,    
    SidebarToggle,
  },
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

    return { logout, keycloak };
  },
  data() {
    return {
      initOptions: null,
      searchQuery: '',
      sortField: '',
      sortOrder: '↑',
      isSidebarVisible: true,
      isGridView: true,
      isCategoryView: false,
      apps: [], // Initially empty, to be filled with data from the API
      selectedApp: null,
      isModalVisible: false,
      isEditModalVisible: false,
      isNewAppModalVisible: false,
      isAdmin: false,
      form: {
        name: '',
        description: '',
        url: '',
        logo: '',
        category: ''
      },
      apiError: null,
      isDarkMode: this.getDarkModeFromCookie(),
      lastClickedButton: 'grid',

    };
  },
  async created() {
    console.log("Component created");
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } 
    await this.getInitOptions();
    await this.checkAdminStatus();
    console.log(this.isAdmin)
  },
  mounted() {
    try {
      this.fetchApplications();
    } catch (err) {
      console.error("Error in mounted:", err);
    }
  },
  methods: {
    getDarkModeFromCookie() {
      const name = "darkMode=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');
      
      for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length) === 'true'; // Umwandeln des Werts zu boolean
        }
      }
      return false; // Standardwert (false), wenn der Cookie nicht gefunden wird
    },
  
    async fetchApplications() {
      try {
        const backendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/list-applications`;
        const response = await axios.get(backendUrl);
        this.apps = response.data;
        console.log("applications fetched");
      } catch (error) {
        console.error("Error fetching applications:", error);
        this.apiError = "Failed to load applications.";
      }
    },

    async createApplication(newAppData) {
      try {
        const backendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/create-application`;
        const response = await axios.post(backendUrl, newAppData, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        if (response.status === 200) {
          this.apps.push(response.data);
          await this.fetchApplications();
          this.closeNewAppModal();
          console.log("App erfolgreich hinzugefügt");
        }
      } catch (error) {
        console.error("Error creating application:", error);  
        this.apiError = "Failed to create application.";
      }
    },

    async updateApps(updatedAppData) {
      try {
        const backendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/edit-application`;
        const response = await axios.put(backendUrl, updatedAppData, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        if (response.status === 200) {
          const index = this.apps.findIndex(app => app.id === updatedAppData.id);
          if (index !== -1) {
            this.apps.splice(index, 1, response.data);
          }
          this.closeEditModal();
          console.log("App erfolgreich aktualisiert");
        }
      } catch (error) {
        console.error("Error updating application:", error);
        this.apiError = "Failed to update application.";
      }
    },

    async deleteApp(appId) {
      if (!confirm("Are you sure you want to delete this app?")) {
        return; 
      }
      
      console.log(appId);
      try {
        const backendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/delete-application?id=${appId}`;
        const response = await axios.delete(backendUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          // Die App nach erfolgreichem Löschen aus der Liste entfernen
          this.apps = this.apps.filter(app => app.id !== appId);
          console.log("App erfolgreich gelöscht");
        }
      } catch (error) {
        console.error("Error deleting application:", error);
        this.apiError = "Failed to delete application.";
      }
      await this.fetchApplications();
    },

    async getInitOptions() {
      const response = await axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/keycloak-init-options`);
      this.initOptions = response.data;
      return this.initOptions;
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

    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState;
    },

    viewDetails(app) {
      this.selectedApp = app;
      this.isModalVisible = true;
    },

    closeModal() {
      this.selectedApp = null;
      this.isModalVisible = false;
    },

    openEditModal(app) {
      this.selectedApp = app;
      this.isEditModalVisible = true;
    },

    closeEditModal() {
      this.selectedApp = null;
      this.isEditModalVisible = false;
    },
    
    openNewAppModal() {
      this.isNewAppModalVisible = true;
    },

    closeNewAppModal() {
      this.isNewAppModalVisible = false;
    },

    sortBy(field) {
      this.sortField = this.sortField === field ? '' : field;
      this.sortOrder = this.sortField ? (this.sortOrder === '↑' ? '↓' : '↑') : '↑';
    },

    setView(isGrid) {
      this.isGridView = isGrid;
    },

    setLastClicked(button) {
      this.lastClickedButton = button;
    },

    toggleCategorySort() {
      this.isCategoryView = !this.isCategoryView;
    }
  },
  computed: {
    filteredApps() {
      let filtered = (Array.isArray(this.apps) ? this.apps : []).filter(app => {
        if(app.name) {
          return app.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
      });

      if (this.sortField) {
        filtered.sort((a, b) => {
          const modifier = this.sortOrder === '↑' ? 1 : -1;
          if (this.sortField === 'name') {
            return a.name.localeCompare(b.name) * modifier;
          } else if (this.sortField === 'description') {
            return a.description.localeCompare(b.description) * modifier;
          } else if (this.sortField === 'url') {
            return a.url.localeCompare(b.url) * modifier;
          }
          return 0;
        });
      }

      return filtered;
    },
    sortedGroupedApps() {
      const grouped = this.filteredApps.reduce((acc, app) => {
        (acc[app.category] = acc[app.category] || []).push(app);
        return acc;
      }, {});
      return Object.keys(grouped)
        .sort()
        .reduce((acc, key) => {
          acc[key] = grouped[key];
          return acc;
        },
         {}
      );
    }
  },
};