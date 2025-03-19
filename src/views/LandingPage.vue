<template>
    <div :class="['sidebar-container', { 'sidebar-collapsed': !isSidebarVisible }]">
        <SidebarToggle @toggle="handleSidebarToggle">
            <main class="main-content">
                <header class="landing-page-header">
                    <h1>Landing Page</h1>
                    <div id="search-logout">
                        <input type="text" placeholder="Search..." />
                        <button @click="logout" id="logout-button">Logout</button>
                    </div>
                </header>
                <section class="introduction">
                    <div class="text">
                        <h1>Enydreio - Die smarte Lösung für deine Container-Verwaltung</h1>
                        <p>Behalte den Überblick über deine Kubernetes- und Docker-Apps</p>
                    </div>
                    <div class="logo-container">
                        <img src="@/assets/logo.svg" alt="Logo" class="logo">
                    </div>
                </section>
                <section class="features">
                    <div class="feature" v-for="(feature, index) in features" :key="index">
                        <h2>{{ feature.title }}</h2>
                        <p>{{ feature.description }}</p>
                    </div>
                </section>
            </main>
        </SidebarToggle>
    </div>
</template>

<script src="../scripts/LandingPage.js"></script>

<style scoped>
  @import '../styles/LandingPage.css';
  @import '../styles/App.css';
  @import '../styles/SidebarToggle.css';
</style>