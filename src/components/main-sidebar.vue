<template>
  <aside class="sidebar">
    <div class="profile-section">
      <img src="@/assets/avatar.svg" alt="User Avatar" class="avatar">
      <h3>John Doe</h3> <!-- Benutzername -->
    </div>
    <nav class="nav-links">
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link> <!-- Link zum Dashboard -->
      <router-link to="/apps" class="nav-link">Apps</router-link> <!-- Link zu den Apps -->
      <router-link to="/settings" class="nav-link">Settings</router-link> <!-- Link zu den Einstellungen -->
    </nav>
  </aside>
</template>

<script src="../scripts/Sidebar.js"></script>
<style src="../styles/Sidebar.css" scoped></style>
