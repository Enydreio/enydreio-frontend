import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue'; // Importiere die Dashboard-Seite
import AppsPage from '@/views/AppsPage.vue';
import SettingsPage from '../views/SettingsPage.vue'; // Importiere die Settings-Seite

const routes = [
  { path: '/', component: AppsPage }, // Route für die Login-Seite
  { path: '/dashboard', component: DashboardPage }, // Route für das Dashboard
  { path: '/settings', component: SettingsPage }, // Route für die Einstellungen
];

const router = createRouter({
  history: createWebHistory(), // Verwende den HTML5-Verlauf
  routes, // Füge die definierten Routen hinzu
});

export default router; // Exportiere den Router