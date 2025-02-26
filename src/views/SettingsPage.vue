<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
      <main class="main-content">
        <div v-if="isAdmin" class="settings-container">
          <h2>Benutzerverwaltung</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Rolle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.id }}</td>
                <td>
                  <select v-model="user.role" @change="updateUserRole(user)">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
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
