export default {
  name: 'EditAppModal',
  props: {
    app: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: { ...this.app }, // Kopiere die App-Daten in form
      isDarkMode: this.getDarkModeFromCookie(),
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    saveChanges() {
      this.$emit('update-app', this.form);
      this.close();
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
  },
};
