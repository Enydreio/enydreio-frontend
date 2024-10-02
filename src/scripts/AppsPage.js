import AppDetailsModal from '@/components/AppDetailsModal.vue';
import SidebarToggle from '@/components/SidebarToggle.vue';

export default {
  name: 'AppsPage',
  components: {
    AppDetailsModal,
    SidebarToggle,
  },
  data() {
    return {
      searchQuery: '',
      sortField: '',
      sortOrder: '↑', // Default sorting order
      isSidebarVisible: true, // Zustand der Sidebar
      isGridView: false, // Zustand der Ansicht (Detailansicht oder Kachelansicht)
      apps: [
        { id: 1, name: 'App A', isActive: true, lastActive: '2024-09-25 12:30', userCount: 15, resourceUsage: 45 },
        { id: 2, name: 'App B', isActive: false, lastActive: '2024-09-24 11:20', userCount: 5, resourceUsage: 10 },
        { id: 3, name: 'App C', isActive: true, lastActive: '2024-09-23 09:15', userCount: 30, resourceUsage: 65 },
        // Weitere Apps hier hinzufügen
      ],
      selectedApp: null,
      isModalVisible: false,
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
          } else if (this.sortField === 'userCount') {
            return (a.userCount - b.userCount) * modifier;
          } else if (this.sortField === 'resourceUsage') {
            return (a.resourceUsage - b.resourceUsage) * modifier;
          } else if (this.sortField === 'isActive') {
            return (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1) * modifier; // Aktive zuerst
          }
          return 0;
        });
      }

      return filtered;
    },
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState; // Wechselt die Sichtbarkeit der Sidebar
    },
    viewDetails(app) {
      this.selectedApp = app;
      this.isModalVisible = true;
    },
    closeModal() {
      this.selectedApp = null;
      this.isModalVisible = false;
    },
    sortBy(field) {
      this.sortField = this.sortField === field ? '' : field;
      this.sortOrder = this.sortField ? (this.sortOrder === '↑' ? '↓' : '↑') : '↑';
    },
    toggleView() {
      this.isGridView = !this.isGridView; // Wechselt die Ansicht zwischen Grid und Detail
    },
  },
};
