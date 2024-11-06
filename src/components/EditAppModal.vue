<template>
  <div class="modal-overlay" v-if="isVisible" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <h2>Edit {{ app.name }}</h2>
      </header>
      <div class="modal-body">
        <label>
          <span>Name:</span>
          <input type="text" v-model="form.name" required />
        </label>
        <label>
          <span>Beschreibung:</span>
          <textarea v-model="form.description" required></textarea>
        </label>
        <label>
          <span>URL:</span>
          <input type="url" v-model="form.url" required />
        </label>
        <label>
          <span>Logo-URL:</span>
          <input type="url" v-model="form.logo" />
        </label>
      </div>
      <footer class="modal-footer">
        <button @click="close" class="cancel-button">Abbrechen</button>
        <button @click="saveChanges" class="save-button">Speichern</button>
      </footer>
    </div>
  </div>
</template>

<script src="../scripts/EditAppModal.js"></script>
<style src="../styles/EditAppModal.css" scoped></style>
