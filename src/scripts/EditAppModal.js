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
    methods: {
      close() {
        this.$emit('close');
      },
      saveChanges() {
        this.$emit('save', this.app);
        this.close();
      },
    },
  };
  