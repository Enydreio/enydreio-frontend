export default {
    name: 'NewAppModal',
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        form: {
          name: '',
          description: '',
          url: '',
          logo: '',
          category: '',
        },
        isDarkMode: this.getDarkModeFromCookie(),
      };
    },
    methods: {
      close() {
        this.resetForm();
        this.$emit('close');
      },
      saveNewApp() {
        this.$emit('create', { ...this.form });
        this.close();
      },
      resetForm() {
        this.form = {
          name: '',
          description: '',
          url: '',
          logo: '',
          category: '',
        };
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
  