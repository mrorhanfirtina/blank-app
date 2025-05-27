<template>
  <q-page class="flex flex-center">
    <q-card class="unauthorized-card">
      <q-card-section>
        <div class="text-h6 text-negative">Yetkisiz Erişim</div>
        <div class="text-subtitle2 q-mt-md">
          Bu sayfaya erişim yetkiniz bulunmamaktadır.
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Ana Sayfaya Dön"
          color="primary"
          @click="$router.push({ name: 'dashboard' })"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'UnauthorizedPage'
}
</script>

<style lang="scss" scoped>
.unauthorized-card {
  width: 100%;
  max-width: 400px;
}
</style> 