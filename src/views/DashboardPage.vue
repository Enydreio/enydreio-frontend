<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
      <main class="main-content">
        <header class="dashboard-header">
          <h1>Dashboard</h1>
          <div id="search-logout">
            <button @click="logout" id="dashboard-logout-button">Logout</button>
          </div>
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
            <div class="diagram left-diagram" ref="resourceUsageChart"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
            <div class="diagram right-diagram" ref="costChart"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=2&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
            <div class="diagram left-diagram" ref="extraChart"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=3&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
            <div class="diagram right-diagram" ref="extraChart2"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=4&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
          </div>
        </section>

        <section class="activity-section">
          <h2>Recent Activity</h2>
          <ul id="activity-list">
            <li v-for="activity in recentActivities" :key="activity.id">{{ activity.description }} - {{ activity.timestamp }}</li>
          </ul>
        </section>
      </main>
    </SidebarToggle>
  </div>
</template>

<script src="../scripts/DashboardPage.js"></script>
<style scoped>
@import '../styles/DashboardPage.css';
@import '../styles/App.css';
@import '../styles/SidebarToggle.css'; 
</style>
