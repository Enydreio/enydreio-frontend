<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
    <main class="main-content">
      <header class="apps-header">
        <div id="apps-header-box">
          <h1>Your Apps</h1>
          <input type="text" placeholder="Search Apps..." v-model="searchQuery" />
        </div>
        <button id="view-button" @click="toggleView">{{ isGridView ? 'Switch to Detail View' : 'Switch to Grid View' }}</button>
      </header>

      <section class="apps-list">
        <div v-if="isGridView" class="grid-view">
          <div v-for="app in filteredApps" :key="app.id" class="grid-item">
            <span>{{ app.name }}</span>
            <button>Start</button>
          </div>
        </div>
        
        <table v-else>
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
    </SidebarToggle>
  </div>
</template>

<script src="../scripts/AppsPage.js"></script>
<style src="../styles/AppsPage.css"></style>
