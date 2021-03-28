<template>
  <li
    :class="classList"
    class="notification-list-item"
    @click="dismissManually"
  >
    <div
      ref="tagRef"
      :style="animationDurationStyle"
      class="notification-list-item__tag"
    />
    <div class="notification-list-item__message">
      <slot>{{ notification.message }}</slot>
    </div>
    <div class="notification-list-item__icon">
      <span
        v-if="notification.showIcon"
        v-html="icons[notification.type]"
      />
    </div>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
} from 'vue'
import { Notification } from '@/components/vue-notification.interface'
import {
  NotificationListItemAppearance,
  NotificationListItemLayout,
  NotificationListItemType,
} from '@/components/vue-notification.enum'
import { useNotificationStore } from '@/components/vue-notification.store'
import { ICONS } from '@/components/vue-notification.constant'

export default defineComponent({
  name: 'NotificationListItem',
  props: {
    notification: {
      type: Object as PropType<Notification>,
      required: true,
    },
    layout: {
      type: String as PropType<NotificationListItemLayout>,
      default: NotificationListItemLayout.Left,
    },
  },
  setup(props) {
    const tagRef = ref<HTMLElement>()

    const { unsetNotification } = useNotificationStore()

    const notificationListItemType = computed(
      () => Object.values(NotificationListItemType).includes(props.notification.type)
        ? props.notification.type
        : NotificationListItemType.Info,
    )

    const notificationListItemLayout = computed(
      () => Object.values(NotificationListItemLayout).includes(props.layout)
        ? props.layout
        : NotificationListItemLayout.Left,
    )

    const notificationListItemAppearance = computed(
      () => Object.values(NotificationListItemAppearance).includes(props.notification.appearance)
        ? props.notification.appearance
        : NotificationListItemAppearance.Light,
    )

    const classList = computed(() => ({
      'notification-list-item--dismissible-manual': props.notification.dismiss.manually,
      'notification-list-item--dismissible-automatic': props.notification.dismiss.automatically && props.notification.showDurationProgress,
      [`notification-list-item--${notificationListItemType.value}`]: true,
      [`notification-list-item--${notificationListItemLayout.value}`]: true,
      [`notification-list-item--${notificationListItemAppearance.value}`]: true,
    }))

    const animationDurationStyle = ref({
      // duration - appear time - start delay - end delay
      animationDuration: `${props.notification.duration - 500 - 100}ms`,
    })

    const dismissManually = () => {
      if (!props.notification.dismiss.manually) return

      unsetNotification(props.notification.id)
    }

    const dismissAutomatically = () => {
      if (!props.notification.dismiss.automatically) return

      setTimeout(() => {
        unsetNotification(props.notification.id)
      }, props.notification.duration)
    }

    onMounted(() => {
      dismissAutomatically()
    })

    return {
      tagRef,
      classList,
      animationDurationStyle,
      icons: ICONS,
      dismissManually,
    }
  },
})
</script>

<style lang="scss" scoped>
  $color-success: #009800;
  $color-alert: #ff3600;
  $color-warning: #ffa600;
  $color-info: #0088ff;

  .notification-list-item {
    $root: &;

    position: relative;
    display: flex;
    margin: 8px;
    min-height: 74px;
    width: 100vw;
    max-width: 400px;
    border-radius: 4px;
    overflow: hidden;

    &--light {
      background-color: #fcfcfc;
      border: 1px solid #eee;
      color: #333;
    }

    &--dark {
      background-color: #333;
      border: 1px solid #222;
      color: #eee;
    }

    &--glass {
      background-color: rgba(255, 255, 255, .1);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, .125);
      border-top-color: rgba(255, 255, 255, .25);
      border-left-color: rgba(255, 255, 255, .25);
      color: #eee;
    }

    &--dismissible-manual {
      cursor: pointer;
    }

    &__tag {
      position: absolute;
      bottom: 0;
      height: 100%;
      width: 6px;

      #{$root}--dismissible-automatic & {
        animation-name: progress;
        animation-timing-function: linear;
        animation-delay: .5s;
        animation-fill-mode: forwards;
      }
    }

    &__message {
      z-index: 1;
      flex: 1;
      padding: 12px 12px 12px 18px;
    }

    &__icon {
      position: absolute;
      bottom: -24px;
      opacity: .25;
      width: 80px;

      #{$root}--glass & {
        opacity: .5;
      }
    }

    &--left {
      text-align: right;

      #{$root}__tag {
        right: 0;
      }

      #{$root}__icon {
        left: -24px;
        transform: rotate(12deg);
      }
    }

    &--right {
      text-align: left;

      #{$root}__icon {
        right: -24px;
        transform: rotate(-12deg);
      }
    }

    &--success {
      #{$root}__tag {
        background-color: $color-success;
      }

      #{$root}__icon {
        color: $color-success;
      }
    }

    &--alert {
      #{$root}__tag {
        background-color: $color-alert;
      }

      #{$root}__icon {
        color: $color-alert;
      }
    }

    &--warning {
      #{$root}__tag {
        background-color: $color-warning;
      }

      #{$root}__icon {
        color: $color-warning;
      }
    }

    &--info {
      #{$root}__tag {
        background-color: $color-info;
      }

      #{$root}__icon {
        color: $color-info;
      }
    }
  }
</style>

<style lang="scss">
  @keyframes progress {
    0% { height: 100%; opacity: 1; }
    100% { height: 0; opacity: .5; }
  }
</style>
