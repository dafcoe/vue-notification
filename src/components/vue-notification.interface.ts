import {
  NotificationListItemAppearance,
  NotificationListItemType,
} from '@/components/vue-notification.enum'

interface NotificationDismiss {
  automatically: boolean;
  manually: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: NotificationListItemType;
  showIcon: boolean;
  dismiss: NotificationDismiss;
  duration: number;
  showDurationProgress: boolean;
  appearance: NotificationListItemAppearance;
}
