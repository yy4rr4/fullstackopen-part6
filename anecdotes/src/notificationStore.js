import { create } from 'zustand'

const useNotificationStore = create((set, get) => ({
  notification: '',
  timeoutId: null,
  actions: {
    setNotification: (message) => {
      const prevTimeout = get().timeoutId
      if (prevTimeout) {
        clearTimeout(prevTimeout)
      }

      const newTimeout = setTimeout(() => {
        set({ notification: '', timeoutId: null })
      }, 5000)

      set(() => ({ notification: message, timeoutId: newTimeout }))
    },
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)

export const showNotification = (message) => {
  useNotificationStore.getState().actions.setNotification(message)
}
