import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(credentials) {
      const res = await api.post('/auth/login', credentials)
      this.user = res.data.user
      this.token = res.data.token
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
