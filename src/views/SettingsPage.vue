<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
      <main class="main-content">
        <header class="dashboard-header">
          <h1>Settings</h1>
          <div id="search-logout">
            <input id="search" :class="{'dark-mode': isDarkMode}" type="text" placeholder="Search..."  v-model="searchQuery"/>
            <button @click="logout" id="logout-button" :class="{'dark-mode': isDarkMode}">Logout</button>
          </div>
         </header>
        <div class="app-settings-container" :class="{'dark-mode': isDarkMode}">
          <h2 :class="{'dark-mode': isDarkMode}">App Management</h2>

          <div class="app-setting-box">
            <div class="box">Darkmode</div>
            <div class="box">
              <label class="switch">
                <input type="checkbox" v-model="isDarkMode" @change="setDarkModeCookie"/>
                <span class="slider round"></span>
              </label>
            </div>  
          </div>
          

        </div>
        <div v-if="isAdmin" class="settings-container" :class="{'dark-mode': isDarkMode}">
          <h2 :class="{'dark-mode': isDarkMode}">User Management</h2>
          <table :class="{'dark-mode': isDarkMode}">
            <thead>
              <tr :class="{'dark-mode': isDarkMode}">
                <th :class="{'dark-mode': isDarkMode}">ID</th>
                <th :class="{'dark-mode': isDarkMode}">Username</th>
                <th :class="{'dark-mode': isDarkMode}">First Name</th>
                <th :class="{'dark-mode': isDarkMode}">Last Name</th>
                <th :class="{'dark-mode': isDarkMode}">Mail</th>
                <th :class="{'dark-mode': isDarkMode}">Rolle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" :class="{'dark-mode': isDarkMode}">
                <td :class="{'dark-mode': isDarkMode}">{{ user.id }}</td>
                <td :class="{'dark-mode': isDarkMode}">{{ user.username }}</td>
                <td :class="{'dark-mode': isDarkMode}">{{ user.firstname }}</td>
                <td :class="{'dark-mode': isDarkMode}">{{ user.lastname }}</td>
                <td :class="{'dark-mode': isDarkMode}">{{ user.email }}</td>
                <td :class="{'dark-mode': isDarkMode}">
                  <select v-model="user.role" @change="updateUserRole(user)">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="openLink('http://localhost:8085')" id="keycloak-button">Manage in Keycloak</button>
        </div>
      </main>
    </SidebarToggle>
  </div>
</template>

<script src="../scripts/SettingsPage.js"></script>

<style scoped>
  @import '../styles/SettingsPage.css';
  @import '../styles/App.css';
  @import '../styles/SidebarToggle.css';
</style>
