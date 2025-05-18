import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue'; // Importiere die Dashboard-Seite
import AppsPage from '@/views/AppsPage.vue';
import SettingsPage from '../views/SettingsPage.vue'; // Importiere die Settings-Seite
import NotFound from '../views/NotFound.vue'; // Importiere die 404-Seite
//import LandingPage from '@/views/LandingPage.vue';

const routes = [
  //{ path: '/', component: LandingPage }, 
  { path: '/', component: AppsPage},  //Route für die Apps
  { path: '/dashboard', component: DashboardPage }, // Route für das Dashboard
  { path: '/settings', component: SettingsPage }, // Route für die Einstellungen
  { path: '/:pathMatch(.*)*', component: NotFound }, // Route für die Einstellungen
];

const router = createRouter({
  history: createWebHistory(), // Verwende den HTML5-Verlauf
  routes, // Füge die definierten Routen hinzu
});

export default router; // Exportiere den Router