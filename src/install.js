import VueNotificationList from './components/VueNotificationList'
import VueNotificationListItem from './components/VueNotificationListItem'
import { useNotificationStore } from './components/vue-notification.store'

const install = (Vue) => {
  Vue.component('vue-notification-list', VueNotificationList)
  Vue.component('vue-notification-list-item', VueNotificationListItem)
}

export default install
export {
  VueNotificationList,
  VueNotificationListItem,
  useNotificationStore,
}

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}
