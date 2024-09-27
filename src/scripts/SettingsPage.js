import Sidebar from '@/components/main-sidebar.vue'; // importiere die Sidebar

export default {
  name: 'SettingsPage',
  components: {
    Sidebar,
  },
  data() {
    return {
      username: '',
      email: ''
    };
  },
  methods: {
    updateSettings() {
      console.log(`Benutzername: ${this.username}, E-Mail: ${this.email}`);
    }
  }
};
