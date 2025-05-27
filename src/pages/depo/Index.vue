<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Depo Yönetimi</div>
    
    <div class="row q-col-gutter-md">
      <!-- Depo Durumu -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Depo Durumu</div>
            <q-table
              dense
              class="theme-table compact-table"
              title="Depo Durumu"
              :rows="depoDurumu"
              :columns="depoColumns"
              row-key="id"
              :filter="filter"
              v-model:pagination="pagination"
            >
              <template v-slot:top-right>
                <q-input
                  v-model="filter"
                  placeholder="Ara..."
                  dense
                  outlined
                  class="q-ml-md"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>

              <template v-slot:body-cell-doluluk="props">
                <q-td :props="props">
                  <q-linear-progress
                    :value="props.row.doluluk / 100"
                    :color="getDolulukRengi(props.row.doluluk)"
                    size="xl"
                  >
                    <div class="absolute-full flex flex-center">
                      <q-badge color="white" text-color="black">
                        {{ props.row.doluluk }}%
                      </q-badge>
                    </div>
                  </q-linear-progress>
                </q-td>
              </template>

              <template v-slot:body-cell-islemler="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="edit"
                    @click="depoDuzenle(props.row)"
                  >
                    <q-tooltip>Düzenle</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="secondary"
                    icon="list"
                    @click="depoDetay(props.row)"
                  >
                    <q-tooltip>Detay</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Yeni Depo Ekleme -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Yeni Depo Ekle</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input
                  v-model="yeniDepo.kod"
                  label="Depo Kodu"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="yeniDepo.ad"
                  label="Depo Adı"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="yeniDepo.kapasite"
                  type="number"
                  label="Kapasite"
                  outlined
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12">
                <q-btn
                  color="primary"
                  label="Depo Ekle"
                  @click="depoEkle"
                  :disable="!yeniDepo.kod || !yeniDepo.ad || !yeniDepo.kapasite"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Depo Düzenleme Modalı -->
    <q-dialog v-model="duzenleModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Depo Düzenle</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="duzenlenenDepo.kod"
                label="Depo Kodu"
                readonly
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="duzenlenenDepo.ad"
                label="Depo Adı"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="duzenlenenDepo.kapasite"
                type="number"
                label="Kapasite"
                outlined
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="primary" v-close-popup />
          <q-btn flat label="Kaydet" color="positive" @click="depoKaydet" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Depo Detay Modalı -->
    <q-dialog v-model="detayModal" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Depo Detayı</div>
        </q-card-section>

        <q-card-section>
          <q-table
            :rows="depoDetaylari"
            :columns="detayColumns"
            row-key="id"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Kapat" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const filter = ref('')
const pagination = ref({
  rowsPerPage: 10
})

// Depo Durumu
const depoColumns = [
  { name: 'kod', label: 'Depo Kodu', field: 'kod', align: 'left' },
  { name: 'ad', label: 'Depo Adı', field: 'ad', align: 'left' },
  { name: 'kapasite', label: 'Kapasite', field: 'kapasite', align: 'right' },
  { name: 'doluluk', label: 'Doluluk', field: 'doluluk', align: 'center' },
  { name: 'islemler', label: 'İşlemler', field: 'islemler', align: 'center' }
]

const depoDurumu = ref([
  {
    id: 1,
    kod: 'D001',
    ad: 'Ana Depo',
    kapasite: 1000,
    doluluk: 75
  },
  {
    id: 2,
    kod: 'D002',
    ad: 'Yan Depo',
    kapasite: 500,
    doluluk: 30
  }
])

// Yeni Depo
const yeniDepo = ref({
  kod: '',
  ad: '',
  kapasite: null
})

// Modals
const duzenleModal = ref(false)
const detayModal = ref(false)
const duzenlenenDepo = ref({})
const depoDetaylari = ref([])

const detayColumns = [
  { name: 'urunKodu', label: 'Ürün Kodu', field: 'urunKodu', align: 'left' },
  { name: 'urunAdi', label: 'Ürün Adı', field: 'urunAdi', align: 'left' },
  { name: 'miktar', label: 'Miktar', field: 'miktar', align: 'right' },
  { name: 'lokasyon', label: 'Lokasyon', field: 'lokasyon', align: 'left' }
]

function getDolulukRengi(doluluk) {
  if (doluluk >= 90) return 'negative'
  if (doluluk >= 70) return 'warning'
  return 'positive'
}

function depoDuzenle(depo) {
  duzenlenenDepo.value = { ...depo }
  duzenleModal.value = true
}

function depoKaydet() {
  // Depo güncelleme işlemi
  $q.notify({
    color: 'positive',
    message: 'Depo güncellendi',
    icon: 'check'
  })
  duzenleModal.value = false
}

function depoDetay() {
  // Örnek depo detayları
  depoDetaylari.value = [
    {
      id: 1,
      urunKodu: 'U001',
      urunAdi: 'Ürün A',
      miktar: 100,
      lokasyon: 'Raf-1'
    },
    {
      id: 2,
      urunKodu: 'U002',
      urunAdi: 'Ürün B',
      miktar: 50,
      lokasyon: 'Raf-2'
    }
  ]
  detayModal.value = true
}

function depoEkle() {
  // Yeni depo ekleme işlemi
  $q.notify({
    color: 'positive',
    message: 'Yeni depo eklendi',
    icon: 'check'
  })
  
  // Form temizleme
  yeniDepo.value = {
    kod: '',
    ad: '',
    kapasite: null
  }
}
</script>

<script>
export default {
  name: 'DepoYonetimi'
}
</script>

<style scoped>
.compact-table .q-table__middle, .compact-table .q-table__top, .compact-table .q-table__bottom {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.compact-table .q-table__td, .compact-table .q-table__th {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  font-size: 13px;
}
.compact-table .q-table__row {
  min-height: 28px !important;
  height: 28px !important;
}
</style> 