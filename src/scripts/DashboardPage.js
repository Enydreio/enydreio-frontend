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
      isSidebarVisible: true, // Zustand der Sidebar
      isDarkMode: this.getDarkModeFromCookie(),
    };
  },
  async created() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } 
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState; // Sidebar Sichtbarkeit aktualisieren
    },

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
  }
};
