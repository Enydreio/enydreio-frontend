<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
      <main class="main-content">
        <header class="dashboard-header">
          <h1>Dashboard</h1>
          <div id="search-logout">
            <button @click="logout" :class="{'dark-mode': isDarkMode}" id="dashboard-logout-button">Logout</button>
          </div>
         </header>

        <section class="charts-section">
          <h2 :class="{'dark-mode': isDarkMode}">Resource Usage Over Time</h2>
          <div class="charts-container">
            <div class="diagram left-diagram" :class="{'dark-mode': isDarkMode}" ref="resourceUsageChart"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=1&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
            <div class="diagram right-diagram" :class="{'dark-mode': isDarkMode}" ref="costChart"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=2&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
            <div class="diagram left-diagram" :class="{'dark-mode': isDarkMode}" ref="extraChart"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=3&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
            <div class="diagram right-diagram" :class="{'dark-mode': isDarkMode}" ref="extraChart2"><iframe src="http://grafana:3000/d-solo/ce5zfmp0am2gwe/new-dashboard?orgId=1&timezone=browser&panelId=4&__feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe></div>
          </div>
        </section>

        <!--<section class="activity-section">
          <h2>Recent Activity</h2>
          <ul id="activity-list">
            <li v-for="activity in recentActivities" :key="activity.id">{{ activity.description }} - {{ activity.timestamp }}</li>
          </ul>
        </section>-->
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
