<template>
  <transition-group
    :class="classList"
    name="notification-list"
    tag="ul"
    appear
    class="notification-list fixed"
  >
    <vue-notification-list-item
      v-for="notification in notificationList"
      :key="notification.id"
      :notification="notification"
      :layout="notificationListItemLayout"
    />
  </transition-group>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue'
import {
  NotificationListItemLayout,
  NotificationListPosition,
} from '@/components/vue-notification.enum'
import { useNotificationStore } from '@/components/vue-notification.store'
import VueNotificationListItem from '@/components/VueNotificationListItem.vue'

export default defineComponent({
  name: 'VueNotificationList',
  components: {
    VueNotificationListItem,
  },
  props: {
    position: {
      type: String as PropType<NotificationListPosition>,
      default: NotificationListPosition.BottomRight,
    },
    zIndex:{
      type: String,
      default:'z-40'
    }
  },
  setup(props) {
    const { notifications } = useNotificationStore()

    const notificationList = computed(() => {
      if (notificationListPosition.value.includes(NotificationListItemLayout.Bottom)) {
        return notifications.value
      }

      return Object.keys(notifications.value).reverse().reduce((acc, cur) => ({
        ...acc,
        [cur]: notifications.value[cur],
      }), {})
    })

    const notificationListPosition = computed(
      () => Object.values(NotificationListPosition).includes(props.position)
        ? props.position
        : NotificationListPosition.BottomRight,
    )

    const classList = computed(() => `notification-list--${notificationListPosition.value} ${props.zIndex}`)

    const notificationListItemLayout = computed(
      () => notificationListPosition.value.includes(NotificationListItemLayout.Left)
        ? NotificationListItemLayout.Left
        : NotificationListItemLayout.Right,
    )

    return {
      notificationList,
      classList,
      notificationListItemLayout,
    }
  },
})
</script>

<style lang="scss" scoped>
  $timing-function: cubic-bezier(0.820, 0.085, 0.395, 0.895);

  .notification-list {
    position: fixed;
    z-index: 100;
    margin: 0;
    padding: 0;

    &--top-left {
      top: 0;
      left: 0;

      .notification-list-enter-from {
        opacity: 0;
        transform: translateX(-100%);
      }

      .notification-list-leave-to {
        opacity: 0;
        transform: translate(-100%, calc(0% - 8px));
      }

      .notification-list-enter-to,
      .notification-list-leave-from {
        opacity: 1;
      }

      .notification-list-enter-active,
      .notification-list-leave-active {
        transition: all .3s $timing-function;
      }

      .notification-list-leave-active {
        position: absolute;
      }

      .notification-list-move {
        transition: all .6s ease-in-out;
      }
    }

    &--bottom-left {
      bottom: 0;
      left: 0;

      .notification-list-enter-from {
        opacity: 0;
        transform: translateX(-100%);
      }

      .notification-list-leave-to {
        opacity: 0;
        transform: translate(-100%, calc(-100% - 8px));
      }

      .notification-list-enter-to,
      .notification-list-leave-from {
        opacity: 1;
      }

      .notification-list-enter-active,
      .notification-list-leave-active {
        transition: all .3s $timing-function;
      }

      .notification-list-leave-active {
        position: absolute;
      }

      .notification-list-move {
        transition: all .6s ease-in-out;
      }
    }

    &--top-right {
      top: 0;
      right: 0;

      .notification-list-enter-from {
        opacity: 1;
        transform: translateX(100%);
      }

      .notification-list-leave-to {
        opacity: 0;
        transform: translate(100%, calc(0% - 8px));
      }

      .notification-list-enter-to,
      .notification-list-leave-from {
        opacity: 1;
      }

      .notification-list-enter-active,
      .notification-list-leave-active {
        transition: all .3s $timing-function;
      }

      .notification-list-leave-active {
        position: absolute;
        z-index: 90;
      }

      .notification-list-move {
        transition: all .6s ease-in-out;
      }
    }

    &--bottom-right {
      bottom: 0;
      right: 0;

      .notification-list-enter-from {
        opacity: 0;
        transform: translateX(100%);
      }

      .notification-list-leave-to {
        opacity: 0;
        transform: translate(100%, calc(-100% - 8px));
      }

      .notification-list-enter-to,
      .notification-list-leave-from {
        opacity: 1;
      }

      .notification-list-enter-active,
      .notification-list-leave-active {
        transition: all .3s $timing-function;
      }

      .notification-list-leave-active {
        position: absolute;
        z-index: 90;
      }

      .notification-list-move {
        transition: all .6s ease-in-out;
      }
    }
  }
</style>
