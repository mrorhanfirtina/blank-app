<template>
    <q-page class="q-pa-md">
      <h5>Sürükle ve Bırak Listesi</h5>
      <draggable
        v-model="items"
        item-key="id"
        ghost-class="bg-grey-3"
        class="q-pa-sm bg-grey-1 rounded-borders"
      >
        <template #item="{ element }">
          <q-card class="q-mb-sm q-pa-sm">
            <q-card-section>
              {{ element.name }}
            </q-card-section>
          </q-card>
        </template>
      </draggable>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import draggable from 'vuedraggable'
  
  const items = ref([
    { id: 1, name: 'Öğe 1' },
    { id: 2, name: 'Öğe 2' },
    { id: 3, name: 'Öğe 3' },
  ])
  </script>
  