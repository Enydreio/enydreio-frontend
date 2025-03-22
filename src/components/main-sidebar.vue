<template>
  <div>
    <div v-if="!isSidebarVisible" class="hamburger-icon" @click="toggleSidebar">
      &#9776; <!-- Hamburger-Symbol -->
    </div>

    <aside :class="{'sidebar': true, 'sidebar-collapsed': !isSidebarVisible}">
      <div class="close-button">
        <span @click="toggleSidebar">&times;</span> <!-- X-Symbol -->
      </div>

      <div class="profile-section">
        <img src="@/assets/avatar.svg" alt="User Avatar" class="avatar">
        <h3>{{ user.preferred_username }}</h3>
      </div>
      <nav class="nav-links"> 
        <!--<router-link to="/" class="nav-link">Landing Page</router-link>-->
        <RouterLink to="/" class="nav-link">Apps</RouterLink>
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/settings" class="nav-link">Settings</router-link>
      </nav>
    </aside>
  </div>
</template>

<script src="../scripts/Sidebar.js"></script>
<style src="../styles/Sidebar.css" scoped></style>