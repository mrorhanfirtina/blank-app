<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Admin Paneli</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md items-center">
          <div class="col-6 text-h6">Kullanıcılar</div>
          <div class="col-6 flex flex-end">
            <q-btn color="primary" label="Kullanıcı Ekle" icon="person_add" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="kullanicilar"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-rol="props">
            <q-td :props="props">
              <q-select
                v-model="props.row.rol"
                :options="rolOptions"
                dense
                outlined
                emit-value
                map-options
                @update:model-value="rolGuncelle(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-islemler="props">
            <q-td :props="props">
              <q-btn flat round color="negative" icon="delete" @click="kullaniciSil(props.row)" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const columns = [
  { name: 'ad', label: 'Ad Soyad', field: 'ad', align: 'left' },
  { name: 'email', label: 'E-posta', field: 'email', align: 'left' },
  { name: 'rol', label: 'Rol', field: 'rol', align: 'left' },
  { name: 'islemler', label: 'İşlemler', field: 'islemler', align: 'center' }
]

const rolOptions = [
  { label: 'Kullanıcı', value: 'kullanici' },
  { label: 'Kalite', value: 'kalite' },
  { label: 'Depo', value: 'depo' },
  { label: 'Admin', value: 'admin' }
]

const kullanicilar = ref([
  { id: 1, ad: 'Ali Veli', email: 'ali@firma.com', rol: 'admin' },
  { id: 2, ad: 'Ayşe Yılmaz', email: 'ayse@firma.com', rol: 'depo' },
  { id: 3, ad: 'Mehmet Can', email: 'mehmet@firma.com', rol: 'kalite' }
])

function rolGuncelle(kullanici) {
  $q.notify({
    color: 'positive',
    message: `${kullanici.ad} kullanıcısının rolü güncellendi!`,
    icon: 'check'
  })
}

function kullaniciSil(kullanici) {
  $q.dialog({
    title: 'Kullanıcı Sil',
    message: `${kullanici.ad} kullanıcısını silmek istediğinize emin misiniz?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    kullanicilar.value = kullanicilar.value.filter(k => k.id !== kullanici.id)
    $q.notify({
      color: 'negative',
      message: 'Kullanıcı silindi',
      icon: 'delete'
    })
  })
}
</script>

<script>
export default {
  name: 'AdminPaneli'
}
</script> 