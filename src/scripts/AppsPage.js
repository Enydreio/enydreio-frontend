// scripts/AppsPage.js
import Sidebar from '../components/main-sidebar.vue';
import AppDetailsModal from '../components/AppDetailsModal.vue'; // Import your modal component

export default {
  name: 'AppsPage',
  components: { Sidebar, AppDetailsModal },
  data() {
    return {
      searchQuery: '',
      sortField: '',
      sortOrder: '↑', // Default sorting order
      apps: [
        { id: 1, name: 'App A', isActive: true, lastActive: '2024-09-25 12:30', userCount: 15, resourceUsage: 45 },
        { id: 2, name: 'App B', isActive: false, lastActive: '2024-09-24 11:20', userCount: 5, resourceUsage: 10 },
        { id: 3, name: 'App C', isActive: true, lastActive: '2024-09-23 09:15', userCount: 30, resourceUsage: 65 },
        // Add more apps as needed
      ],
      selectedApp: null,
      isModalVisible: false,
    };
  },
  computed: {
    filteredApps() {
      // Filter apps based on the search query
      let filtered = this.apps.filter(app => {
        return app.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

      // Sort filtered apps
      if (this.sortField) {
        filtered.sort((a, b) => {
          const modifier = this.sortOrder === '↑' ? 1 : -1;
          if (this.sortField === 'name') {
            return a.name.localeCompare(b.name) * modifier;
          } else if (this.sortField === 'lastActive') {
            return new Date(a.lastActive) - new Date(b.lastActive) * modifier;
          } else if (this.sortField === 'userCount') {
            return (a.userCount - b.userCount) * modifier;
          } else if (this.sortField === 'resourceUsage') {
            return (a.resourceUsage - b.resourceUsage) * modifier;
          } else if (this.sortField === 'isActive') {
            return (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1) * modifier; // Active first
          }
          return 0;
        });
      }

      return filtered;
    },
  },
  methods: {
    viewDetails(app) {
      this.selectedApp = app;
      this.isModalVisible = true;
    },
    closeModal() {
      this.selectedApp = null;
      this.isModalVisible = false;
    },
    editApp(appId) {
      console.log('Edit app ID:', appId);
    },
    sortBy(field) {
      // Toggle sorting order if already sorted by the same field
      this.sortField = this.sortField === field ? '' : field;
      this.sortOrder = this.sortField ? (this.sortOrder === '↑' ? '↓' : '↑') : '↑';
    },
  },
};
