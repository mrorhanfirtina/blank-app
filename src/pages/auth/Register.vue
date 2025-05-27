<template>
  <q-page class="flex flex-center">
    <q-card class="register-card">
      <q-card-section>
        <div class="text-h6">Kayıt Ol</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="ad"
            label="Ad Soyad"
            :rules="[val => !!val || 'Ad Soyad gerekli']"
          />
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
              label="Kayıt Ol"
              type="submit"
              color="primary"
              class="full-width"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Giriş Yap" color="primary" @click="goToLogin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import supabase from 'src/config/supabase'
// import { useAuthStore } from 'src/stores/auth' // Gerçek kayıt işlemi için açılacak

const router = useRouter()
// const authStore = useAuthStore()

const ad = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { ad: ad.value }
      }
    })
    if (error) throw error
    Notify.create({
      color: 'positive',
      message: 'Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.',
      icon: 'check'
    })
    router.push({ name: 'login' })
  } catch (error) {
    Notify.create({
      color: 'negative',
      message: error.message,
      icon: 'error'
    })
  } finally {
    loading.value = false
  }
}

function goToLogin() {
  router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped>
.register-card {
  width: 100%;
  max-width: 400px;
}
</style>

<script>
export default {
  name: 'RegisterPage'
}
</script> 