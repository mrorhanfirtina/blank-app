<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="theme-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          :icon="themeStore.currentTheme === 'modern' ? 'brightness_3' : 'wb_sunny'"
          aria-label="Toggle Theme"
          @click="toggleTheme"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list dense>
        <q-item-label header>Sayfalar</q-item-label>
        <q-item
          v-for="page in appPages"
          :key="page.title"
          clickable
          :to="page.to"
          active-class="q-item--active"
          dense
        >
          <q-item-section avatar>
            <q-icon :name="page.icon" />
          </q-item-section>
          <q-item-section>
            {{ page.title }}
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator spaced />
      <q-list dense>
        <q-item-label header>Essential Links</q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          dense
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useThemeStore } from 'src/stores/theme'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const appPages = [
  { title: 'Dashboard', icon: 'dashboard', to: '/app/dashboard' },
  { title: 'Mal Kabul', icon: 'assignment', to: '/app/mal-kabul' },
  { title: 'Kalite Kontrol', icon: 'check_circle', to: '/app/kalite-kontrol' },
  { title: 'Stok', icon: 'inventory', to: '/app/stok' },
  { title: 'Depo', icon: 'store', to: '/app/depo' },
  { title: 'Admin', icon: 'admin_panel_settings', to: '/app/admin' }
]

const leftDrawerOpen = ref(false)
const themeStore = useThemeStore()

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleTheme() {
  const newTheme = themeStore.currentTheme === 'modern' ? 'classic' : 'modern'
  themeStore.setTheme(newTheme)
}
</script>
