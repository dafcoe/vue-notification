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

    <div class="bottom-links">
      <a
        href="https://github.com/dafcoe/vue-notification"
        target="_blank"
      >
        <span
          v-html="icons.github"
          class="bottom-link--github"
        />
      </a>
      <a
        href="https://www.npmjs.com/package/@dafcoe/vue-notification"
        target="_blank"
      >
        <span
          v-html="icons.npm"
          class="bottom-link--npm"
        />
      </a>
    </div>
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

    const icons = {
      github: `
        <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      `,
      npm: `
        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <g>
              <rect width="24" height="24" opacity="0"/>
              <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h7V11h4v10h1a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"/>
          </g>
        </svg>
      `,
    }

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
      icons,
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
    margin: 0;
    padding: 0;
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
      max-width: 170px;
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

  .bottom-links {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: inline-block;
      margin: 0 10px;
      color: white;
      text-decoration: none;
      opacity: .75;
      transition: opacity .25s ease-in-out;

      &:hover {
        opacity: 1;
      }

      span {
        display: inline-flex;
        height: 42px;
        width: 42px;

        &.bottom-link--github {
          margin-top: -5px;
          padding: 5px;
        }
      }

      svg {
        height: 100%;
        width: 100%;
      }
    }

    :visited {
      color: white;
    }
  }
</style>
