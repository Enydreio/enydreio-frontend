<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="close">
      <div class="modal-content">
        <header class="modal-header">
          <h2>Edit {{ app.name }}</h2>
        </header>
        <div class="modal-body">
          <label>
            <span>App Name:</span>
            <input type="text" v-model="app.name" />
          </label> 
          <label>
            <span>URL:</span>
            <input type="text" v-model="app.url" />
          </label>
          <label>
            <span>Image:</span>
            <input type="file"/>
          </label>
        </div>
        <footer class="modal-footer">
          <button @click="close" class="save-button">Save</button>
        </footer>
      </div>
    </div>
  </template>
  
  <script src="../scripts/EditAppModal.js"></script>
  
  <style src="../styles/EditAppModal.css" scoped></style>
  