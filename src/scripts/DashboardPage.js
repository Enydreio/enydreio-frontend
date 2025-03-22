import SidebarToggle from '../components/SidebarToggle.vue';
import { inject } from 'vue';

export default {
  name: 'DashboardPage',
  components: { SidebarToggle },
  setup() {
      const keycloak = inject('keycloak');
  
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
      activeAppsCount: 5,
      inactiveAppsCount: 2,
      totalUsers: 100,
      resourceUsage: 75,
      resourceUsageData: [20, 40, 60, 80, 100],
      costData: [100, 200, 300, 400, 500],
      recentActivities: [
        { id: 1, description: 'User John Doe accessed App A', timestamp: '2024-09-25 12:30' },
        { id: 2, description: 'App B encountered an error', timestamp: '2024-09-25 12:25' },
        { id: 3, description: 'User Jane Doe updated App C', timestamp: '2024-09-25 12:20' },
      ],
      isSidebarVisible: true, // Zustand der Sidebar
    };
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState; // Sidebar Sichtbarkeit aktualisieren
    }
  }
};
