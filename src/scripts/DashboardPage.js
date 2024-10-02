import { Chart, registerables } from 'chart.js';
import SidebarToggle from '../components/SidebarToggle.vue';

export default {
  name: 'DashboardPage',
  components: { SidebarToggle },
  data() {
    return {
      activeAppsCount: 5,
      inactiveAppsCount: 2,
      totalUsers: 100,
      resourceUsage: 75,
      resourceUsageData: [20, 40, 60, 80, 100],
      costData: [100, 200, 300, 400, 500],
      recentActivities: [
        { id: 1, description: 'User John Doe accessed App A', timestamp: '2024-09-25 12:30' },
        { id: 2, description: 'App B encountered an error', timestamp: '2024-09-25 12:25' },
        { id: 3, description: 'User Jane Doe updated App C', timestamp: '2024-09-25 12:20' },
      ],
      isSidebarVisible: true, // Zustand der Sidebar
    };
  },
  mounted() {
    this.renderDashboardCharts();
  },
  methods: {
    handleSidebarToggle(newState) {
      this.isSidebarVisible = newState; // Sidebar Sichtbarkeit aktualisieren
    },
    renderDashboardCharts() {
      Chart.register(...registerables);
      const resourceCtx = this.$refs.resourceUsageChart.getContext('2d');
      const costCtx = this.$refs.costChart.getContext('2d');

      new Chart(resourceCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Resource Usage (%)',
            data: this.resourceUsageData,
            borderColor: '#6a11cb',
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            }
          }
        }
      });

      new Chart(costCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Costs ($)',
            data: this.costData,
            backgroundColor: '#6a11cb',
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    }
  }
};
