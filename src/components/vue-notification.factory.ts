import { Notification } from '@/components/vue-notification.interface'
import {
  NotificationListItemAppearance,
  NotificationListItemType,
} from '@/components/vue-notification.enum'
import { DEFAULT_NOTIFICATION_DURATION } from '@/components/vue-notification.constant'

export const defaultNotification = (): Notification => ({
  id: `${Date.now()}`,
  message: '',
  type: NotificationListItemType.Info,
  showIcon: true,
  dismiss: {
    automatically: true,
    manually: true,
  },
  duration: DEFAULT_NOTIFICATION_DURATION,
  showDurationProgress: true,
  appearance: NotificationListItemAppearance.Light,
})
