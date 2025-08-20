import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: '' as string,
  }),
  actions: {
    setError(message: string) {
      this.message = message
    },
    clear() {
      this.message = ''
    },
  },
})
