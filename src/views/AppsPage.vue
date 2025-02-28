<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
    <main class="main-content">
      <header class="apps-header">
        <div id="apps-header-box">
          <h1>Your Apps</h1>
          <div id="search-logout">
            <input type="text" placeholder="Search..." v-model="searchQuery"/>
            <button @click="logout" id="logout-button">Logout</button>
          </div>
        </div>
        <div id="button-panel">
          <button id="grid-view-button" @click="toggleView" :disabled="isGridView"></button>
          <button id="detail-view-button" @click="toggleView" :disabled="!isGridView"></button>
        </div>
      </header>

      <section class="apps-list">
        <!-- Grid View / Table View -->
        <div v-if="isGridView" class="grid-view">
          <div v-for="app in filteredApps" :key="app.id" class="grid-item">
            <span class="name">{{ app.name }}</span>
            <a class="link" :href="app.url" target="_blank"><div class="application-image" :style="{backgroundImage: `url(${app.logo || require('@/assets/application.png')})`}"></div></a>
            <div class="open-button-box"><button @click="viewDetails(app)" class="open-button"></button></div>
          </div>
        </div>

        <div v-else>
            <div v-if="!isCategoryView">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th @click="sortBy('name')">App Name <span v-if="sortField === 'name'">{{ sortOrder }}</span></th>
                    <th @click="sortBy('description')">Description <span v-if="sortField === 'description'">{{ sortOrder }}</span></th>
                    <th @click="sortBy('url')">URL <span v-if="sortField === 'url'">{{ sortOrder }}</span></th>
                    <ht>Logo</ht>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="app in filteredApps" :key="app.id">
                    <td>{{ app.category }}</td>
                    <td>{{ app.name }}</td>
                    <td>{{ app.description }}</td>
                    <td>{{ app.url }}</td>
                    <td>{{ app.logo }}</td>
                    <td class="crud-buttons">
                      <button id="view-button" class="crud-button" @click="viewDetails(app)">View</button>
                      <button id="edit-button" class="crud-button" @click="openEditModal(app)">Edit</button>
                      <button id="delete-button" class="crud-button" @click="deleteApp(app.ID)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          <div v-else>
            
          </div>
        </div>
        <ToggleButton v-model="checked" onIcon="pi pi-check" offIcon="pi pi-times" :invalid="!checked" class="crud-button" aria-label="Confirmation" />
        <button id="create-button" class="crud-button" @click="openNewAppModal">{{ showAddForm ? 'Close' : 'Add Application' }}</button>
      </section>

      <!-- Modal for Creating New App -->
      <NewAppModal
        v-if="isNewAppModalVisible"
        :isVisible="isNewAppModalVisible"
        @close="closeNewAppModal"
        @create="createApplication"
      />

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
        @update-app="updateApps"
      />
    </main>
    </SidebarToggle>
  </div>
</template>

<script src="../scripts/AppsPage.js"></script>
<style src="../styles/AppsPage.css" scoped></style>
