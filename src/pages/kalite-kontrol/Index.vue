<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Kalite Kontrol</div>
    
    <q-card>
      <q-card-section>
        <q-table
          title="Bekleyen Kalite Kontroller"
          :rows="bekleyenKontroller"
          :columns="columns"
          row-key="id"
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
                :color="props.row.durum === 'Beklemede' ? 'warning' : 'positive'"
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
                icon="visibility"
                @click="kontrolDetay(props.row)"
              >
                <q-tooltip>Detay Görüntüle</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="positive"
                icon="check"
                @click="onayla()"
                v-if="props.row.durum === 'Beklemede'"
              >
                <q-tooltip>Onayla</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="negative"
                icon="close"
                @click="reddet()"
                v-if="props.row.durum === 'Beklemede'"
              >
                <q-tooltip>Reddet</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Kontrol Detay Modalı -->
    <q-dialog v-model="detayModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Kalite Kontrol Detayı</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                v-model="secilenKontrol.irsaliyeNo"
                label="İrsaliye No"
                readonly
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="secilenKontrol.tedarikci"
                label="Tedarikçi"
                readonly
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="secilenKontrol.urunAdi"
                label="Ürün Adı"
                readonly
                outlined
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="secilenKontrol.miktar"
                label="Miktar"
                readonly
                outlined
              />
            </div>
          </div>
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
const detayModal = ref(false)
const secilenKontrol = ref({})

const columns = [
  { name: 'irsaliyeNo', label: 'İrsaliye No', field: 'irsaliyeNo', align: 'left' },
  { name: 'tedarikci', label: 'Tedarikçi', field: 'tedarikci', align: 'left' },
  { name: 'urunAdi', label: 'Ürün Adı', field: 'urunAdi', align: 'left' },
  { name: 'miktar', label: 'Miktar', field: 'miktar', align: 'right' },
  { name: 'durum', label: 'Durum', field: 'durum', align: 'center' },
  { name: 'islemler', label: 'İşlemler', field: 'islemler', align: 'center' }
]

const bekleyenKontroller = ref([
  {
    id: 1,
    irsaliyeNo: 'IRS-001',
    tedarikci: 'ABC Tedarik',
    urunAdi: 'Ürün A',
    miktar: 100,
    durum: 'Beklemede'
  },
  {
    id: 2,
    irsaliyeNo: 'IRS-002',
    tedarikci: 'XYZ Tedarik',
    urunAdi: 'Ürün B',
    miktar: 50,
    durum: 'Onaylandı'
  }
])

function kontrolDetay(kontrol) {
  secilenKontrol.value = { ...kontrol }
  detayModal.value = true
}

function onayla() {
  $q.dialog({
    title: 'Onay',
    message: 'Bu kalite kontrolü onaylamak istediğinize emin misiniz?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // Onaylama işlemi
    $q.notify({
      color: 'positive',
      message: 'Kalite kontrol onaylandı',
      icon: 'check'
    })
  })
}

function reddet() {
  $q.dialog({
    title: 'Red',
    message: 'Bu kalite kontrolü reddetmek istediğinize emin misiniz?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // Reddetme işlemi
    $q.notify({
      color: 'negative',
      message: 'Kalite kontrol reddedildi',
      icon: 'close'
    })
  })
}
</script>

<script>
export default {
  name: 'KaliteKontrolYonetimi'
}
</script> 