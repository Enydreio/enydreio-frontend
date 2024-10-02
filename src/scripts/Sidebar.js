export default {
  data() {
    return {
      isSidebarVisible: true, // Zustand der Sidebar (sichtbar oder nicht)
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Toggle zwischen sichtbar und unsichtbar
      this.$emit('toggle', this.isSidebarVisible); // Event an die Elternkomponente weitergeben
    },
  },
};
