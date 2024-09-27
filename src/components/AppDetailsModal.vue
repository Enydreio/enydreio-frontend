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
            <canvas class="diagram" ref="resourceUsageChart"></canvas>
            <canvas class="diagram" ref="costChart"></canvas>
            <canvas class="diagram" ref="extraChart"></canvas>
            <canvas class="diagram" ref="extraChart2"></canvas>
          </div>        
        </section>
        <!-- Add any other details you'd like to display -->
      </div>
    </div>
  </template>
  
  <script src="../scripts/AppDetailsModal.js"></script>
  <style src="../styles/AppDetailsModal.css" scoped></style>
  