import AppDetailsModal from '@/components/AppDetailsModal.vue';
import AppEditModal from '@/components/EditAppModal.vue';
import NewAppModal from '@/components/NewAppModal.vue';
import SidebarToggle from '@/components/SidebarToggle.vue';
import axios from 'axios';
import { inject } from 'vue';

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

    return { logout };
  },
  data() {
    return {
      searchQuery: '',
      sortField: '',
      sortOrder: '↑',
      isSidebarVisible: true,
      isGridView: true,
      apps: [], // Initially empty, to be filled with data from the API
      selectedApp: null,
      isModalVisible: false,
      isEditModalVisible: false,
      isNewAppModalVisible: false,
      form: {
        name: '',
        description: '',
        url: '',
        logo: ''
      },
      apiError: null
    };
  },
  mounted() {
    this.fetchApplications();
  },
  methods: {
    async fetchApplications() {
      try {
        const backendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/list-applications`;
        const response = await axios.get(backendUrl);
        this.apps = response.data;
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

    toggleView() {
      this.isGridView = !this.isGridView;
    },
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
  },
};