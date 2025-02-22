<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ app.name }}</h2>
        <p><strong>Status:</strong> {{ app.isActive ? 'Active' : 'Inactive' }}</p>
        <p><strong>Last Active:</strong> {{ app.lastActive }}</p>
        <p><strong>Users:</strong> {{ app.userCount }}</p>
        <p><strong>Resource Usage:</strong> {{ app.resourceUsage }}%</p>
        <section class="charts-section">
          <h2>Resource Usage Over Time</h2>
          <div class="charts-container">
            <div class="diagram left-diagram"><iframe src="http://10.10.0.1:10000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo" frameborder="0"></iframe></div>
            <div class="diagram right-diagram"><iframe src="http://10.10.0.1:10000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=2&__feature.dashboardSceneSolo" frameborder="0"></iframe></div>
          </div>
        </section>
        <!-- Add any other details you'd like to display -->
      </div>
    </div>
  </template>
  
  <script src="../scripts/AppDetailsModal.js"></script>
  <style src="../styles/AppDetailsModal.css" scoped></style>
  