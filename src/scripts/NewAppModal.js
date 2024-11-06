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
        },
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
        };
      },
    },
  };
  