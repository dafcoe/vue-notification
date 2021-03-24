<template>
  <div>
    <h1>@dafcoe/vue-notification</h1>

    <div class="wrapper">
      <div class="dashboard--left">
        <div class="dashboard">
          <div class="dashboard__row">
            <span class="dashboard__row-label">Position:</span>
            <span class="dashboard__row-content">
              <span
                v-for="notificationPosition in notificationPositions"
                :key="notificationPosition"
              >
                <input
                  v-model="position"
                  :id="notificationPosition"
                  :value="notificationPosition"
                  type="radio"
                >
                <label :for="notificationPosition">
                  {{ notificationPosition }}
                </label>
              </span>
            </span>
          </div>
        </div>

        <div class="dashboard">
          <div class="dashboard__row">
            <span class="dashboard__row-content">
              <input
                v-model.trim="message"
                type="text"
                placeholder="message"
              >
            </span>
          </div>

          <div class="dashboard__row">
            <span class="dashboard__row-label">Type:</span>
            <span class="dashboard__row-content">
              <span
                v-for="notificationType in notificationTypes"
                :key="notificationType"
              >
                <input
                  v-model="type"
                  :id="notificationType"
                  :value="notificationType"
                  type="radio"
                >
                <label :for="notificationType">
                  {{ notificationType }}
                </label>
              </span>
            </span>
            <span class="dashboard__row-tip">
              <input
                v-model="showIcon"
                id="showIcon"
                type="checkbox"
              >
              <label for="showIcon">
                show icon
              </label>
            </span>
          </div>

          <div class="dashboard__row">
            <span class="dashboard__row-label">Appearance:</span>
            <span
              v-for="notificationAppearance in notificationAppearances"
              :key="notificationAppearance"
              class="padded-right"
            >
              <input
                v-model="appearance"
                :id="notificationAppearance"
                :value="notificationAppearance"
                type="radio"
              >
              <label :for="notificationAppearance">
                {{ notificationAppearance }}
              </label>
            </span>
          </div>

          <div class="dashboard__row">
            <span class="dashboard__row-label">Dismiss:</span>
            <span
              v-for="dismissMode in ['manually', 'automatically']"
              :key="dismissMode"
              class="padded-right"
            >
              <input
                v-model="dismiss[dismissMode]"
                :id="`dismiss-${dismissMode}`"
                type="checkbox"
              >
              <label :for="`dismiss-${dismissMode}`">
                {{ dismissMode }}
              </label>
            </span>
          </div>

          <div class="dashboard__row">
            <span class="dashboard__row-label">Duration:</span>
            <input
              v-model.number="duration"
              :disabled="!dismiss['automatically']"
              type="number"
              class="padded-right"
            >
            <span>
              <input
                v-model="showDurationProgress"
                :disabled="!dismiss['automatically']"
                id="showDurationProgress"
                type="checkbox"
              >
              <label for="showDurationProgress">
                show progress animation
              </label>
            </span>
          </div>

          <div class="dashboard__row">
            <button @click="pushNotification">
              Push Notification
            </button>
          </div>
        </div>
      </div>

      <div class="dashboard--right">
        <div class="dashboard">
          <div class="dashboard__row">
            <span class="dashboard__row-label">Preview:</span>
            <div>
              <vue-notification-list-item
                :notification="notificationPreview"
                :layout="notificationLayoutPreview"
                class="notification-preview-item"
              />
            </div>
          </div>
          <div class="dashboard__row">
            <pre>{{ notificationPreview }}</pre>
          </div>
        </div>
      </div>
    </div>

    <vue-notification-list :position="position" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
} from 'vue'
import VueNotificationList from '@/components/VueNotificationList.vue'
import VueNotificationListItem from '@/components/VueNotificationListItem.vue'
import { Notification } from '@/components/vue-notification.interface'
import {
  NotificationListItemAppearance,
  NotificationListItemType,
  NotificationListPosition,
} from '@/components/vue-notification.enum'
import { useNotificationStore } from '@/components/vue-notification.store'

export default defineComponent({
  name: 'App',
  components: {
    VueNotificationList,
    VueNotificationListItem,
  },
  setup() {
    const notification = reactive<Partial<Notification>>({
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'info' as NotificationListItemType,
      showIcon: true,
      dismiss: {
        manually: true,
        automatically: true,
      },
      duration: 10000,
      showDurationProgress: true,
      appearance: 'light' as NotificationListItemAppearance,
    })

    const notificationPreview = ref(notification)

    const position = ref(NotificationListPosition.BottomRight)

    const notificationLayoutPreview = computed(
      () => position.value.replace('top-', '').replace('bottom-', ''),
    )

    const notificationTypes = ref(Object.values(NotificationListItemType))

    const notificationAppearances = ref(Object.values(NotificationListItemAppearance))

    const notificationPositions = ref(Object.values(NotificationListPosition))

    const { setNotification } = useNotificationStore()

    const pushNotification = (): void => {
      setNotification(notification)
    }

    return {
      ...toRefs(notification),
      notificationPreview,
      position,
      notificationLayoutPreview,
      notificationTypes,
      notificationAppearances,
      notificationPositions,
      pushNotification,
    }
  },
})
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    line-height: 1.5;
    color: #333;
    background: url("https://www.transparenttextures.com/patterns/dark-mosaic.png"), linear-gradient(to right, #C6426E, #642B73);
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    margin-top: -40px;
    text-align: center;
    color: white;
    font-weight: 300;
    font-size: 64px;
  }

  .wrapper {
    display: flex;
  }

  .dashboard {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    max-width: 545px;
    background-color: rgba(255, 255, 255, .1);
    border-radius: 10px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, .125);
    border-top-color: rgba(255, 255, 255, .25);
    border-left-color: rgba(255, 255, 255, .25);
    color: #eee;

    &:not(:last-of-type) {
      margin-bottom: 20px;
    }

    &--left,
    &--right {
      margin: 10px;
    }

    &--right {
      .dashboard {
        height: 100%;

        &__row {
          overflow: hidden;
        }
      }
    }

    &__row {
      display: flex;
      align-items: center;

      &:not(:last-of-type) {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, .07);
      }
    }

    &__row-label {
      margin-right: 20px;
      font-weight: bold;
    }

    &__row-content {
      display: flex;
      justify-content: space-between;
      flex: 1;
    }

    &__row-tip {
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid rgba(255, 255, 255, .07);
    }

    .padded-right {
      margin-right: 50px;
    }

    input[type=text] {
      padding: 12px;
      width: 100%;
      font-size: 18px;
      text-align: center;
      background-color: rgba(255, 255, 255, .25);
      border: 1px solid rgba(255, 255, 255, .125);
      border-radius: 5px;
      color: white;
      outline: none;
    }

    input[type=number] {
      padding: 12px;
      text-align: center;
      background-color: rgba(255, 255, 255, .25);
      border: 1px solid rgba(255, 255, 255, .125);
      border-radius: 5px;
      color: white;
      outline: none;
    }

    input[type=radio],
    input[type=checkbox] {
      position: absolute;
      left: -100vw;

      &:checked {
        ~ label {
          border-color: rgba(255, 255, 255, .75);
        }
      }

      &:disabled {
        ~ label {
          opacity: .25;
        }
      }
    }

    label {
      padding: 8px;
      border: 1px solid transparent;
      border-radius: 5px;
      cursor: pointer;
      transition: all .25s ease-in;

      &:hover {
        border-color: rgba(255, 255, 255, .25);
      }
    }

    input {
      &[disabled] {
        transition: all .25s ease-in;
        opacity: .25;
      }
    }

    button {
      padding: 12px;
      width: 100%;
      font-size: 18px;
      text-align: center;
      background-color: rgba(255, 255, 255, .75);
      border: none;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      color: #333;
      transition: all .25s ease-in;

      &:hover {
        background-color: white;
        color: black;
      }
    }

    .notification-preview-item {
      margin: 0;
    }

    pre {
      margin: 0;
      font-size: 14px;
      font-family: 'Source Code Pro', monospace;
    }
  }
</style>
