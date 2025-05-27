<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section>
        <div class="text-h6">Giriş Yap</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            label="E-posta"
            type="email"
            :rules="[val => !!val || 'E-posta gerekli']"
          />

          <q-input
            v-model="password"
            label="Şifre"
            type="password"
            :rules="[val => !!val || 'Şifre gerekli']"
          />

          <div>
            <q-btn
              label="Giriş Yap"
              type="submit"
              color="primary"
              class="full-width"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  try {
    loading.value = true
    await authStore.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: error.message,
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 100%;
  max-width: 400px;
}
</style>

<script>
export default {
  name: 'LoginPage'
}
</script> 