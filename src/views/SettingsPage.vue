<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
      <main class="main-content">
        <h2>Benutzereinstellungen</h2>
        <form @submit.prevent="updateSettings" class="settings-form">
          <div class="form-group">
            <label for="username">Benutzername</label>
            <input type="text" id="username" v-model="username" required class="form-input">
          </div>
          <div class="form-group">
            <label for="email">E-Mail</label>
            <input type="email" id="email" v-model="email" required class="form-input">
          </div>
          <button type="submit" class="btn">Änderungen speichern</button>
        </form>
      </main>
    </SidebarToggle>
  </div>
</template>

<script src="../scripts/SettingsPage.js"></script>
<style scoped>
@import '../styles/SettingsPage.css';
@import '../styles/App.css';
@import '../styles/SidebarToggle.css'; /* Importiere SidebarToggle CSS */
</style>
