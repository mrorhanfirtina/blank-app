<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Mal Kabul</div>
    
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input v-model="irsaliyeNo" label="İrsaliye No" />
          </div>
          <div class="col-12 col-md-6">
            <q-input v-model="tedarikci" label="Tedarikçi" />
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          title="Ürünler"
          :rows="urunler"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top-right>
            <q-btn color="primary" label="Yeni Ürün Ekle" @click="yeniUrunEkle" />
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Kaydet" color="primary" @click="kaydet" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'MalKabulYonetimi'
}
</script>

<script setup>
import { ref } from 'vue'

const irsaliyeNo = ref('')
const tedarikci = ref('')
const urunler = ref([])

const columns = [
  { name: 'urunKodu', label: 'Ürün Kodu', field: 'urunKodu', align: 'left' },
  { name: 'urunAdi', label: 'Ürün Adı', field: 'urunAdi', align: 'left' },
  { name: 'miktar', label: 'Miktar', field: 'miktar', align: 'right' },
  { name: 'birim', label: 'Birim', field: 'birim', align: 'left' }
]

function yeniUrunEkle() {
  // Yeni ürün ekleme modalı
}

function kaydet() {
  // Mal kabul kaydetme işlemi
}
</script> 