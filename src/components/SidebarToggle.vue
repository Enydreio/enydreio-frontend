<template>
    <div :class="['sidebar-toggle', { 'sidebar-collapsed': !isSidebarVisible }]">
      <Sidebar @toggle="toggleSidebar" :isVisible="isSidebarVisible" />
      <main :class="['main-content-inner-box', { 'sidebar-collapsed': !isSidebarVisible }]">
        <slot></slot>
      </main>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/main-sidebar.vue';
  import '../styles/SidebarToggle.css';
  
  export default {
    name: 'SidebarToggle',
    components: { Sidebar },
    data() {
      return {
        isSidebarVisible: true,
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible;
        this.$emit('toggle', this.isSidebarVisible);
      },
    },
  };
  </script>
  