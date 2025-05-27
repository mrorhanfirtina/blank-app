<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Stok Yönetimi</div>
    
    <div class="row q-col-gutter-md">
      <!-- Stok Durumu -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Stok Durumu</div>
            <q-table
              :rows="stokDurumu"
              :columns="stokColumns"
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

              <template v-slot:body-cell-durum="props">
                <q-td :props="props">
                  <q-chip
                    :color="getStokDurumRengi(props.row.durum)"
                    text-color="white"
                    dense
                  >
                    {{ props.row.durum }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-islemler="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="edit"
                    @click="stokDuzenle(props.row)"
                  >
                    <q-tooltip>Düzenle</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="secondary"
                    icon="history"
                    @click="stokHareketGecmisi(props.row)"
                  >
                    <q-tooltip>Hareket Geçmişi</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Stok Hareketi -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Stok Hareketi</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-select
                  v-model="hareketTipi"
                  :options="hareketTipleri"
                  label="Hareket Tipi"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-select
                  v-model="secilenUrun"
                  :options="urunler"
                  label="Ürün"
                  outlined
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="miktar"
                  type="number"
                  label="Miktar"
                  outlined
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12">
                <q-btn
                  color="primary"
                  label="Hareket Kaydet"
                  @click="hareketKaydet"
                  :disable="!hareketTipi || !secilenUrun || !miktar"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Stok Düzenleme Modalı -->
    <q-dialog v-model="duzenleModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Stok Düzenle</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="duzenlenenStok.urunKodu"
                label="Ürün Kodu"
                readonly
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="duzenlenenStok.urunAdi"
                label="Ürün Adı"
                readonly
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="duzenlenenStok.miktar"
                type="number"
                label="Miktar"
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="duzenlenenStok.lokasyon"
                label="Lokasyon"
                outlined
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="İptal" color="primary" v-close-popup />
          <q-btn flat label="Kaydet" color="positive" @click="stokKaydet" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Hareket Geçmişi Modalı -->
    <q-dialog v-model="hareketGecmisiModal" persistent>
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">Stok Hareket Geçmişi</div>
        </q-card-section>

        <q-card-section>
          <q-table
            :rows="hareketGecmisi"
            :columns="hareketColumns"
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

// Stok Durumu
const stokColumns = [
  { name: 'urunKodu', label: 'Ürün Kodu', field: 'urunKodu', align: 'left' },
  { name: 'urunAdi', label: 'Ürün Adı', field: 'urunAdi', align: 'left' },
  { name: 'miktar', label: 'Miktar', field: 'miktar', align: 'right' },
  { name: 'birim', label: 'Birim', field: 'birim', align: 'left' },
  { name: 'lokasyon', label: 'Lokasyon', field: 'lokasyon', align: 'left' },
  { name: 'durum', label: 'Durum', field: 'durum', align: 'center' },
  { name: 'islemler', label: 'İşlemler', field: 'islemler', align: 'center' }
]

const stokDurumu = ref([
  {
    id: 1,
    urunKodu: 'U001',
    urunAdi: 'Ürün A',
    miktar: 100,
    birim: 'Adet',
    lokasyon: 'Raf-1',
    durum: 'Normal'
  },
  {
    id: 2,
    urunKodu: 'U002',
    urunAdi: 'Ürün B',
    miktar: 5,
    birim: 'Adet',
    lokasyon: 'Raf-2',
    durum: 'Kritik'
  }
])

// Stok Hareketi
const hareketTipi = ref(null)
const secilenUrun = ref(null)
const miktar = ref(null)

const hareketTipleri = [
  { label: 'Giriş', value: 'giris' },
  { label: 'Çıkış', value: 'cikis' },
  { label: 'Transfer', value: 'transfer' }
]

const urunler = [
  { label: 'Ürün A', value: 'U001' },
  { label: 'Ürün B', value: 'U002' }
]

// Modals
const duzenleModal = ref(false)
const hareketGecmisiModal = ref(false)
const duzenlenenStok = ref({})
const hareketGecmisi = ref([])

const hareketColumns = [
  { name: 'tarih', label: 'Tarih', field: 'tarih', align: 'left' },
  { name: 'hareketTipi', label: 'Hareket Tipi', field: 'hareketTipi', align: 'left' },
  { name: 'miktar', label: 'Miktar', field: 'miktar', align: 'right' },
  { name: 'aciklama', label: 'Açıklama', field: 'aciklama', align: 'left' }
]

function getStokDurumRengi(durum) {
  switch (durum) {
    case 'Normal':
      return 'positive'
    case 'Kritik':
      return 'negative'
    default:
      return 'grey'
  }
}

function stokDuzenle(stok) {
  duzenlenenStok.value = { ...stok }
  duzenleModal.value = true
}

function stokKaydet() {
  // Stok güncelleme işlemi
  $q.notify({
    color: 'positive',
    message: 'Stok güncellendi',
    icon: 'check'
  })
  duzenleModal.value = false
}

function stokHareketGecmisi() {
  // Örnek hareket geçmişi
  hareketGecmisi.value = [
    {
      id: 1,
      tarih: '2024-03-15',
      hareketTipi: 'Giriş',
      miktar: 50,
      aciklama: 'Mal kabul'
    },
    {
      id: 2,
      tarih: '2024-03-14',
      hareketTipi: 'Çıkış',
      miktar: 20,
      aciklama: 'Üretim'
    }
  ]
  hareketGecmisiModal.value = true
}

function hareketKaydet() {
  // Stok hareketi kaydetme işlemi
  $q.notify({
    color: 'positive',
    message: 'Stok hareketi kaydedildi',
    icon: 'check'
  })
  
  // Form temizleme
  hareketTipi.value = null
  secilenUrun.value = null
  miktar.value = null
}
</script>

<script>
export default {
  name: 'StokYonetimi'
}
</script> 