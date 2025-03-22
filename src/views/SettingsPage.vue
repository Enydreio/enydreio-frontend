<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
      <main class="main-content">
        <header class="dashboard-header">
          <h1>User Management</h1>
          <div id="search-logout">
            <input type="text" placeholder="Search..."  v-model="searchQuery"/>
            <button @click="logout" id="logout-button">Logout</button>
          </div>
         </header>
        <div v-if="isAdmin" class="settings-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mail</th>
                <th>Rolle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.email }}</td>
                <td>
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
        <p v-else>Kein Admin</p>
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
