import SidebarToggle from '@/components/SidebarToggle.vue';
import { inject } from 'vue';

export default {
  name: 'LandingPage',
  components: {
    SidebarToggle,
  },
  setup() {
      // Zugriff auf die Keycloak-Instanz
      const keycloak = inject('keycloak');
      //const checked = ref(false)
  
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
      isSidebarVisible: true,
      features: [
        { title: "Zwei Ansichtsmodi", description: "Wähle zwischen List-View und Tile-View für eine optimale Übersicht." },
        { title: "Intelligente Kategorisierung", description: "Sortiere deine Apps nach Kategorien und behalte den Überblick." },
        { title: "Manuelle Verwaltung", description: "Neue Apps hinzufügen, bestehende bearbeiten oder löschen – volle Kontrolle!" },
        { title: "App-Steuerung", description: "Starte deine Anwendungen direkt über die Plattform." },
        { title: "Dashboard für Ressourcennutzung", description: "Überwache die Cloud-Auslastung in Echtzeit." },
        { title: "Admin-Management", description: "Verwalte User und deren Rollen einfach und effizient." },
      ],
    };
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState;
    },
  }
};