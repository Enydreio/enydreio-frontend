<template>
    <div class="settings-container">
      <Sidebar />
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
    </div>
  </template>
  
  <script src="../scripts/SettingsPage.js"></script>
  <style src="../styles/SettingsPage.css" scoped></style>
  