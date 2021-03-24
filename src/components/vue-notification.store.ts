import {
  computed,
  reactive,
} from 'vue'
import { Notification } from '@/components/vue-notification.interface'
import { defaultNotification } from '@/components/vue-notification.factory'

const state = reactive({
  notifications: {} as Record<string, Notification>,
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useNotificationStore = () => {
  const notifications = computed(
    () => state.notifications,
  )

  const notification = (id: string) => computed(
    () => state.notifications[id],
  )

  const setNotification = (notification: Partial<Notification>) => {
    const fullNotification = JSON.parse(JSON.stringify({
      ...defaultNotification(),
      ...notification,
    }))

    state.notifications[fullNotification.id] = fullNotification
  }

  const unsetNotification = (idNotification: string) => {
    delete state.notifications[idNotification]
  }

  return {
    notifications,
    notification,
    setNotification,
    unsetNotification,
  }
}
