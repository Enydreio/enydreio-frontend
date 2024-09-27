<template>
    <div class="dashboard-container">
      <Sidebar />
      <main class="dashboard-main">
        <header class="dashboard-header">
          <h2>Dashboard</h2>
          <input type="text" placeholder="Search..." />
        </header>
  
        <section class="dashboard-overview">
          <div class="card">
            <h4>Active Apps</h4>
            <p>{{ activeAppsCount }}</p>
          </div>
          <div class="card">
            <h4>Inactive Apps</h4>
            <p>{{ inactiveAppsCount }}</p>
          </div>
          <div class="card">
            <h4>Total Users</h4>
            <p>{{ totalUsers }}</p>
          </div>
          <div class="card">
            <h4>Resource Usage</h4>
            <p>{{ resourceUsage }}%</p>
          </div>
        </section>
  
        <section class="charts-section">
          <h2>Resource Usage Over Time</h2>
          <div class="charts-container">
            <canvas class="diagram" ref="resourceUsageChart"></canvas>
            <canvas class="diagram" ref="costChart"></canvas>
            <canvas class="diagram" ref="extraChart"></canvas>
            <canvas class="diagram" ref="extraChart2"></canvas>
          </div>        
        </section>
  
        <section class="activity-section">
          <h2>Recent Activity</h2>
          <ul id="activity-list">
            <li v-for="activity in recentActivities" :key="activity.id">{{ activity.description }} - {{ activity.timestamp }}</li>
          </ul>
        </section>

      </main>
    </div>
  </template>
  
  <script src="../scripts/DashboardPage.js"></script>
  <style scoped>
  @import '../styles/DashboardPage.css';
  </style>
  