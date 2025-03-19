<template>
    <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
      <SidebarToggle @toggle="handleSidebarToggle">
        <main class="main-content">
          <header class="landing-page-header">
            <h1>Landing Page</h1>
            <div id="search-logout">
              <button @click="logout" id="landing-page-logout-button">Logout</button>
            </div>
           </header>
        </main>
      </SidebarToggle>
    </div>
  </template>
  
  <script src="../scripts/LandingPage.js"></script>
  <style scoped>
  @import '../styles/LandinPage.css';
  @import '../styles/App.css';
  @import '../styles/SidebarToggle.css'; 
  </style>
  