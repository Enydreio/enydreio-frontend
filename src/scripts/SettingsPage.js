import SidebarToggle from '@/components/SidebarToggle.vue'; // importiere die SidebarToggle

export default {
  name: 'SettingsPage',
  components: {
    SidebarToggle,
  },
  data() {
    return {
      username: '',
      email: '',
      isSidebarVisible: true, // Standardmäßig sichtbar
    };
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState; // Wechselt die Sichtbarkeit der Sidebar
    },
    updateSettings() {
      console.log(`Benutzername: ${this.username}, E-Mail: ${this.email}`);
    }
  }
};
