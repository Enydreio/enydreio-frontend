import AppDetailsModal from '@/components/AppDetailsModal.vue';
import AppEditModal from '@/components/EditAppModal.vue'; // New Modal for editing
import SidebarToggle from '@/components/SidebarToggle.vue';

export default {
  name: 'AppsPage',
  components: {
    AppDetailsModal,
    AppEditModal,  // New Modal component
    SidebarToggle,
  },
  data() {
    return {
      searchQuery: '',
      sortField: '',
      sortOrder: '↑',
      isSidebarVisible: true,
      isGridView: true,
      apps: [
        { id: 1, name: 'App A', isActive: true, lastActive: '2024-09-25 12:30', userCount: 15, resourceUsage: 45, url: "localhost:8080" },
        { id: 2, name: 'App B', isActive: false, lastActive: '2024-09-24 11:20', userCount: 5, resourceUsage: 10, url: "localhost:8081" },
        { id: 3, name: 'App C', isActive: true, lastActive: '2024-09-23 09:15', userCount: 30, resourceUsage: 65, url: "localhost:8082" },
      ],
      selectedApp: null,
      isModalVisible: false,
      isEditModalVisible: false, // State for edit modal
    };
  },
  computed: {
    filteredApps() {
      let filtered = this.apps.filter(app => {
        return app.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

      if (this.sortField) {
        filtered.sort((a, b) => {
          const modifier = this.sortOrder === '↑' ? 1 : -1;
          if (this.sortField === 'name') {
            return a.name.localeCompare(b.name) * modifier;
          } else if (this.sortField === 'lastActive') {
            return new Date(a.lastActive) - new Date(b.lastActive) * modifier;
          } else if (this.sortField === 'url') {
            return a.url.localeCompare(b.url) * modifier;
          } else if (this.sortField === 'resourceUsage') {
            return (a.resourceUsage - b.resourceUsage) * modifier;
          } else if (this.sortField === 'isActive') {
            return (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1) * modifier;
          }
          return 0;
        });
      }

      return filtered;
    },
  },
  methods: {
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
};
