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
  },
};
