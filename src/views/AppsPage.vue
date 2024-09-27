<template>
    <div class="apps-container">
      <Sidebar />
      <main class="apps-main">
        <header class="apps-header">
          <h1>Your Apps</h1>
          <input type="text" placeholder="Search Apps..." v-model="searchQuery" />
        </header>
  
        <section class="apps-list">
          <table>
            <thead>
              <tr>
                <th @click="sortBy('name')">App Name <span v-if="sortField === 'name'">{{ sortOrder }}</span></th>
                <th @click="sortBy('isActive')">Status <span v-if="sortField === 'isActive'">{{ sortOrder }}</span></th>
                <th @click="sortBy('lastActive')">Last Active <span v-if="sortField === 'lastActive'">{{ sortOrder }}</span></th>
                <th @click="sortBy('userCount')">Users <span v-if="sortField === 'userCount'">{{ sortOrder }}</span></th>
                <th @click="sortBy('resourceUsage')">Resource Usage <span v-if="sortField === 'resourceUsage'">{{ sortOrder }}</span></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in filteredApps" :key="app.id">
                <td>{{ app.name }}</td>
                <td :class="{'active': app.isActive, 'inactive': !app.isActive}">
                  {{ app.isActive ? 'Active' : 'Inactive' }}
                </td>
                <td>{{ app.lastActive }}</td>
                <td>{{ app.userCount }}</td>
                <td>{{ app.resourceUsage }}%</td>
                <td>
                  <button @click="viewDetails(app)">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
  
        <!-- Modal for App Details -->
        <AppDetailsModal
          v-if="isModalVisible"
          :app="selectedApp"
          :isVisible="isModalVisible"
          @close="closeModal"
        />
      </main>
    </div>
  </template>
  
  <script src="../scripts/AppsPage.js"></script>
  <style scoped>
  @import '../styles/AppsPage.css';
  </style>
  