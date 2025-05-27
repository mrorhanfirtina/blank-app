<template>
  <q-page class="q-pa-md theme-page dashboard-bg">
    <div class="text-h4 q-mb-md dashboard-title">Dashboard</div>
    <div class="row q-col-gutter-xl q-mb-xl">
      <div class="col-12 col-md-6 col-lg-4" v-for="(chart, i) in charts" :key="i">
        <q-card class="q-mb-xl dashboard-card shadow-4">
          <q-card-section class="dashboard-card-header">
            <div class="text-subtitle1 q-mb-sm dashboard-card-title">{{ chart.title }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="dashboard-card-content flex flex-center">
            <component :is="chart.component" v-bind="chart.props" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DashboardPage'
}
</script>

<script setup>
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Bubble, Scatter } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
} from 'chart.js'
import { defineComponent, h } from 'vue'

ChartJS.register(
  Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, RadialLinearScale
)

// Progress Chart gerçek Vue bileşeni
const ProgressCharts = defineComponent({
  name: 'ProgressCharts',
  setup() {
    const progresses = [
      { label: 'Sipariş Tamamlanma', value: 75, color: 'primary' },
      { label: 'Stok Güncelleme', value: 45, color: 'warning' },
      { label: 'Kalite Kontrol', value: 90, color: 'positive' }
    ]
    return () => h('div', { style: 'display:flex;flex-direction:column;gap:18px;align-items:center;' },
      progresses.map(p =>
        h('div', { style: 'display:flex;flex-direction:column;align-items:center;' }, [
          h('q-circular-progress', {
            props: {
              showValue: true,
              fontSize: '18px',
              value: p.value,
              size: '80px',
              color: p.color,
              'track-color': 'grey-3',
              class: 'q-mb-xs'
            },
            style: 'margin-bottom:4px;'
          }),
          h('div', { style: 'font-size:15px;font-weight:500;' }, `${p.label}: %${p.value}`)
        ])
      )
    )
  }
})

// Chart veri ve ayarları
const charts = [
  {
    title: 'Bar Chart',
    component: Bar,
    props: {
      data: {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
        datasets: [{
          label: 'Satış',
          backgroundColor: '#2C3E50',
          data: [40, 55, 30, 70, 60]
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    }
  },
  {
    title: 'Line Chart',
    component: Line,
    props: {
      data: {
        labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum'],
        datasets: [{
          label: 'Ziyaretçi',
          borderColor: '#E67E22',
          backgroundColor: 'rgba(230,126,34,0.2)',
          data: [120, 90, 100, 140, 130],
          tension: 0.4
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    }
  },
  {
    title: 'Pie Chart',
    component: Pie,
    props: {
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [{
          backgroundColor: ['#2C3E50', '#E67E22', '#D4AF37'],
          data: [30, 50, 20]
        }]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Doughnut Chart',
    component: Doughnut,
    props: {
      data: {
        labels: ['Tamamlanan', 'Bekleyen', 'İptal'],
        datasets: [{
          backgroundColor: ['#27AE60', '#F1C40F', '#E74C3C'],
          data: [65, 25, 10]
        }]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Polar Area Chart',
    component: PolarArea,
    props: {
      data: {
        labels: ['X', 'Y', 'Z'],
        datasets: [{
          backgroundColor: ['#2C3E50', '#E67E22', '#D4AF37'],
          data: [11, 16, 7]
        }]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Radar Chart',
    component: Radar,
    props: {
      data: {
        labels: ['Hız', 'Güç', 'Dayanıklılık', 'Çeviklik', 'Zeka'],
        datasets: [{
          label: 'Oyuncu',
          backgroundColor: 'rgba(44,62,80,0.2)',
          borderColor: '#2C3E50',
          pointBackgroundColor: '#E67E22',
          data: [65, 59, 90, 81, 56]
        }]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Bubble Chart',
    component: Bubble,
    props: {
      data: {
        datasets: [{
          label: 'Projeler',
          backgroundColor: '#E67E22',
          data: [
            { x: 10, y: 20, r: 10 },
            { x: 15, y: 10, r: 15 },
            { x: 25, y: 30, r: 8 }
          ]
        }]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Scatter Chart',
    component: Scatter,
    props: {
      data: {
        datasets: [{
          label: 'Veri Noktaları',
          backgroundColor: '#27AE60',
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 7 },
            { x: 4, y: 5 }
          ]
        }]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Mixed Chart',
    component: Bar,
    props: {
      data: {
        labels: ['Ocak', 'Şubat', 'Mart', 'Nisan'],
        datasets: [
          {
            type: 'bar',
            label: 'Satış',
            backgroundColor: '#2C3E50',
            data: [30, 50, 40, 60]
          },
          {
            type: 'line',
            label: 'Hedef',
            borderColor: '#E67E22',
            data: [35, 45, 45, 55],
            fill: false
          }
        ]
      },
      options: { responsive: true }
    }
  },
  {
    title: 'Progress Chart',
    component: ProgressCharts
  }
]
</script>

<style scoped>
.dashboard-bg {
  background: linear-gradient(135deg, var(--q-background) 0%, #eaeaea 100%);
}
.dashboard-title {
  letter-spacing: 1px;
  font-weight: 700;
  color: var(--q-primary);
}
.dashboard-card {
  border-radius: 18px;
  background: var(--q-surface);
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dashboard-card-header {
  background: linear-gradient(90deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  color: var(--q-surface);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding-bottom: 8px;
}
.dashboard-card-title {
  font-weight: 600;
  font-size: 1.1rem;
}
.dashboard-card-content {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 