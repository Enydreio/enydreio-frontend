<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
    <main class="main-content">
      <header class="apps-header">
        <div id="apps-header-box">
          <h1>Your Apps</h1>
          <input type="text" placeholder="Search..." v-model="searchQuery"/>
        </div>
        <div id="button-panel">
          <button id="grid-view-button" @click="toggleView" :disabled="isGridView"></button>
          <button id="detail-view-button" @click="toggleView" :disabled="!isGridView"></button>
        </div>
      </header>

      <section class="apps-list">
        <!-- Add Application Button -->
        <button @click="showAddForm = !showAddForm">{{ showAddForm ? 'Close' : 'Add Application' }}</button>

        <!-- Add Application Form -->
        <form v-if="showAddForm" @submit.prevent="createApplication">
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="form.name" required />
          </div>
          <div>
            <label for="description">Beschreibung:</label>
            <textarea v-model="form.description" required></textarea>
          </div>
          <div>
            <label for="url">URL:</label>
            <input type="url" v-model="form.url" required />
          </div>
          <div>
            <label for="logo">Logo-URL:</label>
            <input type="url" v-model="form.logo" />
          </div>
          <button type="submit">Hinzufügen</button>
        </form>

        <!-- Grid View / Table View -->
        <div v-if="isGridView" class="grid-view">
          <div v-for="app in filteredApps" :key="app.id" class="grid-item">
            <span id="name">{{ app.name }}</span>
            <div id="application-image"><!--{{ app.logo }}--></div>
            <div id="open-button-box"><button @click="viewDetails(app)" id="open-button"></button></div>
          </div>
        </div>

        <table v-else>
          <thead>
            <tr>
              <th>Logo</th>
              <th @click="sortBy('name')">App Name <span v-if="sortField === 'name'">{{ sortOrder }}</span></th>
              <th @click="sortBy('description')">Description <span v-if="sortField === 'description'">{{ sortOrder }}</span></th>
              <th @click="sortBy('url')">URL <span v-if="sortField === 'url'">{{ sortOrder }}</span></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in filteredApps" :key="app.id">
              <td>{{ app.logo }}</td>
              <td>{{ app.name }}</td>
              <td>{{ app.description }}</td>
              <td>{{ app.url }}</td>
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
