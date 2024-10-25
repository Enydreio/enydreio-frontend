import AppDetailsModal from '@/components/AppDetailsModal.vue';
import AppEditModal from '@/components/EditAppModal.vue';
import SidebarToggle from '@/components/SidebarToggle.vue';
import axios from 'axios';

export default {
  name: 'AppsPage',
  components: {
    AppDetailsModal,
    AppEditModal,
    SidebarToggle,
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
      showAddForm: false, // State for showing the add application form
      form: { // Data for the add application form
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
        const response = await axios.get('http://localhost:8080/api/list-applications');
        this.apps = response.data;
      } catch (error) {
        console.error("Error fetching applications:", error);
        this.apiError = "Failed to load applications.";
      }
    },
    async createApplication() {
      try {
        const response = await axios.post(
          'http://localhost:8080/api/create-application', 
          this.form, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',  
            }
          }
        );
        if (response.status === 200) {
          this.apps.push(response.data); // Die neue App zur Liste hinzufügen
          this.showAddForm = false;
          this.resetForm();
        }
      } catch (error) {
        console.error("Error creating application:", error);
        this.apiError = "Failed to create application.";
      }
    },
    resetForm() {
      this.form = {
        name: '',
        description: '',
        url: '',
        logo: ''
      };
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
        return app.name.toLowerCase().includes(this.searchQuery.toLowerCase());
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