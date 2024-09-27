export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Placeholder for actual login logic
      if (this.email && this.password) {
        this.$router.push('/dashboard');
      }
    }
  }
};
