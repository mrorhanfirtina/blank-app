import { defineStore } from 'pinia'
import supabase from '../config/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.user_metadata?.role || null,
    isAdmin: (state) => state.user?.user_metadata?.role === 'admin',
    isDepoSorumlusu: (state) => state.user?.user_metadata?.role === 'depo_sorumlusu',
    isKaliteKontrol: (state) => state.user?.user_metadata?.role === 'kalite_kontrol',
    isMalKabul: (state) => state.user?.user_metadata?.role === 'mal_kabul',
    isStokOperatörü: (state) => state.user?.user_metadata?.role === 'stok_operatörü'
  },

  actions: {
    async login(email, password) {
      try {
        this.loading = true
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        this.user = data.user
        this.session = data.session
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        this.loading = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
        this.session = null
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async checkUser() {
      try {
        this.loading = true
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        if (session) {
          this.session = session
          this.user = session.user
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUserRole(userId, role) {
      try {
        this.loading = true
        const { data, error } = await supabase.auth.admin.updateUserById(
          userId,
          { user_metadata: { role } }
        )
        if (error) throw error
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 