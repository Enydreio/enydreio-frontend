<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
    <main class="main-content">
      <header class="apps-header">
        <div id="apps-header-box">
          <h1>Your Apps</h1>
          <input type="text" placeholder="Search..."/>
        </div>
        <div id="button-panel">
          <button id="grid-view-button" @click="toggleView" :disabled="isGridView"></button>
          <button id="detail-view-button" @click="toggleView" :disabled="!isGridView"></button>
        </div>
      </header>

      <section class="apps-list">
        <div v-if="isGridView" class="grid-view">
          <div v-for="app in filteredApps" :key="app.id" class="grid-item">
            <span id="name">{{ app.name }}</span>
            <div id="application-image"></div>
            <div id="open-button-box"><button @click="viewDetails(app)" id="open-button"></button></div>
          </div>
        </div>

        <table v-else>
          <thead>
            <tr>
              <th @click="sortBy('name')">App Name <span v-if="sortField === 'name'">{{ sortOrder }}</span></th>
              <th @click="sortBy('isActive')">Status <span v-if="sortField === 'isActive'">{{ sortOrder }}</span></th>
              <th @click="sortBy('lastActive')">Last Active <span v-if="sortField === 'lastActive'">{{ sortOrder }}</span></th>
              <th @click="sortBy('url')">URL <span v-if="sortField === 'url'">{{ sortOrder }}</span></th>
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
              <td>{{ app.url }}</td>
              <td>{{ app.resourceUsage }}%</td>
              <td>
                <button class="view-button" @click="viewDetails(app)">View</button>
                <button class="start-button" @click="openEditModal(app)">Edit</button>
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

      <!-- Modal for Editing App -->
      <AppEditModal
        v-if="isEditModalVisible"
        :app="selectedApp"
        :isVisible="isEditModalVisible"
        @close="closeEditModal"
      />
    </main>
    </SidebarToggle>
  </div>
</template>

<script src="../scripts/AppsPage.js"></script>

<style src="../styles/AppsPage.css" scoped></style>
