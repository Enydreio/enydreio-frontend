<template>
  <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
    <SidebarToggle @toggle="handleSidebarToggle">
    <main class="main-content">
      <header class="apps-header">
        <div id="apps-header-box">
          <h1>Your Apps</h1>
          <div id="search-logout">
            <input id="search" type="text" :class="{'dark-mode': isDarkMode}" placeholder="Search..." v-model="searchQuery"/>
            <button @click="logout" :class="{'dark-mode': isDarkMode}" id="logout-button">Logout</button>
          </div>
        </div>
        <div id="button-panel" :class="{'dark-mode': isDarkMode}">
          <button id="grid-view-button" :class="{'dark-mode': isDarkMode}" @click="setLastClicked('grid'), setView(true)" :disabled="isGridView" :style="{ transform: lastClickedButton === 'grid' ? 'scale(0.8)' : 'scale(1)', transition: 'transform 0.3s ease' }"></button>
          <button id="detail-view-button" :class="{'dark-mode': isDarkMode}" @click="setLastClicked('detail'), setView(false)" :disabled="!isGridView" :style="{ transform: lastClickedButton === 'detail' ? 'scale(0.8)' : 'scale(1)', transition: 'transform 0.3s ease' }"></button>
        </div>
      </header>

      <section class="apps-list" :class="{'dark-mode': isDarkMode}">
        <!-- Grid View / Table View -->
        <div v-if="isGridView">
          <div v-if="isCategoryView">
            <div v-for="(apps, category) in sortedGroupedApps" :key="category">
              <h2>{{ category || "No Category" }}</h2>
              <div v-for="app in apps" :key="app.id" class="grid-item" :class="{'dark-mode': isDarkMode}">
                <span class="name">{{ app.name }}</span>
                <a class="link" :href="app.url" target="_blank"><div class="application-image" :style="{backgroundImage: `url(${app.logo || require('@/assets/application.png')})`}"></div></a>
              </div>
            </div>
          </div>

          <div v-else class="grid-view">
            <div v-for="app in filteredApps" :key="app.id" class="grid-item" :class="{'dark-mode': isDarkMode}">
            <span class="name">{{ app.name }}</span>
            <a class="link" :href="app.url" target="_blank"><div class="application-image" :style="{backgroundImage: `url(${app.logo || require('@/assets/application.png')})`}"></div></a>
            <!--<div class="open-button-box"><button @click="viewDetails(app)" class="open-button"></button></div>-->
          </div>
          </div>
        </div>

        <div v-else>
          <div v-if="isCategoryView">
            <div v-for="(apps, category) in sortedGroupedApps" :key="category">
              <h2>{{ category || "No Category" }}</h2>
              <table>
                <thead>
                  <tr :class="{'dark-mode': isDarkMode}">
                    <th :class="{'dark-mode': isDarkMode}">Category</th>
                    <th  :class="{'dark-mode': isDarkMode}" @click="sortBy('name')">App Name <span v-if="sortField === 'name'">{{ sortOrder }}</span></th>
                    <th  :class="{'dark-mode': isDarkMode}" @click="sortBy('description')">Description <span v-if="sortField === 'description'">{{ sortOrder }}</span></th>
                    <th :class="{'dark-mode': isDarkMode}"  @click="sortBy('url')">URL <span v-if="sortField === 'url'">{{ sortOrder }}</span></th>
                    <th :class="{'dark-mode': isDarkMode}">Logo</th>
                    <th :class="{'dark-mode': isDarkMode}">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr  :class="{'dark-mode': isDarkMode}" v-for="app in apps" :key="app.id">
                    <th :class="{'dark-mode': isDarkMode}">{{ app.category }}</th>
                    <td :class="{'dark-mode': isDarkMode}">{{ app.name }}</td>
                    <td :class="{'dark-mode': isDarkMode}">{{ app.description }}</td>
                    <td :class="{'dark-mode': isDarkMode}"><a :href="app.url" target="_blank">{{ app.url }}</a></td>
                    <td :class="{'dark-mode': isDarkMode}"><img :src="app.logo || require('@/assets/application.png')" alt="App Logo" width="50" /></td>
                    <td :class="{'dark-mode': isDarkMode}" class="crud-buttons"> 
                      <!--<button class="crud-button" @click="viewDetails(app)">View</button>-->
                      <button v-if="isAdmin" class="crud-button" @click="openEditModal(app)">Edit</button>
                      <button v-if="isAdmin" class="crud-button" @click="deleteApp(app.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else>
            <table>
              <thead>
                <tr :class="{'dark-mode': isDarkMode}">
                  <th :class="{'dark-mode': isDarkMode}">Category</th>
                  <th  :class="{'dark-mode': isDarkMode}" @click="sortBy('name')">App Name <span v-if="sortField === 'name'">{{ sortOrder }}</span></th>
                  <th  :class="{'dark-mode': isDarkMode}" @click="sortBy('description')">Description <span v-if="sortField === 'description'">{{ sortOrder }}</span></th>
                  <th  :class="{'dark-mode': isDarkMode}" @click="sortBy('url')">URL <span v-if="sortField === 'url'">{{ sortOrder }}</span></th>
                  <th :class="{'dark-mode': isDarkMode}">Logo</th>
                  <th :class="{'dark-mode': isDarkMode}">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{'dark-mode': isDarkMode}" v-for="app in filteredApps" :key="app.id">
                  <td :class="{'dark-mode': isDarkMode}">{{ app.category }}</td>
                  <td :class="{'dark-mode': isDarkMode}">{{ app.name }}</td>
                  <td :class="{'dark-mode': isDarkMode}">{{ app.description }}</td>
                  <td :class="{'dark-mode': isDarkMode}"><a :href="app.url" target="_blank">{{ app.url }}</a></td>
                  <td :class="{'dark-mode': isDarkMode}"><img :src="app.logo || require('@/assets/application.png')" alt="App Logo" width="50" /></td>
                  <td :class="{'dark-mode': isDarkMode}" class="crud-buttons">
                    <!--<button id="view-button" class="crud-button" @click="viewDetails(app)">View</button>-->
                    <button v-if="isAdmin" id="edit-button" class="crud-button" @click="openEditModal(app)">Edit</button>
                    <button v-if="isAdmin" id="delete-button" class="crud-button" @click="deleteApp(app.ID)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button id="create-button" class="crud-button" @click="toggleCategorySort">{{ isCategoryView ? 'Disable Category-Sort' : 'Enable Category-Sort' }}</button>
        <button v-if="isAdmin" id="create-button" class="crud-button" @click="openNewAppModal">{{ showAddForm ? 'Close' : 'Add Application' }}</button>
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
