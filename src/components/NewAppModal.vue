<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="close">
      <div class="modal-content" :class="{'dark-mode': isDarkMode}">
        <header class="modal-header">
          <h2 :class="{'dark-mode': isDarkMode}">Neue App hinzufügen</h2>
        </header>
        <div class="modal-body">
          <label :class="{'dark-mode': isDarkMode}">
            <span>Name:</span>
            <input type="text" v-model="form.name" required :class="{'dark-mode': isDarkMode}"/>
          </label>
          <label :class="{'dark-mode': isDarkMode}">
            <span>Beschreibung:</span>
            <textarea v-model="form.description" required :class="{'dark-mode': isDarkMode}"></textarea>
          </label>
          <label :class="{'dark-mode': isDarkMode}">
            <span>URL:</span>
            <input type="url" v-model="form.url" required :class="{'dark-mode': isDarkMode}"/>
          </label>
          <label :class="{'dark-mode': isDarkMode}">
            <span>Category</span>
            <input type="url" v-model="form.category" :class="{'dark-mode': isDarkMode}"/>
          </label>
          <label :class="{'dark-mode': isDarkMode}">
            <span>Logo-URL:</span>
            <input type="url" v-model="form.logo" :class="{'dark-mode': isDarkMode}"/>
          </label>
        </div>
        <footer class="modal-footer">
          <button @click="close" class="cancel-button">Abbrechen</button>
          <button @click="saveNewApp" class="save-button">Hinzufügen</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script src="../scripts/NewAppModal.js"></script>
  <style src="../styles/NewAppModal.css" scoped></style>
  